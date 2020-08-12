import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators ,FormBuilder} from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentialsForm: FormGroup;

  onLogIn() {
    console.log(JSON.stringify(this.credentialsForm.value, null, 4));
  }


  constructor(private formBuilder: FormBuilder) { }

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
