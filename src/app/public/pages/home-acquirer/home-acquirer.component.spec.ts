import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAcquirerComponent } from './home-acquirer.component';

describe('HomeAcquirerComponent', () => {
  let component: HomeAcquirerComponent;
  let fixture: ComponentFixture<HomeAcquirerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeAcquirerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeAcquirerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
