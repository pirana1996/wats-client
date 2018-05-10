import { ForumService } from './../../../forum/services/forum-service.service';
import { ReviewService } from './../../../reviews/services/review.service';
import { AuthService } from './../../../core/services/auth.service';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { User } from '../../../app/models/User';

@Component({
  selector: 'app-item-post',
  templateUrl: './item-post.component.html',
  styleUrls: ['./item-post.component.css']
})
export class ItemPostComponent implements OnInit {

  form: FormGroup;
  @Input() postForumQuestion = false;
  @Input() postForumAnswer = false;
  @Input() postReview = false;
  @Input() postReviewComment = false;
  @Input() parentId = null;
  @Output() posted: EventEmitter<any> = new EventEmitter();
  activeUser: User;

  constructor(
    private reviewService: ReviewService,
    private forumService: ForumService,
    private auth: AuthService,
    private formBuilder: FormBuilder,
  ) {
    this.activeUser = this.auth.authStateSource.value;
    this.auth.authStateChangeEmitted$.subscribe(user => this.activeUser = user);
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({description: ''});
  }

  preparePost(): string {
    return this.form.value.description;
  }

  public onPostClicked() {
    console.log('post clicked');
    if (this.postReview) {
      console.log('posting item...');
      const description = this.preparePost();
      this.reviewService.postReview(description, this.parentId).subscribe(it => {
        console.log('item posted:');
        console.log(it);
        if (it != null) {
          this.posted.emit(it);
        }
      });
    } else if (this.postReviewComment) {
      console.log('posting item...');
      const description = this.preparePost();
      this.reviewService.postReviewComment(description, this.parentId).subscribe(it => {
        console.log('item posted:');
        console.log(it);
        if (it != null) {
          this.posted.emit(it);
        }
      });
    } else if (this.postForumQuestion) {
      console.log('posting item...');
      const description = this.preparePost();
      this.forumService.postForumQuestion(description, this.parentId).subscribe(it => {
        console.log('item posted:');
        console.log(it);
        if (it != null) {
          this.posted.emit(it);
        }
      });
    }
  }

}
