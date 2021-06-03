import React from 'react';

interface StateProps {
    num: number
}

const State: React.FC<StateProps> = ({num}) => {
    let bckCol: string = '';
    let col: string = '';
    let border: string = '';
    let word: string = '';

    if (num === 0) {
        bckCol = '#cceeff';
        col = '#0066ff';
        border = '1px solid #0066ff';
        word = 'New';
    }

    if (num === 1) {
        bckCol = '#ffe6ff';
        col = '#ff00ff';
        border = '1px solid #ff00ff';
        word = 'Doing';
    }

    if (num === 2) {
        bckCol = '#ccffcc';
        col = '#00e600';
        border = '1px solid #00e600';
        word = 'Done';
    }

    return (
        <span className='state-span' style={{backgroundColor: bckCol, color: col, border: border}}>
            {word}
        </span>
    );
}

export default State;