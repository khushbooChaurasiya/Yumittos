import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import $ from 'jquery';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isUserLoggedIn:any="";
  emailId:any="";

  constructor(private service:LoginService, private route:Router){
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


  }
  
  Logout(){
    localStorage.removeItem('email');
    this.service.logoutUser();
    this.route.navigate(["/home"]);
    this.isUserLoggedIn = false;
  }
}
