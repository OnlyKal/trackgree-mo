import React from 'react';

export default function Header({children, className=''} ) {
    return (
        <header className={"art_header "+className}>
            <div className="art_header_container">
                {children?children:''}
            </div>
        </header>
    )
}
