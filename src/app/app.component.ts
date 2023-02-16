import {Component, OnInit} from '@angular/core';
import {ManufacturerService} from "./service/manufacturer.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'PartManagerWebApp';

  constructor(
    public manufacturerService: ManufacturerService
  ) {
  }

  ngOnInit() {
    this.manufacturerService.get().subscribe(it => console.log(it))
  }

}

