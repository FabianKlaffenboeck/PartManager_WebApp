import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PartTableComponent} from "./part-table/part-table.component";

const routes: Routes = [
  {path: '', redirectTo: '/data', pathMatch: 'full'},
  {path: 'data', component: PartTableComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
