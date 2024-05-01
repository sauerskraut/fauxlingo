import React, { useContext, useState } from 'react';
import { TranslateWord, TranslateSentence, MatchingWords } from './Activities';
import { ChooseChapter, useChapter, ChapterContext } from './Utils';
import { Button } from '@material-ui/core';
import './CSS/main.css';

function HomePage() {
    const [showTranslateWord, setShowTranslateWord] = useState(false);
    const [showTranslateSentence, setShowTranslateSentence] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [showChapter, setShowChapter] = useState(false);
    const [showChapterSelect, setShowChapterSelect] = useState(false);  
    const [showMatchingWords, setShowMatchingWords] = useState(false);
    const selectedChapter = useContext(ChapterContext);

    return (
        <div class="App">
            <div class="container">
                <Button size="small" variant="contained" onClick={() => setShowChapterSelect(!showChapterSelect)}>Choose Chapter</Button>
            
                {showChapter && <div><h3>Chapter {selectedChapter?.chapterNumber}: {selectedChapter?.chapterName}</h3> : ""</div>}
            </div>

            <div className="options">
                <div className="item">
                    <Button size="small" variant="contained" onClick={() => {
                        setShowTranslateWord(!showTranslateWord);
                        setShowChapterSelect(false);
                        setShowTranslateSentence(false);
                        setShowMatchingWords(false);
                    }}>Translate Words</Button>
                </div>
                <div className="item">
                    <Button size="small" variant="contained" onClick={() => {
                        setShowTranslateSentence(!showTranslateSentence);
                        setShowChapterSelect(false);
                        setShowTranslateWord(false);
                        setShowMatchingWords(false);
                    }}>Translate Sentence</Button>
                </div>
                <div className="item">
                    <Button size="small" variant="contained" onClick={() => {
                        setShowMatchingWords(!showMatchingWords);
                        setShowChapterSelect(false);
                        setShowTranslateWord(false);
                        setShowTranslateSentence(false);
                    }}>Match Words</Button>
                </div>
            </div>
            <div className="main">
                {showChapterSelect && <ChooseChapter/>}
                {showTranslateWord && <TranslateWord/>}
                {showTranslateSentence && <TranslateSentence/>}
                {showMatchingWords && <MatchingWords/>}
            </div>
        </div>
    );
}

export default HomePage;