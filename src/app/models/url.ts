import { User } from "./user";

export interface Url {
  id: number;
  registrationData: Date;
  completeUrl: string;
  shortenedUrl: string;
  user:User;
}
