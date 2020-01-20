import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StorageService } from '../../services/storage.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss']
})

export class SignUpPageComponent implements OnInit {

  public loginForm = new FormGroup({
    email: new FormControl( '', Validators.required ),
    password: new FormControl( '', Validators.required)
  });

  public errorMessage: string;

  constructor(private storageService: StorageService,
              private router: Router,
              private auth: AuthService,
              private afAuth: AngularFireAuth) { }

  ngOnInit() { }

  public signUp(): void {
    this.auth.signUp(this.creds('email'), this.creds('password')).catch(error => {
      this.errorMessage = error.message;
    });
  }

  private creds(value): string {
    return this.loginForm.get(value).value;
  }

  public checkToken(): boolean {
    return this.auth.checkToken();
  }
}

