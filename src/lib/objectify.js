const input =
  "user.name.firstname=Bob&user.name.lastname=Smith&user.favoritecolor=Light%20Blue";
const splitedQuery = input.split("&");
[firstnameBlock, lastnameBlock, colorBlock] = splitedQuery;

const output = {
  user: {
    name: {
      firstname: decodeURI(firstnameBlock?.replace("user.name.firstname=", "")),
      lastname: decodeURI(lastnameBlock?.replace("user.name.lastname=", "")),
    },
  },
  favoriteColor: decodeURI(colorBlock?.replace("user.favoritecolor=", "")),
};

console.log(output);
console.log("Stringfly", JSON.stringify(output));
