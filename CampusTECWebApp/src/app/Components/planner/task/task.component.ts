import { Component, OnInit ,Inject} from '@angular/core';
import { NgbTimepicker } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TaskService } from './task.service';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';


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
    }
    else {
      periodValue = 'AM';
    }

    this.studentId = data.id;

    this.activities = this.http.getActivities();

    console.log(this.http.getActivities())

    this.taskForm = this.formBuilder.group(
      {
        userId: new FormControl(this.studentId),
        name: new FormControl('',
          [ Validators.required]
        ),
        week: new FormControl(1,
          [Validators.required, Validators.min(1), Validators.max(18)]
        ),
        day: new FormControl('Lunes',
          [Validators.required]
        ),
        hour: new FormControl(hourDat,
          [Validators.required, Validators.min(1), Validators.max(12)]
        ),
        minute: new FormControl(myDate.getMinutes(),
          [Validators.required, Validators.min(0), Validators.max(60)]
        ),
        description: new FormControl('', Validators.required
        ),
        period: new FormControl(periodValue,
          [Validators.required]
        ),
        activity: new FormControl(this.activities[0].id + ')' + this.activities[0].name,
          [Validators.required]
        ),
      });
      //this.taskForm.get('activity').setValue(this.activities[0]);
  }


  onClickSave() {
    this.submitted = true;
    if(this.taskForm.valid) {
      console.log(this.taskForm.get('activity').value);
      console.log();
      let id = this.taskForm.get('activity').value.split(')')[0];
      this.taskForm.get('activity').setValue(Number(id));
      console.log(this.taskForm);
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
  get minute() {
    return this.taskForm.get('minute');
  }
  get period() {
    return this.taskForm.get('period');
  }
  get description() {
    return this.taskForm.get('description');
  }

}
