import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { SearchComponent } from './search/search.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { HeaderLargeComponent } from './header.large/header.large.component';
import { AuthService } from './_services/authentication.service';
import { AuthGuard } from './_guards/auth.guard';
import { JwtInterceptorService } from './_services/jwt-interceptor.service';
import { AccountsComponent } from './accounts/accounts.component';
import { Auth0Service } from './_services/auth0.service';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    SearchComponent,
    AboutComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    HeaderLargeComponent,
    AccountsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    AuthService, 
    Auth0Service, 
    AuthGuard, 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
