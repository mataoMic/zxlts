// import textLan from '../asset/language/text';
import * as _ from 'lodash-es';
import Bridge from './Bridge';
export function getCookie(name) {
  var strcookie = document.cookie; //获取cookie字符串
  var arrcookie = strcookie.split('; '); //分割
  //遍历匹配
  for (var i = 0; i < arrcookie.length; i++) {
    var arr = arrcookie[i].split('=');
    if (arr[0] === name) {
      return arr[1];
    }
  }
  return '';
};
export function setCookie(key, value) {
  document.cookie = `${key}=${value}`;
};
export const formatDate = (date) => {
  return new Date(+new Date(date) + 8 * 3600 * 1000)
    .toJSON()
    .substr(0, 19)
    .replace('T', ' ');
};
// export function setTitle (type) {
//   document.title = _.get(textLan, `${type}.title`)
//     ? textLan[type].title
//     : 'approval center';
// };
export const goBack = () => {
  if (sessionStorage.getItem('fromlist')) {
    window.history.go(-1);
  } else {
    Bridge.goBackToMainView();
  }
}
export function getLanguage() {
  return getCookie('language') === 'zh'
}
// export const getCode = (data)=>{
//   let err = data + ''
//   let codeObj = err.slice(err.indexOf('{'),err.indexOf('}') + 1)
//   return _.get(textLan,JSON.parse(codeObj).code)?JSON.parse(codeObj).code:'10001'
// }
export const catchErrFromArray = resList => {
  resList.map(item => {
    if (!_.get(item, 'data') || item.code !== 0) {
      debugger
      throw new Error(JSON.stringify({
        code: item.code
      }));
    }
  })
}
export const getYearAndMonth = (start, end) => {
  console.log(start, end)
  var newResult = [];
  var starts = start.split('-');
  var ends = end.split('-');
  var staYear = parseInt(starts[0]);
  var staMon = parseInt(starts[1]);
  var endYear = parseInt(ends[0]);
  var endMon = parseInt(ends[1]);
  var result = [{
    year: staYear,
    month: staMon
  }];
  while (staYear <= endYear) {
    if (staYear === endYear) {
      while (staMon < endMon) {
        staMon++;
        result.push({
          year: staYear,
          month: staMon
        });
      }
      staYear++;
    } else {
      staMon++;
      if (staMon > 12) {
        staMon = 1;
        staYear++;
      }
      result.push({
        year: staYear,
        month: staMon
      });
    }
  }

  for (var i = 0; i < result.length; i++) {
    var year = result[i].year;
    var monthinit = result[i].month;
    if (monthinit < 10) {
      var month = '0' + monthinit;
    } else {
      var month = monthinit + '';
    }
    var ym = year + '-' + month + '';
    newResult.push(ym);
  }
  console.log(result);
  console.log(newResult);

  return newResult;
}