import * as React from "react"
import Svg, { Path } from "react-native-svg"
import axios from "axios"
const api=""
export async function getAllDayReport(currLocation = "chennai") {
  try {
    const currentWeatherURL = `http://api.weatherapi.com/v1/current.json?key=${api}&q=${currLocation}&aqi=yes`;
    const currentResponse = await axios.get(currentWeatherURL);
    const currentData = currentResponse.data.current;

    const todayTempC = currentData.temp_c;
    const todayConditionCode = currentData.condition.code
  
  

    const forecastURL = `http://api.weatherapi.com/v1/forecast.json?key=${api}&q=${currLocation}&days=7`;
    const forecastResponse = await axios.get(forecastURL);
    const forecastData = forecastResponse.data.forecast.forecastday[0].hour;

    const hoursOfInterest = ['09', '12', '03', '06'];
    const hourData = hoursOfInterest.map(hour => {
      const hourInfo = forecastData.find(item => item.time.slice(11, 13) === `${hour}`);
      return { hour, temperature: hourInfo.temp_c, conditionCode: hourInfo.condition.code };
    });


    hourData.forEach(item => {
  
    });

    const next7DaysData = forecastResponse.data.forecast.forecastday.slice(1);
    const requirednext7Data=next7DaysData.map(day => {
      const date = day.date;
      const maxTempC = day.day.maxtemp_c;
      const conditionCode = day.day.condition.code;
      return {date,maxTempC,conditionCode}

    });

    const current={
        degree:todayTempC,
        code:todayConditionCode,
        hour:hourData,
        nextDays:requirednext7Data
      }

    return current

  } catch (error) {
    console.error("Error:", error.message);
  }
}


export const imageInfo={
    background:require("./assets/download.png"),
    logo:require("./assets/logo.png"),
    leftArrow:require("./assets/left-arrow.png"),
    rightArrow:require("./assets/right-arrow.png"),    
    cloudLightining:require("./assets/cloud-lightning.png"),
    location:require("./assets/location.png"),
    search:require("./assets/Vector.png"),
    rainBig:require("./assets/rainBig.png"),
    house:require("./assets/House.png"),
    "1003": require("./assets/cloudy-weather.png"),
    "1240": require("./assets/cloudy-weather.png"),
    "1087": require("./assets/cloud-lightning.png"),
    "1273": require("./assets/cloud-lightning.png"),
    "1276": require("./assets/cloud-lightning.png"),
    "1279": require("./assets/cloud-lightning.png"),
    "1282": require("./assets/cloud-lightning.png"),
    "1000": require("./assets/sunny.png"),
    "1063": require("./assets/rainBig.png"),
    "1153": require("./assets/logo.png"),
    "1180": require("./assets/logo.png"),
    "1135": require("./assets/storm.png"),
    "1066": require("./assets/snow.png"),
    "1210": require("./assets/snow.png"),
    "1213": require("./assets/snow.png"),
    "1006": require("./assets/cloudy-weather.png"),
    "1009": require("./assets/cloudy-weather.png"),
    "1030": require("./assets/cloudy-weather.png"),
    "1114": require("./assets/snow.png"),
    "1117": require("./assets/snow.png"),
    "1216": require("./assets/snow.png"),
    "1219": require("./assets/snow.png"),
    "1222": require("./assets/snow.png"),
    "1225": require("./assets/snow.png"),
    "1237": require("./assets/snow.png"), 
    "1183": require("./assets/logo.png"),
    "1186": require("./assets/logo.png"),
    "1189": require("./assets/logo.png"),
    "1192": require("./assets/logo.png"),
    "1195": require("./assets/logo.png"),
    "1198": require("./assets/rainBig.png"), 
    "1201": require("./assets/rainBig.png"), 
    "1204": require("./assets/logo.png"),
    "1207": require("./assets/logo.png"),
    "1240": require("./assets/rainBig.png"), 
    "1243": require("./assets/rainBig.png"), 
    "1246": require("./assets/rainBig.png"), 
    "1249": require("./assets/rainBig.png"), 
    "1252": require("./assets/rainBig.png"), 
    "1255": require("./assets/snow.png"), 
    "1258": require("./assets/snow.png"), 
    "1261": require("./assets/rainBig.png"), 
    "1264": require("./assets/rainBig.png")
  }



export const RightArrow = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    fill="none"
    {...props}
  >
    <Path
      fill="#fff"
      d="m16 0-2.82 2.82L24.34 14H0v4h24.34L13.18 29.18 16 32l16-16L16 0Z"
    />
  </Svg>
)
