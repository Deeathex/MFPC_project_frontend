import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AllModelLists, Director, Movie, Review, User} from '../model/models';
import {addMovieAndDirectorUrl, addReviewAndUserUrl, deadlockUrl, getMoviesAndDirectorsUrl, getReviewsAndUsersUrl, mainAPI} from './urls';

import {v4 as uuidv4} from 'uuid';

@Injectable({providedIn: 'root'})
export class Service {
  constructor(private http: HttpClient) {
  }

  async addMovieForDirector(directorId: string, movie: Movie, director: Director) {
    return await this.http.post(`${mainAPI}director/${directorId}/movie`, {movie, director}).toPromise();
  }

  async getMoviesAndDirectors() {
    return await this.http.get<AllModelLists>(getMoviesAndDirectorsUrl).toPromise();
  }

  async getReviewsAndUsers() {
    return await this.http.get<AllModelLists>(getReviewsAndUsersUrl).toPromise();
  }

  async addMovieAndDirector(movie: Movie, director: Director) {
    return await this.http.post(addMovieAndDirectorUrl, {movie, director}).toPromise();
  }

  async addReviewAndUser(review: Review, user: User) {
    return await this.http.post(addReviewAndUserUrl, {review, user}).toPromise();
  }

  async deleteMovieAndDirector(movieId: string, directorId: string) {
    return await this.http.delete(`${mainAPI}movie/${movieId}/director/${directorId}`).toPromise();
  }

  async deleteReviewAndUser(reviewId: string, userId: string) {
    return await this.http.delete(`${mainAPI}review/${reviewId}/user/${userId}`).toPromise();
  }

  async performDeadlock(directors: Director[], users: User[]) {
    return await this.http.post(deadlockUrl, {directors, users}).toPromise();
  }

  generateId() {
    return uuidv4();
  }
}
