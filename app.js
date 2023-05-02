let passwordDisplay = document.getElementById("password");
let charLength = document.getElementById("charLength");
const copyBtn = document.getElementById("copy");

passwordLength = parseInt(charLength.textContent);

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
    let progressText = document.getElementById("progressText");
    let progressBar1 = document.getElementById("progress-one"); 
    let progressBar2 = document.getElementById("progress-two"); 
    let progressBar3 = document.getElementById("progress-three");
    let progressBar4 = document.getElementById("progress-four"); 
    
    if (strength > 75) {
        progressText.textContent = "STRONG";        
        progressBar1.classList.add('strong');
        progressBar2.classList.add('strong');
        progressBar3.classList.add('strong');
        progressBar4.classList.add('strong');
        return;        
    } else if (strength > 50 && strength <= 75) {
        progressText.textContent = "MEDIUM";        
        progressBar1.classList.add('medium');
        progressBar2.classList.add('medium');
        progressBar3.classList.add('medium');
        progressBar1.classList.remove('weak', 'strong');
        progressBar2.classList.remove('weak', 'strong'); 
        progressBar3.classList.remove('weak', 'strong');
        progressBar4.classList.remove('weak', 'strong');
        return;
    } else {
        progressText.textContent = "WEAK";        
        progressBar1.classList.add('weak');
        progressBar2.classList.add('weak');
        progressBar1.classList.remove('medium', 'strong');
        progressBar2.classList.remove('medium', 'strong'); 
        progressBar3.classList.remove('medium', 'strong');
        progressBar4.classList.remove('medium', 'strong');      
        return ;
    }
}

function updateProgressBar(password) {
    const strength = getPasswordStrength(password);    
    return getPasswordStrengthClass(strength);  
}

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
