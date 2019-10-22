import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieListComponent } from './movie/movie-list/movie-list.component';
import { MovieDetailComponent } from './movie/movie-detail/movie-detail.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FavouriteMoviesComponent } from './movie/favourite-movies/favourite-movies.component';
import { AuthGuard } from './user/auth.guard';
import { SigninComponent } from './user/signin/signin.component';
import { SignupComponent } from './user/signup/signup.component';
import { MovieResolver } from './movie/resolver/movie.resolver.service';
import { FavouriteMovieResolver } from './movie/resolver/favourite-movies.resolver.services';

const routes: Routes = [
  { path:'movies', component: MovieListComponent },
  { path:'movies/:objectId', component: MovieDetailComponent, resolve: {movieResolved:MovieResolver} },
  { path:'signup', component: SignupComponent},
  { path:'signin', component: SigninComponent },
  { path:'favourites', canActivate: [AuthGuard], component: FavouriteMoviesComponent, resolve: {favouriteMovieResolved:FavouriteMovieResolver} },
  { path:'', redirectTo: 'movies', pathMatch: 'full' },
  { path:'notFound', component: PageNotFoundComponent },
  { path:'**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
