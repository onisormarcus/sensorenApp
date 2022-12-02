import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Sensor } from '../Sensor';
import { SensorData } from '../SensorData';
import { SensorendataResponse } from '../SensorendataResponse';
import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private storeService: StoreService, private http: HttpClient) { }

  sensoren: Sensor[] = [];

  public async getAllSensors() {
    this.sensoren = await firstValueFrom(this.http.get<Sensor[]>('http://localhost:5000/sensors'));
    this.storeService.sensors = this.sensoren;
  }

  public async getAllSensorData() {
    const sensorDataResponse = await firstValueFrom(this.http.get<SensorendataResponse[]>(`http://localhost:5000/sensorsData`));
    const allSensorData: SensorData[] = sensorDataResponse.map(data => {
      const sensor: Sensor = this.sensoren.filter(sensor => sensor.id == data.sensorId)[0];
      return { ...data, sensor }
    });
    this.storeService.sensorData = allSensorData;
  }

  public async getPaginatedSensorData(itemCount: number, currentPageIndex: number) {
    const sensorDataResponse = await firstValueFrom(this.http.get<SensorendataResponse[]>(`http://localhost:5000/sensorsData`));
    const allSensorData: SensorData[] = sensorDataResponse.map(data => {
      const sensor: Sensor = this.sensoren.filter(sensor => sensor.id == data.sensorId)[0];
      return { ...data, sensor }
    });

    let lowerBound = (itemCount * currentPageIndex) - itemCount;
    let upperBound = (itemCount * currentPageIndex) - 1;
    let sensorData: SensorData[] = [];

    for (let i = lowerBound; i <= upperBound; i++) {
      if (i <= allSensorData.length) {
        sensorData.push(allSensorData[i]);
      }
    }

    this.storeService.sensorData = sensorData;
  }

  public async addSensorData(sensorData: SensorData[]) {
    await firstValueFrom(this.http.post('http://localhost:5000/sensorsData', sensorData));
    await this.getAllSensorData();
  }

  public async deleteSensorData(sensorId: number) {
    await firstValueFrom(this.http.delete(`http://localhost:5000/sensorsData/${sensorId}`));
    await this.getAllSensorData();
  }
}
