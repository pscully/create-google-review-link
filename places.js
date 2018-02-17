var baseURL = "https://search.google.com/local/writereview?placeid=";

function initMap() {
    // Create the initial Google Map to search and show in browser.
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: -33.8688,
            lng: 151.2195
        },
        zoom: 13
    });

    var input = document.getElementById('pac-input');

    // Initiate Google Maps autocomplete for searching through Places.
    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);


    // Search box goes in the top left of the page.
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // Create map marker at designated Place address and create info box which opens by clicking the map marker.
    var infowindow = new google.maps.InfoWindow();
    var infowindowContent = document.getElementById('infowindow-content');
    infowindow.setContent(infowindowContent);
    var marker = new google.maps.Marker({
        map: map
    });
    marker.addListener('click', function () {
        infowindow.open(map, marker);
    });

    // If the place name changes in the search box start over.
    autocomplete.addListener('place_changed', function () {
        infowindow.close();
        var place = autocomplete.getPlace();
        if (!place.geometry) {
            return;
        }

        //   If the place is real then change the map and set the zoom.
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);
        }

        // Set the position of the marker using the place ID and location.
        marker.setPlace({
            placeId: place.place_id,
            location: place.geometry.location
        });
        //   Set the marker to be invisible at first.
        marker.setVisible(true);



        //   Get the Places ID and build the Review Link. Insert link into Info Box.
        var businessPlaceID = place.place_id;
        var reviewURL = baseURL + businessPlaceID;
        document.getElementById("link").setAttribute("href", reviewURL);

        // Add the rest of the content to the info box. 
        infowindowContent.children['place-name'].textContent = place.name;
        infowindowContent.children['place-id'].textContent = place.place_id;
        infowindowContent.children['place-address'].textContent =
            place.formatted_address;
        infowindow.open(map, marker);
    });
}