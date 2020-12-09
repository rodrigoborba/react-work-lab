import { Base64 } from 'js-base64';

export function getUserFromToken(token: any): string {
    return getKeyFromToken('preferred_username', token)
}

export function getCNPJFromToken(token: any): string {
  return getKeyFromToken('cnpj', token)
}

export function getKeyFromToken(chave: string, token: any): string {
  if (token != null && token !== '') {
    try {
      let tokenData = Base64.decode(token.split('.')[1]);
      let valorChave = '';
      JSON.parse(tokenData, (key, value) => {
        if (key === chave) {
          valorChave = value;
        }
      });
      return valorChave;
    } catch (error) {
      console.log(error)
    }
  }
  return ''
}
