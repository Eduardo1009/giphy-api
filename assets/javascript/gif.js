$(document).ready(function () {
	var player = ["messi", "dembele", "iniesta", "xavi", "cristiano ronaldo"];

	function renderButtons() {
		$("#player-buttons").empty();
		for (i = 0; i < player.length; i++) {
			$("#player-buttons").append("<button class='btn btn-success' data-player='" + player[i] + "'>" + player[i] + "</button>");
		}
	}

	renderButtons();

	$("#add-player").on("click", function () {
		event.preventDefault();
		var player = $("#player-input").val().trim();
		players.push(player);
		renderButtons();
		return;
	});

	$("button").on("click", function () {
		var player = $(this).attr("data-player");
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + player + "&api_key=dc6zaTOxFJmzC&limit=10"

		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function (response) {
			var results = response.data;
			$("#players").empty();
			for (var i = 0; i < results.length; i++) {
                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                    var gifDiv = $("<div>");
                    var playerDiv = $("<div>");
                    var p = $("<p>").text("Rating: " + results[i].rating);
                    var playerImg = $("<img>");

                    playerImg.attr("src", results[i].images.original_still.url);
                    playerImg.attr("data-still", results[i].images.original_still.url);
                    playerImg.attr("data-animate", results[i].images.original.url);
                    playerImg.attr("data-state", "still");
                    playerImg.attr("class", "gif");
                    playerDiv.append(p);
                    playerDiv.append(playerImg);
                    $("#players-appear-here").append(playerDiv);
                }
			}
		});
	});

	function changeState(){
		var state = $(this).attr("data-state");
		var animateImage = $(this).attr("data-animate");
		var stillImage = $(this).attr("data-still");

		if (state == "still") {
			$(this).attr("src", animateImage);
			$(this).attr("data-state", "animate");
		}

		else if (state == "animate") {
			$(this).attr("src", stillImage);
			$(this).attr("data-state", "still");
		}
    }

    $(document).on("click", ".gif", changeState);

    renderButtons();

});