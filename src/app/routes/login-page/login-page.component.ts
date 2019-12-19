import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { StorageService } from '../../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent implements OnInit {

  public loginForm = new FormGroup({
    login: new FormControl( '', Validators.required ),
    password: new FormControl( '', Validators.required)
  });

  constructor(private loginService: LoginService,
              private storageService: StorageService,
              private router: Router) { }

  ngOnInit() { }

  logIn() {
    this.loginService.makeTokenFrom(this.loginForm.value.login);
    this.router.navigate(['list']);
  }
}

