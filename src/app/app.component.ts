import {Component, EventEmitter, OnInit} from '@angular/core';
import {IconService} from "./service/icon.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'PartManagerWebApp';

  constructor(private iconService: IconService) {
  }

}
