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

/* rank password  */
const textrank = document.querySelector(".text-strength")
const textrankimg = document.querySelectorAll(".bg")

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
let allsymbol = [...'~!@#$%^&*_-+='];
let MakePassaword = "";
let passwordarray = [];

function main(e) {
    e.preventDefault()
    reset()
    lengthpwd =  rangeNumber.innerText
    for (let i  = 0; i < lengthpwd;i++) {
        if (UpperCase.classList.contains("true"))  {
        let value = Math.floor(Math.random() * upperLetters.length )
        value = upperLetters[value]
        passwordarray.push(value)
        let complete = limitthelenght(passwordarray)
        if(complete) {
            break
        }} 
        if (LowerCase.classList.contains("true"))  {
        let value = Math.floor(Math.random() * lowerLetters.length )
        value = lowerLetters[value]
        passwordarray.push(value)
        let complete = limitthelenght(passwordarray)
        if(complete) {
            break
        }} 

        if (Numberss.classList.contains("true"))  {
        let value = Math.floor(Math.random() * allnumbers.length )
        value = allnumbers[value]
        passwordarray.push(value)
        let complete = limitthelenght(passwordarray)
        if(complete) {
            break
        } } 
        if (Symbols.classList.contains("true"))  {
        let value = Math.floor(Math.random() * allsymbol.length)
        value = allsymbol[value]
        passwordarray.push(value)
        let complete = limitthelenght(passwordarray)
        if(complete) {
            break
        }} 
    }
    passwordarray = shuffleArray(passwordarray)
    MakePassaword = passwordarray.join("")
    console.log(passwordarray)
    rankComplexityandlength(MakePassaword,passwordarray)
    password.value = MakePassaword
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
    setTimeout(() => {
        copyDonemsg.classList.remove("clipboard-msg-active")
    },3000)
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
    password.value = ""
    passwordarray = []
    removeRankclasses()
}

/* to limit the length of password to given number by user number */
function limitthelenght(array) {
    if (array.length >= rangeNumber.innerText) {
        return true
    }
}

/* copy from chatgpt */
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array
  }

function rankComplexityandlength(pwdstring,pwdarray) {
    
    let score = 0
    let regexUpperCase = /[A-Z]/;
    let regexLowerCase = /[a-z]/;
    let regexnumber = /\d+/g
    let  symbolRegex = /[!@#$%^&*()_+\-=[\]{}|\\:;"'<>,.?/]/;
    let foundUpper = pwdstring.match(regexUpperCase)
    let foundlower = pwdstring.match(regexLowerCase)
    let foundnum = pwdstring.match(regexnumber)
    let foundsymbol = pwdstring.match(symbolRegex)
    if (foundUpper !== null && foundUpper.length >= 1) {
        score++;
      }
    if (foundlower !== null && foundlower.length >= 1) {
        score++;
      }
    if (foundnum !== null && foundnum.length >= 1) {
        score++;
    }
    if (foundsymbol !== null && foundsymbol.length >= 1) {
        score++;
    }

    if (pwdarray.length < 6) {
        score--
    }

    if (pwdarray.length >= 8) {
        score++
    }

    if(score === 1) {
        textrankimg[0].classList.add("bg-level1")
        textrank.textContent = "To weak"
    }
    if(score === 2 || score === 3) {
        textrankimg[0].classList.add("bg-level2")
        textrankimg[1].classList.add("bg-level2")
        textrank.textContent = "weak"
    }
    if(score=== 4) {
        textrankimg[0].classList.add("bg-level3")
        textrankimg[1].classList.add("bg-level3")
        textrankimg[2].classList.add("bg-level3")
        textrank.textContent = "medium"
    }
    if(score=== 5) {
        textrankimg[0].classList.add("bg-level4")
        textrankimg[1].classList.add("bg-level4")
        textrankimg[2].classList.add("bg-level4")
        textrankimg[3].classList.add("bg-level4")
        textrank.textContent = "strong"
    }
}


function removeRankclasses() {
    textrankimg.forEach((singlecontainer)=> {
        singlecontainer.classList.remove("bg-level1","bg-level2","bg-level3","bg-level4")
    })
}