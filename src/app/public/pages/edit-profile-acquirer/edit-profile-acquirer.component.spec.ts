import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfileAcquirerComponent } from './edit-profile-acquirer.component';

describe('EditProfileAcquirerComponent', () => {
  let component: EditProfileAcquirerComponent;
  let fixture: ComponentFixture<EditProfileAcquirerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditProfileAcquirerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditProfileAcquirerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
