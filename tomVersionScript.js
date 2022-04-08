window.addEventListener("load", function() {

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
            if (Number(fuelLevel.value>10000)) {
                (document.getElementById("fuelStatus")).innerHTML = "Fuel level is high enough to fly";
            } else {
                (document.getElementById("fuelStatus")).innerHTML = "Fuel level is too low to fly!!!";
            } 
            if (Number(cargoLevel.value) < 10000) {
                (document.getElementById("cargoStatus")).innerHTML = "Cargo mass low enough for launch";
            } else {
                (document.getElementById("cargoStatus")).innerHTML = "Cargo is too heavy to fly!!!";     
            }
            if (Number(cargoLevel.value) < 10000 && fuelLevel.value>10000) {
                (document.getElementById("launchStatus")).innerHTML = "Shuttle is ready for launch!";
                (document.getElementById("launchStatus")).style.color = "green";
                (document.getElementById("faultyItems")).style.visibility = "visible";                 
            } else {
                (document.getElementById("launchStatus")).innerHTML = "Shuttle is not ready for launch";
                (document.getElementById("launchStatus")).style.color = "red";
                (document.getElementById("faultyItems")).style.visibility = "visible";  
            }
        }
    }

    
    function pickPlanet(planets) {
            let pickedPlanet = Math.round(Math.random()*planets.length);
            return pickedPlanet;
    }

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

    async function myFetch(){
        let planetsReturned;
        planetsReturned = await fetch('https://handlers.education.launchcode.org/static/planets.json').then(function(response){
           return response.json();
          });
        return planetsReturned;
    }
     let missionTarget = document.getElementById("missionTarget")
     let listedPlanets;
     let listedPlanetsResponse = myFetch();
     console.log(listedPlanetsResponse)
     listedPlanetsResponse.then(function (result) {
         listedPlanets = result;
         console.log(listedPlanets);
     }).then(function () {
         console.log(listedPlanets);
         let selection = listedPlanets[pickPlanet(listedPlanets)];
         console.log(selection);
         addDestinationInfo(document, selection.name, selection.diameter, selection.star, selection.distance, selection.moons, selection.image);
         return addDestinationInfo(missionTarget, selection.name, selection.diameter, selection.star, selection.distance, selection.moons, selection.image)
     });

    let formSubmit = document.getElementById('formSubmit');
    formSubmit.addEventListener("click", function (event) {
        event.preventDefault();
        let list = document.getElementById("faultyItems");
        let pilot = document.getElementById("pilotName")
        let copilot = document.querySelector("input[name=copilotName]")
        let fuelLevel = document.querySelector("input[name=fuelLevel]")
        let cargoLevel = document.querySelector("input[name=cargoMass]") 
        formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel);
    });
});
