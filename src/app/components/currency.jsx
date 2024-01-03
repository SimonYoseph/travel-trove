'use client'
import React, { useState, useEffect } from 'react';
import '../style/currency.css';

const apiKey = 'ab2af298890a12482eb26376';
const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

const CurrencyConverter = () => {
    const [currencies, setCurrencies] = useState([]);
    const [fromCurrency, setFromCurrency] = useState('');
    const [toCurrency, setToCurrency] = useState('');
    const [amount, setAmount] = useState('');
    const [result, setResult] = useState('');

    useEffect(() => {
        fetchCurrencies();
    }, []);

    const fetchCurrencies = async () => {
        console.log('Fetching currencies...');
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            if (!data || !data.conversion_rates) {
                throw new Error('Invalid data format or missing rates.');
            }
            const fetchedCurrencies = Object.keys(data.conversion_rates);
            setCurrencies(fetchedCurrencies);
            console.log('Fetched currencies:', fetchedCurrencies);
        } catch (error) {
            console.error('Error fetching currencies:', error);
        } finally {
            console.log('Fetch currencies operation completed.');
        }
    };

    const handleConvert = async () => {
        try {
            if (!fromCurrency || !toCurrency || !amount) {
                console.error('Please select both "From" and "To" currencies and enter an amount.');
                return;
            }

            const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency}`);
            const data = await response.json();
            if (data && data.conversion_rates && data.conversion_rates.hasOwnProperty(toCurrency)) {
                const rate = data.conversion_rates[toCurrency];
                const convertedAmount = (amount * rate).toFixed(2);
                setResult(`${amount} ${fromCurrency} is ${convertedAmount} ${toCurrency}`);
            } else {
                console.error(`Exchange rate for ${toCurrency} not found.`);
            }
        } catch (error) {
            console.error('Error converting currencies:', error);
        }
    };

    return (
        <div className="converter-page">
            <div id="converter">
                <h1>Currency Converter</h1>
                <div className="input-container">
                    <label htmlFor="amount">Amount:</label>
                    <input
                        type="number"
                        id="amount"
                        placeholder="Enter amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>
                <div className="select-container">
                    <label htmlFor="fromCurrency">From:</label>
                    <select id="fromCurrency" value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
                        {currencies.map((currency) => (
                            <option key={currency} value={currency}>{currency}</option>
                        ))}
                    </select>
                </div>
                <div className="select-container">
                    <label htmlFor="toCurrency">To:</label>
                    <select id="toCurrency" value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
                        {currencies.map((currency) => (
                            <option key={currency} value={currency}>{currency}</option>
                        ))}
                    </select>
                </div>
                <br />
                <button onClick={handleConvert}>Convert</button>
                <p id="result">{result}</p>
            </div>
        </div>
    );
};

export default CurrencyConverter;

