import { useState } from 'react'
import './EntryArea.scss'

const EntryArea = (props) => {
    // props: location units setLocation() setUnits() getCurrentWeather()

    const [searchText, setSearchText] = useState(props.location)

    const handleInput = (e) => {
        setSearchText(e.target.value)
    }

    const handleSumbit = () => {
        props.setLocation(searchText)
        props.getCurrentWeather()
    }

    return (
        <div className="EntryArea">
            <input value={searchText} onChange={handleInput} className="locationSearch" type="text" placeholder="Enter location..."></input>
            <button onClick={handleSumbit} className="searchButton">Search</button>
            <div className="unitSwitcher">
                <div onClick={() => props.setUnits('imperial') } className={props.units === 'imperial' ? 'tempOption active' : 'tempOption'}>F</div>
                <div onClick={() => props.setUnits('metric') }  className={props.units === 'metric' ? 'tempOption active' : 'tempOption'}>C</div>
            </div>
        </div>
    )
}

export default EntryArea