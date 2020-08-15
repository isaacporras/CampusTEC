import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ChallengeService } from './challenge.service';
@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.css']
})
export class ChallengeComponent implements OnInit {
challengeForm: FormGroup;
objectiveForm: FormGroup;
objectives: Array<any>;

classId: number;
atLeastOnObjective: boolean = false;
objectivesResponse: Array<any>;

  constructor(
    public dialogRef: MatDialogRef<ChallengeComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private formBuilder: FormBuilder,
    private http: ChallengeService,

  ) {

    this.classId = data;
  }

  onClickSave() {

    this.objectiveForm.controls.id.setValue(this.classId);
    console.log(JSON.stringify(this.objectiveForm.value, null, 4));
    this.dialogRef.close();
  }
  onClickClose() {

    this.dialogRef.close();
  }

  ngOnInit() {
    this.challengeForm = this.formBuilder.group({
      id: new FormControl(''),
      name: new FormControl(''),
      payment: new FormControl('',[Validators.required]),
      date: new FormControl('', [Validators.required]),
      objective: new FormControl('', [Validators.required]),
    });

    this.objectiveForm = this.formBuilder.group({
      id: new FormControl(''),
      description: new FormControl('', [Validators.required, Validators.maxLength(500)])
    });


    this.objectives = this.http.getObjectives();

    this.objectivesResponse = []

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

    console.log(this.objectivesResponse)


  }


  onClickCancel(): void {
    this.dialogRef.close();
  }

  get description() { return this.objectiveForm.get('description'); }

}