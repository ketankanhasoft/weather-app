import { UsersActions } from '../actions/users.actions';
import { User } from '../model/user';

export interface AppState {
	users: Array<User>
}

export function UsersReducer(
	state: User[] = [], action: any
): any {
	// const { payload } = action;

	switch (action.type) {
		case UsersActions.GET_DAILY_WHETHER:
			return { ...state, daily: action.payload };

		case UsersActions.GET_HOURLY_WHETHER:
			return { ...state, hourly: action.payload };


		case UsersActions.GET_CITIES_LIST:
			return { ...state, cities: action.payload };

		default:
			return state;
	}
}
