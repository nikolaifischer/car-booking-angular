import { CarInformationComponent } from './car-information.component';

/**
 * Unit Tests for Car Information Component
 */
describe('CarInformationComponent', () => {
  let component: CarInformationComponent;


  beforeEach(() => {
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
