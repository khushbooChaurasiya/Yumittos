import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'app-food-details',
  templateUrl: './food-details.component.html',
  styleUrls: ['./food-details.component.css']
})
export class FoodDetailsComponent implements OnInit {
  products:any=[];
  finalproduct:any;
  menulist:any;
  MenulistDetails:any=[];
  ProductTitleName: any;
  TotalCart : number=0;
  Totalprice:any="";
  productname:any;
  ItemDetails:any;

  constructor(private service:MenuService,private router:ActivatedRoute) { }

  ngOnInit() {
    this.getFoodDetails();
  }

  getFoodDetails()
  { 
    debugger;
    var parameterData="";
    this.service.getProduct().subscribe((data)=>{
      this.products=data;
      this.router.params.subscribe((param)=>{
        this.productname=param['titlename'];
        for(var i = 0; i<this.products.length; i++){
          for(var index = 0; index<this.products[i].items.length; index++)
          {
            if(this.products[index].title=this.productname)
            {
                this.finalproduct = this.products[index].items;
                for(var j=0; j<this.finalproduct.length; j++){

                  if(this.productname == this.finalproduct[j].itemName)
                  {
                    this.ItemDetails = this.finalproduct[j];
                    
                    break;
                  }
                }
                
            }
            break;
          }
        }
      });
    });    
  }

}
