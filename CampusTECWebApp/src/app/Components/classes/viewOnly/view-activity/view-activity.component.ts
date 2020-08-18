import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ViewActivityService } from './view-activity.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { FirebaseApp } from '@angular/fire';
import { GlobalService } from '../../../globalServices/global.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-view-activity',
  templateUrl: './view-activity.component.html',
  styleUrls: ['./view-activity.component.css']
})
export class ViewActivityComponent implements OnInit {
  activityForm: FormGroup;
  classId: number;
  fileToUpload: File = null;
  objectives: Array<any>;
  objectivesResponse: Array<any>;
  objectiveSelected: string;
  commentForm: FormGroup;
  comments: Array<any>;
  activity: any;
  teacherId:any;
  activityId:any;

  wasFileUploadedAct: boolean;
  wasFileUploadedCom: boolean;
  atLeastOnObjective: boolean = false;


  uploadPercent: Observable<number>;
  urlActivityFile: Observable<string>;

  fileChangedEventAct: Event;
  fileChangedEventComm: Event;


  constructor(
    public dialogRef: MatDialogRef<ViewActivityComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private formBuilder: FormBuilder,
    private http: ViewActivityService,
    private storage: AngularFireStorage,
    private downloader: GlobalService,

  ) {
    console.log('El dato en vista de actividad es:');
    console.log(data);
    this.classId = data.classId;
    this.teacherId =  data.teacherId;
    this.activityId = data.activityId;

  }


  uploadActivityFile(e) {
    console.log('subir', e)
    this.fileChangedEventAct = e.target.files[0];
    this.wasFileUploadedAct = true;
  }
  uploadCommentFile(e) {
    console.log('subir', e)
    this.fileChangedEventComm = e.target.files[0];
    this.wasFileUploadedCom = true;
  }
  onClickSave() {
    console.log('Se quiere subir el archivo');
    this.activityForm.controls.id.setValue(this.classId);
    this.activityForm.removeControl('objective');

    this.activityForm.addControl('objectives', this.formBuilder.control(''));
    this.activityForm.get('objectives').setValue(this.objectivesResponse);

    this.activityForm.addControl('fileURL', this.formBuilder.control(''));


    if (this.wasFileUploadedAct) {
      //Se hace la carga del archivo //
      const id = Math.random().toString(36).substring(2);
      const file = this.fileChangedEventAct;
      const filepath = `activityImages/activity_${id}`;
      const reference = this.storage.ref(filepath);
      const task = this.storage.upload(filepath, file).then(rst => {
        rst.ref.getDownloadURL().then(url => {

          this.activityForm.get('fileURL').setValue(url);
          console.log(this.activityForm.value)
          this.dialogRef.close();

        });
      });

    }
    else {
      this.activityForm.get('fileURL').setValue('Null');
      console.log(this.activityForm.value)
      this.dialogRef.close();
    }


  }
  onClickClose() {

    this.dialogRef.close();
  }




  onClickCancel(): void {
    this.dialogRef.close();
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }



  uploadFileToActivity() {

  }
  addObjective() {
    this.atLeastOnObjective = true;
    var id_new = Number(this.activityForm.get('objective').value.charAt(0));
    var description_new = this.activityForm.get('objective').value.substr(2);

    this.objectivesResponse.push({
      id: id_new,
      description: description_new
    });
    console.log(this.objectives)

    console.log(this.objectivesResponse)


  }

  onClickComentar() {
    console.log('Se quiere comentar')

    this.commentForm.controls.id.setValue(this.classId);
    this.commentForm.removeControl('objective');

    this.commentForm.addControl('fileURL', this.formBuilder.control(''));

    

    if (this.wasFileUploadedCom) {

      const id = Math.random().toString(36).substring(2);
      const file = this.fileChangedEventComm;
      const filepath = `commentImages/comment_${id}`;
      const reference = this.storage.ref(filepath);
      const task = this.storage.upload(filepath, file).then(rst => {
        rst.ref.getDownloadURL().then(url => {

          this.commentForm.get('fileURL').setValue(url);

          this.setCommentFormat();


        });
      });

    }
    else {
      this.commentForm.get('fileURL').setValue('Null');
      this.setCommentFormat();
    }
  }
  postComment(){
    this.http.postComment(this.commentForm.value).subscribe((data) => {
      var jsonResponse = JSON.parse(JSON.stringify(data));
      console.log('El json al commentar:' + jsonResponse);
      
    }, (error) => {
      console.log(error);
    });


    this.comments.push(this.commentForm.value);
  }

  setCommentFormat() {
    this.commentForm.addControl('time', this.formBuilder.control(''));
    this.commentForm.addControl('date', this.formBuilder.control(''));
    this.commentForm.addControl('activityId', this.formBuilder.control(''));
    this.commentForm.addControl('user', this.formBuilder.control(''));

    var id = 4;//tenemos que obtener el id del usuario
    let date = new Date();

    this.commentForm.get('time').setValue(date.getHours() + ':' + date.getMinutes());
    let currentDate = ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear() ;
    this.commentForm.get('date').setValue(currentDate);
    this.commentForm.get('user').setValue(this.http.getUserName(id).user);
    this.commentForm.get('activityId').setValue(this.classId);

    console.log(this.commentForm.value);
    
    
    this.postComment();
    //this.dialogRef.close();

  }

  get name() { return this.activityForm.get('name'); }
  get description() { return this.activityForm.get('description'); }
  get week() { return this.activityForm.get('week'); }
  get date() { return this.activityForm.get('date'); }
  get objective() { return this.atLeastOnObjective }


  onDownloadFile(url) {

    console.log(url);

    this.downloader.downloadFile(url).subscribe(
      (response: any) => {
        let dataType = response.type;
        let binaryData = [];
        binaryData.push(response);
        let downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: dataType }));

        downloadLink.setAttribute('download', 'ArchivoAdjunto');
        document.body.appendChild(downloadLink);
        downloadLink.click();
      }
    );

  }


  ngOnInit() {


    this.activityForm = this.formBuilder.group({
      token: new FormControl(this.teacherId),
      id: new FormControl(this.activityId),
      name: new FormControl(''),
      description: new FormControl('', [Validators.required, Validators.maxLength(500)]),
      evaluable: new FormControl(false, [Validators.required]),
      week: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      objective: new FormControl('', [Validators.required]),
    });

    this.commentForm = this.formBuilder.group({
      id: new FormControl(this.classId),
      description: new FormControl('', [Validators.required, Validators.maxLength(500)]),


    });


 
    this.http.getActivityInfo(this.activityId).subscribe((data) => {
      var jsonResponse = JSON.parse(JSON.stringify(data));
      console.log('El json de actividad:' + jsonResponse);
      this.activity = jsonResponse;
    }, (error) => {
      console.log(error);
    });

    this.http.getComments(this.classId).subscribe((data) => {
      var jsonResponse = JSON.parse(JSON.stringify(data));
      console.log('El json de comentarios:' + jsonResponse);
      this.comments = jsonResponse.treeview;
    }, (error) => {
      console.log(error);
    });

    


    this.objectivesResponse = [];

    

    this.wasFileUploadedAct = false;

    this.wasFileUploadedCom = false;


  }

}
