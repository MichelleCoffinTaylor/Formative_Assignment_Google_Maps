var map, marker, infobox, userLocation, directionDisplay, closestMarker, markers = [], currentMarker, TransportMode = "DRIVING";
//	All Markers that are showen on the screen
var AllMarkers = [
	{
		//	Motorcycle Stores
		lat: -41.2599452,
		lng: 174.7619857,
		title: "Motorad",
		description: "Motorcycle Dealer",
		address: "47 Vivian Street Wellington",
		icon: "imgs/store.png"
	},
	{
		lat: -41.2225089,
		lng: 174.8715123,
		title: "Wellington Motorcycles",
		description: "Motorcycle Dealer",
		address: "18 Gear Street Petone Lower Hutt",
		icon: "imgs/store.png"
	},
	{
		lat: -41.2177919,
		lng: 174.8874458,
		title: "TSS Red Baron",
		description: "Motorcycle Dealer",
		address: "411 Cuba Street Alicetown Lower Hutt",
		icon: "imgs/store.png"	
	},
	{
		lat: -41.2047819,
		lng: 174.9077703,
		title: "MotoMart",
		description: "Motorcycle Dealer",
		address: "7 Rutherford Street Lower Hutt",
		icon: "imgs/store.png"
	},
	{
		lat: -40.8341916,
		lng: 165.985795,
		title: "Maidstone Yamaha",
		description: "Motorcycle Store",
		address: "30 Goodshed Road Upper Hutt",
		icon: "imgs/store.png"
	},
	{
		//	Motorcycle Clubs
		lat: -41.08065,
		lng: 175.01167,
		title: "Kapi-Mana Motorcycle Club",
		description: "Motorcycle Club",
		address: "Bulls Run Road Upper Hutt",
		icon: "imgs/motorcycle.png"
	},
	{
		lat: -40.46066,
		lng: 175.375,
		title: "Gold Coast Motocross Club",
		description: "Motorcycle Club",
		address: "Himatangi Block Road Foxton",
		icon: "imgs/motorcycle.png"
	},
	{
		lat: -41.0258389,
		lng: 175.4753266,
		title: "Wairarapa Motorcycle Club",
		description: "Motorcycle Club",
		address: "Dalefield Road Carterton Wairarapa",
		icon: "imgs/motorcycle.png"
	},
	{
		//	Motorcycle Tracks
		lat: -40.3391828,
		lng: 175.3072433,
		title: "Flipps Motorcycle Park",
		description: "Motorcycle Track",
		address: "Omanuka Road Oroua Downs Manawatu",
		icon: "imgs/bicycle.png"
	},
	{
		lat: -40.3579765,
		lng: 175.3354065,
		title: "Taikorea Motorcycle Park",
		description: "Motorcycle Track",
		address: "Taikorea Road Glen Oroua",
		icon: "imgs/bicycle.png"
	}
];

//	This Function shows everything in the map that we want to load
function init(){

	//	 All of the Map Options
	var mapOptions = {
		//Set where the Map starts
		center:{
			lat: -41.2047819,
			lng: 174.9077703
		},
		//	Map Zoom 
		zoom: 11,
		//	Turn off all of the User Interface for the Map
		disableDefaultUI: false,
		//	Turn off the ability to zoom with clicks
		disableDoubleClickZoom: false,
		//	Turn off the ability to zoom with scroll wheel
		scrollwheel: true,
		//	Turn off the ability to drag the map around
		draggable: true,
		//	
		draggableCursor: "pointer",
		//	
		draggingCursor: "crosshair",
		//	
		fullscreenControl: true,
		//	Changing the Background Colour of the Map
		backgroundColor: "grey",
		//	Turning off Keyboard Shortcuts
		keyboardShortcuts: false,
		//	
		mapTypeControlOptions: {
			position: google.maps.ControlPosition.TOP_LEFT
		},
		//	Styling the Map
		styles: [
			{
				//	Style of the Whole Map
				stylers:[
					{ hue: "#16a085" },
					{ saturation: -20 }
				]
			},
			{
				//	Only changing all of the Roads
		        featureType: "road",
		        elementType: "geometry",
		        stylers: [
		        	{ hue: "#3498db" },
		        	{ lightness: 0 },
		          	{ visibility: "none" }
		        ]
			},
			{
				//	Only changing the lables for Transit
				featureType: "transit",
				elementType: "labels",
				stylers: [
					{ hue: "#A65424"},
					{ saturation: +80 }
				]
			},
			{
				//	Only changing the colour of the Water
				featureType: "water",
				stylers: [
					{ color: "#519183"}  
				]
			},
			{
				//	Turning off all of the points of intereset
				featureType: "poi",
				stylers: [
					{visibility: "off"}
				]
			}
		]
	}

	//	Telling the Map where you want to render it
	map = new google.maps.Map(document.getElementById("map"), mapOptions);
	//	Function FindUser finds where the current user is
	FindUser();
	//	Function that adds 1 marker on the page where the user choses
	// addSingleMaker();
	//	Function that adds all of the markers onto the page
	addAllMarkers();
	//	Function that is toggling the bounce animation on a marker we place
	//	marker.addListener("click", toggleBounce);
	//	Function adding a new marker on the Map where we click
	map.addListener("click", addMarker);
	infoBox();
}

//	Calls when the window has loaded the run the init function which will show the map
google.maps.event.addDomListener(window, 'load', init);

//	Function adding all of the markers to the Map
function addAllMarkers(){
	//	Looping over every marker in the Array
	for (var i = 0; i < AllMarkers.length; i++) {
		//	Creating a new instance of Google Maps Markers
		marker = new google.maps.Marker({
			position:{
				lat: AllMarkers[i].lat,
				lng: AllMarkers[i].lng
			},
			map: map,
			animation: google.maps.Animation.DROP,
			//	Changing the icon image
			icon: "imgs/bicycle.png",
			title: AllMarkers[i].title,
			description: AllMarkers[i].description
		})
		//	Creating an array for all of the Markers that are on screen
		//	Pushing each of the markers into the Array
		markers.push(marker);
		//	Link the infobox to this Marker
		//	This used to be called AllInfobox(marker);
		//	Allinfobox(marker);
		//	And is now called MarkerClickEvent(marker); as more than one event will be added
		MarkerClickEvent(marker);
	};
}

//	Function adding a single marker to the Map
function addSingleMaker(){
	marker = new google.maps.Marker({
		position:{
			lat: -41.295005,
			lng: 174.78362
		},
		map: map,
		animation: google.maps.Animation.DROP,
		icon: "img/person.png",
		title : "Yoobee School of Design",
		description: "Description for Yoobee School of Design"
	})
}

//	Toggle on and off the bounce function
function toggleBounce(){
	//	Check to see if there is already an animation linked onto that marker
	//	If there isnt then add Bounce and if there is then remove Bounce
	if(marker.getAnimation() === null){
		marker.setAnimation(google.maps.Animation.BOUNCE);
	} else {
		marker.setAnimation(null);
	}
}

//	Function that calls the infoBox/info Windows
function infoBox(){
	//	Create a new instance of Google Maps infowindows
	var infobox = new google.maps.InfoWindow();
	// Adding a click event to the Marker
	google.maps.event.addListener(marker, "click", function(){
		//	setContent is just like innerHTML. You can write HTML into this document
		infobox.setContent("<div><strong>"+marker.title+"</strong></div><hr>"+
							"<div>"+marker.description+"</div>"
			);
		//	Opening the infoBox
		infobox.open(map, marker);
	});

}

//	The reason we can use the exact same code as above is that we are passing through
//	A variable and calling it marker
//	This is for all the markers to have infowindows.
//	We also check to see if one is already open and if it is then we close it before creating a new one

//	Function that used to be called Allinfobox
//	But is now called MarkerClickEvent(marker)
//	Because more than one infoBox happens
function MarkerClickEvent(marker){
	//	If the infoBox is already open then close it
	if(infobox){
		infobox.close();
	}
	//	Create a new instance of infowindow from Google
	infobox = new google.maps.InfoWindow();
	//	Add a click event to the Marker which you are currently clicking onto
	google.maps.event.addListener(marker, "click", function(){
		//	Setting the content of the infoBox
		infobox.setContent("<div><strong>"+marker.title+"</strong></div><hr>"+
							"<div>"+marker.description+"</div>"
			);
		//	Open the infoBox on the Map at the position of the Marker
		//	What .open needs is what Map you want it on and also what Marker you want it onto aswell
		infobox.open(map, marker);
		//	Change the current Marker to the one which you are clicking onto
		currentMarker = marker;
		//	Showing the directions to the new Marker clicked using one of the transport modes that is selected
		showDirection(currentMarker.position, TransportMode);
	});
}

//	Turning all of the Markers off or on
//	In the HTML there is a button which has a click event for this Function
var toggleMarkerOn = true;
function toggleMarkers(){
	//	 Loop over all of the Markers (the ones on the screen) Array
	for (var i = 0; i < markers.length; i++) {
		//	If the Global Variables are on then then them off
		//	Else if the Global Variables are off then turn them on
		if(toggleMarkerOn === true){
			markers[i].setMap(null);
		} else {
			markers[i].setMap(map);
		}
	};
	//	Changing the Global Variable value for the next time the button is clicked
	if(toggleMarkerOn === true){
		toggleMarkerOn = false;
	} else {
		toggleMarkerOn = true;
	}
}

//	Function finding the current location of the user
function FindUser(){

	//	Navigator is an object in the browser which holds information
	//	What we are looking for is geolocation
	//	Not all devices have geolocation so you only want this to work if it does have it	
	if(navigator.geolocation){
		//	Get the current position of the user
		navigator.geolocation.getCurrentPosition(function(position){
			//	Create a new Marker on the Map at their current position and save that map to the userLocation Variable
			userLocation = new google.maps.Marker({
				position:{
					lat: position.coords.latitude,
					lng: position.coords.longitude
				},
				map: map,
				animation: google.maps.Animation.DROP,
				icon: "imgs/person.png"
			});

			//	Move the Map to focus on the current location of the user
			map.panTo(userLocation.position);
			//	Finding the closest marker to the user
			FindClosestMarker();
			//	Show the directions to that Marker that the user can walk to
			showDirection(closestMarker.position, TransportMode);
		})
	} else{

	}

}

//	Adding a new Marker onto the Map where the user has clicked
var clickmarker;
//	Function adding a Marker onto the Map where the user has clicked
function addMarker(event){
	//	If there is already a clicked Marker on the page then remove it
	if(clickmarker){
		clickmarker.setMap(null);
		//	Remove the last item in the Markers Array which should be the clicked marker
		markers.pop();
	}
	//	Get the current location of where the user is clicking on the Map
	var location = event.latLng;
	//	Adding a new Marker to that location
	clickmarker = new google.maps.Marker({
		position: location,
		map: map
	});
	//	Adding the new marker in to the Markers Array
	markers.push(clickmarker);
	//	Show the direction to this Marker that the user can drive to
	showDirection(location, TransportMode);
}

//	Create a direction line to where the user needs to go from their current location
//	What it needs is the end location (location) and what travel mode (mode)function showDirection(location, mode)
function showDirection(location, mode){
	//	If there is already a Waypoint on the map then remove it
	if(directionDisplay){
		directionDisplay.setMap(null);
	}
	//	Creating a new instance of DirectionsService
	var directionService = new google.maps.DirectionsService();
	//	Create a new instance of DirectionRendere
	//	This draws the lines on the Map
	//	This was also initialised at the top of the page
	directionDisplay = new google.maps.DirectionsRenderer();
	//	Setting what Map you want it to show onto
	directionDisplay.setMap(map);
	//	The DirectionService only needs origin, destination and travelMode
	directionService.route({
		//	What is the starting point using (Lat/Lng)
		origin: userLocation.position,
		//	What is the end point (Lat/Lng)
		destination: {location},
		//	What travelMode is the user going to use
		travelMode: google.maps.TravelMode[mode],
	}, function(response, status){
		//	When it comes back from the server you will get a response and a status
		//	You should write a case for all of the different status'
		//	Find them on the Google Maps API

		//If everything is okay
		if(status == "OK"){
			//	Show direction on the Map
			directionDisplay.setDirections(response);
			//	If one of the start or end locations are not found
		} else if(status == "NOT_FOUND"){
			//	If there is no result of how to get to the end location
		} else if(status == "ZERO_RESULTS"){

		}
	});
}

//	Function for finding the closest Marker
function FindClosestMarker(){
	//	Create a variable which is so large that nothing should ever be further than it
	var closestDistance = 999999999999999999999999;
	//	Loop over all of the current markers on the screen
	for (var i = 0; i < markers.length; i++) {
		var SingleMarker = markers[i];
		//	What this does is calculates the distance from point a-b in a straight line so doesnt take roads/building etc into consideration
		//	What you need to do is add on the geometry library to where you first call google maps (probably on your index page)
		//	You need 2 values, point A and point B and they both need a Lat and Lng value
		var distance = google.maps.geometry.spherical.computeDistanceBetween(userLocation.position, SingleMarker.position);
		//	If the distance between point A and B is less than closestDistance
		if(distance < closestDistance){
			//	Then closestDistance becomes the distance betweens the 2 points
			closestDistance = distance;
			//	Closest marker then becomes that marker
			closestMarker = SingleMarker;
		}
		currentMarker = closestMarker;
		//	This will run for all of your markers on the page so closestMarker/cloesetDistance might change a few times in the loop
	};	
}

//	Changing the Transport Mode
function changeTransport(mode){
	//	TransportMode is a new global variable which sets what is the current mode shown on the select
	TransportMode = mode;
	//showDirection needs 2 values, the end position and the transport mode.
	//currentMarker is another new global variable which is defined by the marker you are currently clicked on
	//When the page loads current marker becomes the closest marker because that is the one we have coded to show us the direction to by default
	//When you click on a new marker, that marker becomes the currnet marker
	showDirection(currentMarker.position, TransportMode);
}










