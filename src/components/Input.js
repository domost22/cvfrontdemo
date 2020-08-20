import React from "react";

export default function Input (props){

    return(
    <div>
        <label>{props.title}</label>
        <input onClick={props.onClick} type={props.type} name={props.name} onChange={(e) => {props.onChange(e)}}/>
        {props.error > 0 &&
        <span>{props.errorMessage}</span>}
    </div>)
}
