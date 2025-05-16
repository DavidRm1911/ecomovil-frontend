import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileAcquirerComponent } from './profile-acquirer.component';

describe('ProfileAcquirerComponent', () => {
  let component: ProfileAcquirerComponent;
  let fixture: ComponentFixture<ProfileAcquirerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileAcquirerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileAcquirerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
