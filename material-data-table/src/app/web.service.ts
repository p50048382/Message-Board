import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, observeOn } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { error } from 'protractor';
@Injectable({
  providedIn: 'root',
})
export class WebService {
  BASE_URL = 'http://localhost:63145/api';

  private messagesStore: any = [];
  private messageSubject = new Subject();
  messages = this.messageSubject.asObservable();
  constructor(private http: HttpClient, private _snackbar: MatSnackBar) {
    // this.getMessages('');
    // this.getQuestions();
  }
  // * Using HTTP and Observable

  // *Using async and await
  getMessages(user) {
    user = user ? '/' + user : '';
    // console.log(user);
    this.http.get(this.BASE_URL + '/messages' + user).subscribe(
      (messages) => {
        this.messageSubject.next(messages);
        console.log(messages);
        this.messagesStore = messages;
        console.log(this.messagesStore);
        // this.messagesStore.push(messages);
      },
      (error) => {
        this.handleError('Unable to get messages.');
      }
    );
  }
  getQuestions() {
    this.http
      .get('http://localhost:63145/api/questions')
      .subscribe((questions) => {
        console.log(questions);
      });
  }
  async postMessage(message) {
    try {
      var response = await this.http
        .post(this.BASE_URL + '/messages', message)
        .toPromise();
      this.messagesStore.push(response);
      this.messageSubject.next(this.messagesStore);
      console.log(this.messagesStore);
      // this.messages.push(response);
    } catch (error) {
      this.handleError('Unable to post messages.');
    }
  }
  private handleError(error) {
    console.error(error);
    this._snackbar.open(error, 'close', {
      duration: 2000,
    });
  }
}
