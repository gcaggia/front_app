/**
 * Code By Guillaume Caggia
 */

var currentQuote = -1;
var tabQuote = [];

var tabColors = [];

tabColors[0]  = ["turquoise",     "#1ABC9C"];
tabColors[1]  = ["green-sea",     "#16A085"];
tabColors[2]  = ["emerland",      "#2ECC71"];
tabColors[3]  = ["nephritis",     "#27AE60"];
tabColors[4]  = ["peter-river",   "#3498DB"];
tabColors[5]  = ["belize-hole",   "#2980B9"];
tabColors[6]  = ["amethyst",      "#9B59B6"];
tabColors[7]  = ["wisteria",      "#8E44AD"];
tabColors[8]  = ["wet-asphalt",   "#34495E"];
tabColors[9]  = ["midnight-blue", "#2C3E50"];
tabColors[10] = ["sun-flower",    "#F1C40F"];
tabColors[11] = ["orange",        "#F39C12"];
tabColors[12] = ["carrot",        "#E67E22"];
tabColors[13] = ["pumpkin",       "#D35400"];
tabColors[14] = ["alizarin",      "#E74C3C"];
tabColors[15] = ["pomegranate",   "#C0392B"];
tabColors[16] = ["clouds",        "#ECF0F1"];
tabColors[17] = ["silver",        "#BDC3C7"];
tabColors[18] = ["concrete",      "#95A5A6"];
tabColors[19] = ["asbestos",      "#7F8C8D"];
  

/**
 * The purpose of this function is to get a random quote from the API 
 * by a POST request with jQuery ajax function
 */
function getQuoteFromAPI(flagDrop) {

  $.ajax({
    type: "POST",
    url: "https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous",
    headers: {
    "X-Mashape-Key":
      "j57cNxpMSLmshVySWMfmpUo3Kmrkp1wmNSajsn50PQvUDByiQQ",
    Accept: "application/json",
    "Content-Type": "application/x-www-form-urlencoded"
  },
    success: function(response) {
      tabQuote.push(response);
      currentQuote++;
      changeQuote(currentQuote, flagDrop);
    }
  });

}

/**
 * This function aims to change the quote and the background after
 * a user clicks on the buttons
 */
function changeQuote(iQuote, flagDrop) {

  if(tabQuote[iQuote].quote.length >= 95) {
    $('blockquote').css('font-size', '24px');
  } else {
    $('blockquote').css('font-size', '28px');
  }

  var color = Math.floor(Math.random() * tabColors.length);

  $('body').animate({
    "background-color": tabColors[color][1],

  }, 1000);
  
  if (flagDrop) {
    $(".block-quote").effect("drop", 1000, function() {
      
      $("#quote-text").html(tabQuote[iQuote].quote);
      $("#quote-author").html(tabQuote[iQuote].author);
      $(this).removeAttr( "style" ).hide().fadeIn();
    });
  } else {
    $("#quote-text").html(tabQuote[iQuote].quote);
    $("#quote-author").html(tabQuote[iQuote].author);
  }
  
  
  


}


$(document).ready(function() {
  
  //First init of the quote
  getQuoteFromAPI(false);
  
  
  $("#next-quote").click(function(){
    if (currentQuote === tabQuote.length - 1) {
      getQuoteFromAPI(true);
    } else {
      currentQuote++;
      changeQuote(currentQuote, true);
    }
  });
  
  $("#last-quote").click(function(){
    if (currentQuote !== 0) {
      currentQuote--;
      changeQuote(currentQuote);
    }
    
  });
  
});