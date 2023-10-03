import React from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'

import { LoginPage } from 'pages'

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Redirect exact from='/' to='/login' />
      <Route exact path='/login' component={LoginPage} />
    </Switch>
  </BrowserRouter>
)

export default Routes
