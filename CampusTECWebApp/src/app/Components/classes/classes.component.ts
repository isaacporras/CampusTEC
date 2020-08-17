import { Component, OnInit } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ObjectiveComponent } from './objective/objective.component';
import { ClassesService } from './classesService/classes.service';
import { ActivitiesComponent } from './activities/activities.component';
import { ChallengeComponent } from './challenge/challenge.component';
import { TreeDataNodeFlattener } from '@angular/cdk/collections';
import { ViewActivityComponent } from './viewOnly/view-activity/view-activity.component';
import { ViewChallengeComponent } from './viewOnly/view-challenge/view-challenge.component';

import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { timer } from 'rxjs';
import { take } from 'rxjs/operators';

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
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})




export class ClassesComponent implements OnInit {
  challenges_activities: any;
  classData: any;
  activities: any;
  objectives: any;
  TREE_DATA: FoodNode[];
  teacherId: any;
  classId: any;


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

    classData.data = { id: this.classData.id, cameFrom: 'classes' };

    this.dialog.open(ObjectiveComponent, classData).afterClosed().subscribe(
      data => {console.log("La data recibida en el class de objetivo es:", data);
      if (data === 0){
        window.location.reload()
      }
    }
  );    

    
  }


  reloadPage(){

  }

  onCreateActivity() {
    const classData = new MatDialogConfig();

    classData.disableClose = true;
    classData.autoFocus = true;
    classData.height = '700px';
    classData.width = '600px';

    classData.data = this.classData.id;

    this.dialog.open(ActivitiesComponent, classData).afterClosed().subscribe(
      data => {console.log("La data recibida en el class de objetivo es:", data);
      if (data.status === 0){
        window.location.reload()
      }
    }
  );    
  }

  onCreateChallenge() {
    const classData = new MatDialogConfig();

    classData.disableClose = true;
    classData.autoFocus = true;
    classData.height = '500px';
    classData.width = '600px';

    classData.data = this.classData.id;

    this.dialog.open(ChallengeComponent, classData);
  }




  constructor(
    private dialog: MatDialog, private http: ClassesService, private activatedroute: ActivatedRoute, private router: Router
  ) {



    this.activatedroute.params.subscribe(data => {

      console.log('La data que le llegó a classes es:' + data.id);
      this.classId = data.id;
      this.teacherId = data.teacherId;
    });

    console.log('Los challenges son:');
    this.http.getActivitiesAndChallenges(this.classId).subscribe((data) => {
      var jsonResponse = JSON.parse(JSON.stringify(data));
      console.log(jsonResponse);
      this.TREE_DATA = jsonResponse.treeview;
      this.dataSource.data = this.TREE_DATA;
    }, (error) => {
      console.log(error);
    });

    this.http.getActivities(this.classId).subscribe((data) => {
      var jsonResponse = JSON.parse(JSON.stringify(data));
      console.log(jsonResponse);
      this.activities = jsonResponse.treeview;

    }, (error) => {
      console.log(error);
    });


    this.http.getObjectives(this.classId).subscribe((data) => {
      var jsonResponse = JSON.parse(JSON.stringify(data));
      console.log(jsonResponse);
      this.objectives = jsonResponse.treeview;

    }, (error) => {
      console.log(error);
    });

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
    classData.width = '650px';

    classData.data = id;
    console.log('En ventana principal el id es de:')
    console.log(id);

    this.dialog.open(ViewActivityComponent, classData);
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
  ngOnInit() {


    this.TREE_DATA = this.http.getActivitiesAndChallenges(this.classId)['treeview'];


    this.classData = this.http.getClassBaseData(this.classId).subscribe((data) => {
      var jsonResponse = JSON.parse(JSON.stringify(data));
      console.log(jsonResponse);
      this.classData = jsonResponse;

    }, (error) => {
      console.log(error);
    });
    

    //this.activities = this.http.getActivities();

    //this.objectives = this.http.getObjectives();
  }

}
