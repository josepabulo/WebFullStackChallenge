import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CONSTANT_URL } from 'src/app/constant/constant-rest';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  URL = CONSTANT_URL.BASE_URL + CONSTANT_URL.CATEGORY;

  constructor(public http: HttpClient) {}

  public getAll() {
    return this.http.get(this.URL);
  }

  public getOne(id: any) {
    const url = this.URL + id;
    return this.http.get(url);
  }

  public save(data: any) {
    const url = this.URL;
    let aux = JSON.parse('{"name":"' + data.name + '"}');
    return this.http.post(url, aux);
  }

  public update(id: number, data: any) {
    const url = this.URL + id;
    console.log(data);
    return this.http.put(url, data);
  }

  public delete(id: any) {
    const url = this.URL + id;
    return this.http.delete(url);
  }
}
