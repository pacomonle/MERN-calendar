import React, { useState } from 'react'
import Navbar from '../ui/Navbar'
import { Calendar, momentLocalizer }from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment'
import 'moment/locale/es'
import { messages } from '../../helpers/calendar-messages-es'
import CalendarEvent from './CalendarEvent'
import CalendarModal from './CalendarModal'
import { uiOpenModal } from '../../actions/ui'
import { useDispatch, useSelector } from 'react-redux'
import { eventClearActiveEvent, eventSetActive } from '../../actions/events'
import AddNewFab from '../ui/AddNewFab'
import { DeleteEventFab } from '../ui/DeleteEventFab'

moment.locale('es')
// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
const localizer = momentLocalizer(moment) // or globalizeLocalizer





const CalendarScreen = () => {
 
const { events, activeEvent } = useSelector( state => state.calendar );    

const [lastView, setlastView] = useState(localStorage.getItem('lastView') || 'month')
const dispatch = useDispatch()



const eventStyleGetter = (event, start, end, isSelected) => {
  // console.log(event, start, end, isSelected)
   const style = {
       backgrounColor: '#367CF7',
       borderRadius: '0px',
       opacity: '0.8',
       display: 'block',
       color: 'white'
   }

   return {
       style
   }
}

// EVENTOS DEL CALENDAR

const onDoubleClickEvent = (e) => {
   // console.log(e)
    dispatch( uiOpenModal() );
   
}

const onSelectEvent = (e) => {
   // console.log(e)
    dispatch( eventSetActive(e) )
}

const onViewChange = (e) => {
    console.log(e)
    setlastView(e)
    localStorage.setItem('lastView', e)
}

const onSelectSlot = (e) => {
    console.log(e)
    dispatch( eventClearActiveEvent() );
}

    return (
        <div className='calendar-screen'>
              <Navbar />
            

              <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              messages = {messages}
              eventPropGetter = {eventStyleGetter}
              onDoubleClickEvent = {onDoubleClickEvent}
              onSelectEvent = {onSelectEvent}
              onView = {onViewChange}
              onSelectSlot={ onSelectSlot }
              selectable={ true }
              view={ lastView }
              components={{
                event: CalendarEvent
              }}
               />

               <AddNewFab />

               {
                (activeEvent) && <DeleteEventFab />
               }

               <CalendarModal />
        </div>
    )
}

export default CalendarScreen
