import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPageComponent } from './landing-page.component';
import { MatCardModule } from '@angular/material';

describe('LandingPageComponent', () => {
  let component: LandingPageComponent;
  let fixture: ComponentFixture<LandingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingPageComponent ],
      imports: [MatCardModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    //fixture = TestBed.createComponent(LandingPageComponent);
    //component = fixture.componentInstance;
    //fixture.detectChanges();
    component = new LandingPageComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
