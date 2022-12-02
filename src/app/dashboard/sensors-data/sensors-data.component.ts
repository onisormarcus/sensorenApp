import {Component, OnInit, ViewChild} from '@angular/core';
import { SensorPosition } from 'src/app/Sensor';
import { BackendService } from 'src/app/shared/backend.service';
import { StoreService } from 'src/app/shared/store.service';
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {DataSource} from "@angular/cdk/collections";
import {Data} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";
import {SensorData} from "../../SensorData";

@Component({
  selector: 'app-sensors-data',
  templateUrl: './sensors-data.component.html',
  styleUrls: ['./sensors-data.component.scss']
})
export class SensorsDataComponent implements OnInit {

  public get SensorPosition() { return SensorPosition; }

  public dataSource = new MatTableDataSource<SensorData>();

  public columnsToDisplay = ['name', 'date', 'temperature', 'humidity', 'location', 'position', 'actions'];

  public pageSizeOptions = [5, 10, 25, 100];

  public pageSize: number = 5;

  public pageIndex: number = 1;

  public length: number = 0;

  @ViewChild('paginator') paginator!: MatPaginator;

  constructor(private backendService: BackendService, public storeService: StoreService) { }

  async ngOnInit() {
    await this.backendService.getAllSensors();
    await this.backendService.getAllSensorData();

    this.dataSource = new MatTableDataSource(this.storeService.sensorData);
    this.dataSource.paginator = this.paginator;
  }

  async deleteSensorData(id: number) {
    await this.backendService.deleteSensorData(id);
  }

  async pageEvent(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }
}

export interface DataSourceTableItem {
  name: string;
  date: Date;
  temperature: number,
  humidity: number
  location: string;
  position: SensorPosition
}
