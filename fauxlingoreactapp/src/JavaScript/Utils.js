import React, { useEffect, useState, createContext, useContext } from 'react';
import { Select, MenuItem, FormControl } from '@material-ui/core';

// Create a Context object
export const ChapterContext = createContext();

// Create a custom hook to use the context
export function useChapter() {
    return useContext(ChapterContext);
}

export default ChapterContext;
export function ChooseChapter() {
    const [chapters, setChapters] = useState([]);
    const [selectedChapter, setSelectedChapter] = useState('');

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/chapter_list/")
        .then(response => response.json())
        .then(data => setChapters(data))
    }, [])

    const handleChapterSelect = (event) => {
        const chapterNumber = event.target.value;
        const chapterName = chapters[chapterNumber];
        setSelectedChapter({ chapterNumber, chapterName });
    }


    // Log the selectedChapter state to the console whenever it changes
    useEffect(() => {
        console.log(selectedChapter);
    }, [selectedChapter])

    return (
        <ChapterContext.Provider value={selectedChapter}>
            <div>
                <h1>Choose a Chapter</h1>
                <FormControl>
                    <Select value={selectedChapter?.chapterNumber} onChange={handleChapterSelect}>
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {Object.entries(chapters).map(([chapterNumber, chapterName], index) => (
                            <MenuItem key={index} value={chapterNumber}>
                                Chapter {chapterNumber}: {chapterName}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                {selectedChapter && <h3>You selected Chapter {selectedChapter.chapterNumber}: {selectedChapter.chapterName}</h3>}
            </div>
        </ChapterContext.Provider>
    )
}
