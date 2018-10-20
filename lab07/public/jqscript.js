"use strict"

console.log('jqscript running!');

$( document ).ready(function() {
	$("#button").click(function(event) 
	{
		$.ajax	(
		{
			url: "/hello",
			type: "GET",
			data: { name: "lab07" }
		})
		.done(function(result)	{
			console.log("AJAX request successful");
			$("#message").append("<p>" + result.Message + "</p>");
		})
		.fail(function(xhr, status, errorThrown) {
			console.log('AJAX request failed');
		})
	});
});