import { Component, OnInit } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ObjectiveComponent } from './objective/objective.component';
import {ClassesService} from './classesService/classes.service';

interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'R-1',
    children: [
      { name: 'A-1' },
      { name: 'A-2' },
      { name: 'A-3' },
    ]
  }, {
    name: 'R-2',
    children: [
      { name: 'A-4' },
      { name: 'A-5' },
      { name: 'A-6' },
    ]
  },
  {
    name: 'R-3',
    children: [
      { name: 'A-7' },
      { name: 'A-8' },
      { name: 'A-9' },
    ]
  }
];




/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
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




  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
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

    classData.data = 29;

    this.dialog.open(ObjectiveComponent, classData);
  }




  constructor(
    private dialog: MatDialog, private http: ClassesService
  ) {

    this.dataSource.data = TREE_DATA;
  }

  viewChallenge(id: string) {
    console.log('Es un reto');
    console.log(id);
  }
  viewActivity(id: string) {
    console.log('Es una actividad');
    console.log(id);
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
  ngOnInit() {



    this.challenges_activities = this.http.getActivitiesAndChallenges();

    this.classData = this.http.getClassBaseData();

    this.activities = this.http.getActivities();

    this.objectives =  this.http.getObjectives();
  }

}
