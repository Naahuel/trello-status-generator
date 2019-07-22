import React from 'react';

export const LangSwitcher = ({currentLang, onLangChange}) => {
  const _handleSelectChange = (e) => {
    onLangChange(e.target.value);
  }
  
  return (
    <select className="lang-switch" value={currentLang} onChange={_handleSelectChange}>
      <option value="es">Español</option>
      <option value="en">English</option>
    </select>
  )
}