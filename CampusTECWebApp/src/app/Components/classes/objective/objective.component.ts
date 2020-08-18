import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ObjectiveService } from './objectiveService/objective.service';



@Component({
  selector: 'app-objective',
  templateUrl: './objective.component.html',
  styleUrls: ['./objective.component.css']
})
export class ObjectiveComponent implements OnInit {
  objectiveForm: FormGroup;
  classId: number;
  submitted = false;

  constructor(
    public dialogRef: MatDialogRef<ObjectiveComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private formBuilder: FormBuilder,
    private http: ObjectiveService,

  ) {

    this.classId = data.id;
  }

  onClickSave() {
    this.submitted = true;
    if(this.objectiveForm.valid) {
      this.objectiveForm.get('idClass').setValue(this.classId);
      console.log(JSON.stringify(this.objectiveForm.value, null, 4));
      this.http.postObjective(this.objectiveForm.value).subscribe((data) => {
        var jsonResponse = JSON.parse(JSON.stringify(data));
        console.log(jsonResponse);
        let status;
        if (jsonResponse.status == -1) {
          console.log("Carné o contraseña incorrectos")
          alert('Ocurrió un error al cargar el objetivo')
          status = 1;
          this.dialogRef.close(status);


          
        } else {
          alert('Se creó correctamente el objetivo')
          status = 0
          this.dialogRef.close(status);
        }
      }, (error) => {
        console.log(error);
      });
    }
  }
  onClickClose() {
    this.dialogRef.close();
  }

  ngOnInit() {

    this.objectiveForm = this.formBuilder.group({
      idClass: new FormControl(''),
      description: new FormControl('', [Validators.required, Validators.maxLength(500)])
    });
  }


  onClickCancel(): void {
    this.dialogRef.close();
  }

  get description() { return this.objectiveForm.get('description'); }

}
