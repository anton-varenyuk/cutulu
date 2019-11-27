import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomePageComponent } from './routes/welcome-page/welcome-page.component';
import { ListPageComponent } from './routes/list-page/list-page.component';
import { ErrorPageComponent } from './routes/error-page/error-page.component';
import { DetailsPageComponent } from './routes/details-page/details-page.component';
import { CreatePageComponent } from './routes/create-page/create-page.component';
import { GamePageComponent } from './routes/game-page/game-page.component';
import { RainPageComponent } from './routes/rain-page/rain-page.component';

const routes: Routes = [
  { path: 'list/:id', component: DetailsPageComponent },
  { path: 'add', component: CreatePageComponent },
  { path: 'game', component: GamePageComponent },
  { path: 'rain', component: RainPageComponent },
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
