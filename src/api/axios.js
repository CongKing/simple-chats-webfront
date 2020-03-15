import axios from 'axios'
import { Toast , Modal} from 'antd-mobile';
const alert = Modal.alert;

// 创建一个错误
function errorCreate (msg) {
  const error = new Error(msg)
  errorLog(error)
  throw error
}

// 记录和显示错误
function errorLog (error) {
  Toast.fail(error.message, 1);
}

// 创建一个 axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_API,
  timeout: 5000, // 请求超时时间
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    config.headers['X-Requested-With'] = 'XMLHttpRequest'
    return config
  },
  error => {
    // 发送失败
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    localStorage.removeItem(LC_LOGIN_TIME_KEY)
    // dataAxios 是 axios 返回数据中的 data
    const dataAxios = response.data
    // 这个状态码是和后端约定的
    const { code } = dataAxios
    // 根据 code 进行判断
    if (code === undefined) {
      // 如果没有 code 代表这不是项目后端开发的接口 比如可能是 D2Admin 请求最新版本
      return dataAxios
    } else {
      // 有 code 代表这是一个后端接口 可以进行进一步的判断
      switch (String(code)) {
      case '000':
        // 如果不需要有返回结果，返回true
        if (dataAxios.data === null || dataAxios.data === undefined) dataAxios.data = true
        return dataAxios.data
      case '001': // 参数错误
      case '002': // 权限错误
      case '004': // 资源找不到
      case '006': // 用户行为限制
      case '010': // 服务器错误
        Toast.fail(dataAxios.msg, 1);
        return null
      default:
        // 不是正确的 code
        errorCreate(`${dataAxios.msg}: ${response.config.url}`)
        break
      }
    }
  },

  error => {
    if (error && error.response) {
      switch (error.response.status) {
      case 400: error.message = '请求错误'; break
      case 401:
        // error.message = '未授权，请登录'
        handleLogin401Error(error)
        return Promise.reject(error)
      case 403: error.message = '拒绝访问'; break
      case 404: error.message = `请求地址出错: ${error.response.config.url}`; break
      case 408: error.message = '请求超时'; break
      case 500: error.message = '服务器内部错误'; break
      case 501: error.message = '服务未实现'; break
      case 502: error.message = '网关错误'; break
      case 503: error.message = '服务不可用'; break
      case 504: error.message = '网关超时'; break
      case 505: error.message = 'HTTP版本不受支持'; break
      default: break
      }
    }
    errorLog(error)
    return Promise.reject(error)
  }
)

const SSOLOGIN_MAX_REDIRECT = 3 // 授权时最大重定向次数
const LC_LOGIN_TIME_KEY = 'login-redirect-time'

/**
 *  处理鉴权错误
 * @param {response, message} error
 */
const handleLogin401Error = function (error) {
  let fromSsoLogin = error.response.headers['ssologin'] === '1'
  let loginUrl = error.response.headers['location']
  let hasUrl = loginUrl != null && loginUrl !== ''
  if (!fromSsoLogin) { // 并非调用登陆接口（没有携带cookie）
    if (window._isShowNotLoing) {
      return
    }
    // TODO
    alert('提示', ' 请重新登录！', [
      { text: 'Cancel', onPress: () => console.log('cancel') },
      {
        text: 'Ok',
        onPress: () =>
          new Promise((resolve) => {
            Toast.info('onPress Promise', 1);
            setTimeout(resolve, 1000);
          }),
      },
    ])
  } else if (hasUrl) { // 调用鉴权登陆接口
    let REDIRECT_TIME = localStorage.getItem(LC_LOGIN_TIME_KEY) || 0
    if ((REDIRECT_TIME + 1) > SSOLOGIN_MAX_REDIRECT) {
      // TODO
      alert('提示', ' 您没有权限访问该页面，请联系管理员！', [
        { text: 'Cancel', onPress: () => console.log('cancel') },
        {
          text: 'Ok',
          onPress: () =>
            new Promise((resolve) => {
              Toast.info('onPress Promise', 1);
              setTimeout(resolve, 1000);
            }),
        },
      ])
    } else {
      // 重定向
      localStorage.setItem(LC_LOGIN_TIME_KEY, ++REDIRECT_TIME)
      setTimeout(() => { window.location.href = loginUrl }, 500)
    }
  } else {
    // nothing
  }
}

export default service
