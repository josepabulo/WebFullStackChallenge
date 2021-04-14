import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DialogComponent } from 'src/app/component/dialog/dialog/dialog.component';

import { CategoryService } from '../category-service/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent {
  public list: any = [];
  public DELETE = {
    title: 'Are you sure you want to delete?',
    content: 'All data linked to this record will be deleted in a cascade.',
  };

  constructor(
    public service: CategoryService,
    public router: Router,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
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
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      data: { settings: this.DELETE },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
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
    });
  }
}
