import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Review, User} from '../model/models';
import {Service} from '../service/service';

@Component({
  templateUrl: 'reviewsAndUsers.component.html',
  styleUrls: ['../app.component.css']
})
export class ReviewsAndUsersComponent implements OnInit {
  reviewsDisplayedColumns = ['ID', 'comment', 'date', 'rating', 'user'];
  usersDisplayedColumns = ['ID', 'name', 'email'];

  reviewsTableDataSource = new MatTableDataSource<Review>([]);
  usersTableDataSource = new MatTableDataSource<User>([]);

  reviews: Review[] = [];
  users: User[] = [];

  inputReviewComment: string;
  inputReviewRating: number;
  inputUserName: string;
  inputUserEmail: string;
  inputReviewId: string;
  inputUserId: string;

  constructor(private service: Service) {
  }

  ngOnInit() {
    this.populateTable().then();
  }

  async addReviewAndUser() {
    const user: User = {
      id: this.service.generateId(),
      name: this.inputUserName,
      email: this.inputUserEmail,
    };

    const review: Review = {
      id: this.service.generateId(),
      comment: this.inputReviewComment,
      date: new Date(),
      rating: this.inputReviewRating,
      user,
    };

    await this.service.addReviewAndUser(review, user);
  }

  async deleteReviewAndUser() {
    await this.service.deleteReviewAndUser(this.inputReviewId, this.inputUserId);
  }

  async populateTable() {
    const {reviews, users} = await this.service.getReviewsAndUsers();
    this.reviews = [...reviews];
    this.reviewsTableDataSource = new MatTableDataSource<Review>(this.reviews);
    this.users = [...users];
    this.usersTableDataSource = new MatTableDataSource<User>(this.users);
  }
}
