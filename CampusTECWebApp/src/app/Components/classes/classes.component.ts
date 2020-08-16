import { Component, OnInit } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ObjectiveComponent } from './objective/objective.component';
import { ClassesService } from './classesService/classes.service';
import { ActivitiesComponent } from './activities/activities.component';
import { ChallengeComponent } from './challenge/challenge.component';
import { TreeDataNodeFlattener } from '@angular/cdk/collections';
import {ViewActivityComponent} from './viewOnly/view-activity/view-activity.component';
import {ViewChallengeComponent} from './viewOnly/view-challenge/view-challenge.component';



interface FoodNode {
  name: string;
  id: number;
  children?: FoodNode[];
}

var TREE_DATA: FoodNode[] = [
  {
    name: 'Ir a todas las tutorias',
    id: 1,
    children: [
      { name: 'Hacer tutoria 1', id: 1 },
      { name: 'Hacer tutoria 2', id: 2 },
      { name: 'Hacer tutoria 3', id: 3 },
    ]
  }, {
    name: 'Completar todas las asignaciones',
    id: 2,
    children: [
      { name: 'Hacer tarea 1', id: 4 },
      { name: 'Hacer tarea 2', id: 5 },
      { name: 'Hacer tarea 3', id: 6 },
    ]
  },
  {
    name: 'Hacer ejercicio todos los dias',
    id: 3,
    children: [
      { name: 'Hacer ejercicio el lunes', id: 7 },
      { name: 'Hacer ejercicio el lunes', id: 8 },
      { name: 'Hacer ejercicio el lunes', id: 9 },
    ]
  }
];




/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  id: number;
  level: number;
}



@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})




export class ClassesComponent implements OnInit {
  challenges_activities: any;
  classData: any;
  activities: any;
  objectives: any;
  TREE_DATA: Array<FoodNode>;


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





  getActivity_Challenge(id: string) {
    const resultado = this.challenges_activities.find(element => element.id === id);
    return resultado.name;
  }




  onCreateObjective() {
    const classData = new MatDialogConfig();

    classData.disableClose = true;
    classData.autoFocus = true;

    classData.data = {id: this.classData.id, cameFrom : 'classes'};
    

    this.dialog.open(ObjectiveComponent, classData);
  }

  onCreateActivity() {
    const classData = new MatDialogConfig();

    classData.disableClose = true;
    classData.autoFocus = true;
    classData.height = '700px';
    classData.width = '600px';

    classData.data = this.classData.id;

    this.dialog.open(ActivitiesComponent, classData);
  }

  onCreateChallenge(){
    const classData = new MatDialogConfig();

    classData.disableClose = true;
    classData.autoFocus = true;
    classData.height = '700px';
    classData.width = '600px';

    classData.data = this.classData.id;

    this.dialog.open(ChallengeComponent, classData);
  }




  constructor(
    private dialog: MatDialog, private http: ClassesService
  ) {

    this.dataSource.data = TREE_DATA;
  }

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

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
  ngOnInit() {


   this.TREE_DATA = this.http.getActivitiesAndChallenges();


    this.classData = this.http.getClassBaseData();

    this.activities = this.http.getActivities();

    this.objectives = this.http.getObjectives();
  }

}
