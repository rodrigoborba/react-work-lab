import axios, { AxiosRequestConfig } from 'axios'
import { keycloak } from "../Components/seguranca/Auth";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT,
  timeout: 30000
})

const config = {
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, PUT, OPTIONS, DELETE',
    'X-Requested-With': 'XMLHttpRequest'
  }
}
axios.request(config)

function setHeaderOnConfig (config: AxiosRequestConfig) {
  config.headers.Authorization = `Bearer ${keycloak.token}`
  return config
}

/*api.interceptors.request.use(config => {
  return new Promise((resolve) => {
    keycloak
      .updateToken(40)
      .success(hasRefreshed => {
        if (hasRefreshed && keycloak && keycloak.token) {
          window.sessionStorage.setItem('token', keycloak.token)
        }
        return resolve(setHeaderOnConfig(config))
      })
      .error(hasError => {
        console.log('Error on refresh', hasError)
        return resolve(setHeaderOnConfig(config))
      })
  })
})*/

export default api
