import './HourlyArea.scss'

const HourlyArea = (props) => {
    // (array): temp,wind_speed,wind_deg,description,icon,hour,day

    return (
        <div className="HourlyArea">
            {props.data.map((hour, index) => {
                return <div className="hourItem" key={index}>
                    <div className="hourlyDay">{hour.day}</div>
                    <div className="hourlyHour">{hour.hour}</div>
                    <div className="hourlyIconContainer">
                        <img className="hourlyIcon" src={`./images/${hour.icon}.svg`} alt="hourly weather icon" />
                    </div>
                    <div className="hourlyTemp">{hour.temp}°</div>
                    <div className="hourlyDescription">{hour.description}</div>
                    <div className="hourlyWind">Wind: {hour.wind_speed + ' ' + props.windUnit()}</div>
                </div>
            })}
        </div>
    )
}

export default HourlyArea