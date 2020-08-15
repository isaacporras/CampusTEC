import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivitiesService } from './activities.service';



@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit {
  activityForm: FormGroup;
  classId: number;
  fileToUpload: File = null;
  objectives: Array<any>;
  objectivesResponse: Array<any>;
  objectiveSelected: string;

  constructor(
    public dialogRef: MatDialogRef<ActivitiesComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private formBuilder: FormBuilder,
    private http: ActivitiesService

  ) {

    this.classId = data;
  }

  onClickSave() {
    console.log('Se quiere subir el archivo');
    this.activityForm.controls.id.setValue(this.classId);
    this.activityForm.removeControl('objective');
    
    this.activityForm.addControl('objectives', this.formBuilder.control(''));
    this.activityForm.get('objectives').setValue(this.objectivesResponse);

    console.log(JSON.stringify(this.activityForm.value, null, 4));
    this.dialogRef.close();
  }
  onClickClose() {

    this.dialogRef.close();
  }

  ngOnInit() {


    this.activityForm = this.formBuilder.group({
      id: new FormControl(''),
      name: new FormControl(''),
      description: new FormControl('', [Validators.required, Validators.maxLength(500)]),
      evaluable: new FormControl(false, [Validators.required]),
      week: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      objective: new FormControl('', [Validators.required]),
    });
    this.objectivesResponse = []

    this.objectives = this.http.getObjectives();
  }


  onClickCancel(): void {
    this.dialogRef.close();
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  get description() { return this.activityForm.get('description'); }

  uploadFileToActivity() {

  }
  addObjective() {
    var id_new =  Number(this.activityForm.get('objective').value.charAt(0));
    var description_new = this.activityForm.get('objective').value.substr(2);

    this.objectivesResponse.push({
      id: id_new,
      description: description_new
    });
    console.log(this.objectives)

    console.log(this.objectivesResponse)


  }

  onClickComentar(){
    console.log('Se quiere comentar')
  }


}