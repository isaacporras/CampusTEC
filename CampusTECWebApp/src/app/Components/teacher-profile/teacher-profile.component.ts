import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';



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

  teacherBaseData: any;

  teacherDataForm: FormGroup;

  teacherClasses: any = [
    {
      id: '1', nombre: 'Circuitos en Corriente continua'
    },
    {
      id: '2', nombre: 'Circuitos en Corriente alterna'
    },
    {
      id: '3', nombre: 'Matematica'
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

  onSave() {

    this.teacherDataForm.controls['email1'].disable();
    this.teacherDataForm.controls['email2'].disable();
    this.teacherDataForm.controls['telNumber'].disable();
    this.teacherDataForm.controls['university'].disable();
    this.teacherDataForm.controls['campus'].disable();


    console.log(JSON.stringify(this.teacherDataForm.value, null, 4));
    this.editing = false;

  }
  constructor(private formBuilder: FormBuilder) { }

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


    this.teacherBaseData = {type: 'Eteacher', nombre: 'Oscar', apellido: 'Porras', id: '2017107550', activo: 'Activo'};




    this.teacherDataForm.setValue({
      email1: 'imanoisaaac1@gmail.com', email2: 'imanoisaaac23@gmail.com', telNumber: '82837462',
      university: 'X-TEC', campus: 'Cartago'
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