import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

import { CategoryService } from '../category-service/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent {
  public list: any = [];

  constructor(
    public service: CategoryService,
    public router: Router,
    private _snackBar: MatSnackBar
  ) {}

  public dataSource = new MatTableDataSource<any>();
  public displayedColumns: string[] = ['id', 'name', 'action'];

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.service.getAll().subscribe(
      (success) => {
        this.list = success;
        this.dataSource = new MatTableDataSource(this.list.rows);
      },
      (error) => {
        this._snackBar.open('Error fetching records', 'Close', {
          duration: 4000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      }
    );
  }

  getLocation() {
    const tree = this.router.parseUrl(this.router.url);
    return tree.root.children.primary.segments.map((it) => it.path).join('/');
  }

  create() {
    this.router.navigate([this.getLocation() + '/form']);
  }

  edit(obj: any) {
    this.router.navigate([this.getLocation() + '/form', obj.id.toString()]);
  }

  delete(obj: any) {
    console.log(obj.id);
    this.service.delete(obj.id).subscribe(
      (success) => {
        this.getAll();
        this._snackBar.open('Successfully deleted', 'Close', {
          duration: 4000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      },
      (error) => {
        this._snackBar.open('Error while deleting', 'Close', {
          duration: 4000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      }
    );
  }
}
