import Keycloak from 'keycloak-js';
import { AxiosRequestConfig } from 'axios';
import { getUserFromToken } from '../../utils/AuthUtils'

import { Base64 } from 'js-base64';

export const keycloak = Keycloak(process.env.PUBLIC_URL + "/keycloak.json");

export function getToken(): string {
    return keycloak.token || '';
}

export function getLoggedUser(): string {
  return getUserFromToken(window.localStorage.token);
}

export const isAuthenticated = () => keycloak.token !== null && keycloak.token !== undefined;

export const init = async (
    onLoad: any,
    flow: any,
    succesfn?: (value: boolean) => any,
    errorfn?: (error: any) => any
  ) => {
    const defaultAuthRoutine = (authenticated: boolean) => {
      const token: any = keycloak.token
      window.localStorage.setItem('token', token)
      if (succesfn) {
        return succesfn(authenticated)
      }
    }
  
    const defaultErrorRoutine = (error: any) => {
      if (errorfn) {
        return errorfn(error)
      }
    }
  
    return keycloak
      .init({ onLoad, flow, checkLoginIframe: true })
      .success(defaultAuthRoutine)
      .error(defaultErrorRoutine)
}

export const logout = () => {

    keycloak.logout(
        { redirectUri: process.env.REACT_APP_API_REDIRECT || "http://localhost:3000" }
    )
};

export function setHeaderOnConfig(config: AxiosRequestConfig) {
    config.headers.Authorization = `Bearer ${keycloak.token}`;
    return config;
}
