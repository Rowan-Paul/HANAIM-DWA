// Chapter 4: DOM modification 
// Challenge: Create a solar system

// Planet
var planet1 = document.createElement("div");
planet1.classList.add('planet');
planet1.style.backgroundColor = 'blue';
document.body.appendChild(planet1);

// Moon
var moon1 = document.createElement("div");
moon1.classList.add('moon');
moon1.style.backgroundColor = 'gray';
planet1.appendChild(moon1);