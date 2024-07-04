import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisionStrategyComponent } from './vision-strategy.component';

describe('VisionStrategyComponent', () => {
  let component: VisionStrategyComponent;
  let fixture: ComponentFixture<VisionStrategyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisionStrategyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VisionStrategyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
