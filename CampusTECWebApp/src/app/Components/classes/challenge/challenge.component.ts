import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ChallengeService } from './challenge.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivitiesComponent } from '../activities/activities.component';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.css']
})
export class ChallengeComponent implements OnInit {
  challengeForm: FormGroup;
  objectiveForm: FormGroup;
  objectives: Array<any>;
  students: Array<any>;
  activities: Array<any>;
  activity: any;

  classId: number;
  atLeastOnObjective: boolean = false;
  atLeastOnActivity: boolean = false;
  objectivesResponse: Array<any>;

  submitted = false;



  fileChangedEventChallenge: Event;
  wasFileUploadedChallenge = false;




  constructor(
    public dialogRef: MatDialogRef<ChallengeComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private formBuilder: FormBuilder,
    private http: ChallengeService,
    private storage: AngularFireStorage,
    private activityDialog: MatDialog,
  ) {

    this.classId = data;
  }

  onClickSave() {
    this.submitted = true;

    
    console.log(JSON.stringify(this.objectiveForm.value, null, 4));
    this.dialogRef.close();


    console.log('Se quiere subir el archivo');
    
    this.challengeForm.removeControl('objective');

    this.challengeForm.addControl('objectives', this.formBuilder.control(''));
    this.challengeForm.get('objectives').setValue(this.objectivesResponse);

    this.challengeForm.addControl('fileURL', this.formBuilder.control(''));

    this.challengeForm.addControl('activities', this.formBuilder.control(''));
    this.challengeForm.get('activities').setValue(this.activities);

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

          console.log('-----------------------------------------------------------------')
          console.log(this.challengeForm.value);
          this.dialogRef.close();
          console.log('-----------------------------------------------------------------')

        });
      });

    }

    else {
      console.log('-----------------------------------------------------------------')
      this.challengeForm.get('fileURL').setValue('Null');
      console.log(this.challengeForm.value)
      this.dialogRef.close();
      console.log('-----------------------------------------------------------------')
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

    this.removeObjective(this.challengeForm.get('objective').value.charAt(0));
  }
  getObjectivesLength() {
    return this.objectives.length === 0;
  }

  onClickCancel(): void {
    this.dialogRef.close();
  }
  addActivity() {
    const classData = new MatDialogConfig();

    classData.disableClose = true;
    classData.autoFocus = true;
    classData.height = '700px';
    classData.width = '600px';

    classData.data = {classid: this.classId, activity: this.activity, cameFrom: 'challenge' };

    this.activityDialog.open(ActivitiesComponent, classData).afterClosed().subscribe(
      data => {
        console.log("La data recibida en el dialog de reto es:", data);
        if (data.status === 0) {
          this.activities.push(data.activity);
        }

        this.atLeastOnActivity = true;
      }
    );


  }
  removeObjective(id) {
    this.objectives.forEach((item, index) => {
      if (item.id === id) this.objectives.splice(index, 1);
    });
  }

  ngOnInit() {
    this.challengeForm = this.formBuilder.group({
      idClass: new FormControl(this.classId),
      name: new FormControl('', [Validators.required]),
      payment: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      objective: new FormControl('', [Validators.required]),
    });

    this.objectiveForm = this.formBuilder.group({
      id: new FormControl(''),
      description: new FormControl('', [Validators.required, Validators.maxLength(500)])
    });




    this.http.getObjectives(this.classId).subscribe((data) => {
      var jsonResponse = JSON.parse(JSON.stringify(data));
      console.log(jsonResponse);
      this.objectives = data['treeview']
      
    }, (error) => {
      console.log(error);
    });


    console.log(this.objectives)
    this.students = this.http.getStudents();

    console.log(this.students)

    this.objectivesResponse = [];
    this.activities = [];

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



  get description() { return this.challengeForm.get('description'); }
  get name() { return this.challengeForm.get('name'); }
  get date() { return this.challengeForm.get('date'); }
  get payment() { return this.challengeForm.get('payment'); }

}
