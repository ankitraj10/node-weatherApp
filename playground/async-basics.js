console.log("starting the app");

setTimeout(() => {
  console.log("inside first callback function");
}, 2000);

setTimeout(() => {
  console.log("inside second time out function");
}, 0);
console.log("Finishing up App");
