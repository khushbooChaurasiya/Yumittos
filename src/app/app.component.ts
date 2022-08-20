import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'yumittos';
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
  
  Logout(){
    localStorage.removeItem('email');
    this.service.logoutUser();
    this.route.navigate(["/home"]);
    this.isUserLoggedIn = false;
  }
  
}
