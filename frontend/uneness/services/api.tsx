import axios from 'axios';
import Cookies from 'js-cookie';


// const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/v1/';
const API_BASE_URL = import.meta.env.REACT_APP_API_URL || 'http://localhost:8000/api/v1/';


export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // using cookies for auth
  headers: {
    'Content-Type': 'application/json',
    // 'Authorization': sessionStorage.getItem('token') ? `Token ${sessionStorage.getItem('token')}`: ' Token',
  },
});

// Only set header if token exists
const csrfToken = Cookies.get('csrftoken');
if (csrfToken) {
  api.defaults.headers.common['X-CSRFToken'] = csrfToken;
}

/**
 * Read the value of a cookie by name.
 * Returns null if the cookie is not found.
 */
// spaces might be an issue
// function getCookie(name) {
  // const cookieStr = document.cookie; // 'csrftoken=abc123; sessionid=xyz456'
  // const pairs = cookieStr.split('; ').map(c => c.split('='));
  // for (const [key, val] of pairs) {
    // if (key === name) {
      // return decodeURIComponent(val);
    // }
  // }
  // return null;
//}
