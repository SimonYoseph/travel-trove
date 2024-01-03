'use client'
import { useSearchParams } from "next/navigation"
import '../style/Flights.css'

var Amadeus = require('amadeus');

var amadeus = new Amadeus({
  clientId: process.env.NEXT_PUBLIC_AMADEUS_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_AMADEUS_CLIENT_SECRET
});

export default function Flights() {
  const searchParams = useSearchParams()
  var validSearch = true;
  
  const originLocationCode = searchParams.get('originLocationCode');
  const destinationLocationCode = searchParams.get('destinationLocationCode');
  const departureDate = searchParams.get('departureDate');
  const returnDate = searchParams.get('returnDate');
  const cabin = searchParams.get('cabin')
  const currency = searchParams.get('currency')
  const maxPrice = searchParams.get('maxPrice');

  if (!searchParams.has('originLocationCode') || !searchParams.has('destinationLocationCode') || !searchParams.has('departureDate')) {
    validSearch = false;
  }

  var searchResult;
  if (validSearch) {
    searchResult = amadeus.shopping.flightOffersSearch.get({
        originLocationCode: originLocationCode,
        destinationLocationCode: destinationLocationCode,
        departureDate: departureDate,
        returnDate: returnDate,
        adults: 1,
        travelClass: cabin,
        currencyCode: currency,
        maxPrice: maxPrice
      }).then(function (response) {
        // return a display of the flight results

        // a function that loops through the segments of the flight and returns the final destination
        function getDestination(flight) {
          var destination = flight.itineraries[0].segments[0].arrival.iataCode;
          for (var i = 0; i < flight.itineraries[0].segments.length; i++) {
            if (i === flight.itineraries[0].segments.length - 1) {
              destination = flight.itineraries[0].segments[i].arrival;
            }
          }
          return destination;
        }

        if (response.data.length === 0) {
          return (
            <div className="flights-list">
              <div className="flight">
              <h1>No flights found</h1>
              </div>
            </div>
          )
        } else {
          return (
            <div>
  
              <div className="flights-list">
              {response.data.map((flight) => (
                  <div className="flight">
                    <h2>{flight.itineraries[0].segments[0].departure.iataCode} to {getDestination(flight).iataCode}</h2>
                    <h3>Departure: {flight.itineraries[0].segments[0].departure.at}</h3>
                    <h3>Arrival: {getDestination(flight).at}</h3>
                    <h3>Price: {flight.price.grandTotal} {flight.price.currency}</h3>
                    <button className="book-flight-btn">Book Flight</button>
                  </div>
                ))}
              </div>
            </div>
          )
        
        }
      }).catch(function (responseError) {
        console.log(responseError);
      });

    return (
      <div>
          <div>
            {searchResult}
          </div>
      </div>
    )
  }
}