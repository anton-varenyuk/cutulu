import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { ListPageComponent } from './routes/list-page/list-page.component';
import { WelcomePageComponent } from './routes/welcome-page/welcome-page.component';
import { ErrorPageComponent } from './routes/error-page/error-page.component';
import { DetailsPageComponent } from './routes/details-page/details-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CreatePageComponent } from './routes/create-page/create-page.component';
import { GamePageComponent } from './routes/game-page/game-page.component';
import { RainPageComponent } from './routes/rain-page/rain-page.component';
import { SignUpPageComponent } from './routes/sign-up-page/sign-up-page.component';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { SignInPageComponent } from './routes/sign-in-page/sign-in-page.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    AddTaskComponent,
    ListPageComponent,
    WelcomePageComponent,
    ErrorPageComponent,
    DetailsPageComponent,
    NavbarComponent,
    CreatePageComponent,
    GamePageComponent,
    RainPageComponent,
    SignUpPageComponent,
    SignInPageComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule // imports firebase/storage only needed for storage features
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
