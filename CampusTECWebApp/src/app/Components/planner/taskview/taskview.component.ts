import {Component, OnInit, Inject} from '@angular/core';
import {NgbTimepicker} from '@ng-bootstrap/ng-bootstrap';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {TaskService} from '../task/task.service';

import {MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-taskview',
  templateUrl: './taskview.component.html',
  styleUrls: ['./taskview.component.css']
})
export class TaskviewComponent implements OnInit {

  taskForm: FormGroup;

  studentId: any;

  submitted: boolean = false;

  taskId: any;
  stringDay: any;
  taskData: any;
  activity: String;


  constructor(private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<TaskviewComponent>,
              private http: TaskService,
              @Inject(MAT_DIALOG_DATA) data,) {


    this.studentId = data.studenId;
    console.log('El studentId es: ' + data.studentId);
    console.log('El taskId es: ' + data.taskId);

    this.taskId = data.taskId;

    this.studentId = data.studentId;


    this.http.getTaskInfo(this.taskId).subscribe((data) => {
      var jsonResponse = JSON.parse(JSON.stringify(data));
      console.log(jsonResponse);

      this.taskData = jsonResponse;

      console.log(this.taskData['day']);


      let myDate = new Date();
      let hourDat = myDate.getHours();
      let periodValue: any;
      if (hourDat > 12) {
        hourDat -= 12;
        periodValue = 'PM';
      } else {
        periodValue = 'AM';
      }

      console.log(this.taskData);
      let day = this.taskData['day'];

      console.log();

      switch (day) {
        case '0':

          this.stringDay = 'Lunes';
          break;
        case '1':

          this.stringDay = 'Martes';
          break;
        case '2':

          this.stringDay = 'Miercoles';
          break;
        case '3':

          this.stringDay = 'Jueves';
          break;
        case '4':
          console.log('es 4');
          this.stringDay = 'Viernes';
          break;
        case '5':

          this.stringDay = 'Sabado';
          break;
        case '6':

          this.stringDay = 'Domingo';
          break;
      }

      console.log(this.stringDay);

      this.activity = this.taskData.activity;

      this.taskForm = this.formBuilder.group(
        {
          userId: new FormControl(this.studentId, [Validators.required]),
          taskId: new FormControl(this.taskId),
          name: new FormControl(this.taskData['name'],
            [Validators.required]
          ),
          week: new FormControl(this.taskData['week'],
            [Validators.required, Validators.min(1), Validators.max(18)]
          ),
          day: new FormControl(this.stringDay,
            [Validators.required]
          ),
          hour: new FormControl(this.taskData['hour'],
            [Validators.required, Validators.min(1), Validators.max(12)]
          ),

          description: new FormControl(this.taskData['description'], Validators.required
          ),
          period: new FormControl(periodValue,
            [Validators.required]
          ),
          done: new FormControl(''),
        });

    }, (error) => {
      console.log(error);
    });


  }


  onClickSave() {
    this.submitted = true;
    if (this.taskForm.valid) {

      // Falta

      this.dialogRef.close();
    }
  }

  onClickClose() {
    this.dialogRef.close();
  }

  ngOnInit(): void {


  }


  // setValue(controlName: string, secondControlName: string) {
  //
  //   this.taskForm.controls[controlName].setValue(this.taskData[secondControlName])
  //
  // }


  get name() {
    return this.taskForm.get('name');
  }

  get week() {
    return this.taskForm.get('week');
  }

  get day() {
    return this.taskForm.get('day');
  }

  get hour() {
    return this.taskForm.get('hour');
  }

  get period() {
    return this.taskForm.get('period');
  }

  get description() {
    return this.taskForm.get('description');
  }

  get done() {
    return this.taskForm.get('done');
  }

}
