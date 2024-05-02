import React, { useEffect, useState } from 'react';

export function TranslateSentence(props) {
    const [sentence, setSentence] = useState('');
    const [translatedSentence, setTranslatedSentence] = useState('');
    const [targetLanguage, setTargetLanguage] = useState('');
    const [userInput, setUserInput] = useState('');
    const [isCorrect, setIsCorrect] = useState(null);
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/sentence/')
            .then(response => response.text())
            .then(data => {
                const espMatch = data.match(/<esp>(.*?)<\/esp>/);
                const engMatch = data.match(/<eng>(.*?)<\/eng>/);
                console.log(espMatch);
                console.log(engMatch);

                if (espMatch && engMatch) {
                    const espSentence = espMatch[1].trim();
                    const engSentence = engMatch[1].trim();

                    const randomLanguage = Math.random() < 0.5 ? 'esp' : 'eng';
                    setTargetLanguage(randomLanguage);
                    setSentence(randomLanguage === 'esp' ? espSentence : engSentence);
                    setTranslatedSentence(randomLanguage === 'esp' ? engSentence : espSentence);
                
                } else {
                    console.error('Invalid API response format');
                }
            })
            .catch(error => {
                console.error('Error fetching sentence:', error);
            });
    }, []); // Empty dependency array

    const handleSubmit = () => {
        const expectedSentence = targetLanguage === 'esp' ? translatedSentence : sentence;
        setIsCorrect(userInput.trim().toLowerCase() === expectedSentence.trim().toLowerCase());
    };

    return (
        <div>
            <p>Please translate the following sentence:</p>
            <p>{sentence}</p>
            <p>Your response:</p>
            <input
                type="text"
                value={userInput}
                onChange={e => setUserInput(e.target.value)}
            />
            <button onClick={handleSubmit}>Submit</button>
            {isCorrect !== null && (
                <p>{isCorrect ? 'Correct!' : 'Incorrect. Please try again.'}</p>
            )}
        </div>
    );
}

export function TranslateWord(props) {
    const [word, setWord] = useState('');
    const [translatedWord, setTranslatedWord] = useState('');
    const [targetLanguage, setTargetLanguage] = useState('');
    const [userInput, setUserInput] = useState('');
    const [isCorrect, setIsCorrect] = useState(null);
    const [isCloseButNeedsAccents, setIsCloseButNeedsAccents] = useState(false);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/word/')
            .then(response => response.text())
            .then(data => {
                console.log(data);
                const [espWord, engWord] = data.split(/<\/?eng>/);
                const spanishWord = espWord.replace(/<\/?esp>/g, '').trim().slice(1);
                const englishWord = engWord.trim();

                console.log(spanishWord);
                console.log(englishWord);

                const randomLanguage = Math.random() < 0.5 ? 'esp' : 'eng';
                setTargetLanguage(randomLanguage);
                setWord(randomLanguage === 'esp' ? englishWord : spanishWord);
                setTranslatedWord(randomLanguage === 'esp' ? spanishWord : englishWord);
            })
            .catch(error => {
                console.error('Error fetching word:', error);
            });
    }, []);

    const removeAccents = (str) => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };

    const handleSubmit = () => {
        const expectedTranslation = targetLanguage === 'esp' ? word : translatedWord;
        const userInputWithoutAccents = removeAccents(userInput.trim().toLowerCase());
        const expectedTranslationWithoutAccents = removeAccents(expectedTranslation.trim().toLowerCase());
        
        setIsCorrect(userInputWithoutAccents === expectedTranslationWithoutAccents);
        setIsCloseButNeedsAccents(userInputWithoutAccents === expectedTranslationWithoutAccents && userInput.trim().toLowerCase() !== expectedTranslation.trim().toLowerCase());
    };

    if (userInput !== '') {
        console.log(userInput);
    }
    
    return (
        <div>
            <p>Enter the translation for the following word:</p>
            <p>{targetLanguage === 'esp' ? word : word}</p>
            <p>Your response:</p>
            <input
                type="text"
                value={userInput}
                onChange={e => setUserInput(e.target.value)}
            />
            <button onClick={handleSubmit}>Submit</button>
            {isCorrect !== null && (
                <div>
                    {isCorrect ? (
                        <p>Correct!</p>
                    ) : (
                        <div>
                            <p>Incorrect. Please try again.</p>
                            {isCloseButNeedsAccents && (
                                <p>You're close, but don't forget to use accents!</p>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export function MatchingWords(props) {
    const [wordPairs, setWordPairs] = useState([]);
    const [shuffledWords, setShuffledWords] = useState([]);
    const [shuffledTranslations, setShuffledTranslations] = useState([]);
    const [selectedWord, setSelectedWord] = useState(null);
    const [selectedTranslation, setSelectedTranslation] = useState(null);
    const [correctMatches, setCorrectMatches] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/wordlist/')
            .then(response => response.json())
            .then(data => {
                const uniquePairs = data.reduce((acc, item) => {
                    const pair = { word: item.word, translation: item.translation };
                    const isDuplicate = acc.some(p => p.word === pair.word && p.translation === pair.translation);
                    if (!isDuplicate) {
                        acc.push(pair);
                    }
                    return acc;
                }, []);
    
                setWordPairs(uniquePairs);
                setShuffledWords(shuffleArray(uniquePairs.map(pair => pair.word)));
                setShuffledTranslations(shuffleArray(uniquePairs.map(pair => pair.translation)));
            })
            .catch(error => {
                console.error('Error fetching words:', error);
            });
    }, []);
    
    const shuffleArray = (array) => {
        const shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    };

    const handleWordSelect = (word) => {
        if (!isWordSelectable(word)) return;
        setSelectedWord(word);
        checkAnswer(word, selectedTranslation);
    };

    const handleTranslationSelect = (translation) => {
        if (!isTranslationSelectable(translation)) return;
        setSelectedTranslation(translation);
        checkAnswer(selectedWord, translation);
    };

    const checkAnswer = (word, translation) => {
        if (word && translation) {
            const isMatch = wordPairs.some(pair => pair.word === word && pair.translation === translation);
            if (isMatch) {
                setCorrectMatches([...correctMatches, word, translation]);
                setSelectedWord(null);
                setSelectedTranslation(null);
                setMessage('Correct!');
            } else {
                setMessage('Incorrect. Please try again.');
            }
        }
    };

    const isWordSelectable = (word) => {
        return !correctMatches.includes(word);
    };

    const isTranslationSelectable = (translation) => {
        return !correctMatches.includes(translation);
    };

    return (
        <div>
            <p>Match the words with their correct translations:</p>
            <div>
                <p>Words:</p>
                {shuffledWords.map((word, index) => (
                    <button
                        key={index}
                        onClick={() => handleWordSelect(word)}
                        disabled={!isWordSelectable(word)}
                        style={{
                            backgroundColor: selectedWord === word ? 'lightblue' : 'white',
                            opacity: isWordSelectable(word) ? 1 : 0.5,
                        }}
                    >
                        {word}
                    </button>
                ))}
            </div>
            <div>
                <p>Translations:</p>
                {shuffledTranslations.map((translation, index) => (
                    <button
                        key={index}
                        onClick={() => handleTranslationSelect(translation)}
                        disabled={!isTranslationSelectable(translation)}
                        style={{
                            backgroundColor: selectedTranslation === translation ? 'lightblue' : 'white',
                            opacity: isTranslationSelectable(translation) ? 1 : 0.5,
                        }}
                    >
                    {translation}
                    </button>
                ))}
            </div>
            {message && <p>{message}</p>}
        </div>
    );
}