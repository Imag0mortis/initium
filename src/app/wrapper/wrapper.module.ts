import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { TableComponent } from './table/table.component';
import { ModalComponent } from './modal/modal.component';
import { WrapperComponent } from './wrapper.component';
import {TuiTableModule} from '@taiga-ui/addon-table';
import { TuiCheckboxModule, TuiInputModule, TuiInputPhoneModule, TuiTagModule } from '@taiga-ui/kit';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiButtonModule } from '@taiga-ui/core';



@NgModule({
  declarations: [
    LayoutComponent,
    TableComponent,
    ModalComponent,
    WrapperComponent,
  ],
  imports: [
    CommonModule,
    TuiTableModule,
    TuiTagModule,
    FormsModule,
    ReactiveFormsModule,
    TuiCheckboxModule,
    TuiInputModule,
    TuiInputPhoneModule,
    TuiButtonModule,
  ]
})
export class WrapperModule { }
