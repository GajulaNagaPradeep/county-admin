import { watchUserSearchParamUpdates, doSomething } from './searchUsersSaga';
import { getSearchParams } from '../selectors/userListSelector';
import { takeLatest, put, select } from 'redux-saga/effects';
import {
  USER_LIST_SET_PAGE,
  USER_LIST_SET_PAGE_SIZE,
  USER_LIST_SET_SORT,
  USER_LIST_SET_SEARCH,
  FETCH_USERS_API_CALL_REQUEST,
} from '../actions/actionTypes';

describe('sagas', () => {
  it('starts the worker fetch saga', () => {
    const gen = watchUserSearchParamUpdates();
    expect(gen.next().value).toEqual(
      takeLatest(
        [
          USER_LIST_SET_SEARCH,
          USER_LIST_SET_SORT,
          USER_LIST_SET_PAGE,
          USER_LIST_SET_PAGE_SIZE,
        ],
        doSomething
      )
    );
  });

  describe('when successful', () => {
    it('executes the happy-path saga', () => {
      const gen = doSomething();
      expect(gen.next().value).toEqual(select(getSearchParams));
      expect(gen.next(['Hello', 'Bye']).value).toEqual(
        put({
          type: FETCH_USERS_API_CALL_REQUEST,
          payload: ['Hello', 'Bye'],
        })
      );
      expect(gen.next().done).toBe(true);
    });
  });
});
