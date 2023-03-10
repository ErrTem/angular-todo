import { FilterEnum } from './../../types/filter.enum';
import { TodosService } from './../../services/todos.service';
import { TodoInterface } from './../../types/todo.interface';
import { Component } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { map, catchError } from 'rxjs/operators'
@Component({
    selector: 'app-todos-main',
    templateUrl: './main.component.html'
})

export class MainComponent {
    visibleTodos$: Observable<TodoInterface[]>;
    noTodoClass$: Observable<boolean>;
    isAllTodosSelected$: Observable<boolean>;
    editingId: string | null = null;

    constructor(private todosService: TodosService) {
        this.isAllTodosSelected$ = this.todosService.todos$.pipe(
            map((todos) => todos.every(todo => todo.isCompleted))
        );

        this.noTodoClass$ = this.todosService.todos$.pipe(
            map((todos) => todos.length === 0))

        this.visibleTodos$ = combineLatest(
            this.todosService.todos$,
            this.todosService.filter$
        ).pipe(
            map(([todos, filter]: [TodoInterface[], FilterEnum]) => {
                if (filter === FilterEnum.active) {
                    return todos.filter(todo => !todo.isCompleted)
                } else if (filter === FilterEnum.completed) {
                    return todos.filter(todo => todo.isCompleted)
                }
                console.log('combine', todos, filter);
                return todos;
            })
        );
    }
    toggleAllTodos(event: Event) : void {
        const target = event.target as HTMLInputElement
        this.todosService.toggleAll(target.checked)
    }
    setEditingId(editingId:  string | null) :void {
        this.editingId = editingId
    }
}