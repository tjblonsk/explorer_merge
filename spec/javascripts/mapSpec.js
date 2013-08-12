describe("map click", function(){
  it("should create an object", function(){
    expect(EMAPS.length).toNotEqual(0);
  });
});


describe("ajax call", function(){
  it("should return an object with lat and long attributes", function(){
  expect(squareInfo.length).toNotEqual(0);
  });
});


describe("marker layer", function(){
  it("should have each marker in an array that can be cleared on each click", function(){
    expect(markerArray.lenght).toNotEqual(0);
  });
});

describe("buttonClickValue", function(){
  it("should take the value of a button clicked", function(){
    expect (buttonClickValue).toBe(string);
  });
});


describe("show cities ajax call", function(){
it("should execute the callback function on success", function () {
    spyOn($, "ajax").andCallFake(function(options) {
        options.success();
    });
    var callback = jasmine.createSpy();
    showCities(callback);
    expect(callback).toHaveBeenCalled();
});
function showCities(callback) {
    $.ajax({
        type: "get",
        url: "/show/cities",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: callback
    });
  }
});


describe("show favorite location pin ajax call", function(){
it("should execute the callback function on success", function () {
    spyOn($, "ajax").andCallFake(function(options) {
        options.success();
    });
    var callback = jasmine.createSpy();
    showFavoriteLocationMarkers(callback);
    expect(callback).toHaveBeenCalled();
});
function showFavoriteLocationMarkers(callback) {
    $.ajax({
        type: "get",
        url: "/favorite",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: callback
    });
  }
});


describe("send a request to the yelp API", function(){
it("should execute the callback function on success", function () {
    spyOn($, "ajax").andCallFake(function(options) {
        options.success();
    });
    var callback = jasmine.createSpy();
    sendYelp(callback);
    expect(callback).toHaveBeenCalled();
});
function sendYelp(callback) {
  var searchSpot = {"name" : "pizza",
                    "latitude" : 50,
                    "longitude" : -70
                    };
    $.ajax({
        type: "post",
        url: "/send",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: searchSpot,
        success: callback
    });
  }
});


describe("save a spot on favoriteClick", function(){
it("should execute the callback function on success", function () {
    spyOn($, "ajax").andCallFake(function(options) {
        options.success();
    });
    var callback = jasmine.createSpy();
    favoriteClick(callback);
    expect(callback).toHaveBeenCalled();
});
function favoriteClick(callback) {
  var spotFave = {"name" : "Restaurant",
                  "latitude" : 50,
                  "longitude" : -50
                };
    $.ajax({
        type: "post",
        url: "/save",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: spotFave,
        success: callback
    });
  }
});



describe("show hotels on button click", function(){
it("should make a real AJAX request", function () {
    var callback = jasmine.createSpy();
    hotelButtonClick(callback);
    waitsFor(function() {
        return callback.callCount > 0;
    });
    runs(function() {
        expect(callback).toHaveBeenCalled();
    });
});

function hotelButtonClick(callback) {
    $.ajax({
        type: "get",
        url: 'https://api.foursquare.com/v2/venues/search?categoryId=4bf58dd8d48988d1fa931735&ll=41.89133307337613,-87.63099441910188&client_id=FLORXQIYM4IR2BQJQS52RRKJIDTIYE3PVGUXPAEOCRLPLTMF&client_secret=0E30B1EZG3RQK0UMKPIU05LNMSZOOAKVBR4QFOJFO1KAGEEG&v=20130316',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: callback
    });
  }
});



describe("search on map click", function(){
it("should execute the callback function on success", function () {
    spyOn($, "ajax").andCallFake(function(options) {
        options.success();
    });
    var callback = jasmine.createSpy();
    onMapClick(callback);
    expect(callback).toHaveBeenCalled();
});
function onMapClick(callback) {
    $.ajax({
        type: "get",
        url: 'https://api.foursquare.com/v2/venues/trending?ll=41.89133307337613,-87.63099441910188&client_id=FLORXQIYM4IR2BQJQS52RRKJIDTIYE3PVGUXPAEOCRLPLTMF&client_secret=0E30B1EZG3RQK0UMKPIU05LNMSZOOAKVBR4QFOJFO1KAGEEG&v=20130316',
        dataType: "json",
        success: callback
    });
  }
});



describe("show favorite cities list", function(){
it("should execute the callback function on success", function () {
    spyOn($, "ajax").andCallFake(function(options) {
        options.success();
    });
    var callback = jasmine.createSpy();
    faveCities(callback);
    expect(callback).toHaveBeenCalled();
});
function faveCities(callback) {
    $.ajax({
        type: "get",
        url: '/show/favorite_cities',
        dataType: "json",
        success: callback
    });
  }
});



describe("show favorite cities list", function(){
it("should make a real AJAX request", function () {
    var callback = jasmine.createSpy();
    faveCities(callback);
    waitsFor(function() {
        return callback.callCount > 0;
    });
    runs(function() {
        expect(callback).toHaveBeenCalled();
    });
});

function faveCities(callback) {
    $.ajax({
        type: "get",
        url: 'https://api.foursquare.com/v2/venues/trending?ll=41.89133307337613,-87.63099441910188&client_id=FLORXQIYM4IR2BQJQS52RRKJIDTIYE3PVGUXPAEOCRLPLTMF&client_secret=0E30B1EZG3RQK0UMKPIU05LNMSZOOAKVBR4QFOJFO1KAGEEG&v=20130316',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: callback
    });
  }
});



describe("get spots from a specific city", function(){
it("should execute the callback function on success", function () {
    spyOn($, "ajax").andCallFake(function(options) {
        options.success();
    });
    var callback = jasmine.createSpy();
    showSpots(callback);
    expect(callback).toHaveBeenCalled();
});
function showSpots(callback) {
    $.ajax({
        type: "get",
        url: '/show/favorite_cities/Chicago',
        dataType: "json",
        success: callback
    });
  }
});



describe("get details from a specific spot", function(){
it("should execute the callback function on success", function () {
    spyOn($, "ajax").andCallFake(function(options) {
        options.success();
    });
    var callback = jasmine.createSpy();
    showDetails(callback);
    expect(callback).toHaveBeenCalled();
});
function showDetails(callback) {
    $.ajax({
        type: "get",
        url: '/show/spot_details/5',
        dataType: "json",
        success: callback
    });
  }
});



describe("delete a spot", function(){
it("should execute the callback function on success", function () {
    spyOn($, "ajax").andCallFake(function(options) {
        options.success();
    });
    var callback = jasmine.createSpy();
    deleteSpot(callback);
    expect(callback).toHaveBeenCalled();
});
function deleteSpot(callback) {
    $.ajax({
        type: "delete",
        url: '/delete/5',
        dataType: "scrypt",
        success: callback
    });
  }
});

