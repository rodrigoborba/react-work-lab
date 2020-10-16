import Keycloak from 'keycloak-js';
import { AxiosRequestConfig } from 'axios';

const ENDPOINT_API_ISKEY = 'http://s2iisg04/bn.s267.autorizador.rest.api/'
const CODIGO_SISTEMA = 'S549'
export const TOKEN_KEY = "@bnb-Auth-Token";
export const keycloak = Keycloak(process.env.PUBLIC_URL + "/keycloak.json");

export function getToken(): string {
    return keycloak.token || '';
}
export const isAuthenticated = () => keycloak.token !== null && keycloak.token !== undefined;

export const init = (onload: any, flow: any) => {
    return keycloak.init({onLoad: onload, flow, checkLoginIframe: true});
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
