import './CurrentArea.scss'

const CurrentArea = (props) => {
    //name, temp, feels_like, description, icon, wind_speed, wind_deg, country, sunrise, sunset

    return (
        <div className="CurrentArea">
            <h1 className="currentName">{props.data.name}</h1>
            <h2 className="currentCountry">{props.data.country}</h2>
            <div className="currentIconContainer">
                <img className="currentIcon" src={`./images/${props.data.icon}.svg`} alt="weather icon" />
            </div>
            <div className="currentTemp">{props.data.temp}°</div>
            <div className="currentDescription">{props.data.description}</div>
            <div className="currentFeelsLike">Feels like {props.data.feels_like}°</div>
            <div className="currentWindSpeed">Wind speed: {props.data.wind_speed + ' ' + props.windUnit()}</div>
            <div className="currentSunrise">Sunrise: {props.data.sunrise}</div>
            <div className="currentSunset">Sunset: {props.data.sunset}</div>
        </div>
    )
}

export default CurrentArea