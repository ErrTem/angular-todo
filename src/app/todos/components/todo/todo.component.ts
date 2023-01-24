import { TodosService } from './../../services/todos.service';
import { TodoInterface } from './../../types/todo.interface';
import { Component, Input, Output, EventEmitter, OnInit, ViewChild, ElementRef, OnChanges, SimpleChanges } from '@angular/core';

@Component({
    selector: 'app-todos-todo',
    templateUrl: './todo.component.html'
})

export class TodoComponent implements OnInit, OnChanges {
    @Input('todo') todoProps!: TodoInterface;
    @Input('isEditing') isEditingProps!: boolean;
    @Output('setEditingId') setEditingIdEvent: EventEmitter<string | null> = new EventEmitter()

    editingText: string = '';
    @ViewChild('textInput') textInput!: ElementRef

    constructor(private todosService: TodosService) {

    }

    ngOnInit(): void {
        this.editingText = this.todoProps.text
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.isEditingProps.currentValue) {
            setTimeout(() => {
                this.textInput.nativeElement.focus()
            }, 0)

        }

    }
    setTodoInEditMode(): void {
        console.log('setTodoInEditMode')
        this.setEditingIdEvent.emit(this.todoProps.id)
    }
    removeTodo(): void {
        console.log('aaaaaaaaaaaaaaaa')
        this.todosService.removeTodo(this.todoProps.id)
    }
    toggleTodo(): void {
        console.log('toggleTodo')
        this.todosService.toggleTodo(this.todoProps.id)
    }
    changeText(event: Event): void {
        const value = (event.target as HTMLInputElement).value
        this.editingText = value
        console.log('change text')
    }
    changeTodo(): void {
        console.log('change todo', this.editingText)
        this.todosService.changeTodo(this.todoProps.id, this.editingText)
        this.setEditingIdEvent.emit(null)
    }
}
