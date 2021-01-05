import React from 'react';
import { withTranslation } from 'react-i18next';
import {filter, find} from 'lodash';
import './App.scss';
import github from './svg/github.svg';
import { LangSwitcher } from './components/LangSwitcher';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      lang: props.i18n.language.split('-')[0],
      board: '',
      cards: [],
      lists: [],
      members: []
    }

    this.handleOnJsonPaste = this.handleOnJsonPaste.bind(this);
    this.handleLangChange  = this.handleLangChange.bind(this);
    this.getMember  = this.getMember.bind(this);
  }

  handleOnJsonPaste(e){
    try {

      let board = JSON.parse(e.target.value);
      let { cards, lists, members } = board
      this.setState({ board, cards, lists, members });

    } catch (error) {
      console.error(error)
      this.setState({ board:'', cards:[], lists:[] });
    }
  }

  handleLangChange(value){
    this.setState({
      lang: value
    });

    this.props.i18n.changeLanguage(value);
  }

  getMember(memberId){
    return find(this.state.members, {id: memberId}).fullName;
  }

  render(){
    let {lists, cards} = this.state;
    let { t } = this.props;

    return (
      <div className="App">

        <LangSwitcher currentLang={this.state.lang} onLangChange={this.handleLangChange} />

        <h1>{t('appTitle')}</h1>
        <p>{t('appInstructions1')} <code>({t('appInstructions2')})</code> {t('appInstructions3')}: </p>

        <textarea placeholder={t('textareaPlaceholder')} onChange={this.handleOnJsonPaste}></textarea>

        {lists && cards && <div className="results" tabIndex="1">
          <h1>{this.state.board.name}</h1>
          {lists.map(listItem => {
            if (listItem.closed) {
              return null;
            }
            let listCards = filter(cards, {idList: listItem.id});
            return <div key={listItem.id} className="results__item">
              <h2>{listItem.name}</h2>
              {listCards.length ? <ul>
                {listCards.map(cardItem => {
                  if (cardItem.closed) {
                    return null;
                  }
                  return <li key={cardItem.id}>
                    {cardItem.labels.map(labelItem => {
                      return <span className="results__item-label" key={labelItem.id} style={{backgroundColor: labelItem.color}}>{labelItem.name}</span>
                    })}
                    {cardItem.name}
                    {cardItem.idMembers.length ? <div className="results__item-member-list">
                      <span>{t('inCharge')} </span>
                      {cardItem.idMembers.map(member => {
                        return (
                          <span className="results__item-member" key={member}>{this.getMember(member)}</span>
                        )
                      })}
                    </div> : null}
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

export default withTranslation()(App);
