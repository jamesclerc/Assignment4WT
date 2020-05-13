import { Component, OnInit } from '@angular/core';
import {TasklistService} from "./../../tasklist.service"
import {ActivatedRoute} from '@angular/router';
import {Params} from '@angular/router';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {

  constructor(private tasklistService: TasklistService, private route: ActivatedRoute) { }
  lists: any;
  tasks: Task;

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      console.log(params)
      this.tasklistService.getTasks(params.listId).subscribe((tasks: any) => {
        this.tasks = tasks;
      })
    })

    this.tasklistService.getLists().subscribe((lists: any) => {
      this.lists = lists;
    })
  }

  onTaskCliked(task: Task) {
    this.tasklistService.completeTask(task).subscribe((status: any)=>{
      console.log(status)
      task.completed = !task.completed;
    })
  }

}
