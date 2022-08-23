import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import $ from 'jquery';
import { MenuService } from '../services/menu.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() inputDataChange: EventEmitter<any> = new EventEmitter();
  emailId:any="";
  cartPending:any;
  cartd:any;
  orderD:any;
  userdetails:any;
  userName:any;

  isUserLoggedIn: boolean =false;
  constructor(private service:LoginService, private route:Router, private sar: MenuService){
    this.service.isUserLoggedIn.subscribe( value => {
      this.isUserLoggedIn = value;
  });
   this.emailId = localStorage.getItem('email');
   if(this.emailId != "" && this.emailId != null)
   {
    this.getUserbyId(this.emailId);
    this.isUserLoggedIn= true;
    this.inputDataChange.emit(true); 
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

  getUserbyId(emailId: any)
  {
    this.service.getUser().subscribe((data)=>
    {
        this.userdetails = data;
        var alluseremail = this.userdetails.map((item: { mail: any; })=>item.mail);
        var matchuser = alluseremail.includes(emailId);

        if(matchuser != "" && matchuser!= null && matchuser != undefined)
        {
          this.userName = localStorage.getItem("username");
           this.isUserLoggedIn = true;
        }
        else{
          this.isUserLoggedIn = false;
        }

        return this.isUserLoggedIn;

    });
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
