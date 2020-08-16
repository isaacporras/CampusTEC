import { Component, OnInit } from '@angular/core';
import { NgbTimepicker } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  taskForm: FormGroup;

  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<TaskComponent>,) {
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

    this.taskForm = this.formBuilder.group(
      {
        id: new FormControl(''),
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
      });
  }



  onClickSave() {
    this.dialogRef.close();
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
