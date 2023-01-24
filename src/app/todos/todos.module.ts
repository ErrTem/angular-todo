import { FooterComponent } from './components/footer/footer.component';
import { TodoComponent } from './components/todo/todo.component';
import { TodosService } from './services/todos.service';
import { Routes, RouterModule } from '@angular/router';
import { TodosComponent } from 'src/app/todos/components/todos/todos.component';
import { NgModule } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './components/main/main.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
    {
        path: '',
        component: TodosComponent
    }
]
@NgModule({
    declarations: [TodosComponent, HeaderComponent, MainComponent, TodoComponent,FooterComponent],
    imports: [RouterModule.forChild(routes), CommonModule],
    providers: [TodosService]
})

export class TodosModule { }