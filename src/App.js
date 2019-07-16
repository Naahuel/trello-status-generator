import React from 'react';
import {filter} from 'lodash';
import './App.scss';
import github from './svg/github.svg';

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
       <p>Exportá el tablero como JSON <code>(Mostrar menú → ... Más → Imprimir y exportar → Exportar en formato JSON)</code> y pegá aquí el código: </p>
  
       <textarea placeholder="Peguá aquí el JSON exportado de Trello" onChange={this.handleOnJsonPaste}></textarea>
       {lists && cards && <div className="results" tabIndex="1">
          {lists.map(listItem => {
            let listCards = filter(cards, {idList: listItem.id});
            return <div key={listItem.id} className="results__item">
              <h1>{listItem.name}</h1>
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
        <span>&copy; Nahuel José</span>
        <span><a href="https://github.com/Naahuel/trello-status-generator" target="_blank"  rel="noopener noreferrer">
          <img src={github} alt="View on GitHub" />
        </a></span>
      </footer>
      </div>
    );
  }
}

export default App;
