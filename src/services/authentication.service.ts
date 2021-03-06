// adapted from https://jasonwatmore.com/post/2019/04/06/react-jwt-authentication-tutorial-example#authentication-service-js
import { BehaviorSubject } from 'rxjs';

import { config } from '../config';
import { handleResponse } from './utils';

const localStorageCurrentUser = localStorage.getItem('currentUser');
const currentUserSubject = localStorageCurrentUser
  ? new BehaviorSubject(JSON.parse(localStorageCurrentUser))
  : new BehaviorSubject(null);

export const authenticationService = {
  login,
  logout,
  register,
  currentUser: currentUserSubject.asObservable(),
  get currentUserValue() {
    return currentUserSubject.value;
  },
};

function login(email: string, password: string) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  };

  return fetch(`${config.API_URL}/api/login`, requestOptions)
    .then(handleResponse)
    .then((user) => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('currentUser', JSON.stringify(user));
      currentUserSubject.next(user);

      return user;
    });
}

function register(name: string, email: string, password: string) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  };

  return fetch(`${config.API_URL}/api/register`, requestOptions)
    .then(handleResponse)
    .then((data) => {
      return data;
    });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('currentUser');
  currentUserSubject.next(null);
}
