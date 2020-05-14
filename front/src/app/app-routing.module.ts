import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from './auth-guard.service';

import { EdittaskComponent } from './pages/edittask/edittask.component';
import { LoginComponent } from './pages/login/login.component';
import { NewtaskComponent } from './pages/newtask/newtask.component';
import { RegisterComponent } from './pages/register/register.component';
import { TaskViewComponent } from './pages/task-view/task-view.component';
import { ViewTaskComponent } from './pages/view-task/view-task.component';

// here are all the road defined, the authguard prevent the user from accessing a page without being authentificated
const routes: Routes = [
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full',
    canActivate: [AuthGuardService],
  },
  {
    path: 'tasks',
    component: TaskViewComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'tasks/newtask',
    component: NewtaskComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'tasks/edittask/:taskId',
    component: EdittaskComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'tasks/view-task/:taskId',
    component: ViewTaskComponent,
    canActivate: [AuthGuardService],
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
