import { createFeatureSelector, createSelector } from '@ngrx/store';

import { TASKS_FEATURE_KEY } from './tasks.reducer';
import { ITaskBoard } from '../model/tasks.interface';

const selectTaskState = createFeatureSelector<ITaskBoard>(TASKS_FEATURE_KEY);

export const selectColumns = createSelector(selectTaskState, (state: ITaskBoard) => state.columns);
