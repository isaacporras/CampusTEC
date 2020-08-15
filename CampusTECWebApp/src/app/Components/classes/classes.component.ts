import { Component, OnInit } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ObjectiveComponent } from './objective/objective.component';


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

  studentClasses: any = [
    {
      id: '1', nombre: 'Circuitos en Corriente continua'
    },
    {
      id: '2', nombre: 'Circuitos en Corriente alterna'
    },
    {
      id: '3', nombre: 'Matematica'
    }
  ];



  objectives: any = [
    {
      id: '1', description: 'Evaluar la conveniencia en el uso de un cierto método en lan solución de un problema numérico específico.'
    },
    {
      id: '2',
      description: 'Implementar programas de cálculo relacionado con los tópicos estudiados independientemente del lenguaje y de la plataforma computacional disponible.'
    },
    {
      id: '3', description: 'Aplicar conceptos de distintos paradigmas de programación en la solución de problemas numéricos'
    }

  ];



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
    private dialog: MatDialog
  ) {

    this.dataSource.data = TREE_DATA;
  }

  viewNode(id: string) {
    console.log(id);
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
  ngOnInit() {

    this.challenges_activities = [
      {
        id: 'A-1', name: 'Hacer tutoria 1'
      },
      {
        id: 'A-2', name: 'Hacer tutoria 2'
      },

      {
        id: 'A-3', name: 'Hacer tutoria 3'
      },
      {
        id: 'A-4', name: 'Hacer tutoria 4'
      },
      {
        id: 'A-5', name: 'Hacer tarea 1'
      },
      {
        id: 'A-6', name: 'Hacer tarea 2'
      },
      {
        id: 'A-7', name: 'Hacer tarea 3'
      },
      {
        id: 'A-8', name: 'Hacer tarea 4'
      },
      {
        id: 'R-1', name: 'Ir a todas las tutorias'
      },
      {
        id: 'R-2', name: 'Completar todas las asignaciones'
      }
    ];


    this.classData = {
      id: 1,
      name: 'Analisis Numerico para ingeniería',
      group: 5
    };

    this.activities = [
      {
        id: '1', name: 'Hacer tutoria 1'
      },
      {
        id: '2', name: 'Hacer tutoria 2'
      },
  
      {
        id: '3', name: 'Hacer tutoria 3'
      },
      {
        id: '4', name: 'Hacer tutoria 4'
      },
    ];
  }

}
