import React from 'react'

export default function Button({onClick, name,className,type='button',children=null, onPointerDown, onPointerMove, onPointerCancel, beforeContent, afterContent, disabled=false}) {
    return (
        <div className={"art_btn "}>
            <button type={type} onClick={onClick}  className={className} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerCancel={onPointerCancel} disabled={disabled}>
                {beforeContent?beforeContent:''}
                {name}
                {afterContent?afterContent:''}
                {children?children:''}
            </button>
        </div>
    )
}
