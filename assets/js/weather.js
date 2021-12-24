var cityFormEl = document.querySelector("#city-form");
var cityButtonsEl = document.querySelector("#city-buttons");
var cityInputEl = document.querySelector("#cityname");
var cityContainerEl = document.querySelector("#city-container");
var citySearchTerm = document.querySelector("#city-search-term");

var getCityHistory = JSON.parse(localStorage.getItem("cityArr")) || [];
//console.log(typeof getCityHistory);
for (i = 0; i < getCityHistory.length; i++) {
  var cityBtn = document.createElement("button");
  cityBtn.innerHTML = getCityHistory[i];
  cityBtn.setAttribute("data-city", getCityHistory[i]);
  cityBtn.classList = "btn";
  cityButtonsEl.appendChild(cityBtn);
}

var formSubmitHandler = function (event) {
  // prevent page from refreshing
  event.preventDefault();

  // get value from input element
  var cityname = cityInputEl.value.trim();

  if (cityname) {
    getCityData(cityname);
    var cityBtn = document.createElement("button");
    cityBtn.innerHTML = cityname;
    cityBtn.setAttribute("data-city", cityname);
    cityBtn.classList = "btn";
    cityButtonsEl.appendChild(cityBtn);

    getCityHistory.push(cityname);

    localStorage.setItem("cityArr", JSON.stringify(getCityHistory));

    // clear old content
    //cityContainerEl.textContent = "";
    cityInputEl.value = "";
  } else {
    alert("Please enter a City name");
  }
};

var buttonClickHandler = function (event) {
  // get the city attribute from the clicked element
  var city = event.target.getAttribute("data-city");

  if (city) {
    getCity(city);

    // clear old content
    //cityContainerEl.textContent = "";
  }
};

var getCityData = function (city) {
  var city = cityInputEl.value.trim();

  if (city) {
    getCity(city);
  }
};

var getCity = function (city) {
  // format the github api url
  var apiUrl1 =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&units=imperial&appid=d40c76615a039246eaf9d8955c56e72e";

  // make a get request to url
  var lat, lon;
  fetch(apiUrl1).then(function (response1) {
    // request was successful
    if (response1.ok) {
      response1.json().then(function (data1) {
        lat = data1.coord.lat;
        lon = data1.coord.lon;

        var apiUrl2 =
          "https://api.openweathermap.org/data/2.5/onecall?lat=" +
          lat +
          "&lon=" +
          lon +
          "&units=imperial&appid=d40c76615a039246eaf9d8955c56e72e";
        fetch(apiUrl2).then(function (response2) {
          // request was successful
          if (response2.ok) {
            response2.json().then(function (data2) {
              displayCity(data2, city);
            });
          } else {
            alert("Error: " + response2.statusText);
          }
        });
      });
    } else {
      alert("Error: " + response1.statusText);
    }
  });
};

var displayCity = function (citydata, searchTerm) {
  // check if api returned any data
  if (!citydata) {
    cityContainerEl.textContent = "No city found.";
    return;
  }
  var date = moment().format("MM-DD-YYYY"); //how do I add the current date to the screen?
  citySearchTerm.textContent = searchTerm + "  " + date;

  // create variables for temperature
  var Temp = citydata.current.temp; //How do I get the temperature in Fahrenheit??
  var wind_speed = citydata.current.wind_speed;
  var humidity = citydata.current.humidity;
  var uvi = citydata.current.uvi;

  //var uv_Index = citydata.uvi; //still searching to find the UV index

  // create a link for each weather data
  var weatherEl = document.createElement("ul");
  //weatherEl.classList = "list-item flex-row justify-space-between align-center";

  var cityNameEl = document.querySelector("#city-container h2");
  cityNameEl.textContent = searchTerm;
  var temperatureEl = document.querySelector(
    "#city-container .temperature span"
  );
  temperatureEl.textContent = Temp;

  var windEl = document.querySelector("#city-container .wind span");
  windEl.textContent = wind_speed;

  var humidityEl = document.querySelector("#city-container .humidity span");
  humidityEl.textContent = humidity;

  var uviEl = document.querySelector("#city-container .uvi span");
  uviEl.textContent = uvi;
//WORK ON THE UVI INDICATOR


if (parseInt(uvi) < 3) {
  $(this).addClass("present");
  $(this).removeClass("future");
  $(this).removeClass("past");

  console.log("present", $(this))
}

if (parseInt(time) < parseInt(currentTime)) {
  $(this).addClass("past");
  $(this).removeClass("future");
  $(this).removeClass("present");
  console.log("past", $(this))
}
if (parseInt(time) > parseInt(currentTime)) {
  $(this).addClass("future");
  $(this).removeClass("present");
  $(this).removeClass("past");
  console.log("future", $(this))
}












  // append container to the dom
  cityContainerEl.appendChild(weatherEl);
  /* // create a status element
    var statusEl = document.createElement("span");
    statusEl.classList = "flex-row align-center";

    // check if current repo has issues or not
    if (repos[i].open_issues_count > 0) {
      statusEl.innerHTML =
        "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
    } else {
      statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
    } */

  //MB attempt at displaying 5 day forecast

  // create variables for temperature

  //for the first Day
  var Date1 = moment().add(1, "days").format("MM-DD-YYYY");
  var Temp1 = citydata.daily[0].temp.max; //How do I get the temperature in Fahrenheit??
  var wind_speed1 = citydata.daily[0].wind_speed;
  var humidity1 = citydata.daily[0].humidity;
  var dateCard1El = document.querySelector("#card1 .date span");
  dateCard1El.textContent = Date1;
  var temperatureCard1El = document.querySelector("#card1 .temperature span");
  temperatureCard1El.textContent = Temp1;
  var windCard1El = document.querySelector("#card1 .wind span");
  windCard1El.textContent = wind_speed1;
  var humidityCard1El = document.querySelector("#card1 .humidity span");
  humidityCard1El.textContent = humidity1;

  //for the second Day
  var Date2 = moment().add(2, "days").format("MM-DD-YYYY");
  var Temp2 = citydata.daily[1].temp.max; //How do I get the temperature in Fahrenheit??
  var wind_speed2 = citydata.daily[1].wind_speed;
  var humidity2 = citydata.daily[1].humidity;
  var dateCard2El = document.querySelector("#card2 .date span");
  dateCard2El.textContent = Date2;
  var temperatureCard2El = document.querySelector("#card2 .temperature span");
  temperatureCard2El.textContent = Temp2;
  var windCard2El = document.querySelector("#card2 .wind span");
  windCard2El.textContent = wind_speed2;
  var humidityCard2El = document.querySelector("#card2 .humidity span");
  humidityCard2El.textContent = humidity2;

  //for the third Day
  var Date3 = moment().add(3, "days").format("MM-DD-YYYY");
  var Temp3 = citydata.daily[2].temp.max; //How do I get the temperature in Fahrenheit??
  var wind_speed3 = citydata.daily[2].wind_speed;
  var humidity3 = citydata.daily[2].humidity;
  var dateCard3El = document.querySelector("#card3 .date span");
  dateCard3El.textContent = Date3;
  var temperatureCard3El = document.querySelector("#card3 .temperature span");
  temperatureCard3El.textContent = Temp3;
  var windCard3El = document.querySelector("#card3 .wind span");
  windCard3El.textContent = wind_speed3;
  var humidityCard3El = document.querySelector("#card3 .humidity span");
  humidityCard3El.textContent = humidity3;

  //for the fourth Day
  var Date4 = moment().add(4, "days").format("MM-DD-YYYY");
  var Temp4 = citydata.daily[3].temp.max; //How do I get the temperature in Fahrenheit??
  var wind_speed4 = citydata.daily[3].wind_speed;
  var humidity4 = citydata.daily[3].humidity;
  var dateCard4El = document.querySelector("#card4 .date span");
  dateCard4El.textContent = Date4;
  var temperatureCard4El = document.querySelector("#card4 .temperature span");
  temperatureCard4El.textContent = Temp4;
  var windCard4El = document.querySelector("#card4 .wind span");
  windCard4El.textContent = wind_speed4;
  var humidityCard4El = document.querySelector("#card4 .humidity span");
  humidityCard4El.textContent = humidity4;

  //for the fifth Day
  var Date5 = moment().add(5, "days").format("MM-DD-YYYY");
  var Temp5 = citydata.daily[4].temp.max; //How do I get the temperature in Fahrenheit??
  var wind_speed5 = citydata.daily[4].wind_speed;
  var humidity5 = citydata.daily[4].humidity;
  var dateCard5El = document.querySelector("#card5 .date span");
  dateCard5El.textContent = Date5;
  var temperatureCard5El = document.querySelector("#card5 .temperature span");
  temperatureCard5El.textContent = Temp5;
  var windCard5El = document.querySelector("#card5 .wind span");
  windCard5El.textContent = wind_speed5;
  var humidityCard5El = document.querySelector("#card5 .humidity span");
  humidityCard5El.textContent = humidity5;

  //MB END
};

// add event listeners to form and button container
cityFormEl.addEventListener("submit", formSubmitHandler);
cityButtonsEl.addEventListener("click", buttonClickHandler);
