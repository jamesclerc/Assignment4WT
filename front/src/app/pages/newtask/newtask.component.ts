import { Component, OnInit } from '@angular/core';
import {TasklistService} from '../../tasklist.service';
import { ActivatedRoute } from '@angular/router';
import {Params, Router} from '@angular/router';
import { Task } from 'src/app/models/task.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-newtask',
  templateUrl: './newtask.component.html',
  styleUrls: ['./newtask.component.scss']
})
export class NewtaskComponent implements OnInit {

  constructor(private tasklistService: TasklistService, private route: ActivatedRoute, private router: Router) { }
  
  users: User;
  datemin: string;
  showpopup: string;

  ngOnInit(): void {
    
    this.tasklistService.getUsers().subscribe((user: User) => {
      this.users = user;
    })

    this.datemin = new Date().toJSON().split('T')[0];
    this.showpopup = "display: none;"
  }

  createTask(title: string, desc: string, userId: string, date: string) {
    if (date && title && desc && userId) {
      this.tasklistService.createTask(title, desc, userId, date).subscribe((newtask: Task) => {
        this.router.navigate(["../"], {relativeTo: this.route})
      })
    } else {
      
      this.showpopup = "display: block";
    }
  }

  hidepopup(){
    this.showpopup = "display: none";
  }

}
