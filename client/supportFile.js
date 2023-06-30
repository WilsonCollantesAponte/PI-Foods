const k = [
  {
    val: "acar",
    val2: "der",
  },
  {
    val: "fs",
    val2: "op",
  },
  {
    val: "cl",
    val2: "ui",
  },
];

const m = ["def", "xer", "hous", "caxt"];

console.log(m.sort());
console.log(
  k.sort((a, b) => {
    if (a.val > b.val) return 1;
    if (a.val < b.val) return -1;
    return 0;
  })
);

const items = [
  { name: "Edward", value: 21 },
  { name: "Sharpe", value: 37 },
  { name: "And", value: 45 },
  { name: "The", value: -12 },
  { name: "Magnetic", value: 13 },
  { name: "Zeros", value: 37 },
];
console.log(
  items.sort(function (a, b) {
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }
    return 0;
  })
);
