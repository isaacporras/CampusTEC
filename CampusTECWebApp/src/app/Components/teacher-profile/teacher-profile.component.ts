import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {Router} from '@angular/router';


@Component({
  selector: 'app-teacher-profile',
  templateUrl: './teacher-profile.component.html',
  styleUrls: ['./teacher-profile.component.css']
})

export class TeacherProfileComponent implements OnInit {
  email1Disable: boolean = true;
  email2Disable: boolean = true;
  telNumberDisable: boolean = true;
  universityDisable: boolean = true;
  campusDisable: boolean = true;
  editing: boolean = false;
  teacherId:any;

  teacherBaseData: any;

  teacherDataForm: FormGroup;

  teacherClasses: any = [
    {
      id: '1', nombre: 'Matematica General'
    },
    {
      id: '2', nombre: 'Calculo diferencial'
    },
    {
      id: '3', nombre: 'Matematica para administracion'
    },
    {
      id: '4', nombre: 'Analisis numerico para ingeniería'
    }

  ];


  onEdit(id) {
    this.editing = true;
    if (id === 1) {
      this.teacherDataForm.controls['email1'].enable();
    }
    else if (id == 2) {
      this.teacherDataForm.controls['email2'].enable();
    }

    else if (id == 3) {
      this.teacherDataForm.controls['telNumber'].enable();
    }
    else if (id == 4) {
      this.teacherDataForm.controls['university'].enable();
    }
    else if (id == 5) {
      this.teacherDataForm.controls['campus'].enable();
    }
  }
  goToClass(id) {
    return this.router.navigate(['/classes', id, this.teacherId]);

  }

  onSave() {

    this.teacherDataForm.controls['email1'].disable();
    this.teacherDataForm.controls['email2'].disable();
    this.teacherDataForm.controls['telNumber'].disable();
    this.teacherDataForm.controls['university'].disable();
    this.teacherDataForm.controls['campus'].disable();


    console.log(JSON.stringify(this.teacherDataForm.value, null, 4));
    this.editing = false;

  }
  constructor(private formBuilder: FormBuilder, private activatedroute: ActivatedRoute, private router: Router) {
    this.activatedroute.params.subscribe(data => {

      console.log('La data que le llegó a student-profile es:' + data.id);
      this.teacherId = data.id;
    })


   }

  ngOnInit() {

    this.teacherDataForm = this.formBuilder.group({
      email1: new FormControl({value:'', disable: true},
      [Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
      email2: new FormControl({value:'', disable: true}, 
      [Validators.required, 
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
      telNumber: new FormControl({value:'', disable: true}, [Validators.required, Validators.minLength(8),Validators.pattern("^[0-9]*$")]),
      university: new FormControl({value:'', disable: true}, Validators.required),
      campus: new FormControl({value:'', disable: true}, Validators.required),
      
    });


    this.teacherBaseData = {type: 'Teacher', nombre: 'Liley', apellido: 'Cartin', id: '201098756', activo: 'Activo'};




    this.teacherDataForm.setValue({
      email1: 'liley1@gmail.com', email2: 'liley2@gmail.com', telNumber: '88764536',
      university: 'X-TEC', campus: 'San Jose'
    });


    this.teacherDataForm.controls['email1'].disable();
    this.teacherDataForm.controls['email2'].disable();
    this.teacherDataForm.controls['telNumber'].disable();
    this.teacherDataForm.controls['university'].disable();
    this.teacherDataForm.controls['campus'].disable();


  }
  changeEditingStatus() {

    this.editing = true;

  }

  onDismiss(){
    this.teacherDataForm.controls['email1'].disable();
    this.teacherDataForm.controls['email2'].disable();
    this.teacherDataForm.controls['telNumber'].disable();
    this.teacherDataForm.controls['university'].disable();
    this.teacherDataForm.controls['campus'].disable();
    this.editing = false;
  }

  get email1() { return this.teacherDataForm.get('email1'); }
  get email2() { return this.teacherDataForm.get('email2'); }
  get telNumber() { return this.teacherDataForm.get('telNumber'); }
  get university() { return this.teacherDataForm.get('university'); }
  get campus() { return this.teacherDataForm.get('campus'); }



}
