import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewDiscussionComponent } from './review-discussion.component';

describe('ReviewDiscussionComponent', () => {
  let component: ReviewDiscussionComponent;
  let fixture: ComponentFixture<ReviewDiscussionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewDiscussionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewDiscussionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
