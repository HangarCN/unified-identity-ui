/**
 * 登录相关接口
 */
import qs from 'qs';
import { request, getDomain } from '@/api';

/**
 * 是否授权码模式
 * @returns 结果
 */
const isAuthorizationCode = () => {
  return process.env.VUE_APP_AUTHORIZATION_TYPE === 'authorization_code';
};

/**
 * 授权
 */
const authorize = () => {
  const data = {
    client_id: process.env.VUE_APP_CLIENT_ID,
    redirect_uri: `${window.location.origin}`,
    response_type: 'code'
  };
  window.location.href = `${process.env.VUE_APP_AUTHORIZATION_SERVER_URI}/oauth2/authorize?${qs.stringify(data)}`;
};

/**
 * 根据授权码获取token
 * @param {string} code 授权码
 * @returns token请求
 */
const loginByAuthorizationCode = (code) => {
  const data = {
    grant_type: 'authorization_code',
    client_id: process.env.VUE_APP_CLIENT_ID,
    client_secret: process.env.VUE_APP_CLIENT_SECRET,
    redirect_uri: `${window.location.origin}`,
    code: code
  };
  return request('post', process.env.VUE_APP_TOKEN_URL, null, data, {});
};

const loginByUsername = (username, password) => {
  const data = {
    username: username,
    password: password,
    grant_type: 'password',
    client_id: process.env.VUE_APP_CLIENT_ID,
    client_secret: process.env.VUE_APP_CLIENT_SECRET
  };
  let body;
  return request('post', getDomain() + process.env.VUE_APP_TOKEN_URL, body, data, {});
};

const logout = (token) => {
  const data = {
    access_token: token,
    client_id: process.env.VUE_APP_CLIENT_ID,
    client_secret: process.env.VUE_APP_CLIENT_SECRET
  };
  let body;
  return request('delete', getDomain() + process.env.VUE_APP_TOKEN_URL, body, data, {});
};

export { isAuthorizationCode, authorize, loginByAuthorizationCode, loginByUsername, logout };
