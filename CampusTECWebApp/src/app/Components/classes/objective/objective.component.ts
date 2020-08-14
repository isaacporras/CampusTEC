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


  constructor(
    public dialogRef: MatDialogRef<ObjectiveComponent>,
    @Inject(MAT_DIALOG_DATA) public message:string,
    private formBuilder: FormBuilder

  ) { }

  onClickSave(){
    console.log(JSON.stringify(this.objectiveForm.value, null, 4));
    this.dialogRef.close();
  }
  onClickClose() {

    this.dialogRef.close();
  }

  ngOnInit() {


    this.objectiveForm = this.formBuilder.group({
      description: new FormControl('',
      [Validators.required,
      Validators.minLength(500)])
      
    });
  }
  onClickCancel(): void {
    this.dialogRef.close();
  }

  get description() { return this.objectiveForm.get('description'); }

}
