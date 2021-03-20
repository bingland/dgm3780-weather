// convert unix time into hour:min format
exports.getHourMin = (UNIX_timestamp) => {
    let a = new Date(UNIX_timestamp * 1000)
    //let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    //let year = a.getFullYear()
    //let month = months[a.getMonth()]
    //let date = a.getDate()
    let hour = a.getHours()
    let min = a.getMinutes()
    // modify these values to adjust to what you need
    let time = hour + ':' + min 
    return time
}

// convert unix time into month / day
exports.getMonthDay = (UNIX_timestamp) => {
    let a = new Date(UNIX_timestamp * 1000)
    let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    let month = months[a.getMonth()]
    let date = a.getDate()
    // modify these values to adjust to what you need
    let time = month + ' ' + date
    return time
}

// convert unix time into hour 
exports.getHour = (UNIX_timestamp) => {
    let a = new Date(UNIX_timestamp * 1000)
    let hour = a.getHours()
    return `${hour}:00`
}