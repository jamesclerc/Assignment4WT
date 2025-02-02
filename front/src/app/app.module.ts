import { AuthService } from 'src/app/auth.service';
import { TokenInterceptorService } from './token-interceptor.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskViewComponent } from './pages/task-view/task-view.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NewtaskComponent } from './pages/newtask/newtask.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { EdittaskComponent } from './pages/edittask/edittask.component';
import { ViewTaskComponent } from './pages/view-task/view-task.component';

//all the component and service are defined here
@NgModule({
  declarations: [
    AppComponent,
    TaskViewComponent,
    NewtaskComponent,
    RegisterComponent,
    LoginComponent,
    EdittaskComponent,
    ViewTaskComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
