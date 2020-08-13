import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit {

  studentData:any=
    {
      type: 'Estudent', nombre: 'Oscar', apellido: 'Porras', id: '2017107550', activo: 'Activo',
      email1:'imanoisaaac1@gmail.com', email2: 'imanoisaaac23@gmail.com', numtelefono: '82837462',
      universidad:'X-TEC', sede: 'Cartago'
    };
    studentClasses:any=[
    {
      id: '1',nombre:'Circuitos en Corriente continua'
    },
    {
      id: '2',nombre:'Circuitos en Corriente alterna'
    },
    {
      id: '3',nombre:'Matematica'
    }
  
  ];
  constructor() { }

  ngOnInit() {
  }

}
