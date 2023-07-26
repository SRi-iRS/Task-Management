import { Controller, Body, Post, Get, Param, Delete, Patch, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Tasks, TasksStatus } from './tasks.model';
import { TaskDto } from './dto/task.dto';
import {  filterTasksDto } from './dto/tasks_filter';

@Controller('tasks')
export class TasksController {
   constructor(private taskService : TasksService) {}

   @Get()
   getAllTasks(@Query() filters : filterTasksDto) : Tasks[] {
        if(Object.keys(filters).length){
            return this.taskService.getFilteredTasks(filters);
        }
        return this.taskService.getAllTasks(); 
   }

   @Get(':id')
   findTaskById(@Param('id') id : string) : Tasks{
        return this.taskService.findTaskById(id);
   }

   @Post()
   createTask(@Body() taskDto : TaskDto): Tasks {
        return this.taskService.createTasks(taskDto);
   }

   @Patch(':id/status')
   updateTask(@Param('id') id : string, @Body('status') status: TasksStatus){
       console.log("called");
        return this.taskService.updateStatus(id, status);
   }

   @Delete(':id')
   deleteById(@Param('id') id : string) : Tasks[]{
        return this.taskService.deleteTaskById(id);
   }

}
