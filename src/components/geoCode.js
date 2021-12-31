import Geocode from "react-geocode";
import { GOOGLE_API_KEY } from "../config";

// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
Geocode.setApiKey(GOOGLE_API_KEY);


// And according to the below google docs in description, ROOFTOP param returns the most accurate result.
Geocode.setLocationType("GEOMETRIC_CENTER");

// Enable or disable logs. Its optional.
// Geocode.enableDebug();

// Get address from latitude & longitude.
const geocode = (lat, lng) => Geocode.fromLatLng(lat, lng);

export default geocode;