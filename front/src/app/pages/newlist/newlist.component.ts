import { Component, OnInit } from '@angular/core';
import {TasklistService} from '../../tasklist.service';
import { Router } from '@angular/router';
import { List } from 'src/app/models/list.model';

@Component({
  selector: 'app-newlist',
  templateUrl: './newlist.component.html',
  styleUrls: ['./newlist.component.scss']
})
export class NewlistComponent implements OnInit {

  constructor(private tasklistService: TasklistService, private router: Router) { }

  ngOnInit(): void {

  }

  createList(title: string) {
    this.tasklistService.createList(title).subscribe((response: List) => {
      console.log(response);
      this.router.navigate([ '/lists', response._id]); 
    });
  }

}
