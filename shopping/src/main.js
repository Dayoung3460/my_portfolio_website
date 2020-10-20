// ============================= Load items ========================================


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
            saveCartNumbers(items[i]);
            totalCost(items[i]);
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

const cartNumSpan = document.querySelector('.cart .cartNumSpan');

// give cart number to each item 
function saveCartNumbers(item){
    let itemNumbers = localStorage.getItem('cartNumbers');

    if(itemNumbers){
        itemNumbers = parseInt(itemNumbers);
        localStorage.setItem('cartNumbers', itemNumbers + 1);
        cartNumSpan.textContent = itemNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        cartNumSpan.textContent = 1;
    }

    setItems(item);
}

function setItems(item){
    let cartItems = localStorage.getItem('itemsInCart');
    cartItems = JSON.parse(cartItems);
    
    if(cartItems != null){
        // if clicked another item,
        if(cartItems[item.type] == undefined){
            cartItems = {...cartItems, [item.type]:item}
        }
        cartItems[item.type].inCart += 1;
    } else{
        //if nothing in cartItems,
        item.inCart = 1;
        cartItems = {[item.type]:item};
    }
    
    localStorage.setItem('itemsInCart', JSON.stringify(cartItems));
}

function totalCost(item){
    let cartCost = localStorage.getItem('totalCost');

    if(cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem('totalCost', cartCost + item.price);
    } else {
        localStorage.setItem('totalCost', item.price);
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

function onloadCartNumbers(){
    let itemNumbers = localStorage.getItem('cartNumbers');
    if(itemNumbers){
        cartNumSpan.textContent = itemNumbers;
    }
}

function displayCart(){
    let cartItems = localStorage.getItem('itemsInCart');
    cartItems = JSON.parse(cartItems);
    let items = document.querySelector('.items');
    let cartCost = localStorage.getItem('totalCost');

    if(cartItems && items){
        items.innerHTML = '';
        console.log(items);
        Object.values(cartItems).map(cartItem => {
            items.innerHTML += `
                <div class="products">
                    <div class="product">
                        <i class="fas fa-window-close"></i>
                        <img src=${cartItem.image}>
                        <span>${cartItem.type}</span>
                    </div>
                    <div class="price">$${cartItem.price}</div>
                    <div class="quantity">
                        <span><i class="fas fa-sort-up"></i></span>
                            ${cartItem.inCart}
                        <span><i class="fas fa-sort-down"></i></span>
                    </div>
                    <div class="total">$${cartItem.price * cartItem.inCart}</div>
                </div>
            `
        })
        items.innerHTML += `
            <div class="basketCon">
            <h4 class="basketTitle">Basket Total</h4>
            <h4 class="basketTotal">${cartCost}</h4>
            `
    }
}

loadItems()
.then(items => {
    displayItems(items);
    setEventListeners(items);
})
.catch(console.log)

onloadCartNumbers();

displayCart();


// ============================= Cart ========================================


