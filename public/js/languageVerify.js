// node fixer.js
// missing_in_en_US.json | mostra as propriedades que não tem no en_US.json

/*eslint-disable*/
let fs = require('fs')
let koKR = fs.readFileSync("./src/lang/ko_KR.json")
let enUS = fs.readFileSync("./src/lang/en_US.json")

Object.prototype.iterate = function(callback) {
    Object.keys(this).map((key) => {
        callback(this[key], key)
    })
}

let ptNotEn = {};
let enNotPt = {};

function init() {
    try {
        koKR = JSON.parse(koKR)
        enUS = JSON.parse(enUS)
    } catch (err) {
        console.log("Failed to parse files, verify if the content is alright")
    }
    koKRKeys = Object.keys(koKR)
    enUSKeys = Object.keys(enUS)
    enUS.iterate((enUSVal, enUSKey) => {
        if (koKRKeys.indexOf(enUSKey) === -1) {
            enNotPt[enUSKey] = enUSVal
        }
    })
    koKR.iterate((koKRVal, koKRKey) => {
        if (enUSKeys.indexOf(koKRKey) === -1) {
            ptNotEn[koKRKey] = koKRVal
        }
    })
}
init()

fs.writeFileSync(__dirname + '/missing_in_ko_KR.json', JSON.stringify(enNotPt, null, 2))
fs.writeFileSync(__dirname + '/missing_in_en_US.json', JSON.stringify(ptNotEn, null, 2))