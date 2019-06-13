import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBookFormularComponent } from './add-book-formular.component';

describe('AddBookFormularComponent', () => {
  let component: AddBookFormularComponent;
  let fixture: ComponentFixture<AddBookFormularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBookFormularComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBookFormularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
