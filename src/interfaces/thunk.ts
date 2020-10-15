import {ThunkDispatch} from 'redux-thunk';
import {IStore} from './store';
import {ActionTypes} from '../actions/action_types';

export type AppThunkDispatch = ThunkDispatch<IStore, void, ActionTypes>;
