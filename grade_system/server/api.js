let curId = 4;
const products = [
    {
        id: 1,
        name: 'product a',
        price: 105440.5,
        email: 'email@ya.com',
        count: 7,
        deliveryCountry: 1,
        deliveryCity: null
    },
    {
        id: 2,
        name: 'product b',
        price: 40656000.5,
        email: 'email@ya.com',
        count: 7,
        deliveryCountry: null,
        deliveryCity: null
    },
    {
        id: 3,
        name: 'product c',
        price: 50,
        email: 'email@ya.com',
        count: 7,
        deliveryCountry: 2,
        deliveryCity: [5, 6]
    }
],
    countries = [
        {
            id: 1,
            name: 'Russia'
        },
        {
            id: 2,
            name: 'USA'
        },
        {
            id: 3,
            name: 'Canada'
        }
    ],
    cities = [
        {
            id: 1,
            name: 'Saratov',
            countryID: 1
        },
        {
            id: 2,
            name: 'Moskov',
            countryID: 1
        },
        {
            id: 3,
            name: 'St. Petersburg',
            countryID: 1
        },
        {
            id: 4,
            name: 'Washington',
            countryID: 2
        },
        {
            id: 5,
            name: 'Detroit',
            countryID: 2
        },
        {
            id: 6,
            name: 'New York',
            countryID: 2
        },
        {
            id: 7,
            name: 'Ottava',
            countryID: 3
        },
        {
            id: 8,
            name: 'Monreal',
            countryID: 3
        },
        {
            id: 9,
            name: 'Kingston',
            countryID: 3
        }
    ];

exports.getAllProducts = function () {
    return products;
};

exports.getProduct = function (id) {
    for (let product of products) {
        if (product.id === id) {
            return product;
        }
    }

    return null;
};

exports.searchByName = function (name) {
    const result = products.filter(product => product.name.indexOf(name) !== -1);
    return result;
};

exports.addProduct = function (prodInfo) {
    const { ...newProd } = prodInfo;
    newProd.id = curId;
    products.push(newProd);
    curId++;
    return (curId - 1);
};

exports.editProduct = function (newProd) {
    for (let product of products) {
        if (product.id === newProd.id) {
            for (let key in product) {
                if (product.hasOwnProperty(key)) {
                    product[key] = newProd[key];
                }
            }
            return product.id;
        }
    }

    return null;
};

exports.deleteProduct = function (id) {
    for (let product of products) {
        if (product.id === id) {
            products.splice(products.indexOf(product), 1);
            return product.id;
        }
    }

    return null;
};

exports.getAllCities = function () {
    return cities;
};

exports.getAllCountries = function () {
    return countries;
};
