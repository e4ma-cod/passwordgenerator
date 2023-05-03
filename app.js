let passwordDisplay = document.getElementById("password");
let charLength = document.getElementById("charLength");
const copyBtn = document.getElementById("copy");
const range = document.getElementById("passwordLengthRange");
const rangeValue = document.getElementById("passwordLengthRange");
const genBtn = document.getElementById("generateBtn");

range.addEventListener("input", (e) => {
    const currentValue = e.target.value;
    charLength.innerText = currentValue;
    passwordLength = parseInt(charLength.textContent);    
});

//passwordLength = parseInt(charLength.textContent);

function getPasswordStrength(password) {
    let strength = 0;
    if (password.match(/[a-z]+/)) {
      strength += 1;
    }
    if (password.match(/[A-Z]+/)) {
      strength += 1;
    }
    if (password.match(/[0-9]+/)) {
      strength += 1;
    }
    if (password.match(/[!@#$%^&*()_+\-={}[\]|:;"<>,.?/~`]+/)) {
      strength += 1;
    }
    return (strength / 4) * 100;
}

function getPasswordStrengthClass(strength) {
    let progressBar = Array.from(document.querySelectorAll(".progress"));
    let progressText = document.getElementById("progressText");
    
    console.log(progressBar);

    let progressBarArr = progressBar.map((bar, index) => {
        return { id: index + 1, label: bar };
    });
    console.log(progressBarArr);

    function updateClass (a,b) {
        progressBar.forEach(function updateClassList(progress) {        
            progress.classList.remove(a, b);           
        }); 
    }   

    if (strength > 75) {
        progressBar.forEach(function updateClassStrong(progress) {
            progressText.textContent = "STRONG"
            progress.classList.add('strong'); 
            progress.classList.remove('weak', 'medium');           
        });        
        return;
    } if (strength <= 75 && strength > 50) {
        let mediumBar = progressBarArr.filter((bar) => bar.id < 4);
        progressText.textContent = "MEDIUM";        
        console.log(mediumBar);  
        mediumBar.forEach(function (medProgress) {
            medProgress.label.classList.add('medium'); 
            updateClass('weak', 'strong');                       
        })               
        return;    
    } else if (strength <= 50 && strength > 25) {
        let medBar = progressBarArr.filter((bar) => bar.id < 3);
        progressText.textContent = "WEAK";        
        console.log(medBar);  
        medBar.forEach(function (weakProgress) {
            weakProgress.label.classList.add('weak');
            updateClass('medium', 'strong');
        })               
        return;         
    } else {
        progressText.textContent = "WEAK"; 
        progressBar[0].classList.add('weak');
        updateClass('medium', 'strong');
        progressBar[1].classList.remove('weak');
        /*let weakBar = progressBarArr.filter((bar) => bar.id === 1);
        progressText.textContent = "WEAK";        
        console.log(weakBar, weakBar[0].label); 
        weakBar[0].label.classList.add('weak');
        updateClass('medium', 'strong');*/        
        return;      
    }
}

function updateProgressBar(password) {
    const strength = getPasswordStrength(password);    
    return getPasswordStrengthClass(strength);  
}

genBtn.addEventListener('click', () => {
    generatePassword(passwordLength);
})

function generatePassword(passwordLength) { 
    let chars = '';  
    if (document.querySelector("#upper-letters").checked) {
        chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    }   

    if (document.querySelector("#lower-letters").checked) {
        chars += 'abcdefghijklmnopqrstuvwxyz';
    }

    if (document.querySelector("#numbers").checked) {
        chars += '0123456789';
    }

    if (document.querySelector("#symbols").checked) {
        chars += '!@#$%^&*()_-+~`|}{][/;:?><,.=';
    }
    console.log(chars);    
    let password = "";
    for (let i = 0; i < passwordLength; i++) {
        let randomNumber = Math.floor(Math.random() * chars.length);        
        password += chars.charAt(randomNumber);
    }

    passwordDisplay.innerHTML = password;

    updateProgressBar(password);
}

function copyText() {
    navigator.clipboard.writeText(passwordDisplay.textContent)
    .then(function() {
        alert("Text copied to clipboard!");        
    })
    .catch((error) => {
        alert("Failed to copy text: " + error);
    });
}

/*function generatePassword() {
    let chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let passwordLength = 9;
    let password = "";
    for (let i = 0; i <= passwordLength; i++) {
        let randomNumber = Math.floor(Math.random() * chars.length);
        password += chars.substring(randomNumber, randomNumber +1);
    }

    display.innerHTML = password;
}*/
