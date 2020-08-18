import {Component, Inject, OnInit} from '@angular/core';

import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';


import {TecolonesConfigService} from '../tecolones-config.service';


@Component({
  selector: 'app-tecolones-config',
  templateUrl: './tecolones-config.component.html',
  styleUrls: ['./tecolones-config.component.css']
})
export class TecolonesConfigComponent implements OnInit {

  tecolonesForm: FormGroup;
  submitted = false;
  tecolones;

  constructor(
    private http: TecolonesConfigService,
    private formBuilder: FormBuilder,
  ) {

  }

  onSaveTecolones() {
    this.submitted = true;
    if (this.tecolonesForm.valid) {
      console.log(JSON.stringify(this.tecolonesForm.value, null, 4));
      this.http.postTecolones(this.tecolonesForm.value).subscribe((data) => {
        var jsonResponse = JSON.parse(JSON.stringify(data));
        console.log(jsonResponse);
        let status;
        if (jsonResponse.status == 1) {
          alert('Se guardó correctamente la configuración')
          status = 0
        } else {
          alert('Ocurrió un error al guardar la configuración')
          status = 1;
        }
      }, (error) => {
        console.log(error);
      });
    }
  }

  ngOnInit(): void {
    this.tecolonesForm = this.formBuilder.group({
      max: new FormControl('', [Validators.required, Validators.min(0)]),
    });

    this.http.getTecolones().subscribe(data =>{
      this.tecolones = JSON.parse(JSON.stringify(data))["max"];
    });
  }

}
