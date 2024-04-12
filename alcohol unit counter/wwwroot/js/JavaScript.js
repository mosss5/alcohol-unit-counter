const bacElement = document.getElementById('bac');
const unitElement = document.getElementById('unit');
const mlElement = document.getElementById('ml');

function myFunction() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
           }
    }
}


function addAlcohol() {
        // Select all input elements with the name "quantity" within <li> elements
        const inputElements = document.querySelectorAll('li input[name="quantity"],li input[name="percentage"]');

        let totalAlcohol = 0;

        // Iterate through the input elements and calculate the total alcohol content
        for (let i = 0; i < inputElements.length; i += 2) {
            const percentage = parseFloat(inputElements[i].value) || 0;
            const quantity = parseFloat(inputElements[i + 1].value) || 0;
            const alcoholContent = (percentage / 1000) * quantity;
            totalAlcohol += alcoholContent;
        }

        bloodAlcoholContent(totalAlcohol);
        unitElement.textContent = 'Units:' + totalAlcohol;
            
    }




function bloodAlcoholContent(alcoholUnits) {
    let alcoholWeight = alcoholUnits * 8;
    userWeight = document.getElementById("inputWeight");
    const weight = parseFloat(userWeight.value) || 0;
    const selectedGender = document.querySelector('input[name="gender"]:checked');
    let bloodAlcohol = 1;


    let r;
    if (selectedGender.value == "male") {
        r = 0.68;
        } else {
        r = 0.55;
        }

    bloodAlcohol = 100 * alcoholWeight / ((weight*1000) * r);

    bacElement.textContent = 'BAC:' + bloodAlcohol;
}

function convertPintsToML() {

    const pints = parseFloat(document.getElementById("pints").value) || 0;

    const milliliters = pints * 568;

    mlElement.textContent = 'ml:' + milliliters;
}



