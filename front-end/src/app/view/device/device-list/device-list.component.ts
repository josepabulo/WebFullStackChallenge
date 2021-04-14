import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DialogComponent } from 'src/app/component/dialog/dialog/dialog.component';

import { DeviceService } from '../device-service/device.service';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css'],
})
export class DeviceListComponent {
  public list: any = [];
  public DELETE = {
    title: 'Are you sure you want to delete?',
    content: 'You will not be able to retrieve the record later.',
  };

  constructor(
    public service: DeviceService,
    public router: Router,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  public dataSource = new MatTableDataSource<any>();
  public displayedColumns: string[] = [
    'id',
    'category',
    'color',
    'partNumber',
    'action',
  ];

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
