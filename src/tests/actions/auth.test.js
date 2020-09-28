import '@testing-library/jest-dom';
import { startChecking, startLogin, startRegister } from '../../actions/auth';
import { types } from '../../types/types';
import Swal from 'sweetalert2';
import * as fetchModule from '../../helpers/fetch';
// configuraciones previas

import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'



const middlewares = [thunk]
const mockStore = configureStore(middlewares)

jest.mock('sweetalert2', ()=> ({
    fire: jest.fn()
}))

// state inicial
const initState = {}

let store = mockStore(initState)

Storage.prototype.setItem = jest.fn();



describe('Pruebas en actions auth', () => {
    let token ='';
    // reinicializar el store en cada test
 beforeEach(()=>{
     store = mockStore(initState)
     jest.clearAllMocks()
 })
    
    test('should startLogin correcto', async() => {
        await store.dispatch( startLogin('prueba@prueba.com', '123456') )

        const actions = store.getActions()
       // console.log(actions)

        expect( actions[0] ).toEqual({
            type: types.authLogin,
            payload: {
                uid: expect.any(String),
                name: expect.any(String)
            }
        }) 

        expect( localStorage.setItem ).toHaveBeenCalledWith('token', expect.any(String));
        expect( localStorage.setItem ).toHaveBeenCalledWith('token-init-date', expect.any(Number) );
        
       // console.log(localStorage.setItem.mock.calls)
        token = localStorage.setItem.mock.calls[0][1];
    
    })  

    test('startLogin incorrecto', async() => {

        await store.dispatch( startLogin('fernando@gmail.com','123456789') );
        let actions = store.getActions();
      //  console.log(actions)
        expect( actions ).toEqual([]);
        expect( Swal.fire ).toHaveBeenCalledWith('Error', 'Password incorrecto', 'error');

        await store.dispatch( startLogin('fernando@gmail2.com','123456') );
        actions = store.getActions();
       // console.log(actions)
        expect( Swal.fire ).toHaveBeenCalledWith('Error', 'El usuario no existe con ese email', 'error');
        
    });

    
    test('startRegister correcto', async() => {
// mock / simular fetch sin token para no estar registarndo usuarios nuevos cada vez que corra el test
        fetchModule.fetchSinToken = jest.fn(() => ({
            json() {
                return {
                    ok: true,
                    uid: '123',
                    name: 'carlos',
                    token: 'ABC123ABC123'
                }
            }
        }));

        await store.dispatch( startRegister('test2@test.com', '123456', 'test') );

        const actions = store.getActions();
       // console.log(actions)
        expect( actions[0] ).toEqual({
            type: types.authLogin,
            payload: {
                uid: '123',
                name: 'carlos'
            }
        })
        
        expect( localStorage.setItem ).toHaveBeenCalledWith('token', 'ABC123ABC123' );
        expect( localStorage.setItem ).toHaveBeenCalledWith('token-init-date', expect.any(Number) );


        
    })
    
    test('startChecking correcto', async() => {

        fetchModule.fetchConToken = jest.fn(() => ({
            json() {
                return {
                    ok: true,
                    uid: '123',
                    name: 'carlos',
                    token: 'ABC123ABC123'
                }
            }
        }));


        await store.dispatch( startChecking() );

        const actions = store.getActions();
        // console.log(actions)
        expect( actions[0] ).toEqual({
            type: types.authLogin,
            payload: {
                uid: '123',
                name: 'carlos'
            }
        });


        expect( localStorage.setItem ).toHaveBeenCalledWith('token', 'ABC123ABC123' );

        
    })
    
    

 
})
