
export function getRedirectUrl(type, avatar) {
    let path

    if(type === 'laoban') {
        path = '/laoban'
    }else {
        path = '/dashen'
    }

    if(!avatar) {
        path += 'info'
    }
    
    return path
}   