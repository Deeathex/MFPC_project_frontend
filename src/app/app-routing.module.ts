import {NgModule} from '@angular/core';

import {MoviesAndDirectorsComponent} from './moviesAndDirectors';
import {ReviewsAndUsersComponent} from './reviewsAndUsers';

import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {path: 'moviesAndDirectors', component: MoviesAndDirectorsComponent},
  {path: 'reviewsAndUsers', component: ReviewsAndUsersComponent},

  // otherwise redirect to home
  {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
