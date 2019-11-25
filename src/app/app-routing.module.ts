import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomePageComponent } from './routes/welcome-page/welcome-page.component';
import { ListPageComponent } from './routes/list-page/list-page.component';
import { ErrorPageComponent } from './routes/error-page/error-page.component';
import { TaskDetailsComponent } from './routes/task-details/task-details.component';
import { CreateTaskPageComponent } from './routes/create-task-page/create-task-page.component';
import { GamePageComponent } from './routes/game-page/game-page.component';

const routes: Routes = [
  { path: 'list/:id/edit', component: TaskDetailsComponent },
  { path: 'list/:id', component: TaskDetailsComponent },
  { path: 'add', component: CreateTaskPageComponent },
  { path: 'game', component: GamePageComponent },
  { path: 'list', component: ListPageComponent },
  { path: 'welcome', component: WelcomePageComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: '**', component: ErrorPageComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
