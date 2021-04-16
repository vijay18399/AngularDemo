import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder,Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  submitted =false;
  LoginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });
  constructor(private fb: FormBuilder,private authService : AuthService, private router : Router) { }

  ngOnInit() {

  }
  get lc() {
    return this.LoginForm.controls;
  }
  login(){
    this.submitted =true;
  if(this.LoginForm.valid){
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


}
