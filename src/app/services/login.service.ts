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
    return this.client.get<any>("http://localhost:3000/users");
  }

  login(username:string,password:string, mailid:string,){
    this.userName=username;
    if(mailid.includes(this.userName)){
      this.isLoggedIn=true;
    }
    return of(this.isLoggedIn);
  }
  
  isUserLoggedIn():boolean{
    return this.isLoggedIn;
  }

  logoutUser():void{
    this.isLoggedIn=false;
    localStorage.removeItem('email');
  }

  registration(body:any)
  {
    return this.client.post("http://localhost:3000/users",body);
  }

  postContactUs(body:any)
  {
    return this.client.post("http://localhost:3000/contactus",body);
  }
  
}
