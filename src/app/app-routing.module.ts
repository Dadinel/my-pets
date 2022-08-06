import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'owners', loadChildren: () => import('./features/owners/owners.module').then(m => m.OwnersModule)},
  { path: 'pets', loadChildren: () => import('./features/pets/pets.module').then(m => m.PetsModule)},
  { path: 'home', loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule)},
  { path: '', loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
