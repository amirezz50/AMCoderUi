import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainHomeComponent } from './main-home/main-home.component';
import { HttpClientModule } from '@angular/common/http';
import { LoggedInGuard } from 'src/shared/logged-in.guard';
import { WebsiteComponent } from './website/website.component';

const routes: Routes = [

  { path: '', pathMatch: 'full', redirectTo: 'main-home' },
  //{ path: 'app-website', component: WebsiteComponent },
  {
    path: 'main-home', loadChildren: () => import('./main-home/main-home.module').then(m => m.MainHomeModule), runGuardsAndResolvers: 'always',
    canActivate: [LoggedInGuard]
  },


]


@NgModule({
  imports: [RouterModule.forRoot(routes),
    HttpClientModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
