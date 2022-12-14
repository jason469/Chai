import {Component, Input, OnInit} from '@angular/core';
import {Task} from "../../../../shared/models/models";
import {timeFormat} from "../../../../shared/constants/dateTimeFormats";

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent implements OnInit {
  @Input('taskData') task!: Task;
  startTime!:string
  endTime!:string

  constructor() { }

  ngOnInit(): void {
    this.startTime = new Date(this.task.startTime!).toLocaleTimeString('en-US', timeFormat)
    this.endTime = new Date(this.task.endTime!).toLocaleTimeString('en-US', timeFormat)
  }

}
