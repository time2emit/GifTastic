// Initial array of US national parks
var parks = ['Acadia', 'Yellowstone', 'Grand Canyon', 'Grand Teton', 'Everglades', 'Denali', 'Glacier', 'Big Bend', 'Canyonlands', 'Sequoia', 'Crater Lake'];

// Generic function for capturing the park name from the data-attribute
      function alertParkName() {
        var parkName = $(this).attr("data-name");
        alert(parkName);
      }

// Function for dumping the JSON content for each button into the div
      function displayParkInfo() {
      	//Empty the div with id park view
		$("#park-view").empty();
		//variables
        var parkName = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + parkName + "&limit=10&api_key=dc6zaTOxFJmzC";
        
//AJAX call for specific movie button click

        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
        	// console.log(response);
        	for (var z = 0; z < 10; z++){
        		var parkDiv = $('<div class="USParks">');
        		// var parkImageURL = response.data[z].images.original_still.url;
        		var parkImageURL = response.data[z].images.original.url;
        		var imgTag = $("<img>").attr("src",parkImageURL);
        		imgTag.addClass("fullGIF");
        		imgTag.attr("data-still", response.data[z].images.original_still.url);
        		imgTag.attr("data-moving", response.data[z].images.original.url);
        		imgTag.attr("data-clicked", false);
        		parkDiv.append(imgTag);
        		$("#park-view").append(imgTag);
        		var rating = response.data[z].rating;
        		var para = $("<p>").text("Rating: " + rating);
        		parkDiv.append(para);
        		$("#park-view").append(para);
        		// console.log(response.data[z]);
        	}

          renderButtons();
        });
      }

 
 $(document).on("click", ".fullGIF", function(){
 	console.log(this);
 	var still = $(this).attr("data-still");
 	var moving = $(this).attr("data-moving");
 	var clicked = $(this).attr("data-clicked");
 	// console.log(still);
 	// console.log(moving);
 	console.log(clicked);

 	if (clicked == "false") {
 		console.log(" hey i'm clicked");

 		$(this).attr("src", still);
 		$(this).attr("data-clicked", true);
 		
 	} else {
 		$(this).attr("src", moving);
 		$(this).attr("data-clicked", false);
 	}

 });

// Function for displaying park data
function renderButtons() {
    // Deleting the buttons prior to adding new park buttons
	$("#displayButtons").empty();
    // Looping through the array of parks
    for (var z = 0; z < parks.length; z++) {
    	var a = $("<button>");
        a.addClass("parkImage");
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
      
      $(document).on("click", ".parkImage", displayParkInfo);
      // Calling the renderButtons function at least once to display the initial list of parks
      renderButtons();
