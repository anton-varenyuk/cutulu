import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StorageService } from '../../services/storage.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.scss']
})
export class SignInPageComponent implements OnInit {

  public loginForm = new FormGroup({
    email: new FormControl( '', Validators.required ),
    password: new FormControl( '', Validators.required)
  });

  public errorMessage: string;

  constructor(private storageService: StorageService,
              private router: Router,
              private auth: AuthService,
              private afAuth: AngularFireAuth) { }

  ngOnInit() {
  }

  public signIn(): void {
    this.auth.signIn(this.creds('email'), this.creds('password')).catch(err => {

      this.errorMessage = err.message;
      console.log(this.errorMessage);
    });
  }

  private creds(value): string {
    return this.loginForm.get(value).value;
  }

  public checkToken(): boolean {
    return this.auth.checkToken();
  }
}
