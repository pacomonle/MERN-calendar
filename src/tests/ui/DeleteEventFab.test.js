import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';

import { DeleteEventFab } from '../../components/ui/DeleteEventFab';
import { eventStartDelete } from '../../actions/events';
// mockear eventStartDelete
jest.mock('../../actions/events.js', () => ({
    eventStartDelete: jest.fn()
}))


// mockear el store para usar las actions
const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

const initState = {};
const store = mockStore( initState );
// mockear dispatch
store.dispatch = jest.fn();


const wrapper = mount(
    <Provider store={ store } >
        <DeleteEventFab />
    </Provider>
)



describe('Pruebas en <DeleteEventFab />', () => {
    

    test('debe de mostrarse correctamente', () => {
        
        expect( wrapper ).toMatchSnapshot();
    });

    test('debe de llamar el eventStartDelete al hacer click', () => {
        
        wrapper.find('button').prop('onClick')();


        expect( eventStartDelete ).toHaveBeenCalled();

    })
    
    

})

