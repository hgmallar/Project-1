//tells where to start in table
var endRow = 0;
var inputValid = true;
var errorString = "";

//when the submit button is clicked
$(document).on("click", ".submit-button", function (event) {
    event.preventDefault();

    var city = $("#city-input").val().trim();
    var state = $("#state-input").val().trim();

    console.log(city);
    console.log(state);

    if (!/./.test(city)) {
        errorString += " You must enter a city."
        inputValid = false;
        console.log("HERE1");
    }
    else if (/[^a-z]/.test(city)) {
        errorString += " Your city is invalid."
        inputValid = false;
        console.log("HERE2");
    }

    if (!/./.test(state)) {
        errorString += " You must enter a state."
        inputValid = false;
        console.log("HERE3");
    }
    else if ((state.length !== 2) || (/[^a-z]/.test(state))) {
        errorString += " Your state is invalid."
        inputValid = false;
        console.log("HERE4");
    }

    console.log(inputValid);

    if (inputValid) {
        ///MAP API CODE DONE

        //URL: https://maps.googleapis.com/maps/api/staticmap?center=Chapel%20Hill,NC&zoom=13&size=600x400&maptype=roadmap&key=AIzaSyC8fZcU3HJ2jihLd3KxN6-XV1Itwot6LgA
        //API: AIzaSyCCcr95yw_abVJ7PV3GxQtMiYqRA-py-vw
        //Garcian Code
        var queryUrl = "https://maps.googleapis.com/maps/api/staticmap?center="
        queryUrl += city;
        queryUrl += ",";
        queryUrl += state;
        queryUrl += "&zoom=13&size=600x400&maptype=roadmap";
        queryUrl += "&key=AIzaSyCCcr95yw_abVJ7PV3GxQtMiYqRA-py-vw";
        console.log(queryUrl);


        /////END MAP API CODE


        //update weather table
        var queryUrl = "https://api.openweathermap.org/data/2.5/forecast?q=";
        queryUrl += city;
        queryUrl += ",";
        queryUrl += state;
        queryUrl += ",us";
        queryUrl += "&units=imperial";
        queryUrl += "&appid=e307e80a57e9ae32c5039265b1a6d235";

        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then(function (response) {

            var queryUrl2 = "https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US";


            $.ajax({
                type: "GET",
                url: "https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&apikey=tvUTVI2iiCqaDja6l48lucGqABUD4KWS",
                async: true,
                dataType: "json",
                success: function (json) {
                    console.log(json);
                    // Parse the response.
                    // Do other things.
                },
                error: function (xhr, status, err) {
                    // This time, we do not end up here!
                }
            });

            console.log(response);
            $("tbody").empty();
            for (var i = 0; i < response.list.length; i++) {
                var dateTime = response.list[i].dt_txt.split(" ");
                var date = dateTime[0];
                var time = dateTime[1].trim().substring(0, 2);
                date = moment(date, "YYYY-MM-DD").format('dddd');

                if (i == 0) {
                    var newRow = $("<tr  class='by-1'>");
                    newRow.append($("<td scope='col' class='w-col header-bold align-middle'>").text(date));
                    //first time through, figure out where to start in the table
                    if (time === "00") {
                        endRow = 7;
                    }
                    else if (time === "03") {
                        endRow = 6;
                    }
                    else if (time === "06") {
                        endRow = 5;
                    }
                    else if (time === "09") {
                        endRow = 4;
                    }
                    else if (time === "12") {
                        endRow = 3;
                    }
                    else if (time === "15") {
                        endRow = 2;
                    }
                    else if (time === "18") {
                        endRow = 1;
                    }
                    else if (time === "21") {
                        endRow = 0;
                    }
                    //add blank columns to table accordingly
                    for (var j = endRow; j < 7; j++) {
                        newRow.append($("<td scope='col' class='w-col'>"));
                    }
                }
                else if (endRow === 7) {
                    //starting a new row in the table
                    var newRow = $("<tr>");
                    newRow.append($("<td scope='col' class='w-col header-bold align-middle'>").text(date));
                }

                var newCol = $("<td scope='col' class='w-col'>");
                newCol.append($("<p class='wp'>").text(response.list[i].main.temp + "\u00B0F"));
                newCol.append($("<p class='wp'>").text(response.list[i].weather[0].main));
                newRow.append(newCol);

                if (endRow === 0) {
                    //at the end of the row, append the row
                    $("tbody").append(newRow);
                    endRow = 7;
                }
                else if (i === response.list.length - 1) {
                    //at the end of the array, append the row
                    $("tbody").append(newRow);
                }
                else {
                    //move to the next column
                    endRow--;
                }
            }

        });
    }
    else {

        $("#errorMessage").text(errorString);
        $("#myModal").modal("show");
        errorString = "";
        inputValid = true;
        $("tbody").empty();
    }

    //clear the inputs
    $("#city-input").val("");
    $("#state-input").val("");
});
