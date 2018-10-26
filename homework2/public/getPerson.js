/* Aaron Santucci
 * CS 336
 * Homework 2
 * getPerson.js searching for Person by ID
 */

"use strict"

console.log('getPerson.js running');

$( document ).ready(function() {

    $("form").on( "submit", function(event) {
        event.preventDefault();
        console.log("submitButton clicked!");

        $.ajax({
            url: "/person/" + $("#personID").val(),
            type: "GET"
        })
        .done(function(result){
            console.log("getPerson: AJAX request successful.");
            $("#Result").html("<p>" + result.firstName + " " + result.lastName + ", " + result.startDate + "</p>");
        })
		.fail(function(xhr, status, errorThrown) {
			console.log('getPerson: AJAX request failed');
			$("#Result").html("<p>" + 'ID not found' + "</p>");
		})
    });


});