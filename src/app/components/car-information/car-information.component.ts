import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-car-information',
  templateUrl: './car-information.component.html',
  styleUrls: ['./car-information.component.scss']
})
export class CarInformationComponent implements OnInit {
  @Input() name: string;
  @Input() image: string;
  @Input() description: string;
  @Input() shortDescription: string;
  constructor() { }

  ngOnInit() {
    this.image = this.constructImageSrcString(this.image);
  }

  constructImageSrcString(path: string): string {
    return 'http://job-applicants-dummy-api.kupferwerk.net.s3.amazonaws.com/api/' + path;
  }

}
