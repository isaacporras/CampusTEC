import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit {

  email1Disable: boolean = true;
  email2Disable: boolean = true;
  telNumberDisable: boolean = true;
  universityDisable: boolean = true;
  campusDisable: boolean = true;
  editing: boolean = false;

  studentBaseData: any;

  studentDataForm: FormGroup;

  studentClasses: any = [
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
      this.studentDataForm.controls['email1'].enable();

    }
    else if (id == 2) {
      this.studentDataForm.controls['email2'].enable();
    }

    else if (id == 3) {
      this.studentDataForm.controls['telNumber'].enable();
    }
    else if (id == 4) {
      this.studentDataForm.controls['university'].enable();
    }
    else if (id == 5) {
      this.studentDataForm.controls['campus'].enable();
    }
  }

  onSave() {

    this.studentDataForm.controls['email1'].disable();
    this.studentDataForm.controls['email2'].disable();
    this.studentDataForm.controls['telNumber'].disable();
    this.studentDataForm.controls['university'].disable();
    this.studentDataForm.controls['campus'].disable();


    console.log(JSON.stringify(this.studentDataForm.value, null, 4));
    this.editing = false;

  }
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.studentDataForm = this.formBuilder.group({
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


    this.studentBaseData = {type: 'Estudent', nombre: 'Oscar', apellido: 'Porras', id: '2017107550', activo: 'Activo'};




    this.studentDataForm.setValue({
      email1: 'imanoisaaac1@gmail.com', email2: 'imanoisaaac23@gmail.com', telNumber: '82837462',
      university: 'X-TEC', campus: 'Cartago'
    });


    this.studentDataForm.controls['email1'].disable();
    this.studentDataForm.controls['email2'].disable();
    this.studentDataForm.controls['telNumber'].disable();
    this.studentDataForm.controls['university'].disable();
    this.studentDataForm.controls['campus'].disable();


  }
  changeEditingStatus() {

    this.editing = true;

  }

  onDismiss(){
    this.studentDataForm.controls['email1'].disable();
    this.studentDataForm.controls['email2'].disable();
    this.studentDataForm.controls['telNumber'].disable();
    this.studentDataForm.controls['university'].disable();
    this.studentDataForm.controls['campus'].disable();
    this.editing = false;
  }

  get email1() { return this.studentDataForm.get('email1'); }
  get email2() { return this.studentDataForm.get('email2'); }
  get telNumber() { return this.studentDataForm.get('telNumber'); }
  get university() { return this.studentDataForm.get('university'); }
  get campus() { return this.studentDataForm.get('campus'); }



}
