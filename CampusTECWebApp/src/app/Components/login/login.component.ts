import {Component, OnInit} from '@angular/core';

import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {RxwebValidators} from '@rxweb/reactive-form-validators';

import {Router} from '@angular/router';
import {HttpServicesService} from '../../Services/http-services.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentialsForm: FormGroup;

  wrongCredentials = false;

  onLogIn() {
    this.http.authenticate(this.credentialsForm.value).subscribe((data) => {
      var jsonResponse = JSON.parse(JSON.stringify(data));
      console.log(jsonResponse.status);
      if(jsonResponse.status == 1){
        console.log('ENTRO')
        switch (jsonResponse.role) {
          case "estudiante":
            this.router.navigate(['/studentProfile', jsonResponse.token]);
            break;
          case "profesor":
            this.router.navigate(['/teacherProfile', jsonResponse.token]);
            break;
          case "administrador":
            this.router.navigate(['/administrator', jsonResponse.token]);
            break;
        }
      }else{
        console.log("Carné o contraseña incorrectos")
        
        this.wrongCredentials = true;
      }
    }, (error) => {
      console.log(error);
    });
  }


  constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpServicesService) {
  }

  ngOnInit() {

    this.credentialsForm = this.formBuilder.group(
      {
        id: new FormControl('',
          [Validators.minLength(8), Validators.required]
        ),
        password: new FormControl('', Validators.compose([Validators.minLength(4), Validators.required]))
      });
  }


  get id() {
    return this.credentialsForm.get('id');
  }

  get password() {
    return this.credentialsForm.get('password');
  }
}
