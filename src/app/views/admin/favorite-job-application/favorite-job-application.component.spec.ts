import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteJobApplicationComponent } from './favorite-job-application.component';

describe('FavoriteJobApplicationComponent', () => {
  let component: FavoriteJobApplicationComponent;
  let fixture: ComponentFixture<FavoriteJobApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoriteJobApplicationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FavoriteJobApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
