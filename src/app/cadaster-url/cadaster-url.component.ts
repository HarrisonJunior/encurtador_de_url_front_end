import { Component} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Url } from '../models/url';
import { User } from '../models/user';
import { AuthenticationService } from '../services/authentication.service';
import { UrlService } from '../services/url.service';

@Component({
  selector: 'app-cadaster-url',
  templateUrl: './cadaster-url.component.html',
  styleUrls: ['./cadaster-url.component.css']
})
export class CadasterUrlComponent{
  url = {} as Url;
  isSuccessfull = false;
  isFailed = false;

  constructor(private urlService: UrlService, private router: Router, private authenticationService: AuthenticationService) {
 
  }

  /*Cadastra uma url*/
  cadastrarUrl(form:NgForm) {
    this.url.user = {} as User;
    //Atribuindo o id do usuário da sessão ao objeto url
    this.url.user.id = sessionStorage.getItem("userId");
    this.urlService.saveUrl(this.url).subscribe((url) => {
      if (url) {
        this.isSuccessfull = true;
        this.isFailed = false;
      } else {
        this.isSuccessfull = false;
        this.isFailed = true;
      }
    }, error => {
        this.isSuccessfull = false;
        this.isFailed = true;
    });
    this.cleanForm(form);
  }

  /*Limpa o formulario*/
  cleanForm(form: NgForm) {
    form.resetForm();
  }

  /*Esconde os alerts quando clica no campo de texto*/
  hideAlert() {
    this.isSuccessfull = false;
    this.isFailed = false;
  }
}
