var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/test");

var kittySchema = mongoose.Schema({
  name: String,
});

kittySchema.methods.speak = function() {
  var greeting = this.name
    ? "Meow name is " + this.name
    : "I don't have a name";
  console.log(greeting);
};

var Kitten = mongoose.model("Kitten", kittySchema);

var silence = new Kitten({ name: "Silence" });
console.log(silence.name);

silence.save(function(err, kitten) {
  if (err) console.log(err);
  console.log(kitten.name + " saved");
});

var invalid = new Kitten({ name: "Invalid", age: 10 });

console.log(invalid.age);

invalid.save(function(err, kitten) {
  if (err) console.log(err);
  console.log(kitten.name + " saved");
});

var missing = new Kitten({});

console.log(missing.name);

missing.save(function(err, kitten) {
  if (err) console.log(err);
  console.log(kitten.name + " saved");
});

var fluffy = new Kitten({ name: "fluffy" });
fluffy.speak();

fluffy.save(function(err, kitten) {
  if (err) console.log(err);
  kitten.speak();
});