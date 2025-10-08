import { AxiosResponse } from "axios";

export function storeCookie(res: AxiosResponse): void {
    // different storage options for cookies 
    // kept for learning purposes
    document.cookie = `token=${res?.data.token}; path=/; secure=true; httponly=true; samesite=Lax`;
    localStorage.setItem('token', res?.data.token);
    sessionStorage.setItem('token', res?.data.token);
}


export function deleteCookie(
  name: string,
  path: string = '/',
  domain?: string
): void {
  const data = new Date().toUTCString();
  let cookieStr: string = `${name}=; Path=${path}; Expires=${data};`
  if (domain) {
    cookieStr += ` Domain=${domain};`
  }
  document.cookie = cookieStr
}

// Remove all token; if exists
export function clearAllCookies(): void {
  document.cookie
    .split(';')
    .forEach(cookie => {
        const name: string = cookie.split('=')[0].trim();
        const data: string = new Date().toUTCString();
      document.cookie = `${name}=; Path=/; Expires=${data};`;
    });
}
