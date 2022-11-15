import axios from 'axios';
import aes from '../utils/aes';
import { Toast } from '@arco-design/mobile-react';
import { getCookie } from '../utils/common';
import { alert } from '../Components/Modal';
import Bridge from '../utils/Bridge';
let host = window.location.host;
let HEADER;
if (host.indexOf('localhost') !== -1) {
  HEADER = {
    value: aes.encrypt(
      JSON.stringify({
        sessionId: process.env.REACT_APP_SESSION_ID,
        userId: process.env.REACT_APP_USERID,
      })
    ),
    'Content-Type': 'application/json',
    myToken: process.env.REACT_APP_SESSION_ID,
  };
} else {
  let sessionId = getCookie('session_id');
  let value = {
    sessionId: sessionId,
    userId: getCookie('uid'),
  };
  HEADER = {
    'Content-Type': 'application/json',
    value: aes.encrypt(JSON.stringify(value)),
    myToken: sessionId,
    callTime: Date.now(),
    extra:
      '%7B%22ex_enName%22%3A%22Wei+Wei16+Hu%22%2C%22ex_cnName%22%3A%22%E8%83%A1%E4%BC%9F%22%2C%22ex_country%22%3A%22CN%22%7D',
  };
}

export const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  headers: HEADER,
  timeout: 45000,
  withCredentials: true,
});

//响应拦截器
instance.interceptors.response.use(
  (response) => {
    if (response.config.url.includes('/approve')) {
      // if (response.data.code !== 0) {
      //   alert('一键报单', { cancel: () => {}, confirm: feedBackFunction });
      // } else {
      //   Bridge.finishApproval(window.location.href);
      // }
    }
    return response.data;
  },

  (error) => {
    // console.log(error);
    // if (error.toString().indexOf('timeout') > -1) {
    //   Toast.error(<span style={{fontSize: '0.5rem'}}>网络超时</span>, 2000);
    // } else {
    //   Toast.error(<span style={{fontSize: '0.5rem'}}>请求错误</span>, 2000);
    // }
    if (error.response.status) {
      switch (error.response.status) {
        // 401: 未登录
        // 未登录则跳转登录页面，并携带当前页面的路径
        // 在登录成功后返回当前页面，这一步需要在登录页操作
        //case 401:
        case 404:
          // Toast({
          //   message:'网络请求不存在',
          //   duration:1500,
          //   forbidClick:true
          // })
          break;
        case 400:
          // Toast({
          //   message:'服务器繁忙',
          //   duration:1500,
          //   forbidClick:true
          // })
          break;
        default:
        // Toast({
        //   message:'其它提示',
        //   duration:1500,
        //   forbidClick:true
        // })
      }
      return Promise.reject(error.response);
    }
  }
);

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
 export function get(url, params) {
  return instance.get(url, { params });
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params) {
  return instance.post(url, params);
}
