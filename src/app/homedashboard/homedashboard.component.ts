import { Component, OnInit } from '@angular/core';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'app-homedashboard',
  templateUrl: './homedashboard.component.html',
  styleUrls: ['./homedashboard.component.css']
})
export class HomedashboardComponent implements OnInit {
products:any = {};
menulist:any;
menuListByCategoryName:any="";
isSelect:boolean=false;

constructor(private service:MenuService) { }

ngOnInit(): void {
  this.service.getProduct().subscribe((data)=>{
    this.products=data;
    this.menulist =this.products.map((item: { category: any; })=>item.category);
    
  });
}

  onSelect(p:any)
  {
    this.isSelect = true;
    this.service.getProduct().subscribe((data)=>{
      this.products=data;
      this.menulist =this.products.map((item: { category: any; })=>item.category)
      if(this.menulist.includes(p))
      {
        for (let m of this.products) {
          if(m.category == p){
            this.menuListByCategoryName = m.items
          }
        }
      }
    });
  }
}
