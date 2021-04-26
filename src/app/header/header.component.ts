import { Route } from '@angular/compiler/src/core';
import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private authenticationService: AuthenticationService) { }

  /*Faz logout */
  logout() {
    this.authenticationService.logout();
  }

  //Mostra o menu apenas se o usuário estiver logado
  showMenu() {
    return this.authenticationService.isUserLoggedIn();
  }

}
