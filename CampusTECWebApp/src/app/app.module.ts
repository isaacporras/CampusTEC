import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { StudentProfileComponent } from './Components/student-profile/student-profile.component';
import { TeacherProfileComponent } from './Components/teacher-profile/teacher-profile.component';
import { ClassesComponent } from './Components/classes/classes.component';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ObjectiveComponent } from './Components/classes/objective/objective.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivitiesComponent } from './Components/classes/activities/activities.component';
import { ChallengeComponent } from './Components/classes/challenge/challenge.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';


import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../environments/environment';
import { PlannerComponent } from './Components/planner/planner.component';
import { ViewActivityComponent } from './Components/classes/viewOnly/view-activity/view-activity.component';
import { ViewChallengeComponent } from './Components/classes/viewOnly/view-challenge/view-challenge.component';
import { TaskComponent } from './Components/planner/task/task.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TecolonesConfigComponent } from './Components/admin/tecolones-config/tecolones-config.component';
import { TaskviewComponent } from './Components/planner/taskview/taskview.component';



registerLocaleData(localeEs);

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
    PlannerComponent,
    ViewActivityComponent,
    ViewChallengeComponent,
    TaskComponent,
    TecolonesConfigComponent,
    TaskviewComponent,

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
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
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
        path: 'studentProfile/:id',
        component: StudentProfileComponent
      },
      {
        path: 'teacherProfile/:id',
        component: TeacherProfileComponent
      },
      {
        path: 'classes/:id/:teacherId',
        component: ClassesComponent
      },
      {
        path: 'planner/:id',
        component: PlannerComponent
      },
      {
        path: 'admin',
        component: TecolonesConfigComponent
      }
    ]),
    NgbModule
  ],
  providers: [AngularFireAuth, AngularFirestore],
  bootstrap: [AppComponent],
  entryComponents: [ObjectiveComponent, ViewActivityComponent, ViewChallengeComponent, TaskviewComponent]
})
export class AppModule { }
