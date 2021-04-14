import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../category/category-service/category.service';

import { DeviceService } from '../device-service/device.service';

@Component({
  selector: 'app-device-form',
  templateUrl: './device-form.component.html',
  styleUrls: ['./device-form.component.css'],
})
export class DeviceFormComponent implements OnInit {
  public obj: any = [];
  public edit = false;
  public listCategory: any = [];

  constructor(
    private service: DeviceService,
    private serviceCategory: CategoryService,
    private router: Router,
    public activatedRoute: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getOne();
    this.serviceCategory.getAll().subscribe((res: any) => {
      this.listCategory = res.rows;
    });
  }

  getOne() {
    if (this.activatedRoute.snapshot.paramMap.get('id') !== null) {
      const id = this.activatedRoute.snapshot.paramMap.get('id');
      this.service.getOne(id).subscribe(
        (success) => {
          this.obj = success;
          this.edit = true;
        },
        (error) => {
          // console.log(error);
          this._snackBar.open('Error fetching record', 'Close', {
            duration: 4000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
        }
      );
    }
  }

  saveOrUpdate() {
    if (this.edit) {
      this.service.update(this.obj.id, this.obj).subscribe(
        (success) => {
          // console.log(success);
          this._snackBar.open('Successfully updated', 'Close', {
            duration: 4000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
          this.back();
        },
        (error) => {
          // console.log(error);
          this._snackBar.open('Error saving', 'Close', {
            duration: 4000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
        }
      );
    } else {
      this.service.save(this.obj).subscribe(
        (success) => {
          console.log(success);
          this._snackBar.open('Successfully created', 'Close', {
            duration: 4000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
          this.back();
        },
        (error) => {
          console.log(error);
          this._snackBar.open('Error saving', 'Close', {
            duration: 4000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
        }
      );
    }
  }

  getLocation() {
    const tree = this.router.parseUrl(this.router.url);
    return tree.root.children.primary.segments.map((it) => it.path).join('/');
  }

  getParentPath(path?: any) {
    if (path) {
      return path.slice(0, Math.max(path.lastIndexOf('/'), 0));
    }
    return this.getLocation().slice(
      0,
      Math.max(this.getLocation().lastIndexOf('/'), 1)
    );
  }

  back() {
    if (this.edit) {
      this.router.navigate([this.getParentPath(this.getParentPath())]);
    } else {
      this.router.navigate([this.getParentPath()]);
    }
  }
}
