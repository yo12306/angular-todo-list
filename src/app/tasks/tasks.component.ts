import { Component, computed, input, output, signal } from '@angular/core';
import { TaskComponent } from './task/task.component';
import { Task } from './task/task.model';
import { NewTaskComponent } from './new-task/new-task.component';
import { type NewTask } from './new-task/new-task.model';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TaskComponent, NewTaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent {
  name = input.required<string | undefined>();
  userId = input.required<string | undefined>();
  form = output<string>();
  isAddingTask = signal<boolean>(false);
  tasks = signal<Task[]>([
    {
      id: 't1',
      userId: 'u1',
      title: 'Master Angular',
      summary:
        'Learn all the basic and advanced features of Angular & how to apply them.',
      dueDate: '2025-12-31',
    },
    {
      id: 't2',
      userId: 'u3',
      title: 'Build first prototype',
      summary: 'Build a first prototype of the online shop website',
      dueDate: '2024-05-31',
    },
    {
      id: 't3',
      userId: 'u3',
      title: 'Prepare issue template',
      summary:
        'Prepare and describe an issue template which will help with project management',
      dueDate: '2024-06-15',
    },
  ]);

  constructor() {
    const tasks = localStorage.getItem('tasks');
    if(tasks) {
      this.tasks.set(JSON.parse(tasks));
    }
  }
  selectedUserTask = computed(() => this.tasks().filter((task) => task.userId === this.userId()));

  onCompleteTask(id: string) {
    this.tasks.set(this.tasks().filter((task) => task.id != id));
    this.saveTasks();
  }

  onStartAddTask() {
    this.isAddingTask.set(true);
  }

  onCancelAddTask() {
    this.isAddingTask.set(false);
  }

  onAddTask(taskData: NewTask) {
    this.tasks.update((values) => [...values, {
      id: new Date().getTime().toString(),
      userId: this.userId(),
      title: taskData.title,
      summary: taskData.summary,
      dueDate: taskData.date,
    }]);
    this.isAddingTask.set(false);
    this.saveTasks();
  }

  private saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks()));
  }
}
