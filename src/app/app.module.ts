import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RippleModule } from 'primeng/ripple';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { JourneyListComponent } from './journeys/journey-list/journey-list.component';
import { JourneyCreateComponent } from './journeys/journey-create/journey-create.component';
import { JourneyEditComponent } from './journeys/journey-edit/journey-edit.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        JourneyListComponent,
        JourneyCreateComponent,
        JourneyEditComponent,
    ],
    imports: [BrowserModule, AppRoutingModule, ButtonModule, BrowserAnimationsModule, RippleModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
