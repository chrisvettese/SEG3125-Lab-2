//Adds event listeners for the tabs
document.getElementById('client-button').addEventListener('click', e => openInfo(e, 'Client'));
document.getElementById('product-button').addEventListener('click', e => openInfo(e, 'Products'));
document.getElementById('cart-button').addEventListener('click', e => openInfo(e, 'Cart'));

// This function is called when any of the tab is clicked
// It is adapted from https://www.w3schools.com/howto/howto_js_tabs.asp

function openInfo(evt, tabName) {

    // Get all elements with class='tabcontent' and hide them
    let tabcontent = document.getElementsByClassName('tabcontent');
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = 'none';
    }

    // Get all elements with class='tablinks' and remove the class 'active'
    let tablinks = document.getElementsByClassName('tablinks');
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(' active', '');
    }

    if (tabName === 'Products') {
        populateListProductChoices()
    }
    // Show the current tab, and add an 'active' class to the button that opened the tab
    document.getElementById(tabName).style.display = 'block';
    evt.currentTarget.className += ' active';

}


// generate a checkbox list from a list of products
// it makes each product name as the label for the checkbox

function populateListProductChoices() {
    const checkboxes = document.querySelectorAll('div#checkboxes input[type=checkbox]');
    const s2 = document.getElementById('displayProduct');

    const preselectedItems = document.getElementById('preselected');
    const checkboxSpans = document.getElementById('checkboxes').getElementsByTagName('span');
    let restrictions = '';
    for (let i = 0; i < checkboxSpans.length; i++) {
        if (checkboxes.item(i).checked) {
            if (restrictions !== '') {
                restrictions += ', '
            }
            restrictions += checkboxSpans.item(i).textContent;
        }
    }
    if (restrictions === '') {
        preselectedItems.innerHTML = 'All grocery items are shown.'
    } else {
        preselectedItems.innerHTML = 'We preselected products based on your restrictions: ' + restrictions
    }

    // s2 represents the <div> in the Products tab, which shows the product list, so we first set it empty
    s2.innerHTML = '';

    // obtain a reduced list of products based on restrictions
    const optionArray = restrictListProducts(products, checkboxes);

    // for each item in the array, create a checkbox element, each containing information such as:
    // <input type='checkbox' name='product' value='Bread'>
    // <label for='Bread'>Bread/label><br>

    for (let i = 0; i < optionArray.length; i++) {

        const productName = optionArray[i];
        // create the checkbox and add in HTML DOM
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.name = 'product';
        checkbox.value = productName;
        s2.appendChild(checkbox);

        // create a label for the checkbox, and also add in HTML DOM
        const label = document.createElement('label');
        label.htmlFor = productName;
        label.appendChild(document.createTextNode(productName));
        s2.appendChild(label);

        // create a breakline node and add in HTML DOM
        s2.appendChild(document.createElement('br'));
    }
}

// This function is called when the 'Add selected items to cart' button in clicked
// The purpose is to build the HTML to be displayed (a Paragraph) 
// We build a paragraph to contain the list of selected items, and the total price

function selectedItems() {

    const ele = document.getElementsByName('product');
    const chosenProducts = [];

    const cart = document.getElementById('displayCart');
    cart.innerHTML = '';

    // build list of selected item
    const para = document.createElement('P');
    para.innerHTML = 'You selected: ';
    para.appendChild(document.createElement('br'));
    for (let i = 0; i < ele.length; i++) {
        if (ele[i].checked) {
            para.appendChild(document.createTextNode(ele[i].value));
            para.appendChild(document.createElement('br'));
            chosenProducts.push(ele[i].value);
        }
    }

    // add paragraph and total price
    cart.appendChild(para);
    let totalPrice = getTotalPrice(chosenProducts) + '';
    if (totalPrice.length > 1 && totalPrice[totalPrice.length - 2] === '.') {
        totalPrice += '0'
    }
    cart.appendChild(document.createTextNode('Total price is $' + totalPrice));

}

