import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) { }

  getItems() {
    return this.http.get(`${environment.apiUrl}/send/list`).pipe(
      map((res:any) => {
        const urlFiles = ! environment.production ? environment.apiUrl : environment.filesUrl
        return res.map((item:any) => {
          return {
            ...item,
            title: item.name,
            image: `${urlFiles}${item.url}`
          }
        })
      })
    )
  }

  setItem(data: FormData){
    return this.http.post(`${environment.apiUrl}/send/`, data)
  }
}
