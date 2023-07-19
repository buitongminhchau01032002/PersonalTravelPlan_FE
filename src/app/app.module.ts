import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RippleModule } from "primeng/ripple";
import { InputTextModule } from "primeng/inputtext";
import { InputNumberModule } from "primeng/inputnumber";
import { InputTextareaModule } from "primeng/inputtextarea";
import { DropdownModule } from "primeng/dropdown";
import { MultiSelectModule } from "primeng/multiselect";
import { CalendarModule } from "primeng/calendar";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./shared/header/header.component";
import { JourneyListComponent } from "./journeys/journey-list/journey-list.component";
import { JourneyCreateComponent } from "./journeys/journey-create/journey-create.component";
import { JourneyEditComponent } from "./journeys/journey-edit/journey-edit.component";

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        JourneyListComponent,
        JourneyCreateComponent,
        JourneyEditComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        BrowserAnimationsModule,
        RippleModule,
        ButtonModule,
        InputTextModule,
        InputNumberModule,
        InputTextareaModule,
        DropdownModule,
        MultiSelectModule,
        CalendarModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
