import { Component,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import {
  startOfWeek,
  addDays,
  addHours,
} from 'date-fns';
import { Subject } from 'rxjs';
import {
  CalendarEvent,
  CalendarEventAction,
} from 'angular-calendar';
import {HttpServicesService} from "../../Services/http-services.service";


import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {ViewActivityComponent} from '../classes/viewOnly/view-activity/view-activity.component';
import {ViewChallengeComponent} from '../classes/viewOnly/view-challenge/view-challenge.component';
import { TaskComponent } from './task/task.component';

import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';

const colors: any = {
  green: {
    primary: '#1e90ff',
    secondary: '#B2FFB2',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
};


interface FoodNode {
  name: string;
  id: number;
  newComments: boolean;
  children?: FoodNode[];
}

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  id: number;
  newComments: boolean;
  level: number;
}



@Component({
  selector: 'app-planner',
  changeDetection: ChangeDetectionStrategy.Default,
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.css'],
})
export class PlannerComponent implements OnInit {
  studentId: any;
  challengesSources: Array<any> = [];
  activities: Array<any>;
  locale: string = 'es';
  viewDate: Date = new Date();
  showMarker = false;
  weekStart: Date = startOfWeek(this.viewDate);
  receivedEvents;
  week = 1;
  TREE_DATA: FoodNode[];

  modalData: {
    action: string;
    event: CalendarEvent;
  };


  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      id: node.id,
      newComments: node.newComments,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);
  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.children);

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [];

  constructor(private http: HttpServicesService, private dialog: MatDialog, private activatedroute: ActivatedRoute, private router: Router) {
    this.activatedroute.params.subscribe(data => {
      this.studentId = data.id;
    })
  }

  viewAssignment(id: number){
    const classData = new MatDialogConfig();

    classData.disableClose = true;
    classData.autoFocus = true;
    classData.height = '700px';
    classData.width = '600px';

    classData.data ={studentId: id};
    console.log('En ventana principal el id es de:')

    this.dialog.open(TaskComponent, classData);
  }

  updateAssignments(): void {
    this.events = [];
    this.http.getAssignments(this.studentId, this.week).subscribe((data) => {
      var jsonResponse = JSON.parse(JSON.stringify(data))['treeview'];
      jsonResponse.forEach(value => {
        console.log("Processing event");
        console.log(value);
        let event = addHours(addDays(this.weekStart, value.day), value.time);
        let color;
        if(value.done == true){
          color = colors.green;
        }else{
          color = colors.green;
        }
        let newEvent = {
          id: value.id,
          title: value.name,
          start: event,
          end: addHours(event, 1),
          color: color,
        };
        console.log(newEvent);
        this.events = [...this.events, newEvent];
      })
    }, (error) => {
      console.log(error);
    });
  }

  addTask(id) {

    const classData = new MatDialogConfig();

    classData.disableClose = true;
    classData.autoFocus = true;
    classData.height = '700px';
    classData.width = '600px';

    classData.data ={studentId: this.studentId};
    console.log('En ventana principal el id es de:')

    this.dialog.open(TaskComponent, classData);
  }

  lastWeek(): void{
    if(this.week > 1){
      this.week -= 1;
    }else{
      this.week = 1;
    }
    this.updateAssignments();
    this.refresh.next();
    this.updateChallenges();
    this.updateActivities();
  }

  nextWeek(): void{
    if(this.week < 16){
      this.week += 1;
    }else{
      this.week = 16;
    }
    this.updateAssignments();
    this.refresh.next();
    this.updateChallenges();
    this.updateActivities();
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  viewChallenge(id: number) {
    console.log('Es un reto');
    console.log(id);
    console.log(id);
    const classData = new MatDialogConfig();

    classData.disableClose = true;
    classData.autoFocus = true;
    classData.height = '700px';
    classData.width = '600px';

    classData.data = id;
    console.log('En ventana principal el id es de:')
    console.log(id);

    this.dialog.open(ViewChallengeComponent, classData);

  }
  viewActivity(id: number) {
    console.log('Es una actividad');
    console.log(id);
    console.log(id);
    const classData = new MatDialogConfig();

    classData.disableClose = true;
    classData.autoFocus = true;
    classData.height = '700px';
    classData.width = '600px';

    classData.data = id;
    console.log('En ventana principal el id es de:')
    console.log(id);

    this.dialog.open(ViewActivityComponent, classData);
  }

  updateChallenges(): void {
    let challenges;
    this.challengesSources = [];
    this.http.getChallenges(this.studentId).subscribe((data) => {
      var jsonResponse = JSON.parse(JSON.stringify(data));
      challenges = jsonResponse.treeview;
      challenges.forEach((value) => {
        let course = Array<any>();
        course["name"] = value["name"];
        course["dataSource"] = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
        course["dataSource"].data = value["children"];
        this.challengesSources.push(course);
      });
    }, (error) => {
      console.log(error);
    });
  }

  updateActivities(): void {
    this.http.getActivities(this.studentId, this.week).subscribe((data) =>{
      var jsonResponse = JSON.parse(JSON.stringify(data));
      this.activities = jsonResponse.treeview;
    })

  }

  ngOnInit(): void {
    this.updateAssignments();
    this.refresh.next();
    this.updateChallenges();
    this.updateActivities();
  }
}
