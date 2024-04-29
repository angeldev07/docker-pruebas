import { Component } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {  ItemService } from './components/list/items.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [  RouterOutlet, JsonPipe],
  template: `
    <h1>Welcome to {{title}}!</h1>

    <input type="file" (change)="change($event)">

    <div>File : {{ file?.name}}</div>

    <div>
      <button (click)="send()">Enviar</button>
    </div>

    <router-outlet></router-outlet>
  `,
  styles: [],
})
export class AppComponent {
  title = 'Documentos app in Angular 17';

  file:File | null | undefined;
  constructor(
    private itemsService: ItemService
  ) { }

  change(event: any){
    this.file = event.target.files[0]
  }

  send(){
    console.log(this.file)
  }

}
