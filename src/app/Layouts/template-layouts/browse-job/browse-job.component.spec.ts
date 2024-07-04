import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseJobComponent } from './browse-job.component';

describe('BrowseJobComponent', () => {
  let component: BrowseJobComponent;
  let fixture: ComponentFixture<BrowseJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowseJobComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BrowseJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
