
import {User} from '../../app/models/User';
import {Location} from '../../app/models/Location';

export class Question {
  id: number;
  description: string;
  date_published: Date;
  user: User;
  location: Location;
}
