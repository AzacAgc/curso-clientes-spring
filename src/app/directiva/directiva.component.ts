import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html'
})
export class DirectivaComponent implements OnInit {

  listaCurso: string[] = ['Typescript', 'JavaScript', 'Java SE'];

  constructor() { }

  ngOnInit() {
  }

}
