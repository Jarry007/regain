import  cookie from  'js-cookie'

const tokenLabel = 'tokenJ'

export const setTokens = (token)=>{
    cookie.set(tokenLabel,token || '' ,{expires:1})
}

export const clearToken = ()=>{
    cookie.set(tokenLabel,null)
}

export const getToken = ()=>{
    const token = cookie.get(tokenLabel)
    return token || false
}

export const checkPhone = (phone)=>{
    const rule = /^[1][3,4,5,6,7,8,9]\d{9}/
    return rule.test(phone)
}

export const getUrlParams = (key) =>{
    const reg = new RegExp(`(^|$)${key}=([^&]*)(&|$)`)
    let result = window.location.search.substr(1).match(reg)
    return unescape(result[2]) || null 
}

export const isWeXin = ()=>{
    const ua = window.navigator.userAgent.toLowerCase();
    return ua.match(/MicroMessenger/i) === 'micromessenger'
}

export const isMobile = ()=>{
    return window.navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
}