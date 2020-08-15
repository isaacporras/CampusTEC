import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivitiesService } from './activities.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable'


@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit {
  activityForm: FormGroup;
  classId: number;
  fileToUpload: File = null;
  objectives: Array<any>;
  objectivesResponse: Array<any>;
  objectiveSelected: string;
  commentForm: FormGroup;

  wasFileUploadedAct: boolean;
  wasFileUploadedCom: boolean;
  atLeastOnObjective: boolean = false;


  uploadPercent: Observable<number>;
  urlActivityFile: Observable<string>;

  fileChangedEventAct: Event;
  fileChangedEventComm: Event;


  constructor(
    public dialogRef: MatDialogRef<ActivitiesComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private formBuilder: FormBuilder,
    private http: ActivitiesService,
    private storage: AngularFireStorage

  ) {

    this.classId = data;
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

  ngOnInit() {


    this.activityForm = this.formBuilder.group({
      id: new FormControl(''),
      name: new FormControl(''),
      description: new FormControl('', [Validators.required, Validators.maxLength(500)]),
      evaluable: new FormControl(false, [Validators.required]),
      week: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      objective: new FormControl('', [Validators.required]),
    });

    this.commentForm =  this.formBuilder.group({
      id: new FormControl(''),
      description: new FormControl('', [Validators.required, Validators.maxLength(500)]),
 
    });




    this.objectivesResponse = []

    this.objectives = this.http.getObjectives();

    this.wasFileUploadedAct = false;

    this.wasFileUploadedCom = false;

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
      //Se hace la carga del archivo //
      const id = Math.random().toString(36).substring(2);
      const file = this.fileChangedEventComm;
      const filepath = `commentImages/comment_${id}`;
      const reference = this.storage.ref(filepath);
      const task = this.storage.upload(filepath, file).then(rst => {
        rst.ref.getDownloadURL().then(url => {

          this.commentForm.get('fileURL').setValue(url);
          console.log(this.commentForm.value);
          this.dialogRef.close();

        });
      });

    }
    else {
      this.commentForm.get('fileURL').setValue('Null');
      console.log(this.commentForm.value);

      this.dialogRef.close();
    }






  }

  get name() { return this.activityForm.get('name'); }
  get description() { return this.activityForm.get('description'); }
  get week() { return this.activityForm.get('week'); }
  get date() { return this.activityForm.get('date'); }
  get objective() { return this.atLeastOnObjective }

}