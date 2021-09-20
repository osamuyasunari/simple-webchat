import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import { Provider, useSelector } from 'react-redux'
import Home from './pages/Home'
import Auth from './pages/Auth'
import Chat from './pages/Chat'
import store, { RootState } from './store'

import './App.scss'
import Client from './client/client'

function Routing() {
  const user = useSelector((state: RootState) => state.user.user)
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/chat">
          { user ? <Chat /> : <Redirect to="/auth" />}
        </Route>
        <Route exact path="/auth">
          { user ? <Redirect to="/chat" /> : <Auth />}
        </Route>
      </Switch>
    </Router>
  )
}

function App(): any {
  useEffect(() => {
    const instance = Client.createInstance()
    const host = process.env.REACT_APP_API_HOST
    if (host) {
      instance.init(host)
    } else {
      throw new Error('Не указан API хост')
    }
    return () => { instance.close() }
  })

  return (
    <div className="App">
      <Provider store={store}>
        <Routing />
      </Provider>
    </div>
  );
}

export default App
