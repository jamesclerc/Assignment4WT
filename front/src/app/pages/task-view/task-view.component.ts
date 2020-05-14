import { Component, OnInit } from '@angular/core';
import { TasklistService } from './../../tasklist.service';
import { ActivatedRoute } from '@angular/router';
import { Params } from '@angular/router';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss'],
})
export class TaskViewComponent implements OnInit {
  constructor(
    private tasklistService: TasklistService,
    private route: ActivatedRoute
  ) {}

  tasks: Task;

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      console.log(params);
      this.tasklistService.getTasks(params.listId).subscribe((tasks: any) => {
        this.tasks = tasks;
      });
    });
  }

  onTaskCliked(task: Task) {
    this.tasklistService.completeTask(task).subscribe((status: any) => {
      console.log(status);
      task.completed = !task.completed;
    });
  }

  onButtonDeleteClicked(task: Task) {
    this.tasklistService.deleteTask(task).subscribe((status: any) => {
      console.log(status);
    });
  }

  test(date: string){
    let x = new Date(date.substring(0,10)).getTime()
    let datenow = new Date().getTime();
    return ("day left " + Math.round(Math.abs((datenow - x) / 86400000)));
  }
}
