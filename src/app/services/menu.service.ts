import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private client:HttpClient) { }

  getProduct()
  {
    return this.client.get("http://localhost:3000/menus");
  }

  postCartsDetaild(body:any)
  {
    debugger;
    return this.client.post("http://localhost:3000/carts",body);
  }

  getCartDetails()
  {
    return this.client.get("http://localhost:3000/carts");
  }

}
