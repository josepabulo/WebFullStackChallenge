import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeviceFormComponent } from './device-form/device-form.component';
import { DeviceListComponent } from './device-list/device-list.component';

const routes: Routes = [
  {
    path: '',
    component: DeviceListComponent
  },

  {
    path: 'form',
    component: DeviceFormComponent
  },

  {
    path: 'form/:id',
    component: DeviceFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeviceRoutingModule { }
