import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect, createContext } from 'react';

export const LangContext = createContext({
  langIdx: 1,
  changeLangIdx: (langIdx) => {},
});

export default function LangContextProvider({ children }) {
  const [newLangIdx, setNewLangIdx] = useState(1);

  useEffect(() => {
    AsyncStorage.getItem('langIdx').then((storedLangIdx) => {
      if (storedLangIdx !== null) {
        setNewLangIdx(parseInt(storedLangIdx));
      }
    });
  }, []);

  function changeLangIdx(langIdx) {
    setNewLangIdx(langIdx);
    AsyncStorage.setItem('langIdx', langIdx.toString());
  }

  const value = {
    langIdx: newLangIdx,
    changeLangIdx: changeLangIdx,
  };

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}
