import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
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
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
