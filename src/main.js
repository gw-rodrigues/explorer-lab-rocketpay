import IMask from "imask"
import "./css/index.css"

/**
 * Aula 01
 */

const ccBgColor01 = document.querySelector(".cc-bg svg > g g:nth-child(1) path")
const ccBgColor02 = document.querySelector(".cc-bg svg > g g:nth-child(2) path")
const ccLogo = document.querySelector(".cc-logo span:nth-child(2) img")

function setCardType(type) {
  const colors = {
    visa: ["#436D99", "#2D57F2"],
    mastercard: ["#DF6F29", "#C69347"],
    amex: ["#0E3E4E", "#789EAE"],
    apple: ["#6A6A6A", "#FFFFFF"],
    paysafe: ["#393939", "#FF6F5B"],
    default: ["black", "gray"],
  }

  ccBgColor01.setAttribute("fill", colors[type][0])
  ccBgColor02.setAttribute("fill", colors[type][1])
  ccLogo.setAttribute("src", `cc-${type}.svg`)
}
globalThis.setCardType = setCardType

const securityCode = document.querySelector("#security-code")
const securityCodePattern = { mask: "0000" }
const securityCodeMasked = IMask(securityCode, securityCodePattern)

function updateSecurityCode(code) {
  const ccSecurity = document.querySelector(".cc-security .value")
  ccSecurity.innerText = code.length > 0 ? code : "123"
}
securityCodeMasked.on("accept", () => {
  updateSecurityCode(securityCodeMasked.value)
})

const expirationDate = document.querySelector("#expiration-date")
const expirationDatePattern = {
  mask: "MM{/}YY",
  blocks: {
    YY: {
      mask: IMask.MaskedRange,
      from: String(new Date().getFullYear()).slice(2),
      to: String(new Date().getFullYear() + 5).slice(2),
    },
    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12,
    },
  },
}
const expirationDateMasked = IMask(expirationDate, expirationDatePattern)

function updateExpirationDate(date) {
  const ccExpiration = document.querySelector(".cc-extra .value")
  ccExpiration.innerText = date.length > 0 ? date : "02/32"
}
expirationDateMasked.on("accept", () => {
  updateExpirationDate(expirationDateMasked.value)
})

const cardNumber = document.querySelector("#card-number")
const cardNumberPattern = {
  mask: [
    {
      mask: "0000 0000 0000 0000",
      regex: /^4\d{0,15}/,
      cardType: "visa",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /(^5[1-5]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0,2})\d{0,12}/,
      cardType: "mastercard",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /^37\d{0,14}/,
      cardType: "amex",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /^8888\d{0,12}/,
      cardType: "apple",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /^1234\d{0,12}/,
      cardType: "paysafe",
    },
    {
      mask: "0000 0000 0000 0000",
      cardType: "default",
    },
  ],
  dispatch: (appended, dynamicMasked) => {
    const number = (dynamicMasked.value + appended).replace(/\D/g, "")
    const foundMask = dynamicMasked.compiledMasks.find(({ regex }) =>
      number.match(regex)
    )
    return foundMask
  },
}
const cardNumberMasked = IMask(cardNumber, cardNumberPattern)

function updateCardNumber(number) {
  const ccNumber = document.querySelector(".cc-number")
  ccNumber.innerText = number.length > 0 ? number : "1234 5678 9012 3456"
}
cardNumberMasked.on("accept", () => {
  const cardType = cardNumberMasked.masked.currentMask.cardType
  setCardType(cardType)
  updateCardNumber(cardNumberMasked.value)
})

const addButton = document.querySelector("#add-card")
addButton.addEventListener("click", () => {
  alert("Cartão adicionado!")
})

document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault()
})

const cardHolder = document.querySelector("#card-holder")
cardHolder.addEventListener("input", () => {
  const ccHolder = document.querySelector(".cc-holder .value")
  ccHolder.innerText =
    cardHolder.value.length > 0 ? cardHolder.value : "FULANO DA  SILVA"
})
