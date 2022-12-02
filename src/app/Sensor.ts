export interface Sensor {
    id: number;
    name: string;
    location: string;
    isActice: boolean;
    position: SensorPosition
  }

export enum SensorPosition {
      indoor = 1,
      outdoor = 2,
      water = 3
  }
