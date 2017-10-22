export let orders = [
  {
    id: 1,
    title: 'Order 1',
    date: '2017-06-29 12:09:33',
    description: 'desc order 1',
    getProducts: getProducts
  },
  {
    id: 2,
    title: 'Order 2',
    date: '2017-06-29 12:09:33',
    description: 'desc order 2',
    getProducts: getProducts
  },
  {
    id: 3,
    title: 'Order 3',
    date: '2017-06-29 12:09:33',
    description: 'desc order 3',
    getProducts: getProducts
  }
];

export let products = [
  {
    id: 1,
    serialNumber: 1234,
    isNew: 1,
    photo: 'rbin.png',
    title: 'Product 1',
    type: 'Monitors',
    specification: 'Specification 1',
    guarantee: {
      start: '2017-06-29 12:09:33',
      end: '2017-06-29 12:09:33'
    },
    price: [
      {value: 100, symbol: 'USD', isDefault: 0},
      {value: 2600, symbol: 'UAH', isDefault: 1}
    ],
    order: 1,
    date: '2017-06-29 12:09:33'
  },
  {
    id: 2,
    serialNumber: 1234,
    isNew: 1,
    photo: 'rbin.png',
    title: 'Product 2',
    type: 'Computers',
    specification: 'Specification 1',
    guarantee: {
      start: '2017-06-29 12:09:33',
      end: '2017-06-29 12:09:33'
    },
    price: [
      {value: 100, symbol: 'USD', isDefault: 0},
      {value: 2600, symbol: 'UAH', isDefault: 1}
    ],
    order: 2,
    date: '2017-06-29 12:09:33'
  },
  {
    id: 3,
    serialNumber: 1234,
    isNew: 1,
    photo: 'rbin.png',
    title: 'Product 3',
    type: 'Monitors',
    specification: 'Specification 1',
    guarantee: {
      start: '2017-06-29 12:09:33',
      end: '2017-06-29 12:09:33'
    },
    price: [
      {value: 100, symbol: 'USD', isDefault: 0},
      {value: 2600, symbol: 'UAH', isDefault: 1}
    ],
    order: 3,
    date: '2017-06-29 12:09:33'
  },
  {
    id: 4,
    serialNumber: 1234,
    isNew: 1,
    photo: 'rbin.png',
    title: 'Product 4',
    type: 'Computers',
    specification: 'Specification 1',
    guarantee: {
      start: '2017-06-29 12:09:33',
      end: '2017-06-29 12:09:33'
    },
    price: [
      {value: 200, symbol: 'USD', isDefault: 0},
      {value: 7200, symbol: 'UAH', isDefault: 1}
    ],
    order: 1,
    date: '2017-06-29 12:09:33'
  },
  {
    id: 5,
    serialNumber: 1234,
    isNew: 1,
    photo: 'rbin.png',
    title: 'Product 5',
    type: 'Monitors',
    specification: 'Specification 1',
    guarantee: {
      start: '2017-06-29 12:09:33',
      end: '2017-06-29 12:09:33'
    },
    price: [
      {value: 300, symbol: 'USD', isDefault: 0},
      {value: 9800, symbol: 'UAH', isDefault: 1}
    ],
    order: 2,
    date: '2017-06-29 12:09:33'
  },
  {
    id: 6,
    serialNumber: 1234,
    isNew: 1,
    photo: 'rbin.png',
    title: 'Product 6',
    type: 'Other',
    specification: 'Specification 1',
    guarantee: {
      start: '2017-06-29 12:09:33',
      end: '2017-06-29 12:09:33'
    },
    price: [
      {value: 100, symbol: 'USD', isDefault: 0},
      {value: 2600, symbol: 'UAH', isDefault: 1}
    ],
    order: 3,
    date: '2017-06-29 12:09:33'
  }
];

export let users = [
  {
    id: 1,
    name: "Иван Усачев",
    login: "vanyaus",
    password: 'ivan123',
    email: "kaplun.serj@ukr.net",
    position: "приемщик"
  },
  {
    id: 2,
    name: "Филипп Котов",
    login: "phill",
    password: 'phill123',
    email: "kaplun.serj@ukr.net",
    position: "товаровед"
  },
  {
    id: 3,
    name: "Петр Кисляк",
    login: "petya",
    password: 'petya123',
    email: "kaplun.serj@ukr.net",
    position: "бухгалтер"
  }
];

function getProducts() {
	let arrProds = [];
	for(let i = 0; i < products.length; i++) {
		if(products[i].order !== this.id) continue;
		else arrProds.push(products[i]);
	}
	return arrProds;
}