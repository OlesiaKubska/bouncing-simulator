import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BouncySimulatorComponent } from './bouncy-simulator.component';

describe('BouncySimulatorComponent', () => {
  let component: BouncySimulatorComponent;
  let fixture: ComponentFixture<BouncySimulatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BouncySimulatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BouncySimulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
