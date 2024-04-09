var total = 0
var bacTotal = 0

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
        const inputElements = document.querySelectorAll('li input[name="quantity"]');

    let totalAlcohol = 0;

    // Iterate through the input elements and calculate the total alcohol content
    inputElements.forEach(function (inputElement) {
            const percentage = parseFloat(inputElement.id.replace('%', ''));
    // Get the quantity entered by the user
    const quantity = parseFloat(inputElement.value) || 0;
    // Calculate alcohol content based on percentage and quantity
    const alcoholContent = (percentage / 1000) * quantity;
    // Add to the total alcohol content
    totalAlcohol += alcoholContent;
        });

    bloodAlcoholContent(totalAlcohol);
    document.getElementById("alcohol").innerHTML = "<p>" + totalAlcohol + "</p>";
            
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

    document.getElementById("bac").innerHTML = "<p>" + bloodAlcohol + "</p>";
    }







    document.getElementById("bac").innerHTML = "<p>" + bacTotal + "</p>";
    document.getElementById("alcohol").innerHTML = "<p>" + total + "</p>";