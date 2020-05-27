// Array of products, each product is an object with different fieldset
// A set of ingredients should be added to products		 

const products = [
    {
        name: "Broccoli",
        vegetarian: true,
        glutenFree: true,
        lactoseFree: true,
        price: 1.99
    },
    {
        name: "Bread",
        vegetarian: true,
        glutenFree: false,
        lactoseFree: true,
        price: 2.35
    },
    {
        name: "Salmon",
        vegetarian: false,
        glutenFree: true,
        lactoseFree: true,
        price: 10.00
    },
    {
        name: "Skim Milk",
        vegetarian: true,
        glutenFree: true,
        lactoseFree: false,
        price: 4.50
    },
    {
        name: "2% Milk Lactose Free",
        vegetarian: true,
        glutenFree: true,
        lactoseFree: true,
        price: 4.50
    },
    {
        name: "Salted Butter",
        vegetarian: true,
        glutenFree: true,
        lactoseFree: false,
        price: 5.00
    },
    {
        name: "Apple",
        vegetarian: true,
        glutenFree: true,
        lactoseFree: true,
        price: 1.30
    },
    {
        name: "Yellow Onion",
        vegetarian: true,
        glutenFree: true,
        lactoseFree: true,
        price: 3.70
    },
    {
        name: "Jasmine Rice",
        vegetarian: true,
        glutenFree: true,
        lactoseFree: true,
        price: 5.90
    },
    {
        name: "Banana",
        vegetarian: true,
        glutenFree: true,
        lactoseFree: true,
        price: 2.45
    },
    {
        name: "Garlic",
        vegetarian: true,
        glutenFree: true,
        lactoseFree: true,
        price: 1.10
    },
];


// given restrictions provided, make a reduced list of products
// prices should be included in this list, as well as a sort based on price

function restrictListProducts(prods, checkboxes) {
    let product_names = [];

    for (let i = 0; i < prods.length; i += 1) {
        if ((checkboxes.item(0).checked && !prods[i].vegetarian) ||
            (checkboxes.item(1).checked && !prods[i].glutenFree) ||
            (checkboxes.item(2).checked && !prods[i].lactoseFree)) {
            continue;
        }
        product_names.push(prods[i].name);
    }
    return product_names;
}

// Calculate the total price of items, with received parameter being a list of products
function getTotalPrice(chosenProducts) {
    let totalPrice = 0;
    for (let i = 0; i < products.length; i += 1) {
        if (chosenProducts.indexOf(products[i].name) > -1) {
            totalPrice += products[i].price;
        }
    }
    return totalPrice;
}
