

    var ticket = 0;


$(document).on("click", ".submit-button", function () {

            $.ajax({
                type:"GET",
                url:"https://app.ticketmaster.com/discovery/v2/events.json?size=1&apikey=tvUTVI2iiCqaDja6l48lucGqABUD4KWS",
                async:true,
                dataType: "json",
                success: function(json) {
                            console.log(json);
                            // Parse the response.
                            // Do other things.
                         },
                error: function(xhr, status, err) {
                            // This time, we do not end up here!
                         }
            });
        

            
              
            
            
