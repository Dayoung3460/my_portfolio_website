// ============================= Load items ========================================
const cartNumSpan = document.querySelector('.cart .cartNumSpan');

function onloadCartNumbers(){
    let itemNumbers = localStorage.getItem('cartNumbers');
    if(itemNumbers){
        cartNumSpan.textContent = itemNumbers;
    }
}

function loadItems(){
    return fetch('data/data.json')
    .then(response => response.json()) 
    .then(json => json.items); 
}

// Update the list with the given items
function displayItems(items){
    const container = document.querySelector('.viewCon');
    container.innerHTML = items.map(item => createHTMLString(item)).join('');

    const carts = document.querySelectorAll('.addCartBtn');
    for(let i=0; i<carts.length; i++){
        carts[i].addEventListener('click', () => {
            saveCartNumbers();
        })
    }
}

// Create HTML div item from the given data item
function createHTMLString(item){
    return `
    <div>
        <img src="${item.image}" alt="${item.type}" class="item_thumbnail" />
        <span class="item_description">${item.gender}, ${item.size}</span>
        <button class="addCartBtn">ADD CART</button>  
    </div>
    `; 
}

// give cart number to each item 
function saveCartNumbers(){
    let itemNumbers = localStorage.getItem('cartNumbers');

    if(itemNumbers){
        itemNumbers = parseInt(itemNumbers);
        localStorage.setItem('cartNumbers', itemNumbers + 1);
        cartNumSpan.textContent = itemNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        cartNumSpan.textContent = 1;
    }
}

function onButtonClick(event, items){
    const dataset = event.target.dataset;
    const key = dataset.key;
    const value = dataset.value;

    if(key == null || value == null){
        return;
    }

    const filtered = items.filter(item => item[key] === value);
    displayItems(filtered);
}

function setEventListeners(items) {
    const logo = document.querySelector('.logoCon');
    const btns = document.querySelector('.btnCon');
    logo.addEventListener('click', () => displayItems(items));
    btns.addEventListener('click', event => onButtonClick(event, items));
}

loadItems()
.then(items => {
    displayItems(items);
    setEventListeners(items);
})
.catch(console.log)

onloadCartNumbers();


// ============================= Cart ========================================


