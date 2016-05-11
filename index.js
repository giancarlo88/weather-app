var getLoc = function () {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) { //geolocator to get current co-ordinates
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
            $("#coords").html("<p>Location Co-ordinates: " + latitude + ", " + longitude + "</p>").fadeIn();
            $(".loading").remove();

            $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&APPID=95a5a8ea1ef9bfad611221e92a11e292", function (json) { //insert co-ordinates into API URL

                var tempC = json.main.temp - 273.15; //convert from Kelvin
                var tempF = (tempC * (9 / 5)) + 32; // convert from Celsius

                $("#weather").html(function () { //prints the weather to the page
                    return "<h1>Location: " + json.name + "<br><br><h2>Current Weather: " + json.weather[0].description.replace(/\w\S*/g, function (tStr) {
                        return tStr.charAt(0).toUpperCase() + tStr.substr(1).toLowerCase(); //capitalize the                                                                        //weather description
                    });
                });

                $("#temperature").html("<h2>The Temperature is <span id ='temp'>" + Math.round(tempC) + "&degC</span>").fadeIn(); //prints temperature in celsius as default

                $("body").css("background-image", function () { //sets background image based on current weather
                    var backUrl = "";
                    switch (json.weather[0].main) {
                    case "Clear":
                        backUrl = "url('https://static.pexels.com/photos/3768/sky-sunny-clouds-cloudy.jpg')";
                        break;
                    case "Thunderstorm":
                        backUrl = "url('https://static.pexels.com/photos/9466/pexels-photo.jpg')";
                        $("#words").css("color", "white"); //change font colour because this picture is very dark
                        break;
                    case "Drizzle":
                        backUrl = "url('https://static.pexels.com/photos/896/city-weather-glass-skyscrapers.jpg')";
                        break;
                    case "Rain":
                        backUrl = "url('http://www.lifeofpix.com/wp-content/uploads/2016/02/Life-of-Pix-free-stock-drops-texture-rain-LEEROY.jpg')";
                        $("#words").css("text-shadow", "2px 6px 2px dimgray"); //add shadow because picture has lots of                                                         //colours 
                        break;
                    case "Snow":
                        backUrl = "url('http://www.lifeofpix.com/wp-content/uploads/2015/11/photo-1423145406370-2b342ae5b597.jpeg')";
                        break;
                    case "Haze":
                        backUrl = "url('http://40.media.tumblr.com/a184f82ff596c21ac47d0626df7c3987/tumblr_nhvugblhpo1qfirfao1_1280.jpg')"; //
                        break;
                    case "Clouds":
                        backUrl = "url('http://www.alegriphotos.com/images/Storm-clouds-gathering-over-city356.jpg')";
                        break;
                    case "Extreme":
                        backUrl = "url('https://stockphotos.io/wp-content/uploads/2013/04/1369714919ebd31-600x399.jpg')";
                        break;
                    }
                    return backUrl;
                });

                $('input[name="options"]').on('change', function () { //Temperature unit selector
                    if ($(this).val() === "f") {
                        $("#temp").fadeOut(500, function () {
                            $(this).html(Math.round(tempF) + "&degF").fadeIn(500);
                        });
                    } else {
                        $("#temp").fadeOut(500, function () {
                            $(this).html(Math.round(tempC) + "&degC").fadeIn(500);

                        });
                    }
                });

            });
        });
    }
};

$(document).ready(function () {
    getLoc();

});