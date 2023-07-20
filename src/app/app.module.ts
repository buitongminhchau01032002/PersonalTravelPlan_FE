import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { JourneyListComponent } from './journeys/journey-list/journey-list.component';
import { JourneyCreateComponent } from './journeys/journey-create/journey-create.component';
import { JourneyEditComponent } from './journeys/journey-edit/journey-edit.component';
import { JourneyService } from './journeys/journey.service';
import { StatusBadgeComponent } from './shared/components/status-badge/status-badge.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        JourneyListComponent,
        JourneyCreateComponent,
        JourneyEditComponent,
        StatusBadgeComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        RippleModule,
        ButtonModule,
        InputTextModule,
        InputNumberModule,
        InputTextareaModule,
        DropdownModule,
        MultiSelectModule,
        CalendarModule,
        TableModule,
        PaginatorModule,
        ProgressSpinnerModule,
    ],
    providers: [JourneyService],
    bootstrap: [AppComponent],
})
export class AppModule {}
