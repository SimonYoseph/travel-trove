'use client'
import React, { useState, useEffect } from 'react';
import '../style/language.css';
import { FaVolumeUp } from "react-icons/fa";
import { FaCopy } from "react-icons/fa";
import { FaExchangeAlt } from "react-icons/fa";

function Language() {
  const [fromText, setFromText] = useState('');
  const [toText, setToText] = useState('');
  const [selectedLanguages, setSelectedLanguages] = useState(['en-GB', 'es-ES']);
  const [countries, setCountries] = useState({});

  useEffect(() => {
    
    const fetchedCountries = {
      "am-ET": "Amharic",
      "ar-SA": "Arabic",
      "be-BY": "Bielarus",
      "bem-ZM": "Bemba",
      "bi-VU": "Bislama",
      "bjs-BB": "Bajan",
      "bn-IN": "Bengali",
      "bo-CN": "Tibetan",
      "br-FR": "Breton",
      "bs-BA": "Bosnian",
      "ca-ES": "Catalan",
      "cop-EG": "Coptic",
      "cs-CZ": "Czech",
      "cy-GB": "Welsh",
      "da-DK": "Danish",
      "dz-BT": "Dzongkha",
      "de-DE": "German",
      "dv-MV": "Maldivian",
      "el-GR": "Greek",
      "en-GB": "English",
      "es-ES": "Spanish",
      "et-EE": "Estonian",
      "eu-ES": "Basque",
      "fa-IR": "Persian",
      "fi-FI": "Finnish",
      "fn-FNG": "Fanagalo",
      "fo-FO": "Faroese",
      "fr-FR": "French",
      "gl-ES": "Galician",
      "gu-IN": "Gujarati",
      "ha-NE": "Hausa",
      "he-IL": "Hebrew",
      "hi-IN": "Hindi",
      "hr-HR": "Croatian",
      "hu-HU": "Hungarian",
      "id-ID": "Indonesian",
      "is-IS": "Icelandic",
      "it-IT": "Italian",
      "ja-JP": "Japanese",
      "kk-KZ": "Kazakh",
      "km-KM": "Khmer",
      "kn-IN": "Kannada",
      "ko-KR": "Korean",
      "ku-TR": "Kurdish",
      "ky-KG": "Kyrgyz",
      "la-VA": "Latin",
      "lo-LA": "Lao",
      "lv-LV": "Latvian",
      "men-SL": "Mende",
      "mg-MG": "Malagasy",
      "mi-NZ": "Maori",
      "ms-MY": "Malay",
      "mt-MT": "Maltese",
      "my-MM": "Burmese",
      "ne-NP": "Nepali",
      "niu-NU": "Niuean",
      "nl-NL": "Dutch",
      "no-NO": "Norwegian",
      "ny-MW": "Nyanja",
      "ur-PK": "Pakistani",
      "pau-PW": "Palauan",
      "pa-IN": "Panjabi",
      "ps-PK": "Pashto",
      "pis-SB": "Pijin",
      "pl-PL": "Polish",
      "pt-PT": "Portuguese",
      "rn-BI": "Kirundi",
      "ro-RO": "Romanian",
      "ru-RU": "Russian",
      "sg-CF": "Sango",
      "si-LK": "Sinhala",
      "sk-SK": "Slovak",
      "sm-WS": "Samoan",
      "sn-ZW": "Shona",
      "so-SO": "Somali",
      "sq-AL": "Albanian",
      "sr-RS": "Serbian",
      "sv-SE": "Swedish",
      "sw-SZ": "Swahili",
      "ta-LK": "Tamil",
      "te-IN": "Telugu",
      "tet-TL": "Tetum",
      "tg-TJ": "Tajik",
      "th-TH": "Thai",
      "ti-TI": "Tigrinya",
      "tk-TM": "Turkmen",
      "tl-PH": "Tagalog",
      "tn-BW": "Tswana",
      "to-TO": "Tongan",
      "tr-TR": "Turkish",
      "uk-UA": "Ukrainian",
      "uz-UZ": "Uzbek",
      "vi-VN": "Vietnamese",
      "wo-SN": "Wolof",
      "xh-ZA": "Xhosa",
      "yi-YD": "Yiddish",
      "zu-ZA": "Zulu"
      
    };
    setCountries(fetchedCountries);
  }, []);

  const handleExchange = () => {
    setToText(fromText);
    setFromText(toText);
    setSelectedLanguages([selectedLanguages[1], selectedLanguages[0]]);
  };

  const handleTranslation = () => {
    if (!fromText) return;
    setToText('Translating...');

    const apiUrl = `https://api.mymemory.translated.net/get?q=${fromText}&langpair=${selectedLanguages[0]}|${selectedLanguages[1]}`;
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        const translatedText = data.responseData.translatedText;
        setToText(translatedText);
      })
      .catch((error) => {
        console.error('Translation error:', error);
        setToText('Translation error');
      });
  };

  const handleCopy = (targetId) => {
    const textToUse = targetId === 'from' ? fromText : toText;
    navigator.clipboard.writeText(textToUse);
  }

  const handleSpeak = (targetId) => {
    const textToUse = targetId === 'from' ? fromText : toText;
    let utterance = new SpeechSynthesisUtterance(textToUse);
    utterance.lang = selectedLanguages[targetId === 'from' ? 0 : 1];
    speechSynthesis.speak(utterance);
  }

  return (
    <div className="language-page">
      <div className="language-form">
        <div className="text-input">
          <textarea
            spellCheck="false"
            className="from-text"
            placeholder="Enter text"
            value={fromText}
            onChange={(e) => setFromText(e.target.value)}
          ></textarea>
          <textarea
            spellCheck="false"
            className="to-text"
            placeholder="Translation"
            value={toText}
            readOnly
            disabled
          ></textarea>
        </div>
        <ul className="controls">
          <li className="row from">
            <select
              value={selectedLanguages[0]}
              onChange={(e) =>
                setSelectedLanguages([e.target.value, selectedLanguages[1]])
              }
            >
              {Object.keys(countries).map((countryCode) => (
                <option key={countryCode} value={countryCode}>
                  {countries[countryCode]}
                </option>
              ))}
            </select>
            <div className="icons">
              <FaVolumeUp
                id="from"
                onClick={() => handleSpeak('from')}
              />
              <FaCopy
                id="from"
                onClick={() => handleCopy('from')}
              />
            </div>
          </li>
          <li className="exchange" onClick={handleExchange}>
            <FaExchangeAlt/>
          </li>
          <li className="row to">
            <select
              value={selectedLanguages[1]}
              onChange={(e) =>
                setSelectedLanguages([selectedLanguages[0], e.target.value])
              }
            >
              {Object.keys(countries).map((countryCode) => (
                <option key={countryCode} value={countryCode}>
                  {countries[countryCode]}
                </option>
              ))}
            </select>
            <div className="icons">
              <FaVolumeUp
                id="to"
                onClick={() => handleSpeak('to')}
              />
              <FaCopy
                id="to"
                onClick={() => handleCopy('to')}
              />
            </div>
          </li>
        </ul>
        <button onClick={handleTranslation}>Translate Text</button>
      </div>
    </div>
  );
}

export default Language;
