import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JourneyListComponent } from './journeys/journey-list/journey-list.component';
import { JourneyEditComponent } from './journeys/journey-edit/journey-edit.component';
import { JourneyCreateComponent } from './journeys/journey-create/journey-create.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';

const routes: Routes = [
    { path: '', redirectTo: '/journey', pathMatch: 'full' },
    { path: 'journey', component: JourneyListComponent },
    { path: 'journey/create', component: JourneyCreateComponent },
    { path: 'journey/edit/:id', component: JourneyEditComponent },
    { path: 'error', component: ErrorPageComponent },
    { path: 'login', component: LoginPageComponent },
    { path: 'register', component: RegisterPageComponent },
    { path: '**', pathMatch: 'full', component: ErrorPageComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
