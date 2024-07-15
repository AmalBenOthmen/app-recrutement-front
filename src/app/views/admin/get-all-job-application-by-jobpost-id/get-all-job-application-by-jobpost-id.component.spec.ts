import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllJobApplicationByJobpostIdComponent } from './get-all-job-application-by-jobpost-id.component';

describe('GetAllJobApplicationByJobpostIdComponent', () => {
  let component: GetAllJobApplicationByJobpostIdComponent;
  let fixture: ComponentFixture<GetAllJobApplicationByJobpostIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetAllJobApplicationByJobpostIdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetAllJobApplicationByJobpostIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
