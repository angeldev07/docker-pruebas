import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ItemService } from './items.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [AsyncPipe],
  template: `
    <main>
      <section>
        <h1>List</h1>
        <ul>
          @for (item of items | async; track $index) {
            <li>
              {{ item.title }}
              <img [src]="item.image" alt="item.title" width="50px" height="50px">
            </li>
          }
        </ul>
      </section>
    </main>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent {

  items = this.itemsService.getItems()

  constructor(private itemsService: ItemService) { }



}
