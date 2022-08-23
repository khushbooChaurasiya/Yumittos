import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  @Output() inputDataChange: EventEmitter<any> = new EventEmitter();
  email:any="";
  password:any="";
  cartPending:any="";

    constructor(private service:LoginService,private router:Router,private fb:FormBuilder, private sar : MenuService) { }
  
    LoginForm=this.fb.group({
      email:["",[Validators.required]],
      password: ["", [Validators.required]]
    })

    ngOnInit() {
    }

    onLogin(){
      this.service.getUser().subscribe((res)=>{
      const user = res.find((a:any)=>{
      localStorage.setItem("email", a.mail);
      localStorage.setItem("username", a.name);
      var d =  a.mail === this.LoginForm.value.email && a.psd === this.LoginForm.value.password;
        return d;
      });

      if(user)
      {
        this.LoginForm.reset();
     
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
                PaymentMode:"Cash",
                DeviveryTo:localStorage.getItem('username'),
                status:"Delivery Pending"
            }
            this.deleteCartDetails(updateJsonData);
            
         }
        });

        this.service.isUserLoggedIn.next(true);
        this.router.navigate(["home"]);
      }
      else
      {
        localStorage.removeItem("email");
        localStorage.removeItem("username");
        alert("Invalid email and password");
      }
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
