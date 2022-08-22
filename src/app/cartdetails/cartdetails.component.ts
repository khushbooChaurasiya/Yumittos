import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  subtotal:number=0;
  discount:number=20;
  offerprice:number=0;
  constructor( private service : MenuService) { }

  @Output() inputDataChange: EventEmitter<any> = new EventEmitter();

  ngOnInit(): void {
    this.getCartDetailsByUser();
    this.countsubtotal();
  }

  getCartDetailsByUser()
  {
    this.service.getCartDetails().subscribe((data)=>
    {
      this.cartPending = data;

      var email = localStorage.getItem("email");
      this.cartd = this.cartPending.filter(((x: { status: string; email: string | null; })=>x.status == "Delivery Pending" && x.email == email));
      this.orderD = this.cartd[0];
      
    });
  }

  countsubtotal()
  {
    debugger;
    this.service.getCartDetails().subscribe((data)=>
    {
      this.cartPending = data;

      var email = localStorage.getItem("email");
      this.cartd = this.cartPending.filter(((x: { status: string; email: string | null; })=>x.status == "Delivery Pending" && x.email == email));
      
      for(var i=0; i< this.cartd.length; i++)
      {
        this.subtotal += this.cartd[i].totalPrice; 
      }
      
    });
  }
  onDeleteCart(d:any)
  {
    debugger;
    this.service.cartDelete(d.id)
    .subscribe(data=>{
      this.inputDataChange.emit(true); 
      this.getCartDetailsByUser();
      this.countsubtotal();
    });
    
  }

}
