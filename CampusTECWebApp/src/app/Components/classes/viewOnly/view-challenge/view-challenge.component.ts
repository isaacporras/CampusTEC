import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ViewChallengeService } from './view-challenge.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { GlobalService } from '../../../globalServices/global.service';

@Component({
  selector: 'app-view-challenge',
  templateUrl: './view-challenge.component.html',
  styleUrls: ['./view-challenge.component.css']
})
export class ViewChallengeComponent implements OnInit {
  challengeForm: FormGroup;
  challengeInfo: any;
  objectiveForm: FormGroup;
  objectives: Array<any>;
  students: Array<any>;
  statusChanged: boolean = false;

  classId: number;
  atLeastOnObjective: boolean = false;
  objectivesResponse: Array<any>;





  fileChangedEventChallenge: Event;
  wasFileUploadedChallenge = false;




  constructor(
    public dialogRef: MatDialogRef<ViewChallengeComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private formBuilder: FormBuilder,
    private http: ViewChallengeService,
    private storage: AngularFireStorage,
    private downloader: GlobalService,

  ) {

    this.classId = data;
  }

  onClickSave() {

    console.log(this.students);
    this.statusChanged = false;

    
    //call push students status
  }
  onClickClose() {

    this.dialogRef.close();
  }



  uploadChallengeFile(e) {
    console.log('subir', e)
    this.fileChangedEventChallenge = e.target.files[0];
    this.wasFileUploadedChallenge = true;
  }


  addObjective() {
    this.atLeastOnObjective = true;
    var id_new = Number(this.challengeForm.get('objective').value.charAt(0));
    var description_new = this.challengeForm.get('objective').value.substr(2);

    this.objectivesResponse.push({
      id: id_new,
      description: description_new
    });
    console.log(this.objectives)

    console.log(this.objectivesResponse);


  }


  onClickCancel(): void {
    this.dialogRef.close();
  }

  onDownloadFile(url) {

    console.log(url);

    this.downloader.downloadFile(url).subscribe(
      (response: any) => {
        let dataType = response.type;
        let binaryData = [];
        binaryData.push(response);
        let downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: dataType }));
        
        downloadLink.setAttribute('download', 'messageFile');
        document.body.appendChild(downloadLink);
        downloadLink.click();
      }
    );

}



  ngOnInit() {
    this.challengeForm = this.formBuilder.group({
      id: new FormControl(''),
      name: new FormControl(''),
      payment: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      objective: new FormControl('', [Validators.required]),
    });

    this.objectiveForm = this.formBuilder.group({
      id: new FormControl(''),
      description: new FormControl('', [Validators.required, Validators.maxLength(500)])
    });



    this.objectives = this.http.getObjectives();
    this.students = this.http.getStudents();


    this.challengeInfo =this.http.getChallengeInfo();

    console.log(this.students)

    this.objectivesResponse = [];

  }
  changeStudentStatus(id: number, status: boolean) {

    console.log(id);

    if (status === true) {
      console.log('es true y se cambiará a false')
      for (let student of this.students) {
        if (student.id === id) {
          student.status = false;
        }

      }
    }

    else {
      console.log('es false y se cambiará a true')
      for (let student of this.students) {

        if (student.id === id) {
          student.status = true;
        }

      }

    }
  }

  getCheckboxName(id: number) {
    return 'checkbox_' + String(id)
  }



  get description() { return this.objectiveForm.get('description'); }

}
