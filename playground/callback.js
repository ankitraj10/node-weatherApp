var getUser = (id, callback) => {
  console.log("i am from main function");
  var user = {
    id: 31,
    name: "john"
  };
  setTimeout(() => {
    callback(user);
  }, 3000);
};
console.log("outside all function");

getUser(
  31,
  (callback = user => {
    console.log(user);
    console.log("i am from callback function");
  })
);
