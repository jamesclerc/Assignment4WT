import { Component, OnInit } from '@angular/core';
import {TasklistService} from '../../tasklist.service';
import { ActivatedRoute } from '@angular/router';
import {Params, Router} from '@angular/router';
import { Task } from 'src/app/models/task.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-edittask',
  templateUrl: './edittask.component.html',
  styleUrls: ['./edittask.component.scss']
})
export class EdittaskComponent implements OnInit {

  constructor(private tasklistService: TasklistService, private route: ActivatedRoute, private router: Router) { }

  users: User;
  datemin: string;
  showpopup: string;
  task: Task;
  taskId: string;
  taskDate: string;
  taskTitle: string;
  taskDesc: string;
  taskUserId: string;

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.taskId = params.taskId;
      }
    )
    // retrieve the users for the select option
    this.tasklistService.getUsers().subscribe((user: User) => {
      this.users = user;
    })

    this.tasklistService.getTasksById(this.taskId).subscribe((task: Task) => {
      this.task = task
      this.taskDate = this.task.completeBefore.toString().substring(0,10)
      this.taskTitle = this.task.title;
      this.taskDesc = this.task.desc;
      this.taskUserId = this.task.userId
    })
    
    //convert date for the input value
    this.datemin = new Date().toJSON().split('T')[0];
    //init of the popup
    this.showpopup = "display: none;"
  }

  //update a task by calling the patch updateTask if not, display the popup
  updateTask(title: string, desc: string, userId: string, date: string) {
    if (date && title && desc && userId) {
      this.tasklistService.updateTask(title, desc, userId, date, this.taskId).subscribe((newtask: Task) => {
        this.router.navigate(["../../"], {relativeTo: this.route})
      })
    } else {
      this.showpopup = "display: block";
    }
  }

  //on click on the cross btn of the popup, close it
  hidepopup(){
    this.showpopup = "display: none";
  }

}
