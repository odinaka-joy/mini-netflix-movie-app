import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IMovie } from '../movie';
import { MovieService } from '../services/movie.service';
import { FavouriteMoviesService } from '../services/favourite-movies.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  obj = [];
  movId = [];
  isFavourite:boolean;
  pageTitle:string = '';
  movie: any;
  movieId:string;
  userId = localStorage.getItem('userId');
  errorMessage = '';
  allMovieId = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private movieService: MovieService,
              private favouriteMovieService: FavouriteMoviesService) {
                this.movie = this.route.snapshot.data['movieResolved'];
  }

  ngOnInit() {
    // const movieResolved = this.route.snapshot.data['movieResolved'];
    const param = this.route.snapshot.paramMap.get('objectId');
    if (param) {
      this.movieService.getMovies().subscribe({
        next: movies => {
          movies.forEach((movie) => {
            this.allMovieId.push(movie.objectId);
          })
        if (this.allMovieId.indexOf(param) === -1) {
            this.router.navigate(['/notFound']);
         } else {
           this.getMovie(param);
         }
        }
      })
    }
    if (!this.userId) {
      this.errorMessage='Please Login To Add Movie To Favourite';
    }
  }

  getMovie(objectId: string) {
    this.movieService.getMovie(objectId).subscribe({
      next: movie => {
        this.favouriteMovieService.getFavMovies(this.userId).subscribe(
          (favMovies) => {
            favMovies.forEach((favMovie) => {
              this.movId.push(favMovie.movieId);
            })
            if(this.movId.indexOf(movie.objectId) === -1) {
              this.isFavourite = false;
              this.movie = movie;
            } else {
              this.isFavourite = true;
              this.errorMessage = "This Is One Of Your Favourite Movies";
              this.movie = movie;
            }
          }
        )
        this.movie = movie;
      },
      error: err => this.errorMessage = err
    });
    this.pageTitle = this.movie.title;
  }

  data = {
    movieId: this.route.snapshot.paramMap.get('objectId'),
    userId: localStorage.getItem('userId')
  }

  addToFavourite():void {
    this.favouriteMovieService.addFavMovies(this.data).subscribe(
      result => {
        this.errorMessage = 'Yeeeeee, Movie Has Been Added To Favourite'
      },
      error => {
        if(localStorage.getItem('userId')) {
          this.errorMessage = 'Yeeeeee, Movie Has Been Added To Favourite'
        } else {
          this.errorMessage = 'Sorry, An Error Occured Adding To Favourite Movie. Ensure You Are Logged In and Try again. \n'+ error;
        }
      }
    );
  }

  onBack(): void {
    this.router.navigate(['/movies']);
  }
}
