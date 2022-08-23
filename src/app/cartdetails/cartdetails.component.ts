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
  totalPrice: number=0;
  quntity:any;
  Pendingstatus:string="";

  qty = [
    1,2,3,4,5,6,7,8,9,10
  ]
  selected = "  "

  constructor( private service : MenuService) {
   }

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
    this.subtotal = 0;
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
    this.service.cartDelete(d.id)
    .subscribe(data=>{
      this.inputDataChange.emit(true); 
      this.getCartDetailsByUser();
      this.countsubtotal();
    });
    
  }

  update(e:any, a:any){
    this.selected = e.target.value;
    this.quntity=this.selected;
    
    this.totalPrice = 0;
    this.totalPrice += a.price* this.quntity

    this.service.getCartDetailsById(a.id).subscribe((data)=>{
      var emailid = localStorage.getItem("email");
      if(emailid != null && emailid != "" && emailid != undefined)
      {
        this.Pendingstatus = "Delivery Pending";
      }
      else{
        this.Pendingstatus = "pending";
      }
      var updateJsonData ={
          email:emailid,
          id:a.id,
          itemName: a.itemName,
          price : a.price,
          totalPrice : this.totalPrice,
          quntity: this.selected,
          vegan:a.vegan,
          status:this.Pendingstatus
      }

      this.service.cartDelete(a.id).subscribe((res)=>{
        this.service.postCartsDetaild(updateJsonData).subscribe((response)=>{
        });
      });

    });
    this.getCartDetailsByUser();
    this.inputDataChange.emit(true); 
    
  }

}
