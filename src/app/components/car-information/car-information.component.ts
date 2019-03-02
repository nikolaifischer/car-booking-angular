import { Component, OnInit, Input } from '@angular/core';
import { AppSettings } from 'src/app/app.settings';

@Component({
  selector: 'app-car-information',
  templateUrl: './car-information.component.html',
  styleUrls: ['./car-information.component.scss']
})
/**
 * Component that renders a card containing information about a car including an image.
 */
export class CarInformationComponent implements OnInit {
  @Input() name: string;
  @Input() image: string;
  @Input() description: string;
  @Input() shortDescription: string;
  constructor() { }

  ngOnInit() {
    this.image = this.constructImageSrcString(this.image);
  }

  /**
   * Constructs a absolute url for an image path
   * @param path the internal api path of an image.
   */
  constructImageSrcString(path: string): string {
    return AppSettings.API_BASE + path;
  }

}
