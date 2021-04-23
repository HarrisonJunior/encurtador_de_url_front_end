import { Component} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Url } from '../models/url';
import { User } from '../models/user';
import { UrlService } from '../services/url.service';

@Component({
  selector: 'app-cadaster-url',
  templateUrl: './cadaster-url.component.html',
  styleUrls: ['./cadaster-url.component.css']
})
export class CadasterUrlComponent{
  url = {} as Url;
  completeUrl: string | undefined;
  isSuccessful = false;

  constructor(private urlService: UrlService,private router: Router) {
  }

  /*Cadastra uma url*/
  cadastrarUrl() {
    this.url.user = {} as User;
    //Atribuindo o id do usuário da sessão ao objeto url
    this.url.user.id = sessionStorage.getItem("id");
    this.urlService.saveUrl(this.url).subscribe((url: Url) => {
      if (url) {
        this.isSuccessful = true;
      }
    });
  }

  /*Limpa o formulario*/
  cleanForm(form: NgForm) {
    form.resetForm();
  }

}
