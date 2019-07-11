import React from 'react';
import {filter} from 'lodash';
import './App.scss';

class App extends React.Component {

  constructor(){
    super();
    this.state = {
      json: '',
      cards: [],
      lists: []
    }

    this.handleOnJsonPaste = this.handleOnJsonPaste.bind(this);
  }

  handleOnJsonPaste(e){
    try {

      let json = JSON.parse(e.target.value);
      let { cards, lists } = json
      this.setState({ json, cards, lists });

    } catch (error) {
      console.error(error)
      this.setState({ json:'', cards:[], lists:[] });
    }
  }

  render(){
    let {lists, cards} = this.state;

    return (
      <div className="App">
       <h1>Generar status de Tablero Trello</h1>
       <h2>Una app para Vicky y Santi</h2>
  
       <textarea placeholder="Peguá aquí el JSON exportado de Trello" onChange={this.handleOnJsonPaste}></textarea>
       {lists && cards && <div className="results" tabIndex="1">
          {lists.map(listItem => {
            let listCards = filter(cards, {idList: listItem.id});
            return <div className="results__item">
              <h1 key={listItem.id}>{listItem.name}</h1>
              {listCards.length ? <ul>
                {listCards.map(cardItem => {
                  return <li key={cardItem.id}>
                    {cardItem.labels.map(labelItem => {
                      return <span className="results__item-label" key={labelItem.id} style={{backgroundColor: labelItem.color}}>{labelItem.name}</span>
                    })}
                    {cardItem.name}
                  </li>
                })}
              </ul> : <p><em>Sin items</em></p>}
            </div>
          })} 
        </div>}
      <footer>
        &copy; Nahuel José
      </footer>
      </div>
    );
  }
}

export default App;
