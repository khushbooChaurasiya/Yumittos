import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styles:[`input.ng-valid{border:1px solid green}`]
})
export class RegistrationComponent implements OnInit {
address:any="";
password:any="";
email:any="";
name:any="";

constructor(private service:LoginService,private router:Router,private fb:FormBuilder) { }

  ngOnInit(): void {
  }

  registrationForm=this.fb.group({
    email:["",[Validators.required,Validators.minLength]],
    password: ["",[Validators.required]],
    address:["",[Validators.required]],
    name:["",[Validators.required]]
  })


  onRegister()
  {
    var body ={
      mail:this.registrationForm.get("email")?.value,
      psd:this.registrationForm.get("password")?.value,
      addr:this.registrationForm.get("address")?.value,
      name:this.registrationForm.get("name")?.value,
      loggedIn:true
    }
    this.service.registration(body).subscribe((data)=>{
      alert("Registration sucessfully");
      this.router.navigate(["login"]);
    })
  }
}
