var cityselect = document.querySelector("#city");
var maintemp = document.querySelector("#tempmain");
var mainweather = document.querySelector("#mainweather");
var mainhumidity = document.getElementById("mainhumidity");
var mainwind = document.getElementById("mainwind");
const apikey = "3c06835c73460680a36ce6650758cc2a";
let dailylist = document.getElementById("dailylist");
var cityname1 = "tehran";

function getcityname(element){
console.log(element.innerHTML);
if(element.innerHTML  == 'یزد') cityname1="Yazd";
if(element.innerHTML  == 'اصفهان') cityname1="Isfahan";
if(element.innerHTML  == 'شیراز') cityname1="Shiraz";
if(element.innerHTML  == 'تهران') cityname1="Tehran";
document.getElementById('dropdownButton').innerHTML=element.innerHTML;
remcard();
getData(cityname1);
}

async function getData(cityname2) {


  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityname2}&appid=${apikey}&units=metric&lang=fa`;
  try {
    let weatherdata = await (await fetch(url)).json();
    const weatherId = weatherdata['weather'][0]['id']; // Get weather ID  
    
    const iconUrl = iconweather(weatherId); // Get corresponding icon  
    console.log(iconUrl);

     displayIcon(iconUrl); // Display the icon  
     console.log(weatherdata);
    SetmainData(weatherdata);
  } catch (error) {
    console.error("Error fetching the weather data:", error); // Handle errors
  }
}
getData(cityname1);

function SetmainData(data) {
  var city = cityname1;
  let cityname = data["name"];
  let temp = data["main"]["temp"];
  let humidity = data["main"]["humidity"];
  let wind = data["wind"]["speed"];

  const currentDate = new Date();
  const options = { month: "long", day: "numeric" };
  const formatter = new Intl.DateTimeFormat("fa-IR", options);
  const formattedDate = formatter.format(currentDate);
  maintemp.innerHTML = `${temp.toFixed()}°`;
  mainweather.innerHTML = `${cityname} ${formattedDate}`;
  mainhumidity.innerHTML = `${humidity}%`;
  mainwind.innerHTML = `${wind} km/h`;

  setDailydate(city);
}

async function setDailydate(cityname) {
  let url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityname}&appid=${apikey}&units=metric&lang=fa`;
  let data = await (await fetch(url)).json();
  // console.log(data);
  displayWeather(data);
}
function displayWeather(data) {
  const dailyWeather = data["list"];
  dailyWeather.forEach(element => {
    if (element["dt_txt"].includes('12:00:00')) {
      // console.log(element["dt_txt"]);
        const birthday = new Date(`${element["dt_txt"]}`);
        const day1 = birthday.getDay();
        const daliy=['شنبه','یکشنبه','دوشنبه','سه شنبه','چهارشنبه','پنجشنبه','جمعه'];
        // console.log(daliy[day1]);
        const weatherId = element['weather'][0]['id']; // Get weather ID  
    // console.log(element["dt_txt"]);
    let temp = element["main"]["temp"];
    let card = document.createElement("div");
    card.classList =
    "flex flex-col justify-center items-center px-[12.5px] py-2  border-2 rounded-md border-[#EBEBEB] w-[60px] md:w-[90px] md:gap-4 aa";
    let imgcard = document.createElement("img");
    imgcard.setAttribute("src", `${iconweather(weatherId)}`);
    imgcard.classList='w-8 h-8 md:h-12 md:w-12 ';
    let bodycard =document.createElement("div");
    bodycard.classList='flex flex-col justify-center items-center gap-[4px] md:gap-[6px] ';
    let tempspan=document.createElement("span");
    tempspan.innerHTML=temp.toFixed()+'°';
    bodycard.appendChild(tempspan);
    let datecard =document.createElement("h2");
    datecard.classList='font-Vazirmatn text-xs text-nowrap leading-3 ';
    datecard.innerHTML=daliy[day1];
    bodycard.appendChild(datecard);
    // console.log(element);
    card.appendChild(imgcard);
    card.appendChild(bodycard);
    dailylist.appendChild(card);
    
    }
    
  });
 


}




document.getElementById('dropdownButton').addEventListener('click', function() {  
  document.getElementById('dropdownMenu').classList.toggle('hidden');  
});  

// Close the dropdown if clicking outside of it  
window.addEventListener('click', function(event) {  
  if (!event.target.closest('.relative')) {  
      document.getElementById('dropdownMenu').classList.add('hidden');  
  }  
});
function remcard(){
  
  
  const child = document.querySelectorAll(".aa");  
child.forEach(child => {  
  child.remove();  
}); 
  
}

function displayIcon(iconUrl) {  
  const iconElement = document.getElementById('weather-icon');  
  iconElement.src = iconUrl; // Update the source of the image  
}  

let iconweather=(weatherId)=>{
 
    if (weatherId >= 200 && weatherId < 300) {  
      return './assets/thunderstorms.svg'; // Example icon URL for thunderstorms  
    } else if (weatherId >= 300 && weatherId < 400) {  
      return './assets/drizzle.svg'; // Example icon URL for drizzle  
    } else if (weatherId >= 500 && weatherId < 600) {  
      return './assets/rain.svg'; // Example icon URL for rain  
    } else if (weatherId >= 600 && weatherId < 700) {  
      return './assets/snow.svg'; // Example icon URL for snow  
    } else if (weatherId === 800) {  
      return './assets/rain.svg'; // Clear sky  
    } else if (weatherId === 801) {  
      return './assets/clouds.svg'; // Few clouds  
    } else if (weatherId >= 802 && weatherId < 900) {  
      return './assets/Scattered_clouds.svg'; // Scattered clouds  
    }  
    return './assets/Image.svg'; // Default icon  
  
};