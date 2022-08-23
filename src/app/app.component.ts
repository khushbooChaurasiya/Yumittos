import { Component, EventEmitter, Output } from '@angular/core';
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

  @Output() inputDataChange: EventEmitter<any> = new EventEmitter();

  constructor(private service:LoginService, private route:Router){
    this.inputDataChange.emit(true); 
    
  }
  
}
