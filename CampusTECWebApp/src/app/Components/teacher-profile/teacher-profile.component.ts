import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { HttpServicesService } from '../../Services/http-services.service';
import { AngularFireStorage } from '@angular/fire/storage';

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
  teacherId: any;

  teacherBaseData: any;

  teacherDataForm: FormGroup;

  teacherClasses: Array<any>;

  fileChangedEvent: Event;
  wasFileUploaded: boolean;

  uploadProfileFile(e) {
    console.log('subir', e)
    this.fileChangedEvent = e.target.files[0];
    this.wasFileUploaded = true;
    this.editing = true;
  }


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
    if (this.wasFileUploaded) {
      console.log('Se va a hacer una carga de foto de perfil')
      //Se hace la carga del archivo //
      const id = Math.random().toString(36).substring(2);
      const file = this.fileChangedEvent;
      const filepath = `profilePictures/activity_${id}`;
      const reference = this.storage.ref(filepath);
      const task = this.storage.upload(filepath, file).then(rst => {
        rst.ref.getDownloadURL().then(url => {

          this.teacherDataForm.get('ppurl').setValue(url);
          console.log(this.teacherBaseData.value);


          console.log(JSON.stringify(this.teacherDataForm.value, null, 4));

          this.editing = false;


          this.sendNewData();

        });
      });
    }
    else {
      this.sendNewData();
    }
  }
  sendNewData() {
    this.http.postUpdateProfile(this.teacherDataForm.value).subscribe((data) => {
      var jsonResponse = JSON.parse(JSON.stringify(data));
      console.log(jsonResponse.status);
      if (jsonResponse.status == 1) {
        alert('Se actualizó correctamente la información');
        window.location.reload();
      }
      else {
        console.log("Carné o contraseña incorrectos")
        alert('Ocurrio un error al actualizar la información.')
      }
    }, (error) => {
      console.log(error);
    });
  }


  constructor(private http: HttpServicesService,
    private formBuilder: FormBuilder,
    private activatedroute: ActivatedRoute,
    private router: Router,
    private storage: AngularFireStorage,) {
    this.activatedroute.params.subscribe(data => {

      console.log('La data que le llegó a student-profile es:' + data.id);
      this.teacherId = data.id;
    });


  }

  ngOnInit() {

    this.teacherDataForm = this.formBuilder.group({
      token: new FormControl(this.teacherId),
      name: new FormControl(''),
      lastname: new FormControl(''),
      id: new FormControl(''),
      status: new FormControl(''),
      ppurl: new FormControl(''),
      tecolones: new FormControl(''),
      email1: new FormControl({ value: '', disable: true },
        [Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
      email2: new FormControl({ value: '', disable: true },
        [Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
      telNumber: new FormControl({ value: '', disable: true }, [Validators.required, Validators.minLength(8), Validators.pattern("^[0-9]*$")]),
      university: new FormControl({ value: '', disable: true }, Validators.required),
      campus: new FormControl({ value: '', disable: true }, Validators.required),

    });


    this.http.getProfile(this.teacherId).subscribe((data) => {
      console.log(data);
      this.teacherBaseData = data;

      if (this.teacherBaseData.status === '1') {
        this.teacherBaseData.status = 'Activo';
      }
      else if (this.teacherBaseData.status === '0') {
        this.teacherBaseData.status = 'Inactivo';
      }
      this.teacherDataForm.controls['name'].setValue(data['name']);
      this.teacherDataForm.controls['lastname'].setValue(data['lastname']);
      this.teacherDataForm.controls['id'].setValue(data['id']);
      this.teacherDataForm.controls['status'].setValue(data['status']);
      this.teacherDataForm.controls['ppurl'].setValue(data['ppurl']);
      this.teacherDataForm.controls['tecolones'].setValue(data['tecolones']);
      this.teacherDataForm.controls['email1'].setValue(data['email1']);
      this.teacherDataForm.controls['email2'].setValue(data['email2']);
      this.teacherDataForm.controls['telNumber'].setValue(data['telNumber']);
      this.teacherDataForm.controls['university'].setValue(data['university']);
      this.teacherDataForm.controls['campus'].setValue(data['campus']);

      console.log(data["classes"])

      this.teacherClasses = data["classes"];
    });









  }
  changeEditingStatus() {

    this.editing = true;

  }

  onDismiss() {
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
  get name() { return this.teacherDataForm.get('name'); }
  get lastname() { return this.teacherDataForm.get('lastname'); }
  get ppurl() { return this.teacherDataForm.get('ppurl'); }
}
