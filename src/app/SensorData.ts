import { Sensor } from "./Sensor";

export interface SensorData {
    id: number;
    date: Date;
    temperature: number,
    humidity: number
    sensor: Sensor
  }
