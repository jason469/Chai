import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuardService} from "../../../services/auth/auth-guard.service";
import {LocationComponent} from "./location/location.component";
import {GenerateComponent} from "./generate/generate.component";
import {CommandmentsComponent} from "./commandments/commandments.component";
import {ViewAllComponent} from "./viewCwimpies/view-all/view-all.component";
import {CwimpiesComponent} from "./cwimpies.component";

const routes: Routes = [
  {
    path: '', component: CwimpiesComponent,
    children: [
      {path: 'view-all', canActivate: [AuthGuardService], component: ViewAllComponent},
      {path: 'locations', canActivate: [AuthGuardService], component: LocationComponent},
      {path: 'generate', canActivate: [AuthGuardService], component: GenerateComponent},
      {path: 'commandments', canActivate: [AuthGuardService], component: CommandmentsComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CwimpiesRoutingModule {
}
