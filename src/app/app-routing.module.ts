import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadasterUrlComponent } from './cadaster-url/cadaster-url.component';
import { ConsultUrlComponent } from './consult-url/consult-url.component';
import { LoginComponent } from './login/login.component';
import { MyRouteGuard } from './my-route-guard.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch:'full'},
  { path: 'login', component: LoginComponent},
  { path: 'cadastrar_url', component: CadasterUrlComponent, canActivate: [MyRouteGuard] },
  { path: 'consultar_url', component: ConsultUrlComponent, canActivate: [MyRouteGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
