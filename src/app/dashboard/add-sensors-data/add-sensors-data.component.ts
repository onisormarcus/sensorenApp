import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import { BackendService } from 'src/app/shared/backend.service';
import { StoreService } from 'src/app/shared/store.service';
import {Sensor} from "../../Sensor";

@Component({
  selector: 'app-add-sensors-data',
  templateUrl: './add-sensors-data.component.html',
  styleUrls: ['./add-sensors-data.component.scss']
})
export class AddSensorsDataComponent implements OnInit {

  constructor(public storeService: StoreService, private formBuilder: UntypedFormBuilder, public backendService: BackendService) { }

  public sensors: Sensor[] = [];

  public sensorDataForm: FormGroup = new FormGroup({
    sensorId: new FormControl(null, [ Validators.required, Validators.nullValidator ] ),
    datetime:  new FormControl(new Date(), [ Validators.required ] ),
    temperature: new FormControl('', [ Validators.required, Validators.min(-273), Validators.max(273) ] ),
    humidity: new FormControl('', [ Validators.required, Validators.min(0), Validators.max(100) ] )
  });

  async ngOnInit() {
    await this.backendService.getAllSensors()
    this.sensors = this.storeService.sensors;
  }

  async onSubmit() {
    if(this.sensorDataForm?.valid) {
      await this.backendService.addSensorData(this.sensorDataForm.value);
      this.sensorDataForm.reset();
    }
  }
}
