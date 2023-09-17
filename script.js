import {
    acron_to_phrase
} from './acrons.js';

// Identify and Set the button as a trigger to call the main function
let generate_bttn = document.getElementById('generate-bttn');
generate_bttn.addEventListener("click", generateAutoDgn)

// Identify and Set the button as a trigger to call the copyText function
let copyButton = document.getElementById('copyButton');
copyButton.addEventListener('click', copyText);

// Identify and Set the button as a trigger to call the resetText function
let resetButton = document.getElementById('resetButton');
resetButton.addEventListener('click', resetText)

// Function to convert some numeric acrons (ex: 1 - 2) to the respective 1's and 2's based on selected dgn_type on radio button.
function defineDgnType(arr) {
    for (let i = 0; i < arr.length; i++) {
        let regex = /^\s*\/?[1-9]\s*$/;
        let match;
        let type = document.querySelector('input[name="option"]:checked').value;

        if ((match = regex.exec(arr[i])) !== null) {
            arr[i] = arr[i].replace(/\s+/g, '')
            arr[i] = arr[i].replace(/\//g, '')
            arr[i] = type+arr[i];
        }
    }
    return arr;
}

// Function receive the input line and change the acrons into his meanings
function extractAcrons(arr) {  
    for (let i = 0; i < arr.length; i++) {
        let regex = /[A-Z]+(?![a-z])\d*/g; 
        let match;

        while ((match = regex.exec(arr[i])) !== null) {
            
            let uppercaseChars = match[0];
            if(acron_to_phrase[uppercaseChars] !== undefined){
                arr[i] = arr[i].replace(uppercaseChars, acron_to_phrase[uppercaseChars])
            }
            else{
                arr[i] = arr[i].replace(arr[i], '"' + match + '"' + ' [ error - código indefinido ]')
            }
        }
    }
    return arr;
}

// Function to standardize the lines. Take off the slashes, Captilize, Increase final dot
function beautifyDgn(arr) {
    for (let i = 0; i < arr.length; i++) {
        arr[i] = arr[i].trim()
        arr[i] = arr[i].toLowerCase()
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1) + '.'

        // Dealing with special cases (vértebras and TC)
        arr[i] = arr[i].replace("c1", acron_to_phrase["C1"])
        arr[i] = arr[i].replace("c2", acron_to_phrase["C2"])
        arr[i] = arr[i].replace("c3", acron_to_phrase["C3"])
        arr[i] = arr[i].replace("c4", acron_to_phrase["C4"])
        arr[i] = arr[i].replace("c5", acron_to_phrase["C5"])
        arr[i] = arr[i].replace("c6", acron_to_phrase["C6"])
        arr[i] = arr[i].replace("c7", acron_to_phrase["C7"])
        arr[i] = arr[i].replace("Th1", acron_to_phrase["Th1"])
        arr[i] = arr[i].replace("Th2", acron_to_phrase["Th2"])
        arr[i] = arr[i].replace("Th3", acron_to_phrase["Th3"])
        arr[i] = arr[i].replace("Th4", acron_to_phrase["Th4"])
        arr[i] = arr[i].replace("Th5", acron_to_phrase["Th5"])
        arr[i] = arr[i].replace("Th6", acron_to_phrase["Th6"])
        arr[i] = arr[i].replace("Th7", acron_to_phrase["Th7"])
        arr[i] = arr[i].replace("Th8", acron_to_phrase["Th8"])
        arr[i] = arr[i].replace("Th9", acron_to_phrase["Th9"])
        arr[i] = arr[i].replace("Th10", acron_to_phrase["Th10"])
        arr[i] = arr[i].replace("Th11", acron_to_phrase["Th11"])
        arr[i] = arr[i].replace("Th12", acron_to_phrase["Th12"])
        arr[i] = arr[i].replace("l1", acron_to_phrase["L1"])
        arr[i] = arr[i].replace("l2", acron_to_phrase["L2"])
        arr[i] = arr[i].replace("l3", acron_to_phrase["L3"])
        arr[i] = arr[i].replace("l4", acron_to_phrase["L4"])
        arr[i] = arr[i].replace("l5", acron_to_phrase["L5"])
        arr[i] = arr[i].replace("s1", acron_to_phrase["S1"])
        arr[i] = arr[i].replace("s2", acron_to_phrase["S2"])

        arr[i] = arr[i].replace("tc", acron_to_phrase["TC"])
    }
    return arr;
}

// Function to reset the result divs
function resetText() {
    let contentDiv = document.getElementById('results_container');
    if(contentDiv){
        contentDiv.innerHTML = '';
    };
}

// Function to copy all content from inside de results div to the users paste 
function copyText() {
    let contentDiv = document.getElementById('results_container');
    let range = document.createRange();
    range.selectNode(contentDiv);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);

    try {
        // Executing the copy command with formatting
        document.execCommand('copy');
    } catch (err) {
        console.error('Failed to copy the text: ', err);
    }
    window.getSelection().removeAllRanges();
}

// Function to generate the diagnostic - MAIN
function generateAutoDgn() {

    resetText();

    // Define the content from the input'
    let dgn_line = document.getElementById("text_box").value;
    
    // Split and Count the lines
    let dgn_block = dgn_line.split("-");

    let dgn_block_typed = defineDgnType(dgn_block)
    let extractedAcrons = extractAcrons(dgn_block_typed);
    let prettyDgn = beautifyDgn(extractedAcrons)    
    
    
    // Get the container element where you want to append the paragraphs
    const container = document.getElementById("results_container");

    // Loop through the array and create paragraphs
    for (let i = 0; i < prettyDgn.length; i++) {
        let paragraph = document.createElement("p");
        paragraph.textContent = prettyDgn[i];
        container.appendChild(paragraph);
    }

    // Make appear the result box that was with display: none;
    const styledBox = document.getElementById('styledBox');
    styledBox.style.display = 'block';
}



