import axios from 'axios';

const form = document.querySelector('form')! as HTMLFormElement;
const addressInput = form.querySelector('#address')! as HTMLInputElement;

const googleApiKey = 'API_KEY';


declare var google: any;
enum requestStatus {
    OK = 'OK',
    NO = 'ZERO_RESULTS'
}

type googleResponse = {
    results: {geometry: {location: {lat: number, lng: number}}}[];
    status: requestStatus
}

const sumbitFormHandler = async (event: Event) => {
    event.preventDefault();
    const eneteredAddress = addressInput.value;
    try{
        const response = await axios.get<googleResponse>(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(eneteredAddress)}&key=${googleApiKey}`);
        if(response.data.status === requestStatus.OK){
            const location = response.data.results[0].geometry.location;
            const map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
                center: location,
                zoom: 8,
              });
              new google.maps.Marker({
                position: location,
                map,
                title: eneteredAddress,
              });
        }
    }catch(err){
        console.log(err);
    }
}

form.addEventListener("submit", sumbitFormHandler)