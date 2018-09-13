/* CS 336 Keith Vander Linden
 * Exercise 2.2 
 * Student prototype
 * By: Aaron Santucci
 */

// http://jsfiddle.net/codeandcloud/n33RJ/
function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}
// Person object 'class'
function Person(name, birthdate)
{
	this.name = name;
	this.birthdate = birthdate;
	this.friends = [];
}
// accessor for a Person's name
Person.prototype.getName = function() 
{
	return this.name;
}
// accessor for a Person's age
Person.prototype.getAge = function() 
{
	return getAge(this.birthdate);
}
// mutator method to add a friend
Person.prototype.addFriend = function(friend) 
{
	this.friends.push(friend);
}
// a greeting to identify the Person
Person.prototype.greeting = function() 
{
	console.log("Hello, this is " + this.getName() + ", a Person");
}

/*************************************
 * Student Object 'Class'
 *************************************/
function Student(name, birthdate, subject)
{
	Person.call(this, name, birthdate);
	this.subject = subject;
}
Student.prototype = Object.create(Person.prototype);

// a greeting to identify the Person
Student.prototype.greeting = function() 
{
	console.log("Hello, this is " + this.getName() + ", a Student of " + this.subject);
}

// testing
var Aaron = new Student("Aaron", "1996/05/10", "Wumbology");

// Person tests
var Mark = new Person("Mark", "1998/03/31");
var Alex = new Student("Alex", "1997/08/05", "Something");
Aaron.addFriend(Mark);
Aaron.addFriend(Alex);
console.log("Name: " + Aaron.getName());
console.log("Age: " + Aaron.getAge());
console.log("Friends: " + Aaron.friends.length);
console.log("\n");

// Student tests
if (Aaron instanceof Person)
	if (Aaron instanceof Student)
		Aaron.greeting();
if (Mark instanceof Person)
	if (!(Mark instanceof Student))
		Mark.greeting();
if (Alex instanceof Person)
	if (Alex instanceof Student)
		Alex.greeting();
		
	