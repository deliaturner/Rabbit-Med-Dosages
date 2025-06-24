// Get all relevant elements
const meloxicam = document.querySelector("#meloxicam");
const metoclopramide = document.querySelector("#metoclopramide");
const cisapride = document.querySelector("#cisapride");
const gabapentin = document.querySelector("#gabapentin");
const fluids = document.querySelector("#fluids");

const weight = document.querySelector("#weight");
const concentration = document.querySelector("#drugConcentration");
const dosage = document.querySelector("#dosage");

const poundsBtn = document.getElementById("poundsBtn");
const kgBtn = document.getElementById("kgBtn");
const resetBtn = document.getElementById("resetBtn");

let selectedUnit = null;
let kg = 0;

// Unit selection buttons
poundsBtn.addEventListener("click", () => {
  selectedUnit = "pounds";
  poundsBtn.classList.add("selected-unit");
  kgBtn.classList.remove("selected-unit");
  enableDrugButtons();
});

kgBtn.addEventListener("click", () => {
  selectedUnit = "kg";
  kgBtn.classList.add("selected-unit");
  poundsBtn.classList.remove("selected-unit");
  enableDrugButtons();
});

// Enable drug buttons when unit is selected
function enableDrugButtons() {
  [meloxicam, metoclopramide, cisapride, gabapentin, fluids].forEach((btn) =>
    btn.removeAttribute("disabled")
  );
}

// Get weight in kilograms
function getWeightInKg() {
  const input = parseFloat(document.getElementById("weightInput").value);
  if (isNaN(input) || input <= 0) {
    weight.innerHTML = `Please enter a valid weight`;
    return null;
  }

  if (!selectedUnit) {
    weight.innerHTML = `Please select Pounds or Kilograms`;
    return null;
  }

  kg = selectedUnit === "kg" ? input : input * 0.45359237;
  const roundedkg = kg.toFixed(2);

  if (selectedUnit === "kg") {
    weight.innerHTML = `Your Bunny weighs ${roundedkg} kilograms`;
  } else {
    weight.innerHTML = `Your Bunny weighs ${input} pounds, which is ${roundedkg} kilograms`;
  }

  return kg;
}

// Highlight selected drug
function highlightSelectedDrug(buttonId) {
  const drugButtons = document.querySelectorAll("#drug button");
  drugButtons.forEach(btn => btn.classList.remove("selected-drug"));
  document.getElementById(buttonId).classList.add("selected-drug");
}

// Lock the UI after a calculation
function lockUI() {
  document.getElementById("weightInput").disabled = true;
  poundsBtn.disabled = true;
  kgBtn.disabled = true;

  const drugButtons = document.querySelectorAll("#drug button");
  drugButtons.forEach(btn => btn.disabled = true);

  resetBtn.style.display = "inline-block";
  resetBtn.classList.add("highlight-reset");
}

// Reset everything to the initial state
function resetForm() {
  document.getElementById("weightInput").value = "";
  document.getElementById("weightInput").disabled = false;

  weight.innerHTML = "";
  concentration.innerHTML = "";
  dosage.innerHTML = "";

  selectedUnit = null;
  kg = 0;

  poundsBtn.disabled = false;
  kgBtn.disabled = false;
  poundsBtn.classList.remove("selected-unit");
  kgBtn.classList.remove("selected-unit");

  const drugButtons = document.querySelectorAll("#drug button");
  drugButtons.forEach(btn => {
    btn.disabled = true;
    btn.classList.remove("selected-drug");
  });

  resetBtn.style.display = "none";
  resetBtn.classList.remove("highlight-reset");
}

// Drug calculations

// Meloxicam: 0.3–0.6 mg/kg PO 1–2x/day
function calcMeloxicam() {
  highlightSelectedDrug("meloxicam");
  const kg = getWeightInKg();
  if (kg === null) return;

  concentration.innerHTML = "Drug Concentration: Meloxicam 3mg/ml";
  const lowDoseMg = kg * 0.3;
  const highDoseMg = kg * 0.6;
  const lowML = (lowDoseMg / 3).toFixed(2);
  const highML = (highDoseMg / 3).toFixed(2);
  dosage.innerHTML = `Meloxicam Dosage: Between ${lowML} and ${highML} ml, 2x per day`;

  lockUI();
}

// Metoclopramide: 0.5 mg/kg PO 2x/day
function calcMetoclopramide() {
  highlightSelectedDrug("metoclopramide");
  const kg = getWeightInKg();
  if (kg === null) return;

  concentration.innerHTML = "Drug Concentration: Metoclopramide 1mg/ml";
  const mg = kg * 0.5;
  const ml = (mg / 1).toFixed(2);
  dosage.innerHTML = `Metoclopramide Dosage: ${ml} ml, 2x per day`;

  lockUI();
}

// Cisapride: 0.5 mg/kg PO 2x/day
function calcCisapride() {
  highlightSelectedDrug("cisapride");
  const kg = getWeightInKg();
  if (kg === null) return;

  concentration.innerHTML = "Drug Concentration: Cisapride 10mg/ml";
  const mg = kg * 0.5;
  const ml = (mg / 10).toFixed(2);
  dosage.innerHTML = `Cisapride Dosage: ${ml} ml, 2x per day`;

  lockUI();
}

// Gabapentin: 0.5 mg/kg PO 2x/day
function calcGabapentin() {
  highlightSelectedDrug("gabapentin");
  const kg = getWeightInKg();
  if (kg === null) return;

  concentration.innerHTML = "Drug Concentration: Gabapentin 50mg/ml";
  const mg = kg * 0.5;
  const ml = (mg / 50).toFixed(2);
  dosage.innerHTML = `Gabapentin Dosage: ${ml} ml, 2x per day`;

  lockUI();
}

// Fluids: 45 ml/kg SQ
function calcFluids() {
  highlightSelectedDrug("fluids");
  const kg = getWeightInKg();
  if (kg === null) return;

  concentration.innerHTML = "Fluid Dosage: 45 ml/kg";
  const fluidsML = (kg * 45).toFixed(2);
  dosage.innerHTML = `Fluids Dosage: ${fluidsML} ml total`;

  lockUI();
}

// Autofocus on input when page loads
window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("weightInput").focus();
});