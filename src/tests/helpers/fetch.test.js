import { fetchSinToken, fetchConToken } from '../../helpers/fetch';


describe('Pruebas en el helper Fetch', () => {

    let token = '';

    test('fetchSinToken debe de funcionar', async() => {

        const resp = await fetchSinToken('auth', { email: 'fernando@gmail.com', password: '123456' }, 'POST');

        expect( resp instanceof Response ).toBe( true );

        const body = await resp.json();
        expect( body.ok ).toBe( true );
// recuperar token de la response al logearse y tenemos token para hacer las peticiones de las pruebas
        token = body.token;
        

    })

    test('fetchConToken debe de funcionar', async() => {
  // guardar el token en el localstorage
        localStorage.setItem('token', token );

        const resp = await fetchConToken('events/5ee25d21c25cce32af01a3f3', {}, 'DELETE');
        const body = await resp.json();
        console.log(body)
        expect( body.msg ).toBe('Evento no existe por ese id');

        
    })

    
})
