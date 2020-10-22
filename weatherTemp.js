var weatherObject = new XMLHttpRequest();

weatherObject.open('GET','https://secret-ocean-49799.herokuapp.com/https://www.metaweather.com/api/location/523920',true);

weatherObject.send();

/*my ajax implementation*/
weatherObject.onload = function() {
    var weatherInfo = JSON.parse(weatherObject.responseText);
    var weatherPicUrlToday = "https://www.metaweather.com/static/img/weather/png/"+weatherInfo.consolidated_weather[0].weather_state_abbr+".png";
    var weatherPicUrlTomorrow = "https://www.metaweather.com/static/img/weather/ico/"+weatherInfo.consolidated_weather[1].weather_state_abbr+".ico";
    var weatherPicUrl2ndDay = "https://www.metaweather.com/static/img/weather/ico/"+weatherInfo.consolidated_weather[2].weather_state_abbr+".ico";
    var weatherPicUrl3rdDay = "https://www.metaweather.com/static/img/weather/ico/"+weatherInfo.consolidated_weather[3].weather_state_abbr+".ico"

    document.getElementById('weatherTemp').innerHTML = Math.round(weatherInfo.consolidated_weather[0].the_temp) + "&degC";
    document.getElementById('weatherTempMax').innerHTML = Math.round(weatherInfo.consolidated_weather[0].max_temp) + "&degC";
    document.getElementById('weatherTempMin').innerHTML = Math.round(weatherInfo.consolidated_weather[0].min_temp) + "&degC";
    document.getElementById("weatherPic").src = weatherPicUrlToday;
    document.getElementById("weatherPicTomorrow").src = weatherPicUrlTomorrow;
    document.getElementById("weatherPic2ndDay").src = weatherPicUrl2ndDay;
    document.getElementById("weatherPic3rdDay").src = weatherPicUrl3rdDay;
}