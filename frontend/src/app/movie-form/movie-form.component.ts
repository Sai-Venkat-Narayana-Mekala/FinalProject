import { Component } from '@angular/core';
import { MovieService } from '../movie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css']
})
export class MovieFormComponent {
  movie = {
    title: '',
    year: '',
    genre: '',
    director: '',
    rating: ''
  };

  constructor(private movieService: MovieService, private router: Router) {}

  onSubmit(): void {
    this.movieService.addMovie(this.movie).subscribe(() => {
      this.router.navigate(['/movies']);
    });
  }
}
