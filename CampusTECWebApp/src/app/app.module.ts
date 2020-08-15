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
import { MatTreeModule} from '@angular/material/tree';
import { MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { ObjectiveComponent } from './Components/classes/objective/objective.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { ActivitiesComponent } from './Components/classes/activities/activities.component';
import { ChallengeComponent } from './Components/classes/challenge/challenge.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StudentProfileComponent,
    TeacherProfileComponent,
    ClassesComponent,
    ObjectiveComponent,
    ActivitiesComponent,
    ChallengeComponent,
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
    MatDialogModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
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
  bootstrap: [AppComponent],
  entryComponents: [ObjectiveComponent]
})
export class AppModule { }
