import { Component, OnInit } from '@angular/core';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'app-cartdetails',
  templateUrl: './cartdetails.component.html',
  styleUrls: ['./cartdetails.component.css']
})
export class CartdetailsComponent implements OnInit {
  cartPending:any;
  cartd:any;
  orderD:any;
  constructor( private service : MenuService) { }

  ngOnInit(): void {
    this.getCartDetailsByUser();
  }

  getCartDetailsByUser()
  {
    debugger;
    this.service.getCartDetails().subscribe((data)=>
    {
      this.cartPending = data;

      var email = localStorage.getItem("email");
      this.cartd = this.cartPending.filter(((x: { status: string; email: string | null; })=>x.status == "Delivery Pending" && x.email == email));
      this.orderD = this.cartd[0];
      
    });
  }


}
