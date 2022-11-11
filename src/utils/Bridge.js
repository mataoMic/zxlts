class GetServe {
  constructor() {
    let u = navigator.userAgent;
    this.isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    this.isiOS = u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  }
  isAndroid; //android终端
  isiOS; //ios终端
  registerHandler(name, callback) {
    if (this.isiOS) {
      this.setupWebViewJavascriptBridge((bridge) => {
        bridge.registerHandler(name, callback);
      });
    } else if (this.isAndroid) {
      window[name] = callback;
    }
  }
  callHandler(name, parmas, callback) {
    // console.log(`------- 发送 Native -- ${name}`, parmas);
    if (this.isiOS) {
      this.setupWebViewJavascriptBridge((bridge) => {
        bridge.callHandler(name, parmas, callback);
      });
    } else if (this.isAndroid) {
      if (window.android && window.android[name]) {
        if (!Array.isArray(parmas) && typeof parmas === 'object') {
          parmas = JSON.stringify(parmas);
        }
        callback(window.android[name](parmas));
      }
    }
  }

  setupWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) {
      return callback(window.WebViewJavascriptBridge);
    }
    if (window.WVJBCallbacks) {
      return window.WVJBCallbacks.push(callback);
    }
    window.WVJBCallbacks = [callback];
    var WVJBIframe = document.createElement('iframe');
    WVJBIframe.style.display = 'none';
    WVJBIframe.src = 'https://__bridge_loaded__';
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(() => {
      document.documentElement.removeChild(WVJBIframe);
    }, 0);
  }

  //跳转到首页
  goBackToMainView(params) {
    // alert(params)
    try {
      this.callHandler('goBackToMainView', params);
    } catch (err) {
      // console.log(err);
    }
  }
  attachmentDownload(params) {
    try {
      this.callHandler('attachmentDownload', params);
    } catch (err) {}
  }
  getInfo(callback) {
    let keys =
      'uid,session_id,language,firstname,firstnameen,mytoken,backlog,ApproveType';
    try {
      this.callHandler('getUserAccountInfo', keys, callback);
    } catch (err) {
      callback(false);
    }
  }
  setPageTitle1(menuParams) {
    // console.log(menuParams, '12112');
    if (this.isiOS) {
      // console.log(menuParams, '121');
      setTimeout(() => {
        document.title = menuParams.title;
        document.head.querySelector('title').innerText = menuParams.title;
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.onload = function () {
          setTimeout(() => {
            document.documentElement.removeChild(iframe);
          }, 0);
        };
        document.documentElement.appendChild(iframe);
      }, 20);
    } else if (this.isAndroid) {
      if (window.android && window.android.controlRight)
        window.android.controlRight(JSON.stringify(menuParams));
    }
  }

  setPageTitle(menuParams) {
    if (this.isiOS) {
      // console.log(menuParams, '22修改titleios');
      this.callHandler('controlRight', JSON.stringify(menuParams));
    } else if (this.isAndroid) {
      // console.log(menuParams, '修改title');
      if (window.android && window.android.controlRight)
        window.android.controlRight(JSON.stringify(menuParams));
    }
  }
  openEmailApp(params = {}) {
    let u = navigator.userAgent;
    this.isIos = u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    this.isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
    if (this.isIos) {
      this.setupWebViewJavascriptBridge((bridge) => {
        // console.log('进入桥');
        bridge.callHandler('jumpSendMail', params, (res) => {
          // console.log(res);
        });
      });
    } else if (this.isAndroid) {
      if (window.android && window.android.jumpSendMail) {
        // console.log('打开桥', window.android.jumpSendMail);
        let str = JSON.stringify(params);
        // console.log(str);
        window.android.jumpSendMail(str);
      }
    }
  }
  finishApproval(params) {
    // console.log('finishApproval', params);
    try {
      this.callHandler('finishApproval', params);
    } catch (err) {
      // console.log(err);
    }
  }
}
export default new GetServe();
