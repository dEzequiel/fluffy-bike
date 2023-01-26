# Handbook

## **Dependencies**

- [expressjs](https://github.com/expressjs/express) - The server for handling and routing HTTP requests
- [mongoose](https://github.com/Automattic/mongoose) - For modeling and mapping MongoDB data to javascript

## **Installation**

Use the package manager npm to install project dependencies.

```
git clone https://github.com/dEzequiel/fluffy-bike.git
cd fluffy-bike
npm install
```

## **Usage**

Depending in which environment you execute the application, `process.env` value will be diferent.

Production

```
npm run start
```

Development

```
npm run devstart
```

Test

```
npm run test
```

# Test

Each test is responsible for inserting the data used during the test. At the end of each suite of test cases the database is dropped. Configuration available inb `jest.config.js`.

## Coverage

# ECMAScript 6

This section was made with help of http://es6-features.org/

- **Spread operator**. Spreading of elements of an iterable collection (like an array or even a string) into both literal elements and individual function parameters.

```
    return {
      ...{ id: includeId ? _id : undefined },
      ...{ name: includeName ? name : undefined },
      ...{ brand: includeBrand ? brand : undefined },
      ...{ type: includeType ? type : undefined },
      ...{ frame: includeFrame ? frame : undefined },
      ...{ fork: includeFork ? fork : undefined },
      ...{ gears: includeGears ? gears : undefined },
      ...{ brakes: includeBrakes ? brakes : undefined },
      ...{ wheels: includeWheels ? wheels : undefined },
      ...{ tires: includeTires ? tires : undefined },
      ...{ suspension: includeSuspension ? suspension : undefined },
      ...{ weight: includeWeight ? weight : undefined },
    };
  };
```

- **String interpolation**. Intuitive expression interpolation for single-line and multi-line strings.

```
fs.readdirSync(PATH_ROUTER).filter((filename) => {
  const name = cleanFilename(filename);
  if (name !== "index") {
    console.log(`Loading route... /${name}`);
    router.use(`/${name}`, require(`./${filename}`));
  }
});
```

- **Property Shorthand**. Shorter syntax for common object property definition idiom.

```
    const {
      _id,
      name,
      brand,
      type,
      frame,
      fork,
      gears,
      brakes,
      wheels,
      tires,
      suspension,
      weight,
    } = result;
```

- **Method Properties**. Support for method notation in object property definitions, for both regular functions and generator functions.

```
  bycicleExist: (id) => {
    const entity = models.bycicle.findById(id);

    entity.then((data) => {
      if (data === null) return false;
    });

    return true;
  },
```

- **Promise Usage** First class representation of a value that may be made asynchronously and be available in the future.

```
createShop(name) {
    const response = new Promise((resolve, reject) => {
      const shop = new ShopModel({ name, bycicles: [] });

      shop.save((err, result) => {
        if(err){
          console.error(err);
          reject(err);
        } else {
          resolve(result);
        }
      })
      })
      return response

  }
```
