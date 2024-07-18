import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteJobApplicationListComponent } from './favorite-job-application-list.component';

describe('FavoriteJobApplicationListComponent', () => {
  let component: FavoriteJobApplicationListComponent;
  let fixture: ComponentFixture<FavoriteJobApplicationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoriteJobApplicationListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FavoriteJobApplicationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
