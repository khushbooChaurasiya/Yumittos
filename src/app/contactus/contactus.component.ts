import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {

  fname:any="";
lname:any="";
subject:any="";
  constructor(private service:LoginService,private router:Router,private fb:FormBuilder) { }

  ngOnInit(): void {
  }

  contactusForm=this.fb.group({
    fname:["",[Validators.required]],
    lname: ["",[Validators.required]],
    subject:["",[Validators.required]]
  });

  onContactUs()
  {
    var body ={
      fname:this.contactusForm.get("fname")?.value,
      lname:this.contactusForm.get("lname")?.value,
      subject:this.contactusForm.get("subject")?.value,
   
    }
    this.service.postContactUs(body).subscribe((data)=>{
      this.router.navigate(["home"]);
    })
  }
}
