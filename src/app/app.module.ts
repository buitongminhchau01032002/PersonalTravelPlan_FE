import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

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
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { JourneyListComponent } from './journeys/journey-list/journey-list.component';
import { JourneyCreateComponent } from './journeys/journey-create/journey-create.component';
import { JourneyEditComponent } from './journeys/journey-edit/journey-edit.component';
import { JourneyService } from './shared/services/journey.service';
import { StatusBadgeComponent } from './shared/components/status-badge/status-badge.component';
import { CurrencyService } from './shared/services/currency.service';
import { CountryService } from './shared/services/country.service';
import { MessageService } from 'primeng/api';
import { AfterDateValidatorDirective } from './shared/validator-directive/afterDateValidator.directive';
import { GreaterThanValidator } from './shared/validator-directive/greaterThanValidator.directive';
import { DurationValidator } from './shared/validator-directive/durationValidator.directive';
import { DurationMatchDateValidator } from './shared/validator-directive/durationMatchDateValidator.directive';
import { ErrorPageComponent } from './error-page/error-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { AuthService } from './shared/services/auth.service';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        JourneyListComponent,
        JourneyCreateComponent,
        JourneyEditComponent,
        StatusBadgeComponent,
        AfterDateValidatorDirective,
        GreaterThanValidator,
        DurationValidator,
        DurationMatchDateValidator,
        ErrorPageComponent,
        LoginPageComponent,
        RegisterPageComponent,
    ],
    imports: [
        BrowserModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient],
            },
        }),
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
        ToastModule,
        TooltipModule,
    ],
    providers: [JourneyService, CurrencyService, CountryService, MessageService, AuthService],
    bootstrap: [AppComponent],
})
export class AppModule {}
