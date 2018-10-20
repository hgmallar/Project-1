//tells where to start in table
var endRow = 0;

//when the submit button is clicked
$(document).on("click", ".submit-button", function () {
    //update map



    //update events




    //update weather table
    var queryUrl = "https://api.openweathermap.org/data/2.5/forecast?q="
    queryUrl += "London";
    queryUrl += ","
    queryUrl += "uk";
    queryUrl += "&units=imperial"
    queryUrl += "&appid=e307e80a57e9ae32c5039265b1a6d235";
    console.log(queryUrl);

    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        for (var i = 0; i < response.list.length; i++) {
            var dateTime = response.list[i].dt_txt.split(" ");
            var date = dateTime[0];
            var time = dateTime[1].trim().substring(0, 2);
            console.log(date);
            console.log(time);

            if (i == 0) {
                var newRow = $("<tr>");
                newRow.append($("<td scope='col'>").text(date));
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
                    newRow.append($("<td scope='col'>"));
                }
            }
            else if (endRow === 7) {
                //starting a new row in the table
                var newRow = $("<tr>");
                newRow.append($("<td scope='col'>").text(date));
            }

            var newCol = $("<td scope='col'>");
            newCol.append($("<p>").text("Min: " + response.list[i].main.temp_min + "\u00B0F"));
            newCol.append($("<p>").text("Max: " + response.list[i].main.temp_max + "\u00B0F"));
            newCol.append($("<p>").text(response.list[i].weather[0].main));
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

            console.log(response.list[i].main.temp_min);
            console.log(response.list[i].main.temp_max);
            console.log(response.list[i].weather[0].main);
        }
    });
});