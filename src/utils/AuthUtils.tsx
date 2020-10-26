import { Base64 } from 'js-base64';

export function getUserFromToken(token: any): string {
    if (token != null && token !== '') {
      try {
        let tokenData = Base64.decode(token.split('.')[1]);
        let user = '';
        JSON.parse(tokenData, (key, value) => {
          if (key === 'preferred_username') {
            console.log('logged user = [' + key + ' ' + value + ']');
            user = value;
          }
        });
        return user;
      } catch (error) {
        console.log(error)
      }
    }
    return ''
}