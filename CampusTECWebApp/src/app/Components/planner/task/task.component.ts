import {Component, OnInit, Inject} from '@angular/core';
import {NgbTimepicker} from '@ng-bootstrap/ng-bootstrap';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {TaskService} from './task.service';

import {MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  taskForm: FormGroup;

  activities: Array<any>;

  studentId: any;

  submitted: boolean = false;


  constructor(private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<TaskComponent>,
              private http: TaskService,
              @Inject(MAT_DIALOG_DATA) data,) {
    let myDate = new Date();
    let hourDat = myDate.getHours();
    let periodValue: any;
    if (hourDat > 12) {
      hourDat -= 12;
      periodValue = 'PM';
    } else {
      periodValue = 'AM';
    }

    this.studentId = data.studentId;

    this.taskForm = this.formBuilder.group(
      {
        token: new FormControl(this.studentId),
        name: new FormControl('',
          [Validators.required]
        ),
        week: new FormControl(data.currentWeek,
          [Validators.required, Validators.min(1), Validators.max(16)]
        ),
        day: new FormControl('Lunes',
          [Validators.required]
        ),
        hour: new FormControl(hourDat,
          [Validators.required, Validators.min(1), Validators.max(12)]
        ),
        description: new FormControl('', Validators.required
        ),
        period: new FormControl(periodValue,
          [Validators.required]
        ),
        activity: new FormControl('', [Validators.required]
        ),
      });

    this.updateActivities();
  }


  onClickSave() {
    this.submitted = true;
    if (this.taskForm.valid) {
      let id = this.taskForm.get('activity').value.split(')')[0];
      this.taskForm.get('activity').setValue(Number(id));
      if(this.taskForm.get('period').value == 'PM') {
        this.taskForm.get('hour').setValue(this.taskForm.get('hour').value + 12);
      }
      let dayIndex;
      switch (this.taskForm.get('day').value) {
        case "Domingo": dayIndex = 0;
        case "Lunes": dayIndex = 1;
        case "Martes": dayIndex = 2;
        case "Miércoles": dayIndex = 3;
        case "Jueves": dayIndex  = 4;
        case "Viernes": dayIndex = 5;
        case "Sábado": dayIndex = 6;
      }
      this.taskForm.get('day').setValue(dayIndex);
      console.log(this.taskForm.value);
      this.http.createTask(this.taskForm.value).subscribe(value => {
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

  updateActivities() {
    this.http.getActivities(this.studentId, this.taskForm.get("week").value).subscribe(data => {
      this.activities = [];
      var jsonResponse = JSON.parse(JSON.stringify(data));
      jsonResponse.forEach(value => {
        this.activities = [...this.activities, {id: value.id, name: value.name}];
      });
    });
  }

}
