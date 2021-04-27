import {Component, OnInit } from '@angular/core';
import { Url } from '../models/url';
import { User } from '../models/user';
import { AuthenticationService } from '../services/authentication.service';
import { UrlService } from '../services/url.service';

@Component({
  selector: 'app-consult-url',
  templateUrl: './consult-url.component.html',
  styleUrls: ['./consult-url.component.css']
})
export class ConsultUrlComponent implements OnInit{
  urls: Url[] = [];
  isConfirmationBoxVisible = false;

  constructor(private urlService: UrlService, private authenticationService: AuthenticationService) { }

  //Carrega a lista de urls ao iniciar o component
  ngOnInit(): void {
    this.getAllUrlsByUsername();
  }

  //Busca urls do usuário da sessão 
  getAllUrlsByUsername() {
    this.urlService.getAllUrlsByUsername().subscribe((urls: Url[]) => {
      this.urls = urls;
    });
  }

  //Deleta uma url pelo id
  deletarUrl(url: Url) {
    if (confirm("Pressione ok para confirmar a remoção da seguinte url?" + "\n" + url.completeUrl)) {
      this.urlService.deletarUrl(url).subscribe((resposta) => {
        if (resposta) {
          const index = this.urls.indexOf(url);
          this.urls.splice(index, 1);
        }
      });
    }
  }

  toggleShowEdit(url: Url) {
    (url.isEnabledEdit) ? url.isEnabledEdit = false : url.isEnabledEdit = true;
  }

  atualizarUrl(url: Url, newCompleteUrl: string) {
    let updated_url = {} as Url;
    updated_url.user = {} as User;
    updated_url.id = url.id;
    updated_url.registrationData = url.registrationData;
    updated_url.completeUrl = newCompleteUrl;
    updated_url.shortenedUrl = url.shortenedUrl;
    updated_url.user.id = this.authenticationService.id;
    this.urlService.atualizarUrl(updated_url).subscribe((resposta) => {
      if (resposta) {
        this.getAllUrlsByUsername();
        this.toggleShowEdit(url);
      }
    });
  }

}
