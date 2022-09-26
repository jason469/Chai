import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOneBunnyComponent } from './view-one-bunny.component';

describe('ViewOneBunnyComponent', () => {
  let component: ViewOneBunnyComponent;
  let fixture: ComponentFixture<ViewOneBunnyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewOneBunnyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewOneBunnyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
