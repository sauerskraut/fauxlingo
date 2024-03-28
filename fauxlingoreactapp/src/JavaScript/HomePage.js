import React, { useContext, useState } from 'react';
import { TranslateWords, TranslateSentence } from './Activities';
import { ChooseChapter, useChapter, ChapterContext } from './Utils';
import { Button } from '@material-ui/core';
import './CSS/main.css';

function HomePage() {
    const [showTranslateWord, setShowTranslateWord] = useState(false);
    const [showTranslateSentence, setShowTranslateSentence] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [showChapter, setShowChapter] = useState(false);
    const [showChapterSelect, setShowChapterSelect] = useState(false);  
    const selectedChapter = useContext(ChapterContext);

    return (
        <div class="App">
            <div class="container">
                {/* {darkMode && <Button variant="outlined" onClick={() => setDarkMode(!darkMode)}>Light Mode</Button>}
                {!darkMode && <Button variant="outlined" onClick={() => setDarkMode(!darkMode)}>Dark Mode</Button>}*/ }

                <Button variant="outlined" onClick={() => setShowChapterSelect(!showChapterSelect)}>Choose Chapter</Button>
            
                {showChapter && <div><h3>Chapter {selectedChapter?.chapterNumber}: {selectedChapter?.chapterName}</h3> : ""</div>}
            </div>

            <div className="options">
                <div className="item">
                    <Button variant="outlined" onClick={() => setShowTranslateWord(!showTranslateWord)}>Translate Words</Button>
                </div>
                <div className="item">
                    <Button variant="outlined" onClick={() => setShowTranslateSentence(!showTranslateSentence)}>Translate Sentence</Button>
                </div>
            </div>
            <div className="main">
                {showChapterSelect && <ChooseChapter/>}
                {/*showTranslateWord && <TranslateWords/>*/}
                {showTranslateSentence && <TranslateSentence/>}
            </div>
        </div>
    );
}

export default HomePage;