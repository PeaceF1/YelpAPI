$(function() {
	
	$("#search").keypress(keywordSearch);
	
	//jTu8alO6FZH6ssi7GQkUNA
	getBusiness("jTu8alO6FZH6ssi7GQkUNA"); //specific business id
	
	getBusinessReviews("jTu8alO6FZH6ssi7GQkUNA"); //gets the id that is specific to the business 
	
	function getBusinessReviews(id) {
		
		$.ajax({
			url:"https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/"+id+"/reviews",
				headers: {
				Authorization: "Bearer 3TnehUlr7JGQ5YJlZZVyyYcBHnuqfrOAqA-jvxYl3IH168X1IFm7nvXR54CeT47xuY9yTtE9Wmf6hBjYZA7R1jKqCRWeUhp-iqiMn-fcI7dSdm_Og7yrv8HufbnwYHYx"
			},
			method: "GET",
			dataType: "json", 
			data: {
				
			},
			error: ajaxError,
			success: function(data) {
				console.log(data);
				console.log(data.reviews[0].text);
				console.log(data.reviews[0].user); 
			}
		}); 
	}
	
	
	function getBusiness(id) { //gets the business id using the id number from Yelp
		$.ajax({
			url:"https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/"+id, 
			headers: {
				Authorization: "Bearer 3TnehUlr7JGQ5YJlZZVyyYcBHnuqfrOAqA-jvxYl3IH168X1IFm7nvXR54CeT47xuY9yTtE9Wmf6hBjYZA7R1jKqCRWeUhp-iqiMn-fcI7dSdm_Og7yrv8HufbnwYHYx"
			},
			method: "GET",
			dataType: "json", 
			data: {
				
			},
			error: ajaxError,
			success: function(data) {
				console.log(data);
				
				
				
			}
			
		}); 
	}
	
	function keywordSearch(event) {
		if (event.which == 13) {
			
			var keyword = $("#search").val();//allows you to use any keyword to pull from the API(wine, tacos) 
			//can use var keyword = $(this).val(); 
			getBusinesses(keyword);
		}
		
	}
	
	
	
	function getBusinesses (keyword) {
		
			
		$.ajax({
			url: "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search",
			headers: {
				Authorization: "Bearer 3TnehUlr7JGQ5YJlZZVyyYcBHnuqfrOAqA-jvxYl3IH168X1IFm7nvXR54CeT47xuY9yTtE9Wmf6hBjYZA7R1jKqCRWeUhp-iqiMn-fcI7dSdm_Og7yrv8HufbnwYHYx"
			},
			method: "GET",
			dataType: "json",
			data: {
			term: keyword,
			location: "Omaha"
			
			},
			error: ajaxError,
			success: function(data) {
				console.log(data); 
				buildBusinesses(data); 
				
				
			}
		});
		
		
	}
	

	
	function ajaxError() {
		alert("Ajax Error!");
	}
	
	function buildBusinesses(data) {
		//build UI with business data.
		
		$(".business-card").remove();
		
		for (var i = 0; i < data.businesses.length; i++) {
			
			var $bus = data.businesses[i]; 
			var $business = $("#business-card").clone(); 
			$business.removeAttr("id"); 
			$business.addClass("business-card"); 
		
			$business.find(".business-title").append($bus.name); 
			$business.find(".business-rating").append($bus.rating);
			$business.find(".review-count").append($bus.review_count);
			//$business.find(".business-address").append($bus.location);
			//add phone number; 
			//4
			var numStars = Math.floor($bus.rating);
			for (var ri = 1; ri <= numStars; ri++) {
				$business.find("img:nth-child(" + ri + ")").attr("src", "images/star-filled.png")	
			}
			
			//4.59(converts it with the decimal)
			var numStarsString = "" + $bus.rating; 
			if (numStarsString.endsWith(".5")) {
				$business.find("img:nth-child("+ (numStars + 1) + ")").attr("src", "images/star-half.png")
		
			}
			
				$business.find(".business-image img").attr("src", $bus.image_url); 
			
			$("#businesses").append($business);
			
				
				
				
				
				
				
	
			
		}
	}
}); 