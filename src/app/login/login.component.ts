import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  LoginForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
  });
  constructor(private authService : AuthService, private router : Router) { }

  ngOnInit() {

  }

  login(){
  
    this.authService.validate(this.LoginForm.value.username, this.LoginForm.value.password)
    .then((response) => {
      console.log(response);
      this.authService.setUserInfo({'user' : response['user']});
      this.router.navigate(['home']);

    })
    .catch((error) => {
      alert("Incorrect Username or Password");
    })
  }


}
