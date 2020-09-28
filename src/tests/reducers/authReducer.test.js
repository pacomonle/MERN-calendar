import { login } from "../../actions/auth";
import { authReducer } from "../../reducers/authReducer";
import { types } from "../../types/types";

const initState = {
    checking: true,
    // uid: null,
    // name: null
}


describe('Pruebas en authReducer.js', () => {

    test('debe de retornar el estado por defecto', () => {
        
            const action = {};
            const state = authReducer(initState, action);

            expect( state ).toEqual( initState );

    });

    test('debe de autenticar el usuario', () => {

        const action = login({
            uid: '123',
            name: 'Fernando'
        })
        
       /**
        *  const action = {
            type: types.authLogin,
            payload: 
        };
        */

        const state = authReducer( initState, action );

        console.log(state)

        expect(state).toEqual({ checking: false, uid: '123', name: 'Fernando' });

    })
    
    
    
})
