import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
// import { MatCardModule } from '@angular/material/card';
// import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatTableModule } from '@angular/material/table';
// import { MatPaginatorModule } from '@angular/material/paginator';
// import { MatSortModule } from '@angular/material/sort';
// import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from "@angular/material/core";
import { MatIconModule } from "@angular/material/icon";
// import { MatStepperModule } from '@angular/material/stepper';
// import {MatRadioModule} from '@angular/material/radio';
// import {MatCheckboxModule} from '@angular/material/checkbox';


const myModules =
    [
        MatToolbarModule,
        // MatCardModule,
        // MatButtonModule,
        // MatTableModule,
        // MatPaginatorModule,
        // MatSortModule,
        // MatDialogModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatIconModule,
        // MatStepperModule,
        // MatRadioModule
        // MatCheckboxModule

    ];

@NgModule({
    // declarations: [],
    imports: [...myModules,],
    exports: [...myModules],
    // providers: [],
})
export class MaterialModule { }