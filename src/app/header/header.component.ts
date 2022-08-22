import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import $ from 'jquery';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isUserLoggedIn:any="";
  emailId:any="";
  cartPending:any;
  cartd:any;
  orderD:any;
  constructor(private service:LoginService, private route:Router, private sar: MenuService){
    debugger;
   this.emailId = localStorage.getItem('email');
   if(this.emailId != "" && this.emailId != null)
   {
    this.isUserLoggedIn= true;
   }

  }
  ngOnInit() {
    $("#menu-toggle").click(function(e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
      $("#divHide").removeAttr("style");
    });

    this.getCartLength();



  }
  
  Logout(){
    localStorage.removeItem('email');
    this.service.logoutUser();
    this.route.navigate(["/home"]);
    this.isUserLoggedIn = false;
  }

  getCartLength()
  {
    this.sar.getCartDetails().subscribe((data)=>
    {
      this.cartPending = data;

      var email = localStorage.getItem("email");
      this.cartd = this.cartPending.filter(((x: { status: string; email: string | null; })=>x.status == "Delivery Pending" && x.email == email));
      this.orderD = this.cartd.length;
      
    });
  }
}
