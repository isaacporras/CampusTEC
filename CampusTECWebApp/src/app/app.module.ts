import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { StudentProfileComponent } from './Components/student-profile/student-profile.component';
import { TeacherProfileComponent } from './Components/teacher-profile/teacher-profile.component';
import { ClassesComponent } from './Components/classes/classes.component';
import { MatTreeModule, MatIconModule, MatButtonModule } from '@angular/material';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StudentProfileComponent,
    TeacherProfileComponent,
    ClassesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
    BrowserAnimationsModule,

    RouterModule.forRoot([
      {
        path: '',
        component: LoginComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'studentProfile',
        component: StudentProfileComponent
      },
      {
        path: 'teacherProfile',
        component: TeacherProfileComponent
      },
      {
        path: 'classes',
        component: ClassesComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
