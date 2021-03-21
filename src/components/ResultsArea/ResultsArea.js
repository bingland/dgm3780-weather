import CurrentArea from './CurrentArea/CurrentArea'
import DailyArea from './DailyArea/DailyArea'
import HourlyArea from './HourlyArea/HourlyArea'
import './ResultsArea.scss'

const ResultsArea = (props) => {
    // current, hourly and daily objects + units

    const windUnit = () => {
        return props.units === 'imperial' ? 'miles/hour' : 'meter/sec'
    }

    return (
        <div className="ResultsArea">
            <CurrentArea data={props.current} windUnit={windUnit} />
            <div className="column">
                <h2 className="forecastTitle">Daily Forecast</h2>
                <DailyArea data={props.daily} windUnit={windUnit} />
                <h2 className="forecastTitle">Hourly Forecast</h2>
                <HourlyArea data={props.hourly} windUnit={windUnit} />
            </div>
        </div>
    )
}

export default ResultsArea