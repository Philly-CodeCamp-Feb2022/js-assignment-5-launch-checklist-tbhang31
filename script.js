const pickPlanet = require('./scriptHelper.js');
const addDestinationInfo = require('./scriptHelper.js');
const myFetch = require('./scriptHelper.js');
const formSubmission = require('./scriptHelper.js');

window.addEventListener("load", function(event) {
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

