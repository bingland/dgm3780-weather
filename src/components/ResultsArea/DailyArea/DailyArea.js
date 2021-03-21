import './DailyArea.scss'

const DailyArea = (props) => {
    // (array): high,low,wind_speed,wind_deg,description,icon,day

    return (
        <div className="DailyArea">
            {props.data.map(day => {
                return <div className="dayItem">
                    <div className="dailyDay">{day.day}</div>
                    <div className="dailyHighLow">
                        <div className="dailyHigh">{day.high + '°'}/</div>
                        <div className="dailyLow">{day.low + '°'}</div>
                    </div>
                    <div className="dailyIconContainer">
                        <img className="dailyIcon" src={`./images/${day.icon}.svg`} alt="daily weather icon" />
                    </div>
                    <div className="dailyDescription">{day.description}</div>
                    <div className="dailyWind">Wind: {day.wind_speed + ' ' + props.windUnit()}</div>
                </div>
            })}
        </div>
    )
}

export default DailyArea