import { Params, Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { User } from 'src/app/models/user.model';

import { TasklistService } from './../../tasklist.service';
import { Task } from './../../models/task.model';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.scss'],
})
export class ViewTaskComponent implements OnInit {
  constructor(
    private tasklistService: TasklistService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  user: User;
  datemin: string;
  showpopup: string;
  task: Task;
  taskId: string;
  taskDate: string;
  taskTitle: string;
  taskDesc: string;
  taskUserId: string;

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.taskId = params.taskId;
    });

    //get a task by id and fill all the fields
    this.tasklistService.getTasksById(this.taskId).subscribe((task: Task) => {
      this.task = task;
      this.taskDate = this.task.completeBefore.toString().substring(0, 10);
      this.taskTitle = this.task.title;
      this.taskDesc = this.task.desc;
      this.taskUserId = this.task.userId;
      this.tasklistService.getUser(this.task.userId).subscribe((user: User) => {
        this.user = user;
      });
    });

    this.datemin = new Date().toJSON().split('T')[0];
    this.showpopup = 'display: none;';
  }
}
