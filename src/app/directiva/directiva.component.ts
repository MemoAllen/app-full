import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html',
})
export class DirectivaComponent {


  listaCurso:String[]=['Typescript', 'Javascript', 'Java', 'Phyton', 'Dart'];
  constructor() { }
habilitar:boolean=true;

setHabilitar():void{
  this.habilitar = (this.habilitar==true)? false:true;
}
}
