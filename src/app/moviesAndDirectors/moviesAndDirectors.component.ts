import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Director, Movie, User} from '../model/models';
import {Service} from '../service/service';

@Component({
  templateUrl: 'moviesAndDirectors.component.html',
  styleUrls: ['../app.component.css']
})
export class MoviesAndDirectorsComponent implements OnInit {
  moviesDisplayedColumns = ['ID', 'title', 'directors'];
  directorsDisplayedColumns = ['ID', 'name', 'nationality'];

  moviesTableDataSource = new MatTableDataSource<Movie>([]);
  directorsTableDataSource = new MatTableDataSource<Director>([]);

  movies: Movie[] = [];
  directors: Director[] = [];

  inputMovieTitle: string;
  inputDirectorName: string;
  inputDirectorNationality: string;
  inputMovieId: string;
  inputDirectorId: string;

  constructor(private service: Service) {
  }

  ngOnInit() {
    this.populateTable().then();
  }

  async addMovieAndDirector() {
    const director: Director = {
      id: this.service.generateId(),
      name: this.inputDirectorName,
      nationality: this.inputDirectorNationality,
    };

    const directorsForMovie: Director[] = [];
    directorsForMovie.push(director);

    const movie: Movie = {
      id: this.service.generateId(),
      title: this.inputMovieTitle,
      directors: directorsForMovie,
    };

    await this.service.addMovieAndDirector(movie, director);
  }
  async deleteMovieAndDirector() {
    await this.service.deleteMovieAndDirector(this.inputMovieId, this.inputDirectorId);
  }

  async performDeadlock() {
    const director1: Director = {
      id: this.service.generateId(),
      name: 'Director name deadlock',
      nationality: 'Director nationality deadlock',
    };

    const director2: Director = {
      id: this.service.generateId(),
      name: 'Director name deadlock',
      nationality: 'Director nationality deadlock',
    };

    const directors: Director[] = [];
    directors.push(director1);
    directors.push(director2);

    const user1: User = {
      id: this.service.generateId(),
      name: 'User name deadlock',
      email: 'User name email',
    };

    const user2: User = {
      id: this.service.generateId(),
      name: 'User name deadlock',
      email: 'User name email',
    };

    const users: User[] = [];
    users.push(user1);
    users.push(user2);

    await this.service.performDeadlock(directors, users);
  }

  async populateTable() {
    const {movies, directors} = await this.service.getMoviesAndDirectors();
    this.movies = [...movies];
    this.moviesTableDataSource = new MatTableDataSource<Movie>(this.movies);
    this.directors = [...directors];
    this.directorsTableDataSource = new MatTableDataSource<Director>(this.directors);
  }
}
