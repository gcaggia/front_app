$(document).ready(main());

var obj = {};

function getIP(callback) {
  $.getJSON('https://ipinfo.io', function(data){ 
    obj.IP = data;
    if (callback)
      callback();
  });
}

function getLocation(callback) {
  $.getJSON('http://ip-api.com/json/' + obj.IP.ip, function(data) {
    obj.location = data;
    if (callback)
      callback();
  });
}

function getWeather(callback) {
  var lat   = obj.location.lat;
  var lon   = obj.location.lon;
  var id    = "c9d2b40305897ca8dc04f4904b1b1a5f";
  var units = "metric";

  $.getJSON('http://api.openweathermap.org/data/2.5/weather?lat=' 
    + lat + '&lon=' + lon + '&APPID=' + id + '&units=' + units,
    function(data) {
      obj.weather = data;
      if (callback)
        callback();
    });
}

function updateView() {

  // console.log(obj);

  var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

  var dt = new Date();
  var strDt = (n(dt.getDate())) + 
    ' ' + monthNames[dt.getMonth()] + ' ' + dt.getFullYear();

  var sunriseDt = new Date(obj.weather.sys.sunrise * 1000);
  var sunsetDt  = new Date(obj.weather.sys.sunset * 1000);

  $('#dateToday').text(strDt);
  $('#city').text(obj.location.city);
  $('#country').text(obj.location.country);
  $('#w-temp').text(Math.round(obj.weather.main.temp) +'°C');
  $('#w-cond').text(obj.weather.weather[0].description);

  $('#sunrise').text(n(sunriseDt.getHours()) + 'h' 
    + n(sunriseDt.getMinutes()) );
  $('#sunset').text(n(sunsetDt.getHours()) + 'h' 
    + n(sunsetDt.getMinutes()) ) ;


  switch(obj.weather.weather[0].main.toLowerCase()) {
    case 'dizzle':
        $('.icon-weather').empty();
        $('#snow').clone().appendTo('.icon-weather');
        break;
      case 'clouds':
        $('.icon-weather').empty();
        $('#clouds').clone().appendTo('.icon-weather');
        break;
      case 'rain':
        $('.icon-weather').empty();
        $('#rain').clone().appendTo('.icon-weather');
        break;
      case 'snow':
        $('.icon-weather').empty();
        $('#snow').clone().appendTo('.icon-weather');
        break;
      case 'clear':
        $('.icon-weather').empty();
        $('#clear').clone().appendTo('.icon-weather');
        break;
      case 'thunderstorm':
        $('.icon-weather').empty();
        $('#thunderstorm').clone().appendTo('.icon-weather');
        break;
  }

}

function n(n){
    return n > 9 ? "" + n : "0" + n;
}

function main() {

  async.series([
    getIP,
    getLocation,
    getWeather,
    updateView
  ]);  

}