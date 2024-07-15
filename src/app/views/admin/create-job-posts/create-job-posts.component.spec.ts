import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateJobPostsComponent } from './create-job-posts.component';

describe('CreateJobPostsComponent', () => {
  let component: CreateJobPostsComponent;
  let fixture: ComponentFixture<CreateJobPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateJobPostsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateJobPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
