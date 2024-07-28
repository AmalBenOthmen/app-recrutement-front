import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteJobPostListComponent } from './favorite-job-post-list.component';

describe('FavoriteJobPostListComponent', () => {
  let component: FavoriteJobPostListComponent;
  let fixture: ComponentFixture<FavoriteJobPostListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoriteJobPostListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FavoriteJobPostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
