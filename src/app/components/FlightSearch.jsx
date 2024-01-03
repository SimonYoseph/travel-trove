"use client"
import '../style/FlightSearch.css'
import React, { useState } from 'react';
import Chat from './Chat'

export default function FlightSearch() {

    const [originLocationCode, setOriginLocationCode] = useState('');
    const [destinationLocationCode, setDestinationLocationCode] = useState('');
    const [departureDate, setDepartureDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [cabin, setCabin] = useState('ECONOMY');
    const [currency, setCurrency] = useState('USD');
    const [maxPrice, setMaxPrice] = useState('');

    return (
        <div className="flight-search-page">
            <div className='flight-search-form'>
                <div className="row">
                    <div className="flight-search">Flight Search &#128747;</div>
                </div>
                <Chat />
                <form className="flight-form">
                    <div className="row">
                        <div className="form-group">
                            <label className="label">From</label>
                            <input 
                                type="text" 
                                placeholder="Airport" 
                                className="form-control" 
                                required="required"
                                name="originLocationCode"
                                value={originLocationCode}
                                onChange={(e) => setOriginLocationCode(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label className="label">To</label>
                            <input 
                                type="text" 
                                placeholder="Airport" 
                                className="form-control"
                                required="required"
                                name="destinationLocationCode"
                                value={destinationLocationCode}
                                onChange={(e) => setDestinationLocationCode(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group">
                            <label className="label">Depart</label>
                            <input 
                                type="date" 
                                placeholder="mm/dd/yyyy"
                                className="form-control"
                                required="required"
                                name="departureDate"
                                value={departureDate}
                                onChange={(e) => setDepartureDate(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label className="label">Return</label>
                            <input 
                                type="date" 
                                placeholder="mm/dd/yyyy" 
                                className="form-control"
                                required="required"
                                name="returnDate"
                                value={returnDate}
                                onChange={(e) => setReturnDate(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group">
                            <label className="label">Cabin</label>
                            <select className="form-select" id="cabin"
                                name="cabin"
                                value={cabin}
                                onChange={(e) => setCabin(e.target.value)}
                            >
                                <option value="ECONOMY">Economy</option>
                                <option value="PREMIUM_ECONOMY">Premium Economy</option>
                                <option value="BUSINESS">Business</option>
                                <option value="FIRST">First</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <div className="form-check form-switch">
                                <input className="form-check-input align-self-center" type="checkbox" id="directFlights"/>
                                <label className="form-check-label d-inline-flex align-self-center">Direct
                                    flights</label>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group">
                            <label className="label">Currency</label>
                            <select className="form-select" id="currency"
                                name="currency"
                                value={currency}
                                onChange={(e) => setCurrency(e.target.value)}
                            >
                                <option value="USD">USD</option>
                                <option value="CAD">CAD</option>
                                <option value="EUR">EUR</option>
                                <option value="GBP">GBP</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="label">Max Price</label>
                            <input 
                                type="number" 
                                placeholder={currency} 
                                className="form-control"
                                required="required"
                                name="maxPrice"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(e.target.value)}
                            />
                        </div>
                    </div>
                    <button type="submit">Search flights</button>
                </form>
            </div>
        </div>
    )
}