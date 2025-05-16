import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleCreateandEditComponent } from './vehicle-createand-edit.component';

describe('VehicleCreateandEditComponent', () => {
  let component: VehicleCreateandEditComponent;
  let fixture: ComponentFixture<VehicleCreateandEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleCreateandEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleCreateandEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
