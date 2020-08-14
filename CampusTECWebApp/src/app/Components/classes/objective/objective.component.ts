import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-objective',
  templateUrl: './objective.component.html',
  styleUrls: ['./objective.component.css']
})
export class ObjectiveComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ObjectiveComponent>,
    @Inject(MAT_DIALOG_DATA) public message:string

  ) { }


  

  ngOnInit(){
  }
  onClickNo(): void {
    this.dialogRef.close();
  }

}
