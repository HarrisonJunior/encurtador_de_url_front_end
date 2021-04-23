import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadasterUrlComponent } from './cadaster-url/cadaster-url.component';
import { ConsultUrlComponent } from './consult-url/consult-url.component';
import { DeleteUrlComponent } from './delete-url/delete-url.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch:'full'},
  { path: 'login', component: LoginComponent},
  { path: 'cadastrar_url', component: CadasterUrlComponent},
  { path: 'consultar_url', component: ConsultUrlComponent},
  { path: 'deletar_url', component: DeleteUrlComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
