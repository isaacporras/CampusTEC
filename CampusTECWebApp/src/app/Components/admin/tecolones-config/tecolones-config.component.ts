import { Component, OnInit } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';



import { TecolonesConfigService } from '../tecolones-config.service';


@Component({
  selector: 'app-tecolones-config',
  templateUrl: './tecolones-config.component.html',
  styleUrls: ['./tecolones-config.component.css']
})
export class TecolonesConfigComponent implements OnInit {

  tecolonesForm: FormGroup;


  constructor(
    private http: TecolonesConfigService,

    private formBuilder: FormBuilder,
    ) {

    }
    onSaveTecolones() {
      

      this.http.postTecolones(this.tecolonesForm);
    }

  ngOnInit(): void {
    this.tecolonesForm = this.formBuilder.group({
      tecolones: new FormControl(''),
    });

  }

}
