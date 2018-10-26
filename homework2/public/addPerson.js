/* Aaron Santucci
 * CS 336
 * Homework 2
 * addPerson.js script for creating a new Person
 */

"use strict"

console.log('addPerson.js running');

$( document ).ready(function() {

    $("form").on( "submit", function(event) {
        event.preventDefault();

        var form = $(this);
        $.ajax({
			url: '/addperson',
			type: "POST",
			data: form.serialize(),
			dataType: 'json'
        })
        .done(function(result){
            console.log("addPerson: AJAX reques successful");
            $("#Result").html("<p>" + result.firstName + " " + result.lastName
                + " , id: " + result.id + ", " + result.startDate  + " created!" + "</p>");
        })
        .fail(function(xhr, status, errorThrown) {
           console.log('addPerson: AJAX request failed');
           $("#Result").html("<p>" + 'addPerson: AJAX request failed' + "</p>");
		})
	});
});