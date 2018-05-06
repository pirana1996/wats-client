import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-create-answer',
  templateUrl: './create-answer.component.html',
  styleUrls: ['./create-answer.component.css']
})
export class CreateAnswerComponent implements OnInit {

  description: string;
  answerText: string;

  constructor() { }

  ngOnInit() {
    this.answerText = "abv";
  }

  createAnswer() {
    console.log("Form submited");
  }

}
