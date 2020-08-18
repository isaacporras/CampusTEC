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
  week: number;
  hourDat: number;


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
      this.taskData = jsonResponse;
      this.hourDat = this.taskData["hour"];
      let periodValue: any
      if (this.hourDat > 12) {
        this.hourDat -= 12;
        periodValue = 'PM';
      } else {
        periodValue = 'AM';
      }

      console.log(this.taskData);
      let day = this.taskData['day'];

      console.log();

      switch (day) {
        case '0':
          this.stringDay = 'Domingo';
          break;

        case '1':
          this.stringDay = 'Lunes';
          break;
        case '2':

          this.stringDay = 'Martes';
          break;
        case '3':

          this.stringDay = 'Miercoles';
          break;
        case '4':
          this.stringDay = 'Jueves';
          break;
        case '5':
          this.stringDay = 'Viernes';
          break;
        case '6':
          this.stringDay = 'Sabado';
          break;
      }

      console.log(this.stringDay);

      this.activity = this.taskData.activity;
      this.week = this.taskData.week;

      this.taskForm = this.formBuilder.group(
        {
          token: new FormControl(this.studentId, [Validators.required]),
          id: new FormControl(this.taskId),
          name: new FormControl(this.taskData['name'],
            [Validators.required]
          ),
          day: new FormControl(this.stringDay,
            [Validators.required]
          ),
          hour: new FormControl(this.hourDat,
            [Validators.required, Validators.min(1), Validators.max(12)]
          ),
          description: new FormControl(this.taskData['description'], Validators.required
          ),
          period: new FormControl(periodValue,
            [Validators.required]
          ),
          done: new FormControl(this.taskData["done"]),
        });

    }, (error) => {
      console.log(error);
    });


  }


  onClickSave() {
    this.submitted = true;
    console.log(this.taskForm.valid);
    console.log(this.taskForm.value);
    if (this.taskForm.valid) {
      if(this.taskForm.get('period').value == 'PM') {
        this.taskForm.get('hour').setValue(Number(this.taskForm.get('hour').value) + 12);
      }
      let dayIndex;
      switch (this.taskForm.get('day').value) {
        case "Domingo": dayIndex = 0; break;
        case "Lunes": dayIndex = 1; break;
        case "Martes": dayIndex = 2; break;
        case "Miércoles": dayIndex = 3; break;
        case "Jueves": dayIndex  = 4; break;
        case "Viernes": dayIndex = 5; break;
        case "Sábado": dayIndex = 6; break;
      }
      this.taskForm.get('day').setValue(dayIndex);
      console.log(this.taskForm.value);
      this.http.updateTask(this.taskForm.value).subscribe(value => {
        console.log(value);
      })
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
