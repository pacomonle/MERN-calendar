import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment'
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModal } from '../../actions/ui';
import { eventStartAddNew, eventClearActiveEvent, eventStartUpdate } from '../../actions/events';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };

  // Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
  if ( process.env.NODE_ENV !== 'test' ) {
    Modal.setAppElement('#root');
  }
const dateNow = moment().minutes(0).seconds(0).add(1,'hours') // momento actual redondeado a 0 min y 0 sec
const dateFinish = dateNow.clone().add(1,'hours') // clonar + 1 hora


const initEvent ={
    title: '',
    notes: '',
    start: dateNow.toDate(),
    end: dateFinish.toDate()
}




const CalendarModal = () => {

const { modalOpen } = useSelector( state => state.ui ); 
const {activeEvent} = useSelector(state => state.calendar)
const dispatch = useDispatch()

const [dateStart, setdateStart] = useState(dateNow.toDate())
const [dateEnd, setdateEnd] = useState(dateFinish.toDate())


const [formValues, setformValues] = useState(initEvent)
const [ titleValid, setTitleValid ] = useState(true);

const {title, notes, start, end} = formValues

useEffect(() => {
    if ( activeEvent ) {
        setformValues( activeEvent );
    } else {
        setformValues( initEvent );
    }
}, [activeEvent, setformValues])

const handleInputChange = ({target}) =>{
    setformValues({
        ...formValues,
        [target.name] : target.value
    }) 
}

const closeModal = () =>{
    console.log('closing modal...')
    dispatch( uiCloseModal() );
    dispatch( eventClearActiveEvent() );
    setformValues(initEvent)
}

/*
const openModal = () =>{
    console.log('opening modal ...')
}
*/



const handleStartDateChange = (e) => {
   // console.log(e)
    setdateStart(e)
    setformValues({
        ...formValues,
        start: e
    })
}

const handleEndDateChange = (e) => {
   // console.log(e)
    setdateEnd(e)
    setformValues({
        ...formValues,
        end: e
    })
}

const handleSubmitForm = (e) => {
    e.preventDefault();
    //objeto que se graba en la data base
    console.log(formValues)
    // validaciones
    const momentStart = moment( start );
    const momentEnd = moment( end );

    if ( momentStart.isSameOrAfter( momentEnd ) ) {
        return Swal.fire('Error','La fecha fin debe de ser mayor a la fecha de inicio', 'error');
    }

    if ( title.trim().length < 2 ) {
        return setTitleValid(false);
    }

    if ( activeEvent ) {
        dispatch( eventStartUpdate( formValues ) )
    } else {
        dispatch( eventStartAddNew(formValues) );
        /*
        dispatch( eventAddNew({
            ...formValues,
            id: new Date().getTime(),
            user: {
                _id: '123',
                name: 'Fernando'
            }
        }) );
        */
    }


    setTitleValid(true);
    closeModal();
    
}



   





    return (
        <Modal
        isOpen={modalOpen}
       // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        closeTimeoutMS = {200}
        className='modal'
        overlayClassName='modal-fondo'
        ariaHideApp={ !process.env.NODE_ENV === 'test' }
      > 
                <h1> { (activeEvent)? 'Editar evento': 'Nuevo evento' } </h1>
                <hr />
                <form
                onSubmit={handleSubmitForm}
                 className="container">
                
                    <div className="form-group">
                        <label>Fecha y hora inicio</label>
                        <DateTimePicker
                            onChange={handleStartDateChange}
                            value={dateStart}
                            className='form-control'
                            />
                    </div>
                
                    <div className="form-group">
                        <label>Fecha y hora fin</label>
                        <DateTimePicker
                        onChange={handleEndDateChange}
                        value={dateEnd}
                        minDate={dateFinish.toDate()}
                        className='form-control'
                        />
                    </div>
                
                    <hr />
                    <div className="form-group">
                        <label>Titulo y notas</label>
                        <input 
                            type="text" 
                            className={ `form-control ${ !titleValid && 'is-invalid' } `}
                            placeholder="Título del evento"
                            name="title"
                            value={title}
                            autoComplete="off"
                            onChange= {handleInputChange}
                        />
                        <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                    </div>
                
                    <div className="form-group">
                        <textarea 
                            type="text" 
                            className="form-control"
                            placeholder="Notas"
                            rows="5"
                            name="notes"
                            value={notes}
                            onChange= {handleInputChange}
                        ></textarea>
                        <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                    </div>
                
                    <button
                        type="submit"
                        className="btn btn-outline-primary btn-block"
                    >
                        <i className="far fa-save"></i>
                        <span> Guardar</span>
                    </button>
                
                </form>
      </Modal>
    )
}

export default CalendarModal
