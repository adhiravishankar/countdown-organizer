import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEventItemComponent } from './home-event-item.component';

describe('HomeEventItemComponent', () => {
  let component: HomeEventItemComponent;
  let fixture: ComponentFixture<HomeEventItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeEventItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEventItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
