import React from "react";

function FilterCheckbox({ onChange, isChecked }) {
  return (
    <div className='filter-checkbox'>
      <label className="checkbox filter-checkbox__label">
        <input type="checkbox" className='filter-checkbox__tumbler' checked={isChecked} onChange={onChange} />
        <span className="filter-checkbox__text">Короткометражки</span>
      </label>
    </div>
  )
}

export default FilterCheckbox;