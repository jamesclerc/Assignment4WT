import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from './auth-guard.service'

import { LoginComponent } from './pages/login/login.component';
import { NewtaskComponent } from './pages/newtask/newtask.component';
import { RegisterComponent } from './pages/register/register.component';
import { TaskViewComponent } from './pages/task-view/task-view.component';
import { EdittaskComponent } from './pages/edittask/edittask.component';


const routes: Routes = [
  { path: '', redirectTo: 'tasks', pathMatch: 'full', canActivate : [AuthGuardService] },
  { path: 'tasks', component: TaskViewComponent , canActivate : [AuthGuardService] },
  { path: 'tasks/newtask', component: NewtaskComponent , canActivate : [AuthGuardService] },
  { path: 'tasks/edittask/:taskId', component: EdittaskComponent , canActivate : [AuthGuardService] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
