import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllJobPostsComponent } from './get-all-job-posts.component';

describe('GetAllJobPostsComponent', () => {
  let component: GetAllJobPostsComponent;
  let fixture: ComponentFixture<GetAllJobPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetAllJobPostsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetAllJobPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
