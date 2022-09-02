let chosenWord;
let copyOfTheChosenWord;
let line = "-";
let guessedLetters = 0;
let failedAttempts = 0;
let guessedLetterrText = "Litere ghicite: ";

function chooseTheWord() {
	chosenWord = document.getElementById("insertedWord").value.toLowerCase();
	createTheButtons();
	showTheWord();
}

function createTheButtons() {
	for (let i = 0; i < 26; i++) {
		let character = String.fromCharCode(97 + i);
		const div = document.getElementById('buttons');
		div.innerHTML += '<button type="button" class="btn btn-outline-secondary btn-lg px-4 ' + character + '" value="' + character + '" onclick="checkTheLetter(\'' + character + '\');">' + character + '</button>';
	}
	removeAndAddSomeElementsAfterTheWordHasBeenChosen();
	copyOfTheChosenWord = chosenWord;
}

function showTheWord() {
	for (let i = 0, j = 1; i < chosenWord.length; i++, j++) {
		const div = document.getElementById('displayedWord');
		div.innerHTML += '<button class="btn btn-outline-secondary btn-lg px-4" id="' + j + '" value="' + chosenWord[i] + '">' + line + '</button>';
	}
}

function checkTheLetter(value) {
	if (chosenWord.indexOf(value) != -1 && copyOfTheChosenWord.indexOf(value) != -1  && failedAttempts <= 8) {
		copyOfTheChosenWord = copyOfTheChosenWord.replace(value, '');
		const div = document.getElementById('displayedWord');
		for (let i = 1; i <= chosenWord.length; i++) {
			let currentValueOfTheElement = document.getElementById(i).value;
			if (value == currentValueOfTheElement) {
				document.getElementById(i).innerHTML = value;
				document.getElementById(i).value = 'solved';
				break;
			}
		}
		guessedLetters++;
	} else {
		failedAttempts++;
		document.getElementById('gameImage').src = "images/" + failedAttempts + ".PNG";
	}
	if (failedAttempts == 8) {
		document.getElementsByClassName("lead")[0].textContent = "Ne pare rău, dar jocul sa terminat. Nu ai reușit să ghicești cuvântul. 🙁 Cuvântul pentru ghicit era: " + chosenWord + ".";
		createTheResetButton();
		removeTheButtons();
	}
	if (guessedLetters == chosenWord.length) {
		document.getElementsByClassName("lead")[0].textContent = "Felicitări ai ghicit toate literele cuvântului! 😊";
		createTheResetButton();
		removeTheButtons();
	}
}

function removeAndAddSomeElementsAfterTheWordHasBeenChosen() {
	document.getElementById("button-add").remove();
	document.getElementById("insertedWord").remove();
	document.getElementsByClassName("lead")[0].textContent = "Cuvântul a fost ales. Acum altcineva trebuie să îl ghicească. Sunt disponibile 8 încercari greșite. Succes! 😊";
	document.getElementById('displayedWord').innerHTML += '<p class="lead mb-2">' + guessedLetterrText + '</p>';
}

function resetGame() {
	location.reload();
}

function createTheResetButton() {
	document.getElementsByClassName("resetGame")[0].innerHTML += '<button type="button" id="resetGameButton" class="btn btn-outline-secondary btn-lg px-4" onclick="resetGame();">Joc nou</button>';
}

function removeTheButtons() {
	document.getElementById('buttons').remove();
}
