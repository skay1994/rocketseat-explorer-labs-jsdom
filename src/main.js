import "./css/index.css"
import IMask from "imask";

const ccBgColor01 = document.querySelector('.cc-bg svg > g g:nth-child(1) path')
const ccBgColor02 = document.querySelector('.cc-bg svg > g g:nth-child(2) path')

const ccLogo = document.querySelector('.cc-logo span:nth-child(2) img')

function setCardType(type = 'default') {
    const colors = {
        visa: ['#436D99', '#2D57F2'],
        mastercard: ['#DF6F29', '#C69347'],
        default: ['black', 'gray'],
    };

    const [color1, color2] = colors[type];

    ccBgColor01.setAttribute('fill', color1)
    ccBgColor02.setAttribute('fill', color2)

    ccLogo.setAttribute('src', `/cc-${type}.svg`)
}

globalThis.setCardType = setCardType;

// Security Code
const securityCode = document.querySelector('#security-code')
const securityCodePattern = {
    mask: '0000'
}
const securityCodeMasked = IMask(securityCode, securityCodePattern)

const expirationDate = document.querySelector('#expiration-date')
const currentYear = String(new Date().getFullYear()).slice(2);
const nextTeenYears = String(new Date().getFullYear() + 10).slice(2);
const expirationDatePattern = {
    mask: 'MM{/}YY',
    blocks: {
        YY: {
            mask: IMask.MaskedRange,
            from: currentYear,
            to: nextTeenYears
        },
        MM: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 12
        }
    }
}
const expirationDateMasked = IMask(expirationDate, expirationDatePattern)

const cardNumber = document.querySelector('#card-number');
const cardNumberPattern = {
    mask: [
        {
            mask: '0000 0000 0000 0000',
            regex: /^4\d{0,15}/,
            cardType: 'visa'
        },
        {
            mask: '0000 0000 0000 0000',
            regex: /(^5[1-5]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0,2})\d{0,12}/,
            cardType: 'mastercard'
        },
        {
            mask: '0000 0000 0000 0000',
            cardType: 'default'
        }
    ],
    dispatch: function (appended, dynamicMasked) {
        const number = (dynamicMasked.value + appended).replace(/D/, '')
        const maskDetail = dynamicMasked.compiledMasks.find(function  (item) {
            return number.match(item.regex)
        });

        return maskDetail
    }
}
const cardNumberMasked = IMask(cardNumber, cardNumberPattern)