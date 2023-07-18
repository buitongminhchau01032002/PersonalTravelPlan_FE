import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JourneyListComponent } from './journeys/journey-list/journey-list.component';
import { JourneyEditComponent } from './journeys/journey-edit/journey-edit.component';
import { JourneyCreateComponent } from './journeys/journey-create/journey-create.component';

const routes: Routes = [
    { path: '', component: JourneyListComponent },
    { path: 'create', component: JourneyCreateComponent },
    { path: 'edit/:id', component: JourneyEditComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
