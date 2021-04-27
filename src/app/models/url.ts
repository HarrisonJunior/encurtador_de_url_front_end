import { User } from "./user";

export interface Url {
  id: number | undefined;
  registrationData: Date;
  completeUrl: string;
  shortenedUrl: string;
  user: User;
  isEnabledEdit:boolean
}
