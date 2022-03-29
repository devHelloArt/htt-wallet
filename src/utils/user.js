import { encryptMd5 } from "./cryptography"

const _makeGravatarUrl = (email, size, defaultImg) => {
    email = email ? encryptMd5(email) : ''
    size = size ? `s=${size}&` : ''
    defaultImg = defaultImg ? `default=${encodeURIComponent(defaultImg)}&` : ''
    let rate = 'r=g&'
    return `https://s.gravatar.com/avatar/${email}?${size+defaultImg+rate}`
}

//size example: 200 optional (gravatar only)
//defaultImg example: '/images/lunio/lunio-user@200x200' optional
//email required when not using default
export const getProfileImg = (size, email, defaultImg) => {
    if (!email)
        email = window.store.getState().user.user.email

    // // not working, uncomment to use profilePicture from REDUX
    // let { profilePicture } = window.store.getState().user.user
    // defaultImg = defaultImg ? '/'+defaultImg : '/'+profilePicture
    // defaultImg.replace(/\/{2,}/, '/')
    // defaultImg = window.location.origin+defaultImg
    // defaultImg.replace(/^((?!http)(?!https))/, window.location.protocol+'//')

    defaultImg = 'https://htt-wallet.io/images/icons/p2p/lunio-user300x300.jpg'
    return _makeGravatarUrl(email, size, defaultImg) //GRAVATAR ||LUNES
}
window.getProfileImg = getProfileImg