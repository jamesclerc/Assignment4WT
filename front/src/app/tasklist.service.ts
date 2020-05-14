import { Injectable } from '@angular/core';

import { WebRequestService } from './web-request.service';

import { Task } from './models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TasklistService {
  constructor(private webRequestService: WebRequestService) {}

  //create a task using all the fileds
  createTask(
    title: string,
    desc: string,
    userId: string,
    priority: string,
    date: string
  ) {
    console.log(date);
    return this.webRequestService.post(`tasks`, {
      title,
      userId,
      desc,
      date,
      priority,
    });
  }

  //get the tasks
  getTasks() {
    return this.webRequestService.get(`tasks`);
  }

  //get a task by id
  getTasksById(taskId: string) {
    return this.webRequestService.get(`tasks/${taskId}`);
  }

  //get all the users
  getUsers() {
    return this.webRequestService.get('user');
  }

  //get one user
  getUser(userId: string) {
    return this.webRequestService.get(`user/${userId}`);
  }

  //update a task
  updateTask(
    title: string,
    desc: string,
    userId: string,
    date: string,
    taskId: string
  ) {
    return this.webRequestService.patch(`tasks/${taskId}`, {
      title,
      desc,
      userId,
      date,
    });
  }

  //set complete boolean to !complete
  completeTask(task: Task) {
    return this.webRequestService.patch(`tasks/${task._id}`, {
      completed: !task.completed,
    });
  }

  //delete a task
  deleteTask(taskId: string) {
    return this.webRequestService.delete(`tasks/${taskId}`);
  }
}
