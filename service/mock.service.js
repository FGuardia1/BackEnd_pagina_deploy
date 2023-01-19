const { createFakeProduct } = require("../utils/product.utils");

class MockService {
  items = [];
  constructor() {
    for (let i = 1; i <= 5; i++) {
      const newItem = createFakeProduct(i);
      this.items.push(newItem);
    }
  }

  getAll() {
    return this.items;
  }
}

module.exports = { MockService };
