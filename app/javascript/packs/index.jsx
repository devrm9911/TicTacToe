import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button';
import Game from '../components/Game';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Game name="React" />,
    document.body.appendChild(document.createElement('div')),
  )
})
