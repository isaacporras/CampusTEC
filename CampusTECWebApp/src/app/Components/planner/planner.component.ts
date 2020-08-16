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

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};


interface FoodNode {
  name: string;
  id: number;
  children?: FoodNode[];
}

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  id: number;
  level: number;
}



@Component({
  selector: 'app-planner',
  changeDetection: ChangeDetectionStrategy.Default,
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.css'],
})
export class PlannerComponent implements OnInit {

  classes: Array<any>;

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
      level: level,
    };
  }
  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);
  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.children);
  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);









  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [];

  constructor(private http: HttpServicesService, private dialog: MatDialog,) {


    this.TREE_DATA = this.http.getActivitiesAndChallenges();
    this.dataSource.data = this.TREE_DATA;
    console.log(this.TREE_DATA);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    // this.modal.open(this.modalContent, { size: 'lg' });
  }

  updateEvents(): void{
    let receivedEvents;
    this.http.getTareas(this.week).subscribe((data) => {
      var jsonResponse = JSON.parse(JSON.stringify(data));
      console.log(data);

      var event = addHours(addDays(this.weekStart, jsonResponse.days), jsonResponse.hours);
      console.log(event)
      this.events = [
        {
          title: jsonResponse.title,
          start: event,
          end: addHours(event, 1),
          color: colors.blue,
        }
      ];
    }, (error) => {
      console.log(error);
    });
  }

  lastWeek(): void{
    if(this.week > 1){
      this.week -= 1;
    }else{
      this.week = 1;
    }
  }

  nextWeek(): void{
    if(this.week < 16){
      this.week += 1;
    }else{
      this.week = 16;
    }
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

  ngOnInit(): void {

    this.TREE_DATA = this.http.getActivitiesAndChallenges();
    this.dataSource.data = this.TREE_DATA;
    this.updateEvents();
    this.refresh.next();
    this.classes = this.http.getClasses(); // = [1,2,3]
  }
}
