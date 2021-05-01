const faker = require("faker");
const models = require("../models");

let data = [];
for (let i = 0; i < 1000; i++) {
  data.push(
    models.product.create({
      Name: `${faker.commerce.productName()} ${i}`,
      // Barcode: faker.datatype.alphaNumeric(13),
      Qty: faker.datatype.number({ min: 1000, max: 9000 }),
      BuyingPrice: faker.datatype.number(1, 5),
      RetailPrice: faker.datatype.number(5, 50),
      // StockThreshold: faker.datatype.number({ min: 20, max: 80 }),
      IsActive: faker.datatype.boolean(),
      // Status: status[Math.floor(Math.datatype() * Math.floor(2))],
      // userId: "ce538d31-1611-400e-bd1d-7703f008a70d",
      IsLoyalble: faker.datatype.boolean(),
      IsFavorite: faker.datatype.boolean(),
      Color: faker.internet.color()
    })
  );
}

for (let i = 0; i < 1000; i++) {
  data.push(
    models.customer.create({
      Name: `${faker.name.firstName()} ${i}`,
      IsActive: faker.datatype.boolean(),
      IsOweable: true,
      Debt: 0,
      Barcode: `${Date.now().toString()}${i}`
    })
  );
}

for (let i = 0; i < 25; i++) {
  data.push(
    models.pack.create({
      Size: parseInt(faker.datatype.number({ min: 30, max: 100 }) / 5)
    })
  );
}

for (let i = 0; i < 8; i++) {
  let Threshold = faker.datatype.number({ min: 1000, max: 10000 });
  let RewardValue = parseInt(Threshold * 0.1);
  data.push(
    models.loyalty.create({
      Name: `plan ${i}`,
      Threshold,
      RewardValue,
      Color: faker.internet.color()
    })
  );
}

Promise.all(data)
  .then(() => {
    console.log("data have been save to the db!");
  })
  .catch((e) => {
    console.log(e);
  });
