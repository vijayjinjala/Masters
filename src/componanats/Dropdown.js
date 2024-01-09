import React from 'react'

export default function Dropdown(
    props
) {
  return (
    <div class="form-floating mb-3">
    <select onChange={props.onChange} class="form-select" value={props.fieldname && props.value} id="floatingSelect" aria-label="Country">
      <option defaultChecked >{props.fieldname}</option>
      {props.data != null && props.data.map((element) => {
        // console.log(element._id);
        if(element._id==props.value){
          return <option defaultChecked value={element._id}>{element[props.db_field]}</option>
        }else{
          return <option value={element._id}>{element[props.db_field]}</option>
        }
        
      })}
    </select>
    <label for="floatingSelect"></label>
  </div>
  )
}