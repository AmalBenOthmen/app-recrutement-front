import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HetFComponent } from './het-f.component';

describe('HetFComponent', () => {
  let component: HetFComponent;
  let fixture: ComponentFixture<HetFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HetFComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HetFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
