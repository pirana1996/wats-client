import {Location} from './Location';

export class User {
  constructor(public id: number,
              public name: string,
              public email: string,
              public username: string,
              public pictureUrl: string,
              public currentLocation: Location) {
  }
}
