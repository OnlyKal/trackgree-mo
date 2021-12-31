import React from 'react';
import Button from '../Button';

function CommandModal({text, active,setActive, setCommandResponse}) {
    text = (typeof text === 'string' && text.trim() !== '') ? text : 'Sending command...';

    return (
        <div className={active?"art_command_modal active": "art_command_modal"}>
            <span className="art_command_modal_layer"></span>
            <div className="art_command_modal_text">
                {text}
            </div>
            <div className="art_command_footer">
                <Button onClick={() => {
                    setCommandResponse('');
                    setActive(false)}} name={(text ==='Sending command...')?"Sending...":"Ok"} disabled={text ==='Sending command...'} />
            </div>
        </div>
    );
}

export default CommandModal;
