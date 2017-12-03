import React from 'react'
import { connect } from 'react-redux'
import { FormGroup, Label, Input } from 'reactstrap'

/*
Aplikacja powinna umożliwić sprawdzenie aktualnego  CURRENT_RATE_Currency(?)
lub
historycznego kursu wybranej waluty. Historical_RATE_Currency(?)


Currency Redux ducks

Powinno być możliwe porównanie wizualne zmian kursu w wybranym
okresie za pomocą wykresu.

Wybrane kursy można pobierać na bieżąco z API NBP.
 */

class CurrencyRates extends React.Component {

  state = {
    rates: [],
    selectedRate: ''
  }

  handleChange = event => {
    console.log(event.target.value)
    this.setState( {
      selectedRate: event.target.value
    })
  }

  componentDidMount() {
    fetch('http://api.nbp.pl/api/exchangerates/tables/A?format=json')
      .then(
        response => response.json()
      ).then(data => this.setState({rates: (data[0].rates)}))
  }

  render() {
    return (
      <div>
        Currency Rates
        <FormGroup>
          <Label for="exampleSelect">Choose calculator </Label>
          <Input type="select" name="select" id="exampleSelect" onChange={this.handleChange} >
            {this.state.rates.map(rate => <option>{rate.currency}</option>)}
          </Input>
        </FormGroup>


        {this.state.rates.filter(rate => rate.currency === this.state.selectedRate ).map( e =><p> {e.currency}  {e.mid}</p>)}


      </div>

    )
  }
}


export default CurrencyRates