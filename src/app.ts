import axios from 'axios';

const config= require('../config');
const form = document.querySelector('form')!;
const addressInput = document.getElementById('address')! as HTMLInputElement;
const GOOGLE_API_KEY = config.key;

// declare var google: any; "AIzaSyA0Tve0AGeSQc1F4qxI30oni4c_I9cQA6E"

type GoogleGeocodingResponse = { 
results: {geometry: {location: {lat: number, lng: number}}}[];
status: 'OK' | 'ZERO_RESULTS'; 
};

function searchAddressHandler(event: Event){
    event.preventDefault();
const enteredAddress = addressInput.value;

axios
 .get<GoogleGeocodingResponse>(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(enteredAddress)}&key=${GOOGLE_API_KEY}`)

.then(response =>{
    if (response.data.status !== 'OK'){
        throw new Error("Could not fetch location!"); 
    }
    const coordinates = response.data.results[0].geometry.location;
    const map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
        center: coordinates,
        zoom: 14,
      });
      new google.maps.Marker({
        position: coordinates,
        map: map,
      });

})
.catch(err => {
    alert(err.message);
    console.log(err);
});

//send to google api
}


form.addEventListener('submit', searchAddressHandler);

