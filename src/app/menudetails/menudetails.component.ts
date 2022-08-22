import { DecimalPipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuService } from '../services/menu.service';
import { HttpClient } from '@angular/common/http';
import $ from 'jquery';
import { LoginService } from '../services/login.service';

interface CartInfo { 
  email:string; 
  id: Number;  
  itemName: String;  
  price:Number;
  totalPrice: number;
  quntity: String;
  vegan:string;  
  status:string;
}  

@Component({
  selector: 'app-menudetails',
  templateUrl: './menudetails.component.html',
  styleUrls: ['./menudetails.component.css']
})
export class MenudetailsComponent implements OnInit {
  public isCollapsed = false;  
  products:any=[];
  finalproduct:any;
  menulist:any;
  MenulistDetails:any=[];
  ProductTitleName: any;
  Totalprice:number=0;
  productname:any;
  ItemDetails:any=[];
  Subtotal:number=0;
  emailId:any="";
  isUserLoggedIn:boolean=false;
  itemDisplay:any=[];
  tPrice:number=0;
  displayDetails :any =[];
  totalPrice:number =0;
  qtytotal:any =0;
  Pendingstatus :string="";

  qty = [
    1,2,3,4,5,6,7,8,9,10
  ]
  selected = "  "
  

  constructor(private service:MenuService,private router:ActivatedRoute, private httpClient: HttpClient, private ser : LoginService, private route:Router ) { }
  @Output() inputDataChange: EventEmitter<any> = new EventEmitter();
  
    ngOnInit() {
      this.getMenuInfo();
      $( "#clickme" ).click(function() {
        $( "#collapseExample" ).toggle( "slow", function() {
          // Animation complete.
        });
      }); 
  }
  getMenuInfo()
  {
    debugger;
    var parameterData="";
    this.service.getProduct().subscribe((data)=>{
      this.products=data;
      this.router.params.subscribe((param)=>{
      this.menulist =this.products.map((item: { category: any; })=>item.category);
      if(this.menulist.includes(param['titlename'])){
      this.ProductTitleName=param['titlename'];
        for(var index = 0;  index<this.products.length; index++)
        {
          if(this.products[index].title=this.ProductTitleName)
          {
              this.finalproduct = this.products[index];
              if(this.ProductTitleName == this.finalproduct.category)
              {
                this.MenulistDetails = this.finalproduct.items;
              }
          }
        }
      }
      
    });
  });     
  }
  AddCart(product:any)
  {
      debugger;
      $("#cartdetails").removeAttr("style");
      $(".page-footer").css("display","none");
      var parameterData="";
      this.service.getProduct().subscribe((data)=>{
        this.tPrice = 0;
        this.qtytotal = 0;
        this.products=data;

        this.finalproduct = this.products.filter((x: { category: any; })=> x.category == this.ProductTitleName);
        this.ItemDetails =this.finalproduct.find((a: { items: any; })=>a.items).items.filter((y: { itemName: any; })=>y.itemName == product);
        this.Subtotal = this.Subtotal +1;
        this.Totalprice = this.Totalprice + this.ItemDetails[0].price;
        this.tPrice = this.Totalprice;
        var emailid = localStorage.getItem("email");
        debugger;
        if(emailid != null && emailid != "" && emailid != undefined)
        {
          this.Pendingstatus = "Delivery Pending";
        }
        else{
          this.Pendingstatus = "pending";
        }
        var jsonData ={
          email:emailid,
          id:this.ItemDetails[0].id,
          itemName: this.ItemDetails[0].itemName,
          price : this.ItemDetails[0].price,
          totalPrice: 0,
          quntity: 1,
          vegan:this.ItemDetails[0].vegan,
          status:this.Pendingstatus
        }
      this.itemDisplay.push(jsonData);
      this.service.postCartsDetaild(jsonData).subscribe((data)=>{
    });

  });     
  }

  update(e:any, a:any){
    debugger;
    this.selected = e.target.value;
    this.qtytotal=this.selected;
    
    this.tPrice = 0;
    this.tPrice += a.price* this.qtytotal

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
          totalPrice : this.tPrice,
          quntity: this.selected,
          vegan:a.vegan,
          status:this.Pendingstatus
      }

      this.service.cartDelete(a.id).subscribe((res)=>{
        this.service.postCartsDetaild(updateJsonData).subscribe((response)=>{
        });
      });

    });
 
  }

  DeleteCart(Id:string){
    this.service.cartDelete(Id)
    .subscribe(data=>{
      this.inputDataChange.emit(true); 
    })
  }

  ContinueAddCart()
  {
    this.emailId = localStorage.getItem('email');
    if(this.emailId != "" && this.emailId != null)
    {
     this.isUserLoggedIn= true;
     this.route.navigate(["checkout"]);
    }
    else
    {
      this.route.navigate(["login"]);
    }
  }
}