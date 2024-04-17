const bacElement = document.getElementById('bac');
const unitElement = document.getElementById('unit');
const mlElement = document.getElementById('ml');
const shotElement = document.getElementById('mlShot');
const nameElement = document.getElementById('name');


class LiquorInventory {
    constructor(containerId, items) {
        this.container = document.getElementById(containerId);
        this.items = items;
    }

    render() {
        const ul = document.createElement('ul');
        this.items.forEach(item => {
            const li = document.createElement('li');
            li.dataset.item = item.name;

            const a = document.createElement('a');
            a.textContent = item.name;

            const label1 = document.createElement('label');
            label1.textContent = 'ml';

            const input1 = document.createElement('input');
            input1.type = 'number';
            input1.name = 'quantity';
            input1.min = 0;
            input1.max = 10000;

            const input2 = document.createElement('input');
            input2.type = 'number';
            input2.name = 'percentage';
            input2.min = 0;
            input2.max = 100;

            const label2 = document.createElement('label');
            label2.textContent = '%';

            const img = document.createElement('img');
            img.src = item.image;

            li.appendChild(a);
            li.appendChild(label1);
            li.appendChild(input1);
            li.appendChild(input2);
            li.appendChild(label2);
            li.appendChild(img);

            ul.appendChild(li);
        });

        this.container.appendChild(ul);
    }
}
const items = [
    { name: 'Aperol', image: 'img/unnamed (1).jpg' },
    { name: 'Baijiu', image: 'img/JZ0008A_HongXing_Er_Guo_Tou_Chiew_Baijiu_56_800x.jpg' },
    { name: 'Baileys', image: 'img/61yCcYJkqvL.jpg' },
    { name: 'Beer', image: 'img/stella-artois-16oz-64pk-cans-37636_1.png' },
    { name: 'Brandy', image: 'img/J072-HOUSE-BRANDY-1.5L-SPIRITS-1.5L-HOUSE -BRANDY.jpg' },
    { name: 'Cider', image: 'img/images.jpg' },
    { name: 'Cognac', image: 'img/unnamed.jpg' },
    { name: 'Diserano', image: 'img/amaretto-disaronno-diesel-limited-edition.jpg' },
    { name: 'Gin', image: 'img/6d246a52-ec06-4100-9eb6-946c4dc342f5_1318411020.jpg.jpg' },
    { name: 'Jägermeister', image: 'img/jaegermeister-70cl-1920x1920.jpg' },
    { name: 'Liqueurs', image: 'img/220c4e7c-7e7f-4094-827d-d3f6536cbc65_752924985.jpg' },
    { name: 'Perry', image: 'img/520.Lilleys-Bee-Sting-Perry-Bottle-500ml.jpg' },
    { name: 'Prosecco', image: 'img/98f54596-de41-4e6c-93ed-415871d991b0_1547345302.jpg' },
    { name: 'Red wine', image: 'img/Sao Luis Douro colheita tinto 2020.jpg' },
    { name: 'Rum', image: 'img/72706a83-6745-4950-89a7-fbdc25594859_2100373758.jpg' },
    { name: 'Sake', image: 'img/e69243nv-image-main.png' },
    { name: 'Shōchū', image: 'img/shochusilhouette.jpg' },
    { name: 'Soju', image: 'img/1623401248-043061000.jpg' },
    { name: 'Tequila', image: 'img/155853989281822.jpg' },
    { name: 'Vodka', image: 'img/smirnoff-red-label-vodka-70cl_50ecc35b-5b0b-4252-81ee-92fafcbc1e11.jpg' },
    { name: 'Whiskey', image: 'img/6_Talisker_10_year_70cl_bottle_02ccac5645_94d87292d4.jpg' },
    { name: 'White Wine', image: 'img/b3b10b_0ca5fee433ea4749ac683a2e2a0c63b0~mv2.jpg' },
    { name: 'Wine', image: 'img/500142-a.jpeg.jpg' }
];

const liquorInventory = new LiquorInventory('liquorList', items);
liquorInventory.render();


window.onload = function () {
    loadSavedData();
}

function loadSavedData() {
    const jsonData = localStorage.getItem('alcoholData');
    if (jsonData) {
        // Parse JSON data
        const data = JSON.parse(jsonData);
        const savedName = data.name;
        const savedTotalAlcohol = data.totalAlcohol;
        nameElement.value = savedName;
        bloodAlcoholContent(parseFloat(savedTotalAlcohol));
        unitElement.textContent = 'Units:' + savedTotalAlcohol;
    }
    const bacJsonData = localStorage.getItem('bacData');
    if (bacJsonData) {
        // Parse BAC JSON data
        const bacData = JSON.parse(bacJsonData);
        const savedBloodAlcohol = bacData.bloodAlcohol;
        bacElement.textContent = 'BAC:' + savedBloodAlcohol;
    }
}


function myFunction() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("liquorList"); // Change to match the container ID
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

// Attach event listener after rendering the list
document.getElementById("searchInput").addEventListener("input", myFunction);


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

    const data = {
        name: nameElement.value,
        totalAlcohol: totalAlcohol
    };

    // Convert data to JSON
    const jsonData = JSON.stringify(data);

    // Save JSON data to localStorage
    localStorage.setItem('alcoholData', jsonData);


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

    bloodAlcohol = 100 * alcoholWeight / ((weight * 1000) * r);


    const bacData = {
        bloodAlcohol: bloodAlcohol
    };
    const bacJsonData = JSON.stringify(bacData);

    // Save BAC JSON data to localStorage
    localStorage.setItem('bacData', bacJsonData);

    bacElement.textContent = 'BAC:' + bloodAlcohol;
}

function convertPintsToML() {

    const pints = parseFloat(document.getElementById("pints").value) || 0;

    const milliliters = pints * 568;

    mlElement.textContent = 'ml:' + milliliters;
}

function convertShotsToML() {

    const shots = parseFloat(document.getElementById("shots").value) || 0;

    const milliliters = shots * 25;

    shotElement.textContent = 'ml:' + milliliters;
}
