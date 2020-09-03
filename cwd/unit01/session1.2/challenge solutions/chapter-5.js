// Chapter 5: DOM events 
// Challenge: Mad Libs

var libButton = document.getElementById('lib-button');

var libIt = function() {
    var storyDiv = document.getElementById("story");
            
    // Get inputs
    var noun = document.getElementById("noun").value;
    var adjective = document.getElementById("adjective").value;
    var person = document.getElementById("person").value;
        
    // Create story
    storyDiv.innerHTML = person + " likes a lot of " + adjective + " things which he stores in " + noun;
};

libButton.addEventListener('click', libIt);