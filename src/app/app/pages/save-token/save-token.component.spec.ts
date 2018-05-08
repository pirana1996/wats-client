import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveTokenComponent } from './save-token.component';

describe('SaveTokenComponent', () => {
  let component: SaveTokenComponent;
  let fixture: ComponentFixture<SaveTokenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveTokenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
