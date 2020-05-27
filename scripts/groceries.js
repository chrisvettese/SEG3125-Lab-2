// Array of products, each product is an object with different fieldset
// A set of ingredients should be added to products		 

//will contain products in the format outlined in the add function

const products = [];

//adds a product to the products list
function add(name, vegetarian, glutenFree, lactoseFree, organic, price) {
    products.push({
        name: name,
        vegetarian: vegetarian,
        glutenFree: glutenFree,
        lactoseFree: lactoseFree,
        organic: organic,
        price: price
    });
}

add("Broccoli", true, true, true, true, "$1.99");
add("Bread", true, false, true, false, "$2.35");
add("Salmon", false, true, true, true, "$10.00");
add("Skim Milk", true, true, false, false, "$4.50");
add("2% Milk Lactose Free", true, true, true, true, "$4.50");
add("Salted Butter", true, true, false, true, "$5.00");
add("Apple", true, true, true, true, "$1.30");
add("Yellow Onion", true, true, true, true, "$3.70");
add("Jasmine Rice", true, true, true, false, "$5.90");
add("Banana", true, true, true, false, "$2.45");
add("Flour", true, false, true, false, "$1.10");

//Sorts the products in order from least to most expensive
products.sort((p1, p2) => (p1.price > p2.price) ? 1 : -1);

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
        for (let i = 0; i < prods.length; i++) {
            productNames.push(getPricedProduct(i));
        }
        return productNames;
    }

    nextProduct:
        for (let i = 0; i < prods.length; i++) {
            for (let j = 0; j < checkboxes.length; j++) {
                if (checkboxes[j].checked && !prods[i][getKeyFromCheckboxId(j)]) {
                    continue nextProduct;
                }
            }
            productNames.push(getPricedProduct(i));
        }
    return productNames;
}

// Calculate the total price of items, with received parameter being a list of products
function getTotalPrice(chosenProducts) {
    let totalPrice = 0.0;
    for (let i = 0; i < products.length; i += 1) {
        if (chosenProducts.indexOf(getPricedProduct(i)) > -1) {
            totalPrice += getNumberFromPrice(products[i].price);
        }
    }
    return totalPrice;
}

function getNumberFromPrice(priceString) {
    return parseFloat(priceString.substring(1))
}

function getPricedProduct(index) {
    return products[index].name + "  " + products[index].price
}

function getKeyFromCheckboxId(id) {
    switch (id) {
        case 0:
            return "vegetarian";
        case 1:
            return "glutenFree";
        case 2:
            return "lactoseFree";
        case 3:
            return "organic";
    }
}
