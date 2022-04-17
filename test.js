const OpenCollective = require("./index");

// main1();
// main2();
main3();

async function main1() {
  const collective = new OpenCollective("11ty");
  const member = await collective.isOpenCollectiveMember({
    opencollective: "pdehaan",
    twitter: "pdehaan",
  });

  console.log(member);
}

async function main2() {
  const collective = new OpenCollective();
  const members = await collective.fetch("11ty");
  // console.log(members);
  const member = await collective.isOpenCollectiveMember({
    github: "zachleat",
  });

  console.log(member);
}

async function main3() {
  const collective = new OpenCollective();
  await collective.load([]);
  const member = await collective.isOpenCollectiveMember({
    twitter: "pdehaan",
  });
  console.log(member);
}
