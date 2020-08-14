import { Component, OnInit } from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {FlatTreeControl} from '@angular/cdk/tree';


interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Completar todas las asignaciones',
    children: [
      {name: 'Hacer tarea 1'},
      {name: 'Hacer tarea 2'},
      {name: 'Hacer tarea 3'},
    ]
  }, {
    name: 'Ir a todas las tutorias',
    children: [
      {name: 'Ir a la tutoria 1'},
      {name: 'Ir a la tutoria 2'},
      {name: 'Ir a la tutoria 3'},
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
  objectives: any = [
    {
      id: '1', description: 'Evaluar la conveniencia en el uso de un cierto método en lan solución de un problema numérico específico.'
    },
    {
      id: '2', description: 'Implementar programas de cálculo relacionado con los tópicos estudiados independientemente del lenguaje y de la plataforma computacional disponible.'
    },
    {
      id: '3', description: 'Aplicar conceptos de distintos paradigmas de programación en la solución de problemas numéricos'
    }

  ];




  constructor() { this.dataSource.data = TREE_DATA;}
  
  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
  ngOnInit() {
  }

}
