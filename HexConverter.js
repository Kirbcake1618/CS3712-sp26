function hexEncode(input) {
    let value = 0;
    //make sure input is valid
    try {
        value = parseInt(input);
    } catch (e) {
        return "Incorrect input, please try again";
    }

    if(value > 2147483647) {
        return "Input too large! Try a smaller value";
    }
    let hexValue = "";
    let tempVal;
    let tempStr = "";

    //iteratively divide the input by 16
    while (value !== 0) {
        tempVal = value;
        value = Math.floor(value / 16);
        //decide if the hex digit added should be a 0-9 or a-f
        if ((value * 16) === tempVal) {
            tempStr = "0";
        } else {
            let remainder = tempVal % 16;
            if (remainder < 10) {
                tempStr = remainder.toString();
            } else {
                tempStr = String.fromCharCode(87 + remainder);
                tempStr = tempStr.toUpperCase();
            }
        }
        //add the hex digit to the beginning of the string
        tempStr += hexValue;
        hexValue = tempStr;
    }

    return hexValue;
}

function hexDecode(input) {
    let baseTenValue = 0;
    let place = 0;
    input = input.toString();
    input = input.toUpperCase();

    //iterate through the hex string backwards
    for (let i = input.length - 1; i >= 0; i--) {
        //store the hex digit being examined
        let currentDigit = input.charAt(i);
        //make sure the hex digit is a 0-9 or A-F
        if (currentDigit < "0" || (currentDigit > "9" && currentDigit < "A") || currentDigit > "F") {
            return "Incorrect input, please try again";
        } else {
            let digitValue = 0;
            if (currentDigit < "A") {
                digitValue = parseInt(currentDigit);
            } else {
                digitValue = currentDigit.charCodeAt(0) - 55;
            }
            baseTenValue += digitValue * Math.pow(16, place);
        }
        //increment the hex digit being examined
        place++;
    }

    try {
        return String(baseTenValue);
    } catch (e) {
        return "Incorrect input, please try again";
    }
}

function main() {
    console.log("Testing hexEncode and hexDecode");
    console.log(" ");
    console.assert(hexEncode(100) === "64", "Expected 64, got " + hexEncode(100));
    console.log(" ");
    console.assert(hexEncode(256) === "100", "Expected 100, got " + hexEncode(256));
    console.log(" ");
    console.assert(hexEncode(15) === "F", "Expected F, got " + hexEncode(15)); 
    console.log(" ");
    console.assert(hexDecode(64) === "100", "Expected 100, got " + hexDecode(64));
    console.log(" ");
    console.assert(hexDecode(100) === "256", "Expected 256, got " + hexDecode(100));
    console.log(" ");
    console.assert(hexDecode("F") === "15", "Expected 15, got " + hexDecode("F"));
    console.log("Tests complete");   
}

main();