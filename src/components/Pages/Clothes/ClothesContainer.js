import React, { Component } from 'react'
import Clothes from '../../../features/Clothes'


export default class ClothesContainer extends Component {
  render() {
    return (
      <div className='allContainer'>
        <h2 className="allContainer__header">Clothes</h2>
        <section className="allContainer__cards">
          <Clothes/>
        </section>
      </div>
    )
  }
}
