import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
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
  cartPending:any="";
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

              localStorage.setItem('email', this.email);
              this.sar.getCartDetails().subscribe((cartdata)=>{
                this.cartPending = cartdata;
                var cartd = this.cartPending.filter((x: { status: string; })=>x.status == "pending");
                
                for(var i=0; i<cartd.length; i++)
                {
                    var cartInfo = cartd[i];
                    var updateJsonData ={
                      email: localStorage.getItem('email'),
                      id:cartInfo.id,
                      itemName: cartInfo.itemName,
                      price : cartInfo.price,
                      totalPrice : cartInfo.quntity * cartInfo.price,
                      quntity: cartInfo.quntity,
                      vegan:cartInfo.vegan,
                      status:"Delivery Pending"
                  }
                  this.deleteCartDetails(updateJsonData);
                  
               }
              });

              this.router.navigate([this.retUrl]);
              
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

    deleteCartDetails(updateJsonData:any)
    {
      this.sar.cartDelete(updateJsonData.id).subscribe((res)=>{
        this.sar.postCartsDetaild(updateJsonData).subscribe((response)=>{
         console.log(response);
        });
      });
    }
}
