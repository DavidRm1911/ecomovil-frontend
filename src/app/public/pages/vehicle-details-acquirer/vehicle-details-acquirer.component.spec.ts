import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleDetailsAcquirerComponent } from './vehicle-details-acquirer.component';

describe('VehicleDetailsAcquirerComponent', () => {
  let component: VehicleDetailsAcquirerComponent;
  let fixture: ComponentFixture<VehicleDetailsAcquirerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleDetailsAcquirerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleDetailsAcquirerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
