const main = document.getElementById('main');
const addUseBtnr = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMilBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calcWealthBtn = document.getElementById('calculate-wealth');



let data = [];

getRandomUser();
getRandomUser();
getRandomUser();
// Fetch random user and add money
// instead of chaining .then, mark the function as asyncronis by placing "async" 
// in front of the function keyword. 
// Then the result form the fetch request can but put into a variable. It still 
// returns a promise, so add "await" in front of the fectch keyword.
// Normally you'd convert the response into JSON by (res => res.json) but you can 
// create a new variable for the data to create the JSON. It still returns a promise so
// add "await" again
async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();

    const user = data.results[0];

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    }

    addData(newUser);
}

// Add new obj to data array

function addData(object) {
    data.push(object);

    updateDOM();
}

// Update DOM
// uses providedData becuase nothing is passed in updateDOM, so it uses the original data
function updateDOM(providedData = data) {
    //clear main div
    main.innerHTML = '<h2><strong>Person</strong>Wealth</h2>';
    // build new element in DOM
    providedData.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
        main.appendChild(element);
    });
}

// Format number as money
function formatMoney(number) {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

//Event listners
addUseBtnr.addEventListener('click', getRandomUser);