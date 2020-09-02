import React from 'react'
import { Route, BrowserRouter as Router , Switch, Redirect } from 'react-router-dom'
import LoginScreen from '../components/auth/LoginScreen'
import CalendarScreen from '../components/calendar/CalendarScreen'

const AppRouter = () => {
    return (
        <Router>
            <div>
                <Switch>
                     <Route exact path="/login" component={LoginScreen} />
                      
                    <Route exact path="/" component={CalendarScreen}/>
                    
                    <Redirect to='/' component={CalendarScreen} />
                </Switch>
            </div>
        </Router>        
    )
}

export default AppRouter
