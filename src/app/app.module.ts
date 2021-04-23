import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CadasterUrlComponent } from './cadaster-url/cadaster-url.component';
import { ConsultUrlComponent } from './consult-url/consult-url.component';
import { DeleteUrlComponent } from './delete-url/delete-url.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { XhrInterceptorService } from './services/xhr-interceptor.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CadasterUrlComponent,
    ConsultUrlComponent,
    DeleteUrlComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: XhrInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
