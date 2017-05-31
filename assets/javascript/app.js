// Initial array of US national parks
var parks = ['Yosemite', 'Yellowstone', 'Grand Canyon', 'Tetons'];

// Generic function for capturing the park name from the data-attribute
      function alertParkName() {
        var parkName = $(this).attr("data-name");
        alert(parkName);
      }

// Function for dumping the JSON content for each button into the div
      function displayParkInfo() {
        var parkName = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + parkName + "&limit=10&api_key=dc6zaTOxFJmzC";
        
//AJAX call for specific movie button click

        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
        	for (var z = 0; z < 10; z++){
        		var parkDiv = $('<div class="USParks">');
        		var parkImageURL = response.data[z].images.original_still.url;
        		var imgTag = $("<img>").attr("src",parkImageURL);
        		parkDiv.append(imgTag);
        		$("#park-view").append(imgTag);
        		var rating = response.data[z].rating;
        		var para = $("<p>").text("Rating: " + rating);
        		parkDiv.append(para);
        		$("#park-view").append(para);
        		console.log(response.data[z]);
        	}

        	// console.log(response);
        	// console.log(response.data[0].embed_url);
        	// console.log(response.data[0].images.original);
        	// console.log(response.data[0].images.original_still.url);
        	// var parkDiv = $('<div class="USParks">');
        	// var rating = response.data[0].rating;
        	// var para = $("<p>").text("Rating: " + rating);
        	// var gif = $("<img src=" + response.data[0].embed_url + ">");
        	// console.log(gif);
        	// parkDiv.append(para);
        	// parkDiv.append(gif);
        	// $("#park-view").append(para);
        	// $("#park-view").append(gif);

          //$("#park-view").html(JSON.stringify(response));
          renderButtons();
        });
      }

// Function for displaying park data
function renderButtons() {
    // Deleting the buttons prior to adding new park buttons
	$("#displayButtons").empty();
    // Looping through the array of parks
    for (var z = 0; z < parks.length; z++) {
    	var a = $("<button>");
        a.addClass("image");
        a.attr("data-name", parks[z]);
        a.text(parks[z]);
        $("#displayButtons").append(a);
        }
      }
      // This function handles events where one button is clicked
      $("#add-park").on("click", function(event) {
        // event.preventDefault() prevents the form from trying to submit itself.
        event.preventDefault();
        // This line will grab the text from the input box
        var park = $("#park-input").val().trim();
        // The park from the textbox is then added to our array
        parks.push(park);
        // calling renderButtons which handles the processing of our parks array
        renderButtons();
      });
      
      $(document).on("click", ".image", displayParkInfo);
      // Calling the renderButtons function at least once to display the initial list of movies
      renderButtons();
