import { Injectable } from '@angular/core';
import { Sensor } from '../Sensor';
import { SensorData } from '../SensorData';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  public sensorData: SensorData[] = [];

  public sensors: Sensor[] = [];

  constructor() { }
}
