/* copy password to clipboard */
const copyClip =  document.querySelector(".btn-copy")
const password = document.getElementById("myinput")
const copyDonemsg = document.querySelector(".clipboard-msg")

/* increase or decrese range input */
const rangebar = document.getElementById("amount")
const rangeNumber = document.querySelector(".select-num")

/* checkmark functnality */
const checkmarkimage = document.querySelectorAll(".checkmark")
const imgcontainer = document.querySelectorAll(".check-container")

/* include letter or numbers*/
const UpperCase = document.getElementById("uppercase")
const LowerCase = document.getElementById("lowercase")
const Numberss = document.getElementById("numbers")
const Symbols = document.getElementById("symbol")

/* form */
const form = document.querySelector(".form")


Removeallcheckmark()
setRangeValuetoshow()

/* event lisners */
copyClip.addEventListener("click",copytoClipboard)
rangebar.addEventListener("click",increseORdecreaserangeValue)
imgcontainer.forEach((singlecontainer)=> {
    addTrurorFalsetocheckbox(singlecontainer)
})
form.addEventListener("submit",main)


/* variables */
let upperLetters = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];
let lowerLetters = [...'abcdefghijklmnopqrstuvwxyz'];
let allnumbers = [...'0123456789'];
let allsymbol = [...'~!@#$%^&*_-+=']



function main(e) {
    e.preventDefault()
    reset()
    length =  rangeNumber.innerText
    if(UpperCase.classList.contains("true") && (LowerCase.classList.contains("false")))  {
        console.log('1')
    } else {
        console.log("2")
    }

   
    

   
}



/* to increase the range value according to user choice */
function increseORdecreaserangeValue() {
    let value = rangebar.value
    value = parseInt(value) + 1
    rangebar.value = value
    setRangeValuetoshow()
}

/* to set new value of user to the element */
function setRangeValuetoshow() {
    rangeNumber.textContent = rangebar.value
}

/* to copy given password to clipboard */
function copytoClipboard() {
    password.select()
    password.setSelectionRange(0,99999)
    navigator.clipboard.writeText(password.value)
    copyDonemsg.classList.add("clipboard-msg-active")
}

/* to remove all added checkmark through html */
function Removeallcheckmark() {
   for (let i = 0; i < imgcontainer.length; i++ ) {
        try{
            checkmarkimage[i].classList.add("checkmark-delete")
            imgcontainer[i].classList.add("check-container-active")
            imgcontainer[i].classList.add("false")
        } catch (e) {
            console.log(e)
        }
    }
}

/* to set true to parent container when they are clicked and set false when they are not clicked */
function addTrurorFalsetocheckbox(container) {
    const childimg =  container.querySelector(".checkmark")
    container.addEventListener("click",() => {
        childimg.classList.toggle("checkmark-delete")
        container.classList.toggle("check-container-active")
        if (childimg.classList.contains("checkmark-delete") && container.classList.contains("check-container-active")) {
            container.classList.add("false")
            container.classList.remove("true")
        } else {
            container.classList.add("true")
            container.classList.remove("false")
        }
    })

}

function reset() {
    password.value = ""
    copyDonemsg.classList.remove("clipboard-msg-active")
}