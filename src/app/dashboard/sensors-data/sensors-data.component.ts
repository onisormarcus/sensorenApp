import { Component, OnInit } from '@angular/core';
import { SensorPosition } from 'src/app/Sensor';
import { BackendService } from 'src/app/shared/backend.service';
import { StoreService } from 'src/app/shared/store.service';

@Component({
  selector: 'app-sensors-data',
  templateUrl: './sensors-data.component.html',
  styleUrls: ['./sensors-data.component.scss']
})
export class SensorsDataComponent implements OnInit {

  public get SensorPosition() {return SensorPosition; }

  constructor(private backendService: BackendService, public storeService: StoreService) { }

  async ngOnInit() {
    await this.backendService.getSensoren();
    await this.backendService.getSensorenDaten();
  }

  async deleteSensordata(id: number) {
    await this.backendService.deleteSensorsDaten(id);
  }
}
