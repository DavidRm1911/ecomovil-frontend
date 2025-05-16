import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileUniversityComponent } from './profile-university.component';

describe('ProfileUniversityComponent', () => {
  let component: ProfileUniversityComponent;
  let fixture: ComponentFixture<ProfileUniversityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileUniversityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileUniversityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
