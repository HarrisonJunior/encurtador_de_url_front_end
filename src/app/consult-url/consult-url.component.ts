import {Component, OnInit } from '@angular/core';
import { Url } from '../models/url';
import { UrlService } from '../services/url.service';

@Component({
  selector: 'app-consult-url',
  templateUrl: './consult-url.component.html',
  styleUrls: ['./consult-url.component.css']
})
export class ConsultUrlComponent implements OnInit{
  urls: Url[] = [];
  isConfirmationBoxVisible = false;

  constructor(private urlService: UrlService) { }

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
        this.getAllUrlsByUsername();
      });
    }
  }

}
