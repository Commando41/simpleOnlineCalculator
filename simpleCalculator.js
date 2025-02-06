screen = document.getElementById("screen");
C_CE = document.getElementById("C_CE");

var a = 0;
var operated = false;
var percentages = 0;

function addDigit( digit ) {
    if(operated == true){
        reset();
    }
    if(screen.innerHTML == "0") {
        screen.innerHTML = digit;
        C_CE.value = "C";
    }else{
        screen.innerHTML += digit;
    }
}

function removeDigit() {
    if(screen.innerHTML.length == 1) {
        screen.innerHTML = "0";
        C_CE.value = "CE";
    } else {
        let newString = "";
        for(let i = 0; i < screen.innerHTML.length-1; i++) {
            newString += screen.innerHTML[i]
        }
        screen.innerHTML = newString;
    }
}

function addition() {
    if( operated == true ) {
        operated = false;
    }
    a = operating();
    screen.innerHTML = "+";
}

function subtraction() {
    if( operated == true ) {
        operated = false;
    }
    a = operating();
    screen.innerHTML = "-";
}

function multiplecation() {
    if( operated == true ) {
        operated = false;
    }
    a = operating();
    screen.innerHTML = "x";
}

function division() {
    if( operated == true ) {
        operated = false;
    }
    a = operating();
    screen.innerHTML = "÷";
}

function equal() {
    if(operated == false) {
        screen.innerHTML = operating();
    }
    operated = true;
}

function operating() {
    let b = screen.innerHTML;
    if(b.charCodeAt(0) > 47 && b.charCodeAt(0) < 58) {
        return parseFloat(b);
    }else if(b.length == 1) {
        return a;
    }
    let op = b[0];
    b = b.slice(1);
    b = parseFloat(b);
    if(percentages == 1) {
        b = b/100;
        switch(op) {
            case "+":
                a = a*(1+b);
                break;
            case "-":
                a = a*(1-b);
                break;
            case "x":
                a = a*b;
                break;
            case "÷":
                a = a/b;
                break;
        }
    } else {
        switch(op) {
            case "+":
                a = a+b;
                break;
            case "-":
                a = a-b;
                break;
            case "x":
                a = a*b;
                break;
            case "÷":
                a = a/b;
                break;
        }
    }
    percentages = 0;
    return a;
}

function reset() {

    if(C_CE.value == "C") {
        C_CE.value = "CE";
        screen.innerHTML = "0";
        percentages = 0;
    } else {
        a = 0;    
        operated = false;
    }
}

function percentage() {
    percentages = (percentages + 1) % 2;
}

function square_root() {
    b = screen.innerHTML;
    let index = 0;
    if(b.charCodeAt(0) < 48 && b.charCodeAt(0) > 57) {
        index++;
    }
    let newString = "";
    for(let i = index; i < b.length; i++) {
        newString += b[i];
    }
    screen.innerHTML = "";
    if(index > 0) {
        screen.innerHTML = b[0];
    }
    screen.innerHTML += `${Math.sqrt(parseFloat(newString))}`;

}
