import { DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuService } from '../services/menu.service';
import { HttpClient } from '@angular/common/http';
import $ from 'jquery';

interface CartInfo { 
  email:string; 
  id: Number;  
  itemName: String;  
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


  constructor(private service:MenuService,private router:ActivatedRoute, private httpClient: HttpClient, ) { }
  
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
          for(var i = 0; i<this.products.length; i++){
            for(var index = 0; index<this.products[i].items.length; index++)
            {
              if(this.products[index].title=product)
              {
                  this.finalproduct = this.products[index].items;
                  for(var j=0; j<this.finalproduct.length; j++){
  
                    if(product == this.finalproduct[j].itemName)
                    {
                      this.ItemDetails = this.finalproduct[j];
                      
                      
                      break;
                    }
                  }
                  
              }
              break;
            }
          }

          this.Subtotal = this.Subtotal +1;
          this.Totalprice = this.Totalprice + this.ItemDetails.price;

          var jsonData ={
            email:"",
            id:this.ItemDetails.id,
            itemName: this.ItemDetails.itemName,
            quntity: this.ItemDetails.quantity,
            status:"pending"
          }
          // this.service.postCartsDetaild(jsonData).subscribe((data)=>{
          //   debugger;
          //  console.log(data);
          // })
        });
       
  }

  ContinueAddCart()
  {

  }
}
