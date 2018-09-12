// make sure repository is named cs336

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

function Person(name, birthdate)
{
	this.name = name;
	this.birthdate = birthdate;
	this.friends = [];
}

Person.prototype.getName = function() 
{
	return this.name;
}

Person.prototype.getAge = function() 
{
	return getAge(this.birthdate);
}

Person.prototype.addFriend = function(friend) 
{
	this.friends.push(friend);
}

Person.prototype.greeting = function() 
{
	console.log("Hello, this is " + this.getName());
}

var Mark = new Person("Mark", "1998/03/31");
var Alex = new Person("Alex", "1997/08/05");
Mark.addFriend(Alex);
Alex.addFriend(Mark);

var Aaron = new Person("Aaron", "1996/05/10");
Aaron.addFriend(Mark);
Aaron.addFriend(Alex);

console.log("Name: " + Aaron.getName());
console.log("Age: " + Aaron.getAge());

Aaron.greeting();