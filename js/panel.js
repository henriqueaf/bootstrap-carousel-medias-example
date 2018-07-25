var panelFunctions = {
  setCurrentDate: function(){
    $("#currentDate").text( moment().format("ddd D/MM") );
  },

  setCurrentTime: function(){
    $("#currentTime").text( moment().format('HH:mm') );
  },

  setCurrentWeather: function(){
    var OPEN_WEATHER_MAP_URL = 'http://api.openweathermap.org/data/2.5/weather?lang=pt&units=metric';
    var FORTALEZA_WEATHER_API_ID = 3399415;
    var OPEN_WEATHER_MAP_KEY = 'f1800d4df056f6d2e3029e788312b2e6';

    $.get( OPEN_WEATHER_MAP_URL + '&id=' + FORTALEZA_WEATHER_API_ID + '&APPID=' + OPEN_WEATHER_MAP_KEY, function( data ) {
      $("#minTemp").text( data.main.temp_min );
      $("#maxTemp").text( data.main.temp_max );
      var weatherIdSplit = data.weather[0].id.toString().match(/\d/g);

      var hour = moment().hour();
      var weatherIconClass = 'wi wi-day-';
      if(hour >= 18){
        weatherIconClass = 'wi wi-night-';
      }

      switch(weatherIdSplit[0]) {
        case "2": //Thunderstorm
          $("#weatherIcon").prop('class', weatherIconClass + 'thunderstorm');
          break;
        case "3": //Drizzle
          $("#weatherIcon").prop('class', weatherIconClass + 'sprinkle');
          break;
        case "5": //Rain
          $("#weatherIcon").prop('class', weatherIconClass + 'rain');
          break;
        case "6": //Snow
          $("#weatherIcon").prop('class', weatherIconClass + 'snow');
          break;
        case "7": //Atmosphere
          $("#weatherIcon").prop('class', weatherIconClass + 'fog');
          break;
        case "8": //Clear or Clouds
          var lastIdNumber = weatherIdSplit[2];

          if(lastIdNumber == "0"){
            if(hour >= 18){
              weatherIconClass = weatherIconClass + 'clear';
            }else{
              weatherIconClass = weatherIconClass + 'sunny';
            }

            $("#weatherIcon").prop('class', weatherIconClass);
          }else{
            $("#weatherIcon").prop('class', weatherIconClass + 'cloudy');
          }
          break;
        default:
          $("#weatherIcon").prop('class', 'wi wi-day-sunny');
      }
    });
  },

  handleCarouselTransition: function(){
    var $mediaCarousel = $('#mediaCarousel');
    panelFunctions.checkRunVideo();

    $mediaCarousel.on('slid.bs.carousel', function () {
      panelFunctions.checkRunVideo();
    });
  },

  checkRunVideo: function(){
    var $mediaCarousel = $('#mediaCarousel');
    var videoDom = $('#mediaCarousel .active video')[0];
    if( videoDom ){
      setTimeout(function(){
        $mediaCarousel.carousel('pause');
      }, 1000);

      videoDom.play();
      videoDom.onended = function() {
        $mediaCarousel.carousel('cycle');
        $mediaCarousel.carousel('next');
      };
    }
  }
}

$( document ).ready(function() {
  moment.locale('en');

  panelFunctions.setCurrentDate();
  panelFunctions.setCurrentTime();
  panelFunctions.setCurrentWeather();
  panelFunctions.handleCarouselTransition();

  setInterval(function(){
    panelFunctions.setCurrentDate();
    panelFunctions.setCurrentTime();
  }, 5000);
});
