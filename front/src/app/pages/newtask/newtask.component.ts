import { Component, OnInit } from '@angular/core';
import {TasklistService} from '../../tasklist.service';
import { ActivatedRoute } from '@angular/router';
import {Params, Router} from '@angular/router';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-newtask',
  templateUrl: './newtask.component.html',
  styleUrls: ['./newtask.component.scss']
})
export class NewtaskComponent implements OnInit {

  constructor(private tasklistService: TasklistService, private route: ActivatedRoute, private router: Router) { }

  listId: string;

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.listId = params["listId"];
    })
  }

  createTask(title: string) {
    this.tasklistService.createTask(title, this.listId).subscribe((newtask: Task) => {
      this.router.navigate(["../"], {relativeTo: this.route})
    })
  }

}
