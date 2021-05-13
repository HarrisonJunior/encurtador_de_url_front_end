import { Component, OnDestroy, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('triggerEfeito', [
      state('activated', style({
        opacity: 1,
        transform: 'scale(1)'
      })),
      state('disabled', style({
        opacity: 0,
        transform: 'scale(0.1)'
      })),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'scale(0.1)'
        }),
        animate(350)
      ]),
      transition('in => out', [
        style({
          opacity: 1,
          transform: 'scale(1)'
        }),
        animate(350)
      ]),
    ])
  ]
})
export class LoginComponent implements OnInit{
  state = 'disabled'; //Estado da animação do componente
  user = {} as User;

  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    if (this.router.url == "/login") {
      this.toggleState();
    }
    this.user.username = "user";
    this.user.password = "1234";
  }

  /*Liga e desliga o state usado pela trigger de animação*/
  toggleState() {
    this.state == "activated" ? this.state = "disabled" : this.state = "activated";
  }

  /*Authentica usuário e o redireciona para tela de consulta de urls*/
  authenticate() {
    /*console.log(this.isUserLoggedIn());*/
    this.authenticationService.authenticate(this.user.username, this.user.password).subscribe(() => {
      //console.log(this.isUserLoggedIn());
        this.router.navigate(["consultar_url"]);
    });
  }

  /*Verifica se o usuário está logado*/
  isUserLoggedIn():boolean {
    return this.authenticationService.isUserLoggedIn();
  }

  /*Realiza logout*/
  logout() {
    this.authenticationService.logout();
  }
 
}
