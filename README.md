# is-opencollective-member

Checks to see if a user is an Open Collective member for a project.

## INSTALLATION

```sh
npm i pdehaan/is-opencollective-member -S
```

## USAGE

```js
const OpenCollective = require("is-opencollective-member");

const collective = new OpenCollective("11ty");
const member = await collective.isOpenCollectiveMember({
  opencollective: "pdehaan",
  twitter: "pdehaan",
});

console.log(member); // {...}
```

If you want to manually fetch the Open Collective data, you can use async `.fetch()` method.

```js
const OpenCollective = require("is-opencollective-member");

const collective = new OpenCollective();
const members = await collective.fetch("11ty");
// console.log(members);
const member = await collective.isOpenCollectiveMember({
  github: "zachleat",
});

console.log(member); // {...}
```

Or, if you want to set the Open Collective data manually from an existing array (because maybe you like to cache requests, like a good citizen), you can use the `.load()` method.

```js
const OpenCollective = require("is-opencollective-member");

const collective = new OpenCollective();
await collective.load([...]);
const member = await collective.isOpenCollectiveMember({
  twitter: "pdehaan",
});
console.log(member);
```
