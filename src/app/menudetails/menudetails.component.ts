import { DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
  quntity: String;  
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
  Price:number=0;
displayDetails :any =[];
  totalPrice:number =0;

  constructor(private service:MenuService,private router:ActivatedRoute, private httpClient: HttpClient, private ser : LoginService, private route:Router ) { }
  
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
        this.products=data;

        this.finalproduct = this.products.filter((x: { category: any; })=> x.category == this.ProductTitleName);
        this.ItemDetails =this.finalproduct.find((a: { items: any; })=>a.items).items.filter((y: { itemName: any; })=>y.itemName == product);
        this.Subtotal = this.Subtotal +1;
        this.Totalprice = this.Totalprice + this.ItemDetails[0].price;

        var jsonData ={
          email:"",
          id:this.ItemDetails[0].id,
          itemName: this.ItemDetails[0].itemName,
          price : this.ItemDetails[0].price,
          quntity: 1,
          status:"pending"
        }
        
    this.itemDisplay.push(jsonData);
    this.service.postCartsDetaild(jsonData).subscribe((data)=>{
      debugger;
     console.log(data);
    });

  });
       
  }

  ContinueAddCart()
  {
    this.emailId = localStorage.getItem('email');
    if(this.emailId != "" && this.emailId != null)
    {
     this.isUserLoggedIn= true;
    }
    else
    {
      this.route.navigate(["login"]);
    }
  }
  increase_quantity(temp_package:any){
    debugger;
    if(temp_package.limit == temp_package.quantity){
      return alert("Can't add more")
    }else{
      temp_package.quantity++
      this.Price += temp_package.price
    }
  }

  decrease_quantity(temp_package:any){
    debugger;
      if(temp_package.quantity == 0){
        return alert("can't be in minus")
      }
      temp_package.quantity--
      this.Price -= temp_package.price
  }
  countPrice(a:any){
    debugger;
     this.Price = 0;
      for(let p of this.itemDisplay){
        this.Price += p.price*p.quantity
      }
  }
}