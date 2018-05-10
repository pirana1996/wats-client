import { ForumService } from './../../services/forum-service.service';
import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Answer} from '../../models/Answer';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {

  @Input() answer: Answer;
  @Output() notLoggedin = new EventEmitter<any>();

  constructor(private forumService: ForumService) { }

  ngOnInit() {
  }

  onLikeClicked() {
    this.forumService.likeForumAnswer(this.answer.id).subscribe(liked => {
      if (liked === true) {
        this.answer.numLikes++;
      } else if (liked === false) {
        this.answer.numLikes--;
      } else if (liked === null) {
        this.notLoggedin.emit();
      }
    });
  }

}
