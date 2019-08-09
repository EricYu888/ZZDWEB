import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppListenerComponent } from './app-listener.component';
import { HighlightDirective } from './../../directives/highlight'
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        AppListenerComponent,
        HighlightDirective
    ],
    exports:
        [
            AppListenerComponent
        ]
})
export class AppListenerModule { }
