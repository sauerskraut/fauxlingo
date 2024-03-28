import React, { useEffect, useState } from 'react';

export function TranslateWords(props) {
    // we need to take the list of words and shuffle them
    // then we need to display them in a grid

    return (
        <div>
            <p> This is a translation activity.</p>
        </div>
    )
}

export function TranslateSentence(props) {
    const [sentence, setSentence] = useState('');

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/sentence/')
            .then(response => response.json())
            .then(data => setSentence(data));
    }, []);

    return (
        <div>
            <p>Please translate the following sentence:</p>
            <p>{sentence}</p>
            <p>Your response:</p>
            <input type="text" /> <button>Submit</button>
        </div>
    );
}