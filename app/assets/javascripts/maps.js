// Put your structure for the 'map' and all its functions up here somewhere
var EMAPS = {
  latlng: {}
};
var squareInfo = "";
var yelpData = "";
var markerArray = [];
var buttonClickValue = "";
var spotsArray = [];
var favoritesArray = "";
var favoritesMarkerArray = [];
var defaultCitiesArray = "";
var defaultCitiesMarkerArray = [];
var nearbyHotelsArray = [];
var placeHash = "";
var yelpObject = "";
var favoriteCitiesArray = "";
var faveSpotsByCityArray = [];
var spotDetailsArray = "";

// put JS code in here
$(function () {

  var map = new L.Map('map');

  function markerClicked() {
  console.log(this.getLatLng().lat);
  lat = this.getLatLng().lat;
  lng = this.getLatLng().lng;
  map.setView(new L.LatLng(lat, lng), 13);
}

  function showCities(){
     $.ajax({
        type: 'get',
        url: '/show/cities',
        dataType: 'json'
      }).done(function(data){
        defaultCitiesArray = data;
        for(var i = 0; i < defaultCitiesArray.length; i ++){
          trend = new L.LatLng(defaultCitiesArray[i].latitude, defaultCitiesArray[i].longitude);
          marker = new L.Marker(trend);
          marker.bindPopup(defaultCitiesArray[i].name).openPopup();
          map.addLayer(marker);
          marker.on('click', markerClicked);
          defaultCitiesMarkerArray.push(marker);
        }
      });
    }

 // create a tile layer (or use other provider of your choice)
  var layer = L.tileLayer('http://{s}.tile.cloudmade.com/d45604d5730341f19ea4d665294a9c76/997/256/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> Contributors: <a href="http://creativecommons.org/licenses/by-sa/2.0/"&gt;CC-BY-SA</a>Imagery © <a href="http://cloudmade.com">CloudMade</a>',
    maxZoom: 18
  }).addTo(map);


  // initialize the map on the "map" div
  L.Icon.Default.imagePath = 'http://api.tiles.mapbox.com/mapbox.js/v1.0.0beta0.0/images';

  map.on('load', function(e) {
      showCities();
    });

  map.setView(new L.LatLng(37.8, -96), 5);


    var coffeeButton = $('#coffee');
    var barsButton = $('#bars'); //drinks?
    var trendingButton = $('#trending');
    var foodButton = $('#food');
    var shopsButton = $('#shops');
    var artsButton = $('#arts');
    var outdoorsButton = $('#outdoors');
    var sightsButton = $('#sights');
    var topPicksButton = $('#topPicks');

    var buttonArray = [
    coffeeButton,
    barsButton,
    trendingButton,
    foodButton,
    shopsButton,
    artsButton,
    outdoorsButton,
    sightsButton,
    topPicksButton
    ];

    for(var i = 0; i < buttonArray.length; i ++){
      buttonArray[i].on('click', searchButtonClick(buttonArray[i]));
    }


   function searchButtonClick(button){
    button.click(function(event){
     event.preventDefault();
    buttonClickValue = button.text();
    button.on('click', removeMarker());
    $('h1').text(buttonClickValue);
    $('h1').show();
    $('#map').show();
    $('#favoriteCities').hide();
    $('#faveCitiesButton').show();
    console.log(button.text());
    });
   }


    $('#showFavoritesButton').click(function(event){
      event.preventDefault();
      buttonClickValue = "showFavorites";
      console.log("click");
     $.ajax({
        type: 'get',
        url: '/favorite',
        dataType: 'json'
      }).done(function(data){
        console.log(data);
        favoritesArray = data;
      });
      $('#showFavoritesButton').on('click', removeMarker());
      $('#showFavoritesButton').on('click', setLocationFavorites());
    });


    $('#showMap').click(function(event){
      $('#faveCitiesButton').show();
      $('#favoriteCities').hide();
      $('#map').show();
       map.setView(new L.LatLng(37.8, -96), 5);
    });




       //Show favorites
    function setLocationFavorites(){
    for (var i = 0; i < favoritesArray.length; i ++){
      trend = new L.LatLng(favoritesArray[i].latitude, favoritesArray[i].longitude);
      marker = new L.Marker(trend);
      marker.bindPopup(favoritesArray[i].name).openPopup();
      map.addLayer(marker);
      favoritesMarkerArray.push(marker);
    }
  }

    //Remove favorites layer below
    function removeFavoritesLayer(){}


  //add marker to map
    //place name
    //place address
    //place URL
    //yelp info (rating, expensive)
    //link to search for hotels nearyb
    //link to search for real estate nearby
  function setLocationTrending(){
    //////trending or hotels
    for (var i = 0; i < squareInfo.response.venues.length; i ++){
      lat = squareInfo.response.venues[i].location.lat;
      lng = squareInfo.response.venues[i].location.lng;
      place = squareInfo.response.venues[i].name;
      city = squareInfo.response.venues[i].location.city;
      state = squareInfo.response.venues[i].location.state;
      address = squareInfo.response.venues[i].location.address + ', ' + squareInfo.response.venues[i].location.city + ', ' + squareInfo.response.venues[i].location.state;
      phone = squareInfo.response.venues[i].contact.formattedPhone;
      website = squareInfo.response.venues[i].url;
      placeHash = {};
      placeHash['name']= place;
      placeHash['latitude']= lat;
      placeHash['longitude']= lng;
      placeHash['address']= address;
      placeHash['city']= city;
      console.log(city);
      placeHash['state']= state;
      console.log(state);
      if (phone != 'undefined') {
      placeHash['phone']= phone;
      }
      placeHash['website']= website;
      spotsArray.push(placeHash);
      trend = new L.LatLng(lat, lng);
      marker = new L.Marker(trend);
      popup = L.popup()
      .setContent('<h3 class="placeName" id="'+ i +'">' + place + '</h3><br/><div class="btn-group"><button id="faveButton" class="btn btn-info btn-xs">Favorite</button></br><button id="hotelsButton" class="btn btn-info btn-xs">Nearby Hotels</button></br><button id="yelpButton" class="btn btn-info btn-xs">Yelp</button><br><button id="noteButton" data-toggle="modal" data-target="#myModal" class="btn btn-warning btn-xs">Note</button></div>');
      marker.bindPopup(popup).openPopup();
      map.addLayer(marker);
      markerArray.push(marker);
    }
  }

  $('#map').on('click', '#yelpButton', sendYelp);


    //send the object to be used in the yelp request to the controller
    function sendYelp(){
      $('#yelpButton').remove();
      objectForYelp = spotsArray[$('.placeName').attr('Id')];
      console.log(objectForYelp);
      var searchSpot = {"name" : objectForYelp.name,
                      "latitude" : objectForYelp.latitude,
                      "longitude" : objectForYelp.longitude
                      };
      $.ajax({
        url: '/send',
        dataType: 'json',
        type: 'post',
        data: searchSpot
      }).done(function(data){
        console.log("sent");
        console.log(data);
        yelpObject = data;
        $('.leaflet-popup-content').text("");
        $('.leaflet-popup-content').append('<div class="popup" id="popupleft"><h3 class="placeName" id="'+ i +'">' + objectForYelp.name + '</h3><div><img src=' + yelpObject.businesses[0].image_url + ' /></div><img src=' + yelpObject.businesses[0].rating_img_url_small + ' /><hr><p>' + address + '</p><div>' + yelpObject.businesses[0].display_phone +'</div></div>');
        $('.leaflet-popup-content').append('<div class="popup" id="popupright"><div class="btn-group"><button id="faveButton" class="btn btn-info btn-xs">Favorite</button></br><button id="hotelsButton" class="btn btn-info btn-xs">Nearby Hotels</button></br><button id="yelpButton" class="btn btn-info btn-xs">Yelp</button><br><button id="noteButton" data-toggle="modal" data-target="#myModal" class="btn btn-warning btn-xs">Note</button></div></div>');
      });
    }


    /////// For coffee shops
    function setLocationOther(){
    for (var i = 0; i < squareInfo.response.groups[0].items.length; i ++){
      lat = squareInfo.response.groups[0].items[i].venue.location.lat;
      lng = squareInfo.response.groups[0].items[i].venue.location.lng;
      place = squareInfo.response.groups[0].items[i].venue.name;
      city = squareInfo.response.groups[0].items[i].venue.location.city;
      state = squareInfo.response.groups[0].items[i].venue.location.state;
      address = squareInfo.response.groups[0].items[i].venue.location.address + ', ' + city + ', ' + state;
      phone = squareInfo.response.groups[0].items[i].venue.formattedPhone;
      website = squareInfo.response.groups[0].items[i].venue.url;
      placeHash = {};
      placeHash['name']= place;
      placeHash['latitude']= lat;
      placeHash['longitude']= lng;
      placeHash['address']= address;
      placeHash['city']= city;
      console.log(city);
      placeHash['state']= state;
      console.log(state);
      if (phone != 'undefined') {
      placeHash['phone']= phone;
      }
      placeHash['website']= website;
      spotsArray.push(placeHash);
      trend = new L.LatLng(lat, lng);
      marker = new L.Marker(trend);
      popup = L.popup()
      .setContent('<h3 class="placeName" id="'+ i +'">' + place + '</h3><br/><div class="btn-group"><button id="faveButton" class="btn btn-info btn-xs">Favorite</button></br><button id="hotelsButton" class="btn btn-info btn-xs">Nearby Hotels</button></br><button id="yelpButton" class="btn btn-info btn-xs">Yelp</button><br><button id="noteButton" data-toggle="modal" data-target="#myModal" class="btn btn-warning btn-xs">Note</button></div>');
      marker.bindPopup(popup).openPopup();
      map.addLayer(marker);
      markerArray.push(marker);
    }
  }


   function removeMarker(){
    for (var i = 0; i < markerArray.length; i ++){
      map.removeLayer(markerArray[i]);
    }
  }


  function favoriteClick(){
    $('#faveButton').click(function(event){
      event.preventDefault();
      $('#faveButton').remove();
      spotToSave = spotsArray[$('.placeName').attr('Id')];
      console.log(spotToSave);

      var spotFave = {"name" : spotToSave.name,
                      "latitude" : spotToSave.latitude,
                      "longitude" : spotToSave.longitude,
                      "address" : spotToSave.address,
                      "city" : spotToSave.city,
                      "state" : spotToSave.state,
                      "phone" : spotToSave.phone,
                      "website" : spotToSave.website
                      };

      $.ajax({
        url: '/save',
        dataType: 'json',
        type: 'post',
        data: spotFave
      }).done(function(data){ // Handle the json response
        console.log(data);
      });
    });
  }

  $('#map').on('click', '#faveButton', favoriteClick);





    //click hotel button to show nearby hotels
    function hotelButtonClick(){
      $('#hotelsButton').click(function(event){
      event.preventDefault();
      placeToSearch = spotsArray[$('.placeName').attr('Id')];
      placeToSearch.lat = lat;
      placeToSearch.lng = lng;
      cord = lat +','+ lng;
      url = 'https://api.foursquare.com/v2/venues/search?categoryId=4bf58dd8d48988d1fa931735&ll=' + cord + '&client_id=FLORXQIYM4IR2BQJQS52RRKJIDTIYE3PVGUXPAEOCRLPLTMF&client_secret=0E30B1EZG3RQK0UMKPIU05LNMSZOOAKVBR4QFOJFO1KAGEEG&v=20130316';
       $.ajax({
        type: 'get',
        url: url,
        dataType: 'json'
      }).done(function(data){
        console.log(data);
        nearbyHotelsArray = data.response.venues;
        removeMarker();
        for(var i = 0; i < nearbyHotelsArray.length; i ++){
          lat = nearbyHotelsArray[i].location.lat;
          lng = nearbyHotelsArray[i].location.lng;
          place = nearbyHotelsArray[i].name;
          city = nearbyHotelsArray[i].location.city;
          state = nearbyHotelsArray[i].location.state;
          address = nearbyHotelsArray[i].location.address;
          phone = nearbyHotelsArray[i].contact.formattedPhone;
          website = nearbyHotelsArray[i].url;
          placeHash = {};
          placeHash['name']= place;
          placeHash['latitude']= lat;
          placeHash['longitude']= lng;
          placeHash['address']= address;
          placeHash['city']= city;
          console.log(city);
          placeHash['state']= state;
          console.log(state);
          if (phone != 'undefined') {
          placeHash['phone']= phone;
          }
          placeHash['website']= website;
          spotsArray.push(placeHash);
          trend = new L.LatLng(lat, lng);
          marker = new L.Marker(trend);
          popup = L.popup()
          .setContent('<h3 class="placeName" id="'+ i +'">' + place + '</h3><br/><div class="btn-group"><button id="faveButton" class="btn btn-info btn-xs">Favorite</button></br><button id="hotelsButton" class="btn btn-info btn-xs">Nearby Hotels</button></br><button id="yelpButton" class="btn btn-info btn-xs">Yelp</button><br><button id="noteButton" data-toggle="modal" data-target="#myModal" class="btn btn-warning btn-xs">Note</button></div>');
          marker.bindPopup(popup).openPopup();
          map.addLayer(marker);
          markerArray.push(marker);
          buttonClickValue = "hotels";
          console.log(buttonClickValue);
          }
        });
      });
    }

  $('#map').on('click', '#hotelsButton', hotelButtonClick);


  // var popup = L.popup();
  function onMapClick(e) {
      removeMarker();
      EMAPS.latlng = e.latlng;
      var lat = EMAPS.latlng.lat;
      var lng = EMAPS.latlng.lng;
      var cord = lat + ',' + lng;
      var url = "";
      if (buttonClickValue === "Trending"){
        url = 'https://api.foursquare.com/v2/venues/trending?ll=' + cord + '&client_id=FLORXQIYM4IR2BQJQS52RRKJIDTIYE3PVGUXPAEOCRLPLTMF&client_secret=0E30B1EZG3RQK0UMKPIU05LNMSZOOAKVBR4QFOJFO1KAGEEG&v=20130316';
      } else if (buttonClickValue === "Coffee"){
        url = 'https://api.foursquare.com/v2/venues/explore?section=coffee&ll=' + cord + '&client_id=FLORXQIYM4IR2BQJQS52RRKJIDTIYE3PVGUXPAEOCRLPLTMF&client_secret=0E30B1EZG3RQK0UMKPIU05LNMSZOOAKVBR4QFOJFO1KAGEEG&v=20130316';
      } else if (buttonClickValue === "hotels"){
        url = 'https://api.foursquare.com/v2/venues/search?categoryId=4bf58dd8d48988d1fa931735&ll=' + cord + '&client_id=FLORXQIYM4IR2BQJQS52RRKJIDTIYE3PVGUXPAEOCRLPLTMF&client_secret=0E30B1EZG3RQK0UMKPIU05LNMSZOOAKVBR4QFOJFO1KAGEEG&v=20130316';
      } else if (buttonClickValue === "Bars"){
        url = 'https://api.foursquare.com/v2/venues/explore?section=drinks&ll=' + cord + '&client_id=FLORXQIYM4IR2BQJQS52RRKJIDTIYE3PVGUXPAEOCRLPLTMF&client_secret=0E30B1EZG3RQK0UMKPIU05LNMSZOOAKVBR4QFOJFO1KAGEEG&v=20130316';
      } else if (buttonClickValue === "Food"){
        url = 'https://api.foursquare.com/v2/venues/explore?section=food&ll=' + cord + '&client_id=FLORXQIYM4IR2BQJQS52RRKJIDTIYE3PVGUXPAEOCRLPLTMF&client_secret=0E30B1EZG3RQK0UMKPIU05LNMSZOOAKVBR4QFOJFO1KAGEEG&v=20130316';
      } else if (buttonClickValue === "Shops"){
        url = 'https://api.foursquare.com/v2/venues/explore?section=shops&ll=' + cord + '&client_id=FLORXQIYM4IR2BQJQS52RRKJIDTIYE3PVGUXPAEOCRLPLTMF&client_secret=0E30B1EZG3RQK0UMKPIU05LNMSZOOAKVBR4QFOJFO1KAGEEG&v=20130316';
      } else if (buttonClickValue === "Arts"){
        url = 'https://api.foursquare.com/v2/venues/explore?section=arts&ll=' + cord + '&client_id=FLORXQIYM4IR2BQJQS52RRKJIDTIYE3PVGUXPAEOCRLPLTMF&client_secret=0E30B1EZG3RQK0UMKPIU05LNMSZOOAKVBR4QFOJFO1KAGEEG&v=20130316';
      } else if (buttonClickValue === "Outdoors"){
        url = 'https://api.foursquare.com/v2/venues/explore?section=outdoors&ll=' + cord + '&client_id=FLORXQIYM4IR2BQJQS52RRKJIDTIYE3PVGUXPAEOCRLPLTMF&client_secret=0E30B1EZG3RQK0UMKPIU05LNMSZOOAKVBR4QFOJFO1KAGEEG&v=20130316';
      } else if (buttonClickValue === "Sights"){
        url = 'https://api.foursquare.com/v2/venues/explore?section=sights&ll=' + cord + '&client_id=FLORXQIYM4IR2BQJQS52RRKJIDTIYE3PVGUXPAEOCRLPLTMF&client_secret=0E30B1EZG3RQK0UMKPIU05LNMSZOOAKVBR4QFOJFO1KAGEEG&v=20130316';
      } else if (buttonClickValue === "Top Picks"){
        url = 'https://api.foursquare.com/v2/venues/explore?section=topPicks&ll=' + cord + '&client_id=FLORXQIYM4IR2BQJQS52RRKJIDTIYE3PVGUXPAEOCRLPLTMF&client_secret=0E30B1EZG3RQK0UMKPIU05LNMSZOOAKVBR4QFOJFO1KAGEEG&v=20130316';
      } else {
        url = 'https://api.foursquare.com/v2/venues/trending?ll=' + cord + '&client_id=FLORXQIYM4IR2BQJQS52RRKJIDTIYE3PVGUXPAEOCRLPLTMF&client_secret=0E30B1EZG3RQK0UMKPIU05LNMSZOOAKVBR4QFOJFO1KAGEEG&v=20130316';
      }
      console.log(url);
        $.ajax({
        type: 'get',
        url: url,
        dataType: 'json'
      }).done(function(data){
        console.log(data);
        squareInfo = data;
        if (buttonClickValue === ("Trending" || "hotels")){
        setLocationTrending();
        } else {
        setLocationOther();
       }
    });
  }
  map.on('click', onMapClick);



    $('#faveCitiesButton').click(function(event){
      event.preventDefault();
      $('h1').hide();
      $('#faveCitiesButton').hide();
      $('#showMap').show();
      $('#favoriteCities').show();
      $.ajax({
        url: '/show/favorite_cities',
        dataType: 'json',
        type: 'get'
      }).done(function(data){
        console.log(data);
        favoriteCitiesArray = data;
        $('#map').fadeOut();
        for (var i = 0; i < favoriteCitiesArray.length; i ++){
          appendCity(favoriteCitiesArray[i]);
        }
      });
    });


  function appendCity(city){
    showSpotsButton = $('<button class="btn btn-xs btn-primary" class="showSpots">Deets</button>');
    $('#favoriteCities').append($('<li id="' + city.id + '">' + city.name + '   </li>').append(showSpotsButton));


  showSpotsButton.click(function(){
    $.ajax({
    url: '/show/favorite_cities/' + city.name,
    type: 'get',
    dataType: 'json'
    }).done(function(data){
      console.log(data);
      faveSpotsByCityArray = data;
      for(var i = 0; i < faveSpotsByCityArray.length; i ++){
        detailsButton = $('<button class="btn btn-primary" class="spotDetails" id="' + faveSpotsByCityArray[i].id +'">Details</button>');
        detailsButton.click(function(){
          detailsButton.remove();
          id = this.id * 2;
        $.ajax({
         url: '/show/spot_details/' + this.id,
         type: 'get',
        dataType: 'json'
        }).done(function(data){
        console.log(data);
        spotDetailsArray = data;
        $('#' + id).append($('<ul></ul>')).append($('<li>' + spotDetailsArray.address + '</li>')).append($('<li>' + spotDetailsArray.phone + '</li>')).append($('<li>' + spotDetailsArray.website + '</li>'));
      });
    });
        deleteButton = $('<button class="btn btn-danger" class="delete" id="' + faveSpotsByCityArray[i].id +'">Delete</button>');
        deleteButton.click(function(){
          id = this.id;
          $('#' + id * 2).remove();
          this.remove();
          $('#' + id).remove();
          $.ajax({
            url: '/delete/' + id,
            type: 'delete',
            dataType: 'script'
          }).done(function(data){
            console.log(data);
            alert("spot deleted!");
          });
        });

        $('#' + faveSpotsByCityArray[i].city_id).append($('<ul></ul>').append($('<li id="' + faveSpotsByCityArray[i].id * 2 + '">' + faveSpotsByCityArray[i].name + '</li>')).append(detailsButton).append(deleteButton));
      }
    });
  });


}





}); //closing function onload







