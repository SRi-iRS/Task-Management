import { Injectable } from '@nestjs/common';
import { Tasks, TasksStatus } from './tasks.model';
import { TaskDto } from './dto/task.dto';
import { v1 as uuid } from 'uuid';
import {  filterTasksDto } from './dto/tasks_filter';


@Injectable()
export class TasksService {
    private tasks : Tasks[] = [];

    getAllTasks() : Tasks[] {
        return this.tasks;
    }

    getFilteredTasks(filterTasksDto : filterTasksDto) {
        const {status ,search} =filterTasksDto;
        let tasks = this.getAllTasks();

        if(status){
            return tasks.filter(task => task.status === status);
        }
        if(search){
            return tasks.filter(task =>
                task.title.includes(search) || task.description.includes(search)
            
            )
        }
        return tasks;
    }

    findTaskById(id : string) : Tasks{
        return this.tasks.find((task)=> task.id === id)
    }

    createTasks(taskDto : TaskDto) : Tasks {
        const {title , description} = taskDto;

        const task: Tasks= {
            id : uuid() ,
            title,
            description,
            status : TasksStatus.OPEN
        }

        this.tasks.push(task);
        return task;
    }

    deleteTaskById(id : string) : Tasks[]{
        const elementToRemove = this.tasks.findIndex((element) => element.id === id);
        this.tasks.splice(elementToRemove, 1);
        return this.tasks;
    }

    updateStatus(id: string, status : TasksStatus) : Tasks{
        const task = this.findTaskById(id);
        task.status = status;
        return task;
        //return this.tasks[elementToRemove];
    }

}
