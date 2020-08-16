import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators ,FormBuilder} from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';

import {Router} from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentialsForm: FormGroup;

  onLogIn() {
    console.log(JSON.stringify(this.credentialsForm.value, null, 4));
    this.router.navigate(['/studentProfile',133]);
    //this.router.navigate(['studentProfile/']);
  }


  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {

    this.credentialsForm =  this.formBuilder.group(
      {
      id : new FormControl('',
      [Validators.minLength(8), Validators.required]
      ),
      password : new FormControl('', Validators.compose([Validators.minLength(4), Validators.required]))
    });
  }


  get id() { return this.credentialsForm.get('id'); }
  get password() { return this.credentialsForm.get('password'); }
}
