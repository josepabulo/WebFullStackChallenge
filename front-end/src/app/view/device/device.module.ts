import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from 'src/app/material.module';

import { DeviceListComponent } from './device-list/device-list.component';
import { DeviceFormComponent } from './device-form/device-form.component';
import { DeviceRoutingModule } from './device-routing.module';

@NgModule({
  declarations: [DeviceListComponent, DeviceFormComponent],
  imports: [
    CommonModule,
    DeviceRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DeviceModule { }
