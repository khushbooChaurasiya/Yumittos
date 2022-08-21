import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles:[`input.ng-valid{border:1px solid green}`]
})
export class LoginComponent implements OnInit {
  email:any="";
  password:any="";
  retUrl:any="home";
  users:any="";
  mailid: string="";
  error: any;
    constructor(private service:LoginService,private route:ActivatedRoute,private router:Router,private fb:FormBuilder, private sar : MenuService) { }
  
    LoginForm=this.fb.group({
      email:["",[Validators.required]],
      password: [
        "",
        [
          Validators.required,
          // Validators.pattern(
          //   /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
          // )
        ],
      ]
    })

    ngOnInit() {
    }

    onLogin(){
    debugger;
      this.service.getUser().subscribe((data)=>{
        this.users = data;
       this.mailid= this.users.map((item: { mail: any; })=>item.mail);
        this.service.login(this.email,this.password, this.mailid).subscribe((d)=>{
         if(d == true){
            if(this.retUrl!=null){

            // this.sar.getCartDetails().subscribe((data)=>{
            //   // data.find(a=>a.status == "pending");
              
            // });

              this.router.navigate([this.retUrl]);
              localStorage.setItem('email', this.email);
            }
            else{
              this.router.navigate(["home"]);
            }
          }
          else{
           
            // alert("invalid username and password.");
            // this.router.navigate(["login"]);
          }
        }, (err) => {
          this.error = err.message;
          console.log(err.message);});
      });
    }
}
