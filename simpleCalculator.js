screen = document.getElementById("screen");
C_CE = document.getElementById("C_CE");

var a = 0;
var operated = false;
var percentages = 0;

function addDigit( digit ) {
    if(operated) {
        operated = false;
        reset();
    }
    if(screen.innerHTML == "0") {
        screen.innerHTML = digit;
        C_CE.value = "C";
    } else {
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
    if( operated ) {
        operated = false;
    }
    a = operating();
    screen.innerHTML = "+";
}

function subtraction() {
    if( operated ) {
        operated = false;
    }
    a = operating();
    screen.innerHTML = "-";
}

function multiplecation() {
    if( operated ) {
        operated = false;
    }
    a = operating();
    screen.innerHTML = "x";
}

function division() {
    if( operated ) {
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
        if(percentages) 
            percentage();
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
    return a;
}

function reset() {
    if(C_CE.value == "CE") {
        a = 0;    
        operated = false;
    }
    C_CE.value = "CE";
    screen.innerHTML = "0";
    if(percentages) 
        percentage();
}

function percentage() {
    percentages = (percentages + 1) % 2;
    percentage_button = document.getElementById("percentage");
    if(percentages) {
        percentage_button.style.backgroundColor = "blue";
        percentage_button.style.color = "white";
    }else{
        percentage_button.style.backgroundColor = 'rgb(198, 130, 2)';
        percentage_button.style.color = "black";
    }
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
    operated = true;
}

var register_M = 0;

function M_Op( operation ) {
    switch( operation ) {
        case "P":
            register_M = register_M + parseFloat(screen.innerHTML);
        break;

        case "M":
            register_M = register_M - parseFloat(screen.innerHTML);
        break;

        case "R":
            screen.innerHTML = register_M;
        break;

        case "C":
            register_M = 0;
        break;
    }
}

function inverse() {
    let inversed = screen.innerHTML;
    let op = "";
    if(inversed.charCodeAt(0) < 48 || inversed.charCodeAt(0) > 57) {
        op = inversed[0];
        inversed = inversed.slice(1,);
    }
    screen.innerHTML = op + `${parseFloat(inversed) ** -1}`;
}
