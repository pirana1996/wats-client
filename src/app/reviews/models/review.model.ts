import {User} from '../../app/models/User';
import {Location} from '../../app/models/Location';

export class Review {
  constructor(public id: number,
              public description: string,
              public datePublished: string,
              public location: Location,
              public user: User
              ) {}
}
