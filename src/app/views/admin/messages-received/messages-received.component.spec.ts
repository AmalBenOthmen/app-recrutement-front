import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesReceivedComponent } from './messages-received.component';

describe('MessagesReceivedComponent', () => {
  let component: MessagesReceivedComponent;
  let fixture: ComponentFixture<MessagesReceivedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessagesReceivedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MessagesReceivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
