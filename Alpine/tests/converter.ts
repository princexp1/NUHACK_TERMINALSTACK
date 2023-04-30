const {jsonToXml} = require("../service/converter");
console.log(jsonToXml({
    "person": {
      "name": "John Doe",
      "age": 30,
      "address": {
        "street": "123 Main St",
        "city": "Anytown",
        "state": "CA"
      },
      "phoneNumbers": [
        {
          "type": "home",
          "number": "555-555-1234"
        },
        {
          "type": "work",
          "number": "555-555-5678"
        }
      ]
    }
  }))
export {}