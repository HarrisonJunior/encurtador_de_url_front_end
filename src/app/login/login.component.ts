import { Component, OnInit } from '@angular/core';
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
export class LoginComponent implements OnInit {
  state = 'disabled';
  user = {} as User;

  constructor(private router: Router, private authenticationService: AuthenticationService) {
    this.user.username = "user2";
    this.user.password = "12345";
  }

  ngOnInit(): void {
    if (this.router.url == "/login") {
      this.toggleState();
    }
  }
  //Liga e desliga o state usado pela trigger de animação
  toggleState() {
    this.state == "activated" ? this.state = "disabled" : this.state = "activated";
  }

  //Authentica usuário e o redireciona para teka de consulta
  authenticate() {
    this.authenticationService.authenticate(this.user).subscribe((user:User) => {
      if (user) {
        this.router.navigate(['consultar_url'])   
      }
    });
    //Captura o id do usuário autenticado e o insere na sessão
    if (sessionStorage.getItem("username")) {
      this.authenticationService.getUserId().subscribe((id) => {
        return sessionStorage.setItem("id", id);
      });
    }
  }
  //Verifica se o usuário está logado
  isUserLoggedIn() {
    this.authenticationService.isUserLoggedIn();
  }
  //Realiza logout
  logOut() {
    this.authenticationService.logOut();
  }
 
}
