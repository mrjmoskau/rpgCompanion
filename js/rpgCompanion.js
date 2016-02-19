/* A number of utility functions for rpgCompanion
 * Written by: Michael Moskau
 * Version: 1.0.0
 * Date: 11-02-2012
 * 
 * NOTE: This is probably some of the worst JavaScript code ever written, but as long as it works... right?
*/

addEventListener('load',bldPlayer,false);

// Let's make these global, shall we?
var iSkill = null;
var skill = null;
var iStamina = null;
var stamina = null;
var iLuck = null;
var luck = null;
var jewels = null;
var mangia = 10;

function doAlert() {
	if (typeof blackberry != 'undefined') {
		alert('Welcome to ' + blackberry.app.name + '\nCreated by ' + blackberry.app.author + 
		'\nConcepts copyright 1982, Steve Jackson and Ian Livingstone');
	}
	else {
		alert('Welcome to the rpgCompanion\nCreated by Michael Moskau\nConcepts copyright 1982, Steve Jackson and Ian Livingstone');
	}
}
function doClear() {
	document.getElementById("charName").value="";
	document.getElementById("iSkill").value = "";
	document.getElementById("skill").value = "";
	document.getElementById("iStamina").value = "";
	document.getElementById("stamina").value = "";
	document.getElementById("iLuck").value= "";
	document.getElementById("luck").value= "";
	document.getElementById("equip").value = "";
	document.getElementById("gold").value = "";
	document.getElementById("jewels").value = "";
	document.getElementById("rbSkill").checked = false;
	document.getElementById("rbStamina").checked = false;
	document.getElementById("rbLuck").checked = false;
	document.getElementById("cbDose1").checked = false;
	document.getElementById("cbDose1").disabled = false;
	document.getElementById("cbDose2").checked = false;
	document.getElementById("cbDose2").disabled = false;
	document.getElementById("mangia").value = 10;
}
function rollDie(dice) {
	var result = null;
	for (var i = 0; i < dice; i++) {
		result += Math.floor(1 + (1+6-1)*Math.random());;
	}
	return result;
}
function bldPlayer() {
	// alert('This will build a character for you.');
	// Set the initial values of the global variables
	iSkill= rollDie(1) + 6;
	iStamina = rollDie(2) + 12;
	iLuck = rollDie(1) + 6;
	mangia = 10;
	skill = iSkill;
	stamina = iStamina;
	luck = iLuck;
	
	document.getElementById("iSkill").value = iSkill.toString();
	document.getElementById("skill").value = document.getElementById("iSkill").value;
	document.getElementById("iStamina").value = iStamina.toString();
	document.getElementById("stamina").value = document.getElementById("iStamina").value;
	document.getElementById("iLuck").value = iLuck.toString();
	document.getElementById("luck").value = document.getElementById("iLuck").value;
	document.getElementById("mangia").value = mangia.toString();
}
function modStat(stat, op, val) {
	switch(stat) {
		case 1:
			if (op == 0) {
				skill += val;
				document.getElementById("skill").value = skill;
			}
			else {
				skill -= val;
				document.getElementById("skill").value = skill;
			}
			break;
		case 2:
			if (op == 0) {
				stamina += val;
				document.getElementById("stamina").value = stamina;
			}
			else {
				stamina -= val;
				document.getElementById("stamina").value = stamina;
			}
			break;
		case 3:
			if (op == 0) {
				luck += val;
				document.getElementById("luck").value = luck;
			}
			else {
				luck -= val;
				document.getElementById("luck").value = luck;
			}
			break;
	}
}
function eatEm() {
	if (((stamina + 4) <= iStamina) && (mangia > 0)) {
		mangia -= 1;
		stamina += 4;
		document.getElementById("stamina").value = stamina;
		document.getElementById("mangia").value = mangia;
	}
	else if (mangia == 0) {
		alert("You have no more provisions...");
	}
	else {
		alert("You are well sated, for now...");
	}
}
function drinkEm(whichOne) {
	// alert("You clicked dose #" + whichOne);
	if (document.getElementById("rbSkill").checked == true) {
		skill = iSkill;
		document.getElementById("skill").value = iSkill;
	}
	else if (document.getElementById("rbStamina").checked == true) {
		stamina = iStamina;
		document.getElementById("stamina").value = iStamina;
	}
	else {
		iLuck += 1;
		luck = iLuck;
		document.getElementById("iLuck").value = iLuck;
		document.getElementById("luck").value = iLuck;
	}
	document.getElementById("cbDose"+whichOne).disabled = true;
}
function encounter() {
	if ((document.getElementById("cStamina").value == "") || (document.getElementById("cSkill").value == "")) {
		alert("You swing at shadows and air... enter values for your opponent!");
	}
	else {
		var cAttack = null; //Creature attack
		var pAttack = null; // Player attack
		var cStamina = parseInt(document.getElementById("cStamina").value);

		while ((cStamina > 0) && (stamina > 0)) {
			cAttack = rollDie(2) + parseInt(document.getElementById("cSkill").value);
			pAttack = rollDie(2) + skill;
			if (cAttack > pAttack) {
				stamina -= 2;
				document.getElementById("stamina").value = stamina.toString();
			}
			else if (cAttack < pAttack) {
				cStamina -= 2;
				document.getElementById("cStamina").value = cStamina.toString();
			}
		}
		if (cStamina <= 0) {
			alert("The creature has been defeated!");
			document.getElementById("cSkill").value = "";
			document.getElementById("cStamina").value = "";
		}
		else if (stamina <= 0) {
			alert("You have been vanquished!");
		}
	}
}
function testYourLuck() {
	var luckTest = parseInt(document.getElementById("luck").value);
	if ( rollDie(2) <= luckTest ) {
		alert("Whew, that was lucky!");
	} else {
		alert("Oh, what bad luck!");
	}
	luckTest -= 1;
	document.getElementById("luck").value = luckTest.toString();
}
