import { Component, inject, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

interface Item {
  id: number,
  name: string
  price: number,
  quantity:  number,
  total: number,
  created_at:  string,
}

interface state {
  loading: boolean,
  data: Item[],
  error: boolean
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [  RouterOutlet, JsonPipe, ReactiveFormsModule],
  template: `

    <h1>Lista de items</h1>

    <!-- formulario -->
    <div>
      <form [formGroup]="itemForm" (ngSubmit)="submit()" >
        <div>
          <label for="">nombre</label>
          <input type="text" placeholder="Nombre del item" formControlName="name" />
        </div>
        <div>
          <label for="">precio</label>
          <input type="number" placeholder="Precio" formControlName="price" />
        </div>
        <div>
          <label for="">cantidad</label>
          <input type="number" placeholder="Cantidad" formControlName="quantity" />
        </div>
        <button type="submit">Agregar</button>
      </form>

    </div>

    @if (items().loading) {
      <p>Cargando...</p>
    } @else if (items().error) {
      <p>Error al cargar los items</p>
    } @else {
      <ul>
        @for (item of items().data; track $index) {
          <li>{{ item.name }} - $ {{ item.price }}</li>
        }
      </ul>
    }
  `,
  styles: [],
})
export class AppComponent {

  http = inject(HttpClient);
  fb = inject(FormBuilder)

  itemForm = this.fb.group({
    name: '',
    price: 0,
    quantity: 0
  })

  items = signal<state>({
    loading: true,
    data: [],
    error: false
  })

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.http.get<Item[]>('http://localhost:8000/items/listar-items').subscribe({
      next: (data) => {
        this.items.set({
          loading: false,
          data: data,
          error: false
        })
      },
      error: (error) => {
        this.items.set({
          loading: false,
          data: [],
          error: true
        })
      }
    })
  }
  
  submit(){ 

    const data = this.itemForm.value

    const formData = {
      name: data.name,
      price: data.price,
      quantity: data.quantity,
      total: data.price! * data.quantity!,
      id: -1
    }

    this.http.post<Item>('http://localhost:8000/items/crear-items', formData).subscribe({
      next: (data: Item) => {
        this.items.update(state => ({...state, data: [...state.data, data]}))
      },
      error: (error) => {
        this.items.set({
          loading: false,
          data: [],
          error: true
        })
      }
    })
  }

}
