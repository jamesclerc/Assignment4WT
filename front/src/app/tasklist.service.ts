import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';
import { Task } from './models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TasklistService {
  constructor(private webRequestService: WebRequestService) {}

  createTask(title: string, desc: string, userId: string, date: string) {
    console.log(date);
    return this.webRequestService.post(`tasks`, { title, userId, desc, date });
  }

  getTasks(userId: string) {
    return this.webRequestService.get(`tasks`);
  }

  getTasksById(taskId: string){
    return this.webRequestService.get(`tasks/${taskId}`)
  }

  getUsers() {
    return this.webRequestService.get('user');
  }

  updateTask(title: string, desc: string, userId: string, date: string, taskId: string){
    return this.webRequestService.patch(`tasks/${taskId}`, {title, desc, userId, date})
  }

  completeTask(task: Task) {
    return this.webRequestService.patch(`tasks/${task._id}`, {
      completed: !task.completed,
    });
  }

  deleteTask(task: Task) {
    console.log('delete button');
    return this.webRequestService.delete(`tasks/${task._id}`);
  }
}
