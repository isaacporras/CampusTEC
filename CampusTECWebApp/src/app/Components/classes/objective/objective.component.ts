import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-objective',
  templateUrl: './objective.component.html',
  styleUrls: ['./objective.component.css']
})
export class ObjectiveComponent implements OnInit {
  objectiveForm: FormGroup;
  classId: number;

  constructor(
    public dialogRef: MatDialogRef<ObjectiveComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private formBuilder: FormBuilder

  ) {

    this.classId = data;
   }

  onClickSave()
  {

    this.objectiveForm.controls.idClass.setValue(this.classId);
    console.log(JSON.stringify(this.objectiveForm.value, null, 4));
    this.dialogRef.close();
  }
  onClickClose() {

    this.dialogRef.close();
  }

  ngOnInit() {

    this.objectiveForm = this.formBuilder.group({
      idClass: new FormControl(''),
      description: new FormControl('',[Validators.required, Validators.maxLength(500)])
    });
  }


  onClickCancel(): void {
    this.dialogRef.close();
  }

  get description() { return this.objectiveForm.get('description'); }

}
