import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionValueComponent } from './mission-value.component';

describe('MissionValueComponent', () => {
  let component: MissionValueComponent;
  let fixture: ComponentFixture<MissionValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MissionValueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MissionValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
