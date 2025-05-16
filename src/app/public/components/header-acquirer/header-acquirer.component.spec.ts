import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderAcquirerComponent } from './header-acquirer.component';

describe('HeaderAcquirerComponent', () => {
  let component: HeaderAcquirerComponent;
  let fixture: ComponentFixture<HeaderAcquirerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderAcquirerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderAcquirerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
