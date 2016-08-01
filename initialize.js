//Load Facebook SDK

(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.7&appId=966635506787028";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

//Initialize Firebase with appropriate credentials

var config = {
	    apiKey: "AIzaSyDoZeygow39EW_VGo6a2u3CIMgLZP1CT1A",
	    authDomain: "mauroyjanette2016.com",
	    databaseURL: "https://maujan2016.firebaseio.com",
	    storageBucket: "maujan2016.appspot.com",
	  };
	  firebase.initializeApp(config);


	  //Initialize Google Maps services


		  window.initMap = function() {
		  var pyrmont = {lat: 41.8880, lng: -87.6321};
		  var ogilvie = {lat: 41.8830267, lng: -87.6405328};
		  map = new google.maps.Map(document.getElementById('map'), {
		    center: pyrmont,
		    zoom: 16
		    //place_id: ChIJV_s6ILEsDogRR_5H7mQn4nw
		  });


		  infowindow = new google.maps.InfoWindow();
		  var service = new google.maps.places.PlacesService(map);
		  service.nearbySearch({
		    location: pyrmont,
		    radius: 600,    
		    type: ['hotels']
		  }, callback);

		  var riverRoastLogo = 'riverRoastLogo.png';

		  var markerRiverRoast = new google.maps.Marker({			//Add marker for River Roast
		    position: pyrmont,
		    map: map,
		    title: 'River Roast, hope to see you there!',
		    icon: riverRoastLogo
		  });
		  markerRiverRoast.setAnimation(google.maps.Animation.BOUNCE);

		  var trainImage = 'train.png';

		  var markerOgilvie = new google.maps.Marker({				//Add marker for Ogilvie Train Station
		    position: ogilvie,
		    map: map,
		    title: 'Ogilvie Train Station',
		    icon: trainImage
		  });

		  

		}