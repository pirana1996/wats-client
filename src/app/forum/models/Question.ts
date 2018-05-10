
import {User} from '../../app/models/User';
import {Location} from '../../app/models/Location';
import {Answer} from './Answer';

export class Question {
  id: number;
  description: string;
  datePublished: Date;
  user: User;
  answers: Answer[];
}
