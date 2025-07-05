import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todos: any[] = [];
  task: string = '';

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.getTodos();
  }

  getTodos(): void {
    this.todoService.getTodos().subscribe(data => this.todos = data);
  }

  addTodo(): void {
    if (this.task) {
      this.todoService.addTodo({ task: this.task }).subscribe(() => {
        this.task = '';
        this.getTodos();
      });
    }
  }

  deleteTodo(id: number): void {
    this.todoService.deleteTodo(id).subscribe(() => this.getTodos());
  }
}
