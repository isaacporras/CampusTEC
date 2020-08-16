import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ViewChallengeService } from './view-challenge.service';
import { AngularFireStorage } from '@angular/fire/storage';


@Component({
  selector: 'app-view-challenge',
  templateUrl: './view-challenge.component.html',
  styleUrls: ['./view-challenge.component.css']
})
export class ViewChallengeComponent implements OnInit {
  challengeForm: FormGroup;
  objectiveForm: FormGroup;
  objectives: Array<any>;
  students: Array<any>;

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
  ) {

    this.classId = data;
  }

  onClickSave() {

    this.objectiveForm.controls.id.setValue(this.classId);
    console.log(JSON.stringify(this.objectiveForm.value, null, 4));
    this.dialogRef.close();


    console.log('Se quiere subir el archivo');
    this.challengeForm.controls.id.setValue(this.classId);
    this.challengeForm.removeControl('objective');

    this.challengeForm.addControl('objectives', this.formBuilder.control(''));
    this.challengeForm.get('objectives').setValue(this.objectivesResponse);

    this.challengeForm.addControl('fileURL', this.formBuilder.control(''));


    console.log(this.students)
    if (this.wasFileUploadedChallenge) {
      //Se hace la carga del archivo //
      const id = Math.random().toString(36).substring(2);
      const file = this.fileChangedEventChallenge;
      const filepath = `activityImages/activity_${id}`;
      const reference = this.storage.ref(filepath);
      const task = this.storage.upload(filepath, file).then(rst => {
        rst.ref.getDownloadURL().then(url => {

          this.challengeForm.get('fileURL').setValue(url);
          console.log(this.challengeForm.value);
          this.dialogRef.close();

        });
      });

    }

    else {
      this.challengeForm.get('fileURL').setValue('Null');
      console.log(this.challengeForm.value)
      this.dialogRef.close();
    }

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

  getCheckboxName(id: number){
    return 'checkbox_'+String(id)
  }



get description() { return this.objectiveForm.get('description'); }

}
