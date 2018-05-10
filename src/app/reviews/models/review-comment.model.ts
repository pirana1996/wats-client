import {User} from '../../app/models/User';

export class ReviewComment {
  constructor(public id: number,
              public description: string,
              public datePublished: string,
              public user: User,
              public numLikes: number
              ) {}
}
