import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TaskViewComponent} from './pages/task-view/task-view.component';
import {NewlistComponent} from './pages/newlist/newlist.component';
import {NewtaskComponent} from './pages/newtask/newtask.component';

const routes: Routes = [
  {path: '', redirectTo: 'lists', pathMatch: 'full'},
  {path: 'lists', component: TaskViewComponent},
  {path: 'lists/:listId', component: TaskViewComponent},
  {path: 'newlist', component: NewlistComponent},
  {path: 'lists/:listId/newtask', component: NewtaskComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
