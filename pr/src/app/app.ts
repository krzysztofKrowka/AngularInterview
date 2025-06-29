import { ChangeDetectionStrategy, Component, Inject, inject, NgModule, signal } from '@angular/core';
import { PeriodicTableStore } from './store';
import { CommonModule } from '@angular/common';
import { MatFormField, MatFormFieldControl, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatDivider, MatList, MatListItem, MatListModule, MatListOption } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, NgModel } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { DialogData, EditType, PeriodicElement } from './data';

@Component({
  imports:[CommonModule,
    MatFormField,
    MatInput,
    MatSuffix,
    MatIcon,
    MatLabel,
    MatListModule,
    MatGridListModule,
    MatDivider,
    MatTableModule,
    FormsModule
  ],
  templateUrl: './app.html',
  styleUrl:'./app.css',
  providers: [PeriodicTableStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "app-root"
})
export class App {
  readonly store = inject(PeriodicTableStore);
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  ngOnInit() {

    this.loadElements()

  }
  constructor(public dialog: MatDialog) {}
  editStart: boolean = false
  editType: EditType | undefined
  editValue: string = ''
  elementToEdit: PeriodicElement | null= null
  async loadElements(){
    await this.store.loadAll()
  }

  async editElement(element:PeriodicElement,type:EditType){

      this.elementToEdit = element
      this.editType = type
      this.openDialog()
  }

  async saveEdit(){
      if(this.editValue == ""){
        this.editType = undefined
        this.editValue = ""
        return
      }
      if(this.elementToEdit && this.editType){
        await this.store.editElement(this.elementToEdit,this.editValue,this.editType)
        this.editType = undefined
        this.editValue = ""
        this.elementToEdit = null
      }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(EditPopUp, {
      width: '250px',
      data: {type: this.editType, value: this.editValue}
    });

    dialogRef.afterClosed().subscribe(async result => {
      console.log('The dialog was closed');
      this.editValue = result || "";
      await this.saveEdit()
    });
  }
}


@Component({
  imports:[MatFormField,
    MatButton,
    MatDialogActions,
    MatInput,
    MatDialogClose,
    CommonModule,
    FormsModule
  ],
  selector: 'edit-popup',
  templateUrl: './edit-popup.html',
  styleUrl: './edit-popup.css'
})
export class EditPopUp {

  constructor(
    public dialogRef: MatDialogRef<EditPopUp>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
