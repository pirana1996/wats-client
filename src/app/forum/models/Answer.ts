
import {User} from '../../app/models/User';

export class Answer {
  id: number;
  description: string;
  datePublished: Date;
  user: User;
  numLikes: number;
}
