import { config } from '../config';
import { authenticationService } from './authentication.service';
import { handleResponse } from './utils';

export const imageService = {
  list,
};

function authHeader() {
  // return authorization header with jwt token
  const currentUser = authenticationService.currentUserValue;
  if (currentUser && currentUser.accessToken) {
    return { Authorization: `Bearer ${currentUser.accessToken}` };
  } else {
    return {};
  }
}

function list() {
  const requestOptions = {
    method: 'GET',
    headers: Object.assign(authHeader(), { 'Content-Type': 'application/json' }),
  };

  return fetch(`${config.API_URL}/api/list`, requestOptions).then(handleResponse);
}
