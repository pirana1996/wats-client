export class PageInfo {
  constructor(public first: boolean,
              public last: boolean,
              public number: number,
              public numberOfElements: number,
              public totalElements: number,
              public totalPages: number,
              public size: number) {
  }
}
