import { Component, OnInit } from '@angular/core';
import {NgbTimepicker} from '@ng-bootstrap/ng-bootstrap';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  taskForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.taskForm = this.formBuilder.group(
      {
        id: new FormControl(''),
        name: new FormControl('',
          [Validators.minLength(8), Validators.required]
        ),
        week: new FormControl('',
          [ Validators.required, Validators.min(1), Validators.max(18)]
        ),
        day: new FormControl('',
          [Validators.required]
        ),
        hour: new FormControl('',
          [Validators.required, Validators.min(1), Validators.max(12)]
        ),
        minute: new FormControl('',
          [ Validators.required, Validators.min(0), Validators.max(60)]
        ),
        description: new FormControl('', Validators.required)
      });
   }

  ngOnInit(): void {
  }

}
