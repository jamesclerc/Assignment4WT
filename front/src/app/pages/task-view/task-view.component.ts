import { Component, OnInit } from '@angular/core';
import { TasklistService } from './../../tasklist.service';
import { ActivatedRoute } from '@angular/router';
import { Params, Router } from '@angular/router';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss'],
})
export class TaskViewComponent implements OnInit {
  constructor(
    private tasklistService: TasklistService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  tasks: any;

  ngOnInit(): void {
    //retrieve all the task (user id is in the token inside the local storage)
    this.tasklistService.getTasks().subscribe((tasks: any) => {
      this.tasks = tasks;
    });
  }

  //complete a task
  onTaskCliked(task: Task) {
    this.tasklistService.completeTask(task).subscribe((status: any) => {
      console.log(status);
      task.completed = !task.completed;
    });
  }

  //delete a task
  onButtonDeleteClicked(taskId: string) {
    this.tasklistService.deleteTask(taskId).subscribe((status: any) => {
      this.tasks = this.tasks.filter(val => val._id !== taskId);
    });
  }

  //display the time left for a task
  dayLeft(date: string) {
    let x = new Date(date.substring(0, 10)).getTime();
    let datenow = new Date().getTime();
    return 'day left ' + Math.round(Math.abs((datenow - x) / 86400000));
  }

  //show the icon on the priority by adding the color
  getIconColor(task: Task) {
    let priorities = [
      { id: '1', color: 'green' },
      { id: '2', color: 'orange' },
      { id: '3', color: 'red' },
      { id: 'false', color: 'green' },
    ];
    for (let i = 0; i < 3; i++) {
      if (priorities[i].id == task.priority) return priorities[i].color;
    }
    return 'green';
  }
}
