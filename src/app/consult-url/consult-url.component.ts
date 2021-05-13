import {Component, OnInit, TemplateRef } from '@angular/core';
import { Url } from '../models/url';
import { User } from '../models/user';
import { AuthenticationService } from '../services/authentication.service';
import { UrlService } from '../services/url.service';
import { OrderPipe } from 'ngx-order-pipe';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-consult-url',
  templateUrl: './consult-url.component.html',
  styleUrls: ['./consult-url.component.css']
})
export class ConsultUrlComponent implements OnInit{
  urls: Url[] = [];
  isConfirmationBoxVisible = false;
  orderByReverse = false;
  deleteModalRef: BsModalRef | undefined;
  urlToDelete: Url = {} as Url;


  constructor(private urlService: UrlService, private authenticationService: AuthenticationService, private orderPipe: OrderPipe, private modalService: BsModalService) { }

  //Carrega a lista de urls ao iniciar o component
  ngOnInit(): void {
    this.getAllUrlsByUsername();
  }

  //Busca urls do usuário da sessão 
  getAllUrlsByUsername() {
    this.urlService.getAllUrlsByUsername().subscribe((urls: Url[]) => {
      this.urls = this.orderPipe.transform(urls,'registrationData',true);
    });
  }


  //Deleta uma url pelo id
  deletarUrl(url: Url) {
      this.urlService.deletarUrl(url).subscribe((resposta) => {
        if (resposta) {
          const index = this.urls.indexOf(url);
          this.urls.splice(index, 1);
        }
      });
  }

  atualizarUrl(url: Url, newCompleteUrl: string) {
    let updated_url = {} as Url;
    updated_url.user = {} as User;
    updated_url.id = url.id;
    updated_url.registrationData = url.registrationData;
    updated_url.completeUrl = newCompleteUrl;
    updated_url.shortenedUrl = url.shortenedUrl;
    //console.log(sessionStorage.getItem("userId"));
    updated_url.user.id = sessionStorage.getItem("userId");
    this.urlService.atualizarUrl(updated_url).subscribe((resposta) => {
      if (resposta) {
        this.getAllUrlsByUsername();
        this.toggleShowEdit(url);
      }
    });
  }

  toggleShowEdit(url: Url) {
    (url.isEnabledEdit) ? url.isEnabledEdit = false : url.isEnabledEdit = true;
  }

  toggleShowEditAndScroll(url: Url, element: Element) {
    //(url.isEnabledEdit) ? url.isEnabledEdit = false : url.isEnabledEdit = true;
    if (url.isEnabledEdit) {
      url.isEnabledEdit = false;
    } else {
      url.isEnabledEdit = true;
      element.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
    }
  }

  orderBy(field: string, event: Event) {
    this.urls = this.orderPipe.transform(this.urls, field, this.orderByReverse);
    this.orderByReverse = !this.orderByReverse;
  }

  openModalWithClass(template: TemplateRef<any>, url: Url) {
    this.urlToDelete = url;
    this.deleteModalRef = this.modalService.show(template, Object.assign({}, { class: 'gray modal-lg' }));
  }
  closeModal() {
    this.deleteModalRef?.hide();
  }

  actionModal() {
    this.deletarUrl(this.urlToDelete);
    this.closeModal();
  }

}
