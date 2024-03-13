import { DATA_URL, Route, Method, ErrorText } from './constants.js';
import { createErrorLoad } from './message.js';

const load = (route, method = Method.GET, body = null) =>
  fetch(`${DATA_URL}${route}`, { method, body });

const getData = () => load(Route.GET_DATA_URL)
  .then((response) => {
    if (!response.ok) {
      throw new Error();
    }
    return response.json();
  })
  .catch(() => {
    createErrorLoad(ErrorText.GET_DATA);
  });

export { getData };
