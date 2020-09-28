import { uiReducer } from '../../reducers/uiReducer';
import { uiOpenModal, uiCloseModal } from '../../actions/ui';

const initState = {
    modalOpen: false
};

describe('Pruebas en uiReducer', () => {

    test('debe de retornar el estado por defecto', () => {
  
        const state = uiReducer( initState, {} );
        expect( state ).toEqual( initState );

    });

    test('debe de abrir y cerrar el modal', () => {
        
        const modalOpen = uiOpenModal();
        // enviar state initial
        const state = uiReducer( initState, modalOpen );
        console.log(state)
        expect( state ).toEqual({ modalOpen: true });

        const modalClose = uiCloseModal();
        // enviar state anterior
        const stateClose = uiReducer( state, modalClose );
        console.log(stateClose)
        expect( stateClose ).toEqual({ modalOpen: false });

    })
    
    
    
})
