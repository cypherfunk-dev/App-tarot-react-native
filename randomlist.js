let list = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// function randomList(list) {
//   let newlist = [];
//   for (let i = 0; i < list.length; i++) {
//     let random = Math.floor(Math.random() * list.length);
//     console.log(random);
//   }
// }

list.sort(() => Math.random() - 0.5);
console.log(list);