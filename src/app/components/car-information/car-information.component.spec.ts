import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarInformationComponent } from './car-information.component';
import { MatCardModule } from '@angular/material';
describe('CarInformationComponent', () => {
  let component: CarInformationComponent;
  let fixture: ComponentFixture<CarInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarInformationComponent ],
      imports: [MatCardModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    //fixture = TestBed.createComponent(CarInformationComponent);
    //component = fixture.componentInstance;
    //fixture.detectChanges();
    component = new CarInformationComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should construct a valid image url', () => {
    const givenPath = 'images/healthcare.jpg';

    const actual = component.constructImageSrcString(givenPath);

    const expected = 'http://job-applicants-dummy-api.kupferwerk.net.s3.amazonaws.com/api/images/healthcare.jpg';

    expect(actual).toBe(expected);
  });
});
