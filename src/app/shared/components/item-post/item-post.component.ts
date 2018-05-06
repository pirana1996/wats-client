import { ForumService } from './../../../forum/services/forum-service.service';
import { ReviewService } from './../../../reviews/services/review.service';
import { AuthService } from './../../../core/services/auth.service';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

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
  @Input() locationId = null;
  @Output() posted: EventEmitter<any> = new EventEmitter();

  constructor(
    private reviewService: ReviewService,
    private auth: AuthService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({description: ''});
  }

  preparePost(): {description: string, locationId: number, datePublished: Date} {
    const description = this.form.value.description;
    const datePublished = new Date();
    return {
      'description': description,
      'locationId': this.locationId,
      'datePublished': datePublished
    };
  }

  public onPostClicked() {
    console.log('post clicked');
    if (this.postReview) {
      console.log('posting review...');
      const reviewRequest = this.preparePost();
      console.log(reviewRequest);
      this.reviewService.postReview(reviewRequest).subscribe(it => {
        console.log('review posted:');
        console.log(it);
        this.posted.emit(it);
      });
    }
  }

}
