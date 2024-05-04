const apikey = "5ceea2d1287c5962b9c2138155a54279";



const apiurl = `https://api.openweathermap.org/data/2.5/weather?appid=${apikey}`;
let temperature = document.querySelector(".temp");
let city = document.querySelector(".city");
let humidity = document.querySelector(".humidity");
let wind = document.querySelector(".wind");
let feellike = document.querySelector(".feelslike");
let btn = document.querySelector("button");
let input = document.querySelector("input");

let icon = document.querySelector(".weathericon");

let unit = document.querySelector(".unit");
// console.log(unit);

let unitvalue = "fahrenheit";
let descrip=document.querySelector(".weatherdescrip");

let cityname="";


unit.addEventListener("click", () => {
  if (unitvalue === "celsius") {
    unitvalue = "fahrenheit";
  } else if (unitvalue === "fahrenheit") {
    unitvalue = "celsius";
  }
  let unitimg = document.querySelector(".unitimg");
  let newsrc = `images/${unitvalue}.png`;
  unitimg.src = newsrc;
  checkWeather(input.value);
});

btn.addEventListener("click", (e) => {
  e.preventDefault();
  // console.log(e);
  const cityname = input.value;
  // console.log(cityname);
  checkWeather(cityname);
});
input.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    checkWeather(input.value);
  }
});

window.addEventListener('load',()=>{
    navigator.geolocation.getCurrentPosition(findlivelocation);
    // findlivelocation();
});
async function findlivelocation(position){
     let url=`http://api.openweathermap.org/geo/1.0/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apikey}`
    let location=await fetch(url)
    let data=await location.json();
    // console.log(data);
      let placename=data[0].name;
    //   console.log(placename);
    // return placename;
      checkWeather(placename)
   cityname=placename;
};


// console.log(result);

async function checkWeather(name) {
  //   console.log(name);
  if (name === undefined || name === "") {
    name = cityname;
  }

  const response = await fetch(
    apiurl +
      `&q=${name}&units=${unitvalue === "celsius" ? "imperial" : "metric"}`
  );
  let data = await response.json();
  temperature.textContent = `${data.main.temp}${
    unitvalue === "celsius" ? "°F" : "°C"
  }`;
  city.textContent = data.name;
  humidity.textContent = `${data.main.humidity}%`;
  wind.textContent = `${data.wind.speed}km/h`;
  feellike.textContent = `Feels like : ${data.main["feels_like"]}`;
  let newsrc = `Weather-app/images/${data.weather[0].main}.png`;
  icon.src = newsrc;
  descrip.textContent=data.weather[0].main;
    // console.log(data);
  //   console.log(data.weather[0].main);
}
// checkWeather();
