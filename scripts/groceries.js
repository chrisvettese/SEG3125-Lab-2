// Array of products, each product is an object with different fieldset
// A set of ingredients should be added to products		 

//will contain products in the format outlined in the add function
const NAME = 0;
const VEGETARIAN = 1;
const GLUTEN_FREE = 2;
const LACTOSE_FREE = 3;
const ORGANIC = 4;
const PRICE = 5;

const products = [
    [],
    [],
    [],
    [],
    [],
    []
];

//adds a product to the products list
function add(name, vegetarian, glutenFree, lactoseFree, organic, price) {
    products[NAME].push(name);
    products[VEGETARIAN].push(vegetarian);
    products[GLUTEN_FREE].push(glutenFree);
    products[LACTOSE_FREE].push(lactoseFree);
    products[ORGANIC].push(organic);
    products[PRICE].push(price);
}

add("Broccoli", true, true, true, true, 1.99);
add("Bread", true, false, true, false, 2.35);
add("Salmon", false, true, true, true, 10.00);
add("Skim Milk", true, true, false, false, 4.50);
add("2% Milk Lactose Free", true, true, true, true, 4.50);
add("Salted Butter", true, true, false, true, 5.00);
add("Apple", true, true, true, true, 1.30);
add("Yellow Onion", true, true, true, true, 3.70);
add("Jasmine Rice", true, true, true, false, 5.90);
add("Banana", true, true, true, false, 2.45);
add("Flour", true, false, true, false, 1.10);

// given restrictions provided, make a reduced list of products
// prices should be included in this list, as well as a sort based on price

function restrictListProducts(prods, checkboxes) {
    let productNames = [];

    //Check if none of the checkboxes are checked, then no need to verify each item individually
    let anyChecked = false;
    for (let j = 0; j < checkboxes.length && anyChecked === false; j++) {
        if (checkboxes[j].checked) {
            anyChecked = true;
        }
    }
    //If none of the checkboxes are checked, display all items
    if (anyChecked === false) {
        productNames = productNames.concat(prods[NAME]);
        return productNames;
    }

    nextProduct:
    for (let i = 0; i < prods[0].length; i++) {
        for (let j = 0; j < checkboxes.length; j++) {
            if (checkboxes[j].checked && !prods[j + 1][i]) {
                continue nextProduct;
            }
        }
        productNames.push(prods[NAME][i]);
    }
    return productNames;
}

// Calculate the total price of items, with received parameter being a list of products
function getTotalPrice(chosenProducts) {
    let totalPrice = 0;
    for (let i = 0; i < products.length; i += 1) {
        if (chosenProducts.indexOf(products[NAME][i]) > -1) {
            totalPrice += products[PRICE][i];
        }
    }
    return totalPrice;
}
