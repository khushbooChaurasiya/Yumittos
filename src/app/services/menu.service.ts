import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private client:HttpClient) { }

  getProduct()
  {
    return this.client.get("http://localhost:3000/menus");
  }

  getCartDetails()
  {
    return this.client.get("http://localhost:3000/carts");
  }

  getCartDetailsById(Id:any)
  {
    return this.client.get("http://localhost:3000/carts",Id);
  }

  postCartsDetaild(body:any)
  {
    return this.client.post("http://localhost:3000/carts",body);
  }

  updateCartDetails(cartdata:any)
  {
    debugger;
    return this.client.put("http://localhost:3000/carts",cartdata);
  }

  // updateCartDetails(Carts: any): Observable<any> {

  //   return this.client.put("http://localhost:3000/carts/"+Carts)

  // }

  cartDelete (Id:String):Observable<number>{
    debugger;
    let httpheaders=new HttpHeaders()
    .set('Content-type','application/Json');
    let options={
      headers:httpheaders
    };
    return this.client.delete<number>("http://localhost:3000/carts/"+Id);
  }

 

}
