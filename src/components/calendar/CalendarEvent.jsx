import React from 'react'
import PropTypes from 'prop-types'

const CalendarEvent = ({event}) => {
    // console.log(event)
    const {title, user:{name}} = event
    return (
        <div>
            <strong>{title}</strong> -
            <span>{name}</span>
        </div>
    )
}

CalendarEvent.propTypes = {
event : PropTypes.object.isRequired

}

export default CalendarEvent


