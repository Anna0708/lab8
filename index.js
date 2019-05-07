const fs = require('fs');
const osmosis = require('osmosis');
var bigdata = {}, str = {}, i = 0, ret;
osmosis
	.get('https://prom.ua/ua/Mobilnye-telefony')
  .find('.x-gallery-tile__content')               // Find all outer div tags
  .set({
    name: '.x-gallery-tile__name-holder a',          // Extract the properties out of it which are needed
    price:  '.x-gallery-tile__price span'
  })
  .data(function( data ) {
      str["data"+i] = JSON.stringify({ name: data.name, price: data.price}) + "\n";
      bigdata["data"+i] = { name: data.name, price: data.price}; i++;
   })
  .done(function() {
    fs.readFile("index.html", function(err, val) {
      console.log(true);
      ret = val.split("#");
    });
    console.log(ret);
    fs.writeFileSync("index.html", ret[0]+str+ret[1]);
  });