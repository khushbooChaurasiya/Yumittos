import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isLoggedIn:boolean=false;
  userName:string="";
  users: any;
  constructor(private client:HttpClient) { }

  getUser()
  {
    debugger;
    return this.client.get("http://localhost:3000/users");
  }

  login(username:string,password:string, mailid:string,){
    debugger;
    this.userName=username;
    if(mailid.includes(this.userName)){
      this.isLoggedIn=true;
    }
    return of(this.isLoggedIn);
  }

  isAdminUser():boolean{
    if(this.userName=='admin'){
      return true;
    }
    return false;
  }
  
  isUserLoggedIn():boolean{
    debugger;
    return this.isLoggedIn;
  }

  logoutUser():void{
    this.isLoggedIn=false;
    localStorage.removeItem('email');
  }

  registration(body:any)
  {
    debugger;
    return this.client.post("http://localhost:3000/users",body);
  }
  
}
