'use strict';

var autocomplete;

function initAutocomplete() {
  // Create the autocomplete object, restricting the search to geographical
  // location types.
  autocomplete = new google.maps.places.Autocomplete(
      /** @type {!HTMLInputElement} */(document.getElementById('autocomplete')),
      {types: ['geocode']});

  // When the user selects an address from the dropdown, populate the address
  // fields in the form.
  autocomplete.addListener('place_changed', fillInAddress);
}

function fillInAddress() {
  // Get the place details from the autocomplete object.
  var place = autocomplete.getPlace();

  console.log(place);

  var loc = googleMapper(place);

  console.log(loc);

  document.getElementById("googleLocationId").value = loc['google_id'];
  document.getElementById("name").value = loc['name'];
  document.getElementById("addressOne").value = loc['address_one'];
  document.getElementById("addressTwo").value = loc['address_two'];
  document.getElementById("city").value = loc['city'];
  document.getElementById("state").value = loc['state'];
  document.getElementById("zipcode").value = loc['zipcode'];
  document.getElementById("country").value = loc['country'];
  document.getElementById("latitude").value = loc['latitude'];
  document.getElementById("longitude").value = loc['longitude'];

}

// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
function geolocate() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var geolocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      var circle = new google.maps.Circle({
        center: geolocation,
        radius: position.coords.accuracy
      });
      autocomplete.setBounds(circle.getBounds());
    });
  }
}