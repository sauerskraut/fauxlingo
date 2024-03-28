import React, { useContext, useState } from 'react';
import { TranslateWords, TranslateSentence } from './Activities';
import { ChooseChapter, useChapter, ChapterContext } from './Utils';
import { Button } from '@material-ui/core';
import './CSS/main.css';

function HomePage() {
    const [showTranslateWord, setShowTranslateWord] = useState(false);
    const [showTranslateSentence, setShowTranslateSentence] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [showChapterSelect, setShowChapterSelect] = useState(false);  
    const selectedChapter = useContext(ChapterContext);

    return (
        <div>
            <div class="container">
                {darkMode && <Button variant="outlined" onClick={() => setDarkMode(!darkMode)}>Light Mode</Button>}
                {!darkMode && <Button variant="outlined" onClick={() => setDarkMode(!darkMode)}>Dark Mode</Button>}

                <Button variant="outlined" onClick={() => setShowChapterSelect(!showChapterSelect)}>Choose Chapter</Button>
            </div>

            <div>
                <h1>Chapter {selectedChapter?.chapterNumber}: {selectedChapter?.chapterName}</h1>
            </div>

            <div className="container">
                {showChapterSelect ? <ChooseChapter /> : (
                <>
                    <Button variant="contained" onClick={() => setShowTranslateWord(!showTranslateWord)}>Translate Words</Button>
                    <Button variant="contained" onClick={() => setShowTranslateSentence(!showTranslateSentence)}>Translate Sentence</Button>
                </>
            )}

            </div>


            <div className="app">
                {showTranslateWord && <TranslateWords/>}
                {showTranslateSentence && <TranslateSentence/>}
            </div>
        </div>
    );
}

export default HomePage;