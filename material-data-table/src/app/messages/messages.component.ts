import { Component, OnInit } from '@angular/core';
import { WebService } from '../web.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit {
  // messages;
  constructor(public webService: WebService, private route: ActivatedRoute) {}

  ngOnInit() {
    // console.log(this.webService);
    // console.log(this.route);

    // console.log(this.route.snapshot.params.name);
    var name = this.route.snapshot.params.name;
    this.webService.getMessages(name);
    // this.webService.messages.subscribe((messages) => {
    //   this.messages = messages;
    //   console.log(messages);
    // });
  }
}
