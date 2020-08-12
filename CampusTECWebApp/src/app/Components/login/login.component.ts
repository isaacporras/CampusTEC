import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentialsForm = new FormGroup({
    id : new FormControl('', Validators.required),
    password : new FormControl('', Validators.required)
  });

  onLogIn() {
    console.log(JSON.stringify(this.credentialsForm.value, null, 4));
  }


  constructor() { }

  ngOnInit() {
  }

}
