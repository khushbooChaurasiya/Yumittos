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
    
  }
  
}
