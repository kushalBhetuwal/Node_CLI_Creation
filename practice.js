const inputString = "Hello, world!";
const pattern = /(\w+)/;
const result = inputString.replace(pattern, (match, word) => {
  // This is the callback function
  return word.toUpperCase(); // Custom replacement logic
});

console.log(result)