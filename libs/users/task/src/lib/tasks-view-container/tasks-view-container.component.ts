import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { PushPipe } from '@ngrx/component';

import { IColumn } from '@users/users/task/data-access';

import { TasksStore } from './tasks-list-container.store';
import { TasksSearchInputComponent } from '../tasks-search-input/tasks-search-input.component';
import { TasksViewComponent } from '../tasks-view/tasks-view.component';

@Component({
  selector: 'users-tasks-container',
  standalone: true,
  imports: [CommonModule, TasksViewComponent, MatButtonModule, PushPipe, TasksSearchInputComponent],
  templateUrl: './tasks-view-container.component.html',
  styleUrls: ['./tasks-view-container.component.scss'],
  providers: [TasksStore],
})
export class TasksContainerComponent {
  private readonly tasksStore = inject(TasksStore);

  public columns$ = this.tasksStore.columns$;
  public filteredColumn$ = this.tasksStore.filteredColumn$;

  public text = '';
  public columns!: IColumn[];

  public onUpdateColumns(event: { columns: IColumn[] }): void {
    this.tasksStore.updateLocalColumns(event.columns);
  }

  public deleteColumn(columnIndex: number) {
    this.tasksStore.deleteLocalColumn(columnIndex);
  }

  public addTask(event: { columnIndex: number; taskName: string }) {
    const { columnIndex, taskName } = event;
    this.tasksStore.addTaskToLocalColumn({ columnIndex, taskName });
  }

  public deleteTask(event: { columnIndex: number; taskName: string }) {
    this.tasksStore.deleteTask(event);
  }

  public onHandleSearchText(text: string): void {
    this.text = text;
    this.tasksStore.searchTask(this.text);
  }

  public onChangeColumnName({ columnIndex, columnName }: { columnIndex: number; columnName: string }): void {
    this.tasksStore.changeColumnName({ columnIndex, columnName });
  }
}
