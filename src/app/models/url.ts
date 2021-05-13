import { User } from "./user";

export class Url {
  id: string | null;
  registrationData: number;
  completeUrl: string;
  shortenedUrl: string;
  user: User;
  isEnabledEdit: boolean

  constructor(id: string, registrationData: number, completeUrl: string, shortenedUrl: string, user: User, isEnabledEdit: boolean) {
    this.id = id;
    this.registrationData = registrationData;
    this.completeUrl = completeUrl;
    this.shortenedUrl = shortenedUrl;
    this.user = user;
    this.isEnabledEdit = isEnabledEdit;
  }
}


//import { User } from "./user";

//export interface Url {
//  id: number | undefined;
//  registrationData: number;
//  completeUrl: string;
//  shortenedUrl: string;
//  user: User;
//  isEnabledEdit: boolean
//}
