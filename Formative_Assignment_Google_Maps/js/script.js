function init(){

	var mapOptions = {
		//Set where the Map starts
		center:{
			lat: -41.2047819,
			lng: 174.9077703
		},
		//states what the initial zoom for the map is. 
		zoom: 11,
		//Turn off all of the User Interface for the Map
		disableDefaultUI: false,
		//Turn off the ability to zoom with clicks
		disableDoubleClickZoom: false,
		//Turn off the ability to zoom with scroll wheel
		scrollwheel: true,
		//Turn off the ability to drag the map around
		draggable: true,
		draggableCursor: "pointer",
		draggingCursor: "crosshair",
		fullscreenControl: true,
		backgroundColor: "grey",
		keyboardShortcuts: false,
		mapTypeControlOptions: {
			position: google.maps.ControlPosition.TOP_LEFT
		},
		styles: [
			{
				stylers:[
					{ hue: "#16a085" },
					{ saturation: -20 }
				]
			},
			{
		        featureType: "road",
		        elementType: "geometry",
		        stylers: [
		        	{ hue: "#3498db" },
		        	{ lightness: 0 },
		          	{ visibility: "none" }
		        ]
			},
			{
				featureType: "transit",
				elementType: "labels",
				stylers: [
					{ hue: "#A65424"},
					{ saturation: +80 }
				]
			},
			{
				featureType: "water",
				stylers: [
					{ color: "#519183"}  
				]
			}
		]
	}

	var map = new google.maps.Map(document.getElementById("map"), mapOptions);
}

google.maps.event.addDomListener(window, 'load', init);

