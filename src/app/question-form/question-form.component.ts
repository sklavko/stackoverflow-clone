import { Component } from '@angular/core';
import {Question, QuestionService} from "../question.service";

@Component({
  selector: 'question-form',
  templateUrl: './question-form.component.html',
  providers: [QuestionService],
  styleUrls: ['./question-form.component.css']
})

export class QuestionFormComponent {
  private title: string = "";
  private description: string = "";
  private tags: string[] = [];

  private titleWarn: boolean = false;
  private descriptionWarn: boolean = false;
  private tagsWarn: boolean = false;

  constructor(private questionService: QuestionService) {
  }

  private addTag(input: HTMLInputElement) {
    const value = input.value;

    if(value.trim()) {
      this.tags.push(value);
      input.value = "";
    }

    console.log(this.title);
  }

  private deleteTag(tag: string) {
    this.tags.splice(this.tags.indexOf(tag), 1);
  }

  private submitQuestion(inputTitle: HTMLInputElement, inputDescription: HTMLInputElement) {
    this.title = inputTitle.value;
    this.description = inputDescription.value;

    if (this.title.length < 16) {
      this.titleWarn = true;
      return;
    }

    if (this.description.length < 64) {
      this.descriptionWarn = true;
      return;
    }

    if (this.tags.length == 0) {
      this.tagsWarn = true;
      return;
    }

    let question = new Question(null, this.title, this.description, this.tags, 0, 0, 0, null);

    this.questionService.addQuestion(question).subscribe(
      question => console.log(question),
      error => console.log(error)
    );
  }

  private removeTitleWarn() {
    this.titleWarn = false;
  }

  private removeDescriptionWarn() {
    this.descriptionWarn = false;
  }

  private removeTagsWarn() {
    this.tagsWarn = false;
  }
}
