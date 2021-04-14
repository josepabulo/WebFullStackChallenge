import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

import { CategoryService } from '../category-service/category.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css'],
})
export class CategoryFormComponent implements OnInit {
  public obj: any = [];
  public edit = false;

  constructor(
    private service: CategoryService,
    private router: Router,
    public activatedRoute: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getOne();
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
    console.log(this.edit);
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
          // console.log(success);
          this._snackBar.open('Successfully created', 'Close', {
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
