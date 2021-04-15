const meloxicam = document.querySelector("#meloxicam");
const metoclopramide = document.querySelector("#metoclopramide");
const cisapride = document.querySelector("#cisapride");
const weight = document.querySelector("#weight");
const concentration = document.querySelector("#drugConcentration");
const dosage = document.querySelector("#dosage");

//meloxicam
//0.3-0.6 mg/kg Orally 1-2x per day
function calcMeloxicam() {
  convertPoundsToKg();
  if (pounds) {
    concentration.innerHTML = "Drug Concentration: Meloxicam 3mg/ml";
    const lowdoseMG = kg * 0.3; // kg of rabbit times 0.3 mg/kg = gives mg per dose
    const highdoseMG = kg * 0.6;
    const lowML = (lowdoseMG / 3).toFixed(2); // mg per dose divided by 3mg/ml = ml
    const highML = (highdoseMG / 3).toFixed(2);
    dosage.innerHTML = `Meloxicam Dosage: Between ${lowML} and ${highML} mls, 2x per day`;
  } else {
    weight.innerHTML = `Please enter a weight`;
  }
}

//metoclopramide
//0.5 mg/kg Orally 2x per day
function calcMetoclopramide() {
  convertPoundsToKg();
  if (pounds) {
    concentration.innerHTML = "Drug Concentration: Metoclopramide 1mg/ml";
    const mg = kg * 0.5; //kg * mg/kg = mg
    const ml = (mg / 1).toFixed(2); // mg divided by 1mg/ml = ml
    dosage.innerHTML = `Metoclopramide Dosage: ${ml} mls, 2x per day`;
  } else {
    weight.innerHTML = `Please enter a weight`;
  }
}

//cisapride
//0.5mg/kg Orally 2x per day
function calcCisapride() {
  convertPoundsToKg();
  if (pounds) {
    concentration.innerHTML = "Drug Concentration: Cisapride 10mg/ml";
    const mg = kg * 0.5; // kg * mg/kg = mg
    const ml = (mg / 10).toFixed(2); //mg divided by 10mg/ml = ml
    dosage.innerHTML = `Cisapride Dosage: ${ml} mls, 2x per day`;
  } else {
    weight.innerHTML = `Please enter a weight`;
  }
}

function convertPoundsToKg() {
  pounds = document.querySelector("input").value;
  kg = pounds * 0.45359237;
  let roundedkg = kg.toFixed(2);
  weight.innerHTML = `Your Bunny weighs ${pounds} pounds, which is ${roundedkg} kilograms`;
  return kg;
}
