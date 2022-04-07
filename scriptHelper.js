require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    document.innerHTML = `
                 <h2>Mission Destination</h2>
                 <ol>
                     <li>Name: ${name}</li>
                     <li>Diameter: ${diameter}</li>
                     <li>Star: ${star}</li>
                     <li>Distance from Earth: ${distance}</li>
                     <li>Number of Moons: ${moons}</li>
                 </ol>
                 <img alt='A picture of the planet ${name}' src="${imageUrl}""> `
 }

 function validateInput(testInput) {   
    if (testInput === '') {
        return "Empty";
    } else if (isNaN(testInput)) {
        return "Not a Number";
    } else {
        return "Is a Number";
    }
};        

function formSubmission (document, list, pilot, copilot, fuelLevel, cargoLevel) {
    console.log(validateInput(pilot.value));
    console.log(validateInput(copilot.value));
    console.log(validateInput(fuelLevel.value));
    console.log(validateInput(cargoLevel.value));
    if (validateInput(pilot.value) === 'Is a Number' || validateInput(copilot.value) === 'Is a Number') {
        alert("The pilot or co-pilot cant be a number!")
    } else if (validateInput(pilot.value) === 'Empty' || validateInput(copilot.value) === 'Empty') {
        alert("You need pilots to fly!")
    } else if (validateInput(fuelLevel.value) === 'Not a Number' || validateInput(cargoLevel.value) === 'Not a Number') {
        alert("The fuel or cargo levels must be a number!")
    } else if (validateInput(fuelLevel.value) === 'Empty' || validateInput(cargoLevel.value) === 'Empty') {
        alert("You need fuel and cargo to fly!")
    } else {
        if (Number(fuelLevel.value) < 10000) {
            (document.getElementById("fuelStatus")).innerHTML = "Fuel level is too low to fly!!!";
            (document.getElementById("launchStatus")).innerHTML = "Shuttle is not ready for launch";
            (document.getElementById("launchStatus")).style.color = "red";
            list.style.visibility = "visible";
        } else if (Number(cargoLevel.value) > 10000) {
            (document.getElementById("cargoStatus")).innerHTML = "Cargo is too heavy to fly!!!";
            (document.getElementById("launchStatus")).innerHTML = "Shuttle is not ready for launch";
            (document.getElementById("launchStatus")).style.color = "red";
            list.style.visibility = "visible";
        } else {
            (document.getElementById("launchStatus")).innerHTML = "Shuttle is ready for launch!";
            (document.getElementById("launchStatus")).style.color = "green";
            list.style.visibility = "visible";
            (document.getElementById("fuelStatus")).innerHTML = "Fuel level high enough for launch";
            (document.getElementById("cargoStatus")).innerHTML = "Cargo mass low enough for launch";             
        }
    }
}

async function myFetch(){
    let planetsReturned;
    planetsReturned = await fetch('https://handlers.education.launchcode.org/static/planets.json').then(function(response){
       return response.json();
      });
    return planetsReturned;

function pickPlanet(planets) {
    let pickedPlanet = Math.round(Math.random()*planets.length);
    return pickedPlanet;
}


module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
