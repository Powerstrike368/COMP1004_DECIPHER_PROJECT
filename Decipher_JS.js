//Event listener detects changes to the plaintext textarea and determines the function to perform
document.getElementById("PlainTextIn").addEventListener("input", function(){
	
	let PlainText = document.getElementById("PlainTextIn").value; //character array (string) for the Input
	let method = Number(document.getElementById("method-selector").value); //Method Selector store
	let EnOrDe = Number(document.getElementById("De/En").value); //get whether the chosen method is decryption or encryption
	let CipherText = ""; //intialises CipherText array as a string
	
	let shift = Number(document.getElementById("shift-in").value); //Input for the shift value (returns null if not a number, defaults to 0/26 if not within Range)
	let key = document.getElementById("key-in").value; //Input for the key
	
	//makes sure the selected key value is a number and in range
	if(isNaN(key) || key < 0){
		key = 0;
		document.getElementById("shift-in").value = key; 
	}else if(key > 25){
		key = 25;
		document.getElementById("shift-in").value = key;
	}
	
	//checks the selected method type
	switch(method){
		//for no method selected
		case 0:
		CipherText = PlainText; //unaffected by the choice between encryption and decryption
		break;
		
		//AtBash Cipher
		case 1:
		CipherText = AtBashCipher(PlainText); //unaffected by the choice between encryption and decryption, as same both ways
		break;
		
		//CaesarCipher
		case 2:
		if(EnOrDe == 1){
			CipherText = CaesarCipher(PlainText, shift, false); //Encryption
		}else if(EnOrDe == 2){
			CipherText = CaesarCipher(PlainText, shift, true); //Decryption
		}
		break;
		
		case 3:
		if(EnOrDe == 1){
			CipherText = VigenereCipher(PlainText, key, false); //Encryption
		}else if(EnOrDe == 2){
			CipherText = VigenereCipher(PlainText, key, true); //Decryption
		}
		break;
		
		case 4:
		if(EnOrDe == 1){
			if(XORkey == ""){
				CipherText = PlainText; //handling for no key input
			}else{
				CipherText = XORCipher(PlainText, XORkey, false); //Encryption
			}
		}else if(EnOrDe == 2){
			if(XORkey == ""){
				CipherText = PlainText;
			}else{
				CipherText = XORCipher(PlainText, XORkey, true); //Decryption
			}
		}
		break;
		
		case 5:
		if(EnOrDe == 1){
			CipherText = OneTimePad(PlainText);
		}else if(EnOrDe == 2){
			CipherText = OneTimePadDecrypt(PlainText, XORkey);
		}
		break;
		
		case 6:
		CipherText = Enigma(PlainText);
		break;
		
		//in event of something breaking
		default:
		CipherText = PlainText;
		break;
	}

    document.getElementById("CipherTextOut").value = CipherText; //displays the ciphertext output to the CipherText-in textarea
});

//Event listener shows/hides inputs when needed
document.getElementById("method-selector").addEventListener("change", function(){
	
	//simple keys
	let Shift = document.getElementById("shift-in");
	let key = document.getElementById("key-in");
	
	//ENIGMA KEYS
	let Rotor1 = document.getElementById("EnigmaElement1");
	let Rotor2 = document.getElementById("EnigmaElement2");
	let Rotor3 = document.getElementById("EnigmaElement3");
	let Reflector = document.getElementById("ReflectorSelector");
	let Plugboard = document.getElementById("Plugboard-in");
	
	//the currently selected method
	let method = Number(document.getElementById("method-selector").value);
	let Direction = Number(document.getElementById("De/En").value); 
	let Diagram = document.getElementById("Diagram");
	
	//hides shift input unless using Caesar Cipher
	if(method == 2){
		Shift.style.display = "block";
	}else{
		Shift.style.display = "none";
	}
	
	//hides key input unless XOR, OTP or Vigenere cipher selected
	if(method == 3 || method == 4 || method == 5){
		key.style.display = "block";
		if(method == 5){
			if(Direction == 1){
				key.readOnly = true;
				key.placeholder="Your Key will be generated here as you type";
			}else{
				key.readOnly = false;
				key.placeholder = "Enter Your Decryption Key Here";
			}
		}else{
			key.readOnly = false; //For the other key based ciphers, the user inputs a key, but for one time pad, it is randomly generated
			key.placeholder="Enter Your Key Here:"
		}
	}else{
		key.style.display = "none";
	}
	
	//hides enigma inputs unless enigma method is selected
	if(method == 6){
		Rotor1.style.display = "inline-block";
		Rotor2.style.display = "inline-block";
		Rotor3.style.display = "inline-block";
		Plugboard.style.display = "inline-block";
		Reflector.style.display = "inline-block";
	}else{
		Rotor1.style.display = "none";
		Rotor2.style.display = "none";
		Rotor3.style.display = "none";
		Plugboard.style.display = "none";
		Reflector.style.display = "none";
	}
	
	//update the Description Section accordingly for the method selected
	let Indicator = document.getElementById("Indicator").textContent;
	
	switch(method){
		case 0:
		Diagram.src = "";
		Diagram.alt = "";
		document.getElementById("Decription").innerHTML = "No Cipher Currently Selected <br> Select a Cipher Above and Learn More Here <br> <br> <br> DECIPHER is a simple encryption tool designed to help informa and teach about the basics of encryption through the introduction of 5 Ciphers of varying historical importance and use <br> This Project was made for the COMP1004 Computing Practice Module at the University of Plymouth By First Year Student Thomas Bancroft" ; 
		break;
		
		case 1:
		if(Indicator == "Dark Mode"){
			Diagram.src = "Images/AtBashDark.png";
		}else if(Indicator == "Light Mode"){
			Diagram.src = "Images/AtBashLight.png";
		}
		Diagram.alt = "AtBash Explanation Image. It shows the alphabet, with an arrow pointing each letter to its opposite alphabetically";
		document.getElementById("Decription").innerHTML = "<u><b>ATBASH CIPHER</b></u> <br> <br> One of the Simplest Forms of Substitution Cipher. As shown below, the cipher switches letters with their opposite alphabetically <br> As such, A will become Z, B will become Y and so on <br> As a result of only having one variation, this cipher is highly insecure and not recommended to be used in any case";
		break;
		
		case 2:
		if(Indicator == "Dark Mode"){
			Diagram.src = "Images/CaesarCipherDark.png";
		}else if(Indicator == "Light Mode"){
			Diagram.src = "Images/CaesarCipherLight.png";
		}
		Diagram.alt = "CaesarCipher Explanation Image. Shows The Alphabet and how the CaesarCipher shifts each letter";
		document.getElementById("Decription").innerHTML = "<u><b>CAESAR CIPHER</b></u> <br> <br> An Evolution of the Substitution Cipher that was used in Ancinet Rome by its namesake Julius Caesar. <br> This Cipher functions with a numbered shift value, which 'shifts' letters alphabetically in a message. <br> For Example, with a shift of 3 (Historically used by Julius Caesar), the letter A would be shifted by 3 and become D. <br> For Decryption, the shift is applied in reverse, shifting letters backward, thus D would become A when decrypting with a shift of 3 <br> <br> However, the Caesar Cipher has many vulnerabilities such as retaining the word structure of the plaintext, which allows logic to help break the ciphertext, with only 26 variations in total, making it insecure to use in the modern day <br> <br> The image below shows an example of the Caesar Cipher's effect on letters A, G and O with a shift of 7";
		break;
		
		case 3:
		if(Indicator == "Dark Mode"){
			Diagram.src = "Images/VigenereCipherDark.png";
		}else if(Indicator == "Light Mode"){
			Diagram.src = "Images/VigenereCipherLight.png";
		}
		Diagram.alt = "VigenereCipher Explanation Image. Shows the Alphabet Corresponding to numbers and how that shifts a plaintext";
		document.getElementById("Decription").innerHTML = "<u><b>VIGÈNERE CIPHER</b></u> <br> <br> The Vigènere Cipher uses an alphabetic key to substitute letters. <br> Each letter of the alphabet is given a corresponding number 0-25, and letter X of the Plaintext will be shifted by Letter X of the Key <br> For example, a plaintext letter G with the key letter of B would be shifted by 1 to the letter H <br> <br> This Method helps eliminate the use of logic to break the key encryption in the same way the Caesar Cipher can be broken. <br> However, if the length of a key is known, the Vigenère Cipher becomes simply to break, and thus is not used in the modern day <br> <br> Historic uses of the vigènere cipher include the confederate states of america during the American Civil War <br> <br> Below is a diagram showing the Vigènere Cipher Applied to the Plaintext 'Hello' with key 'Keyword' ";
		break;
		
		case 4:
		if(Indicator == "Dark Mode"){
			Diagram.src = "Images/XORCipherDark.png";
		}else if(Indicator == "Light Mode"){
			Diagram.src = "Images/XORCipherLight.png";
		}
		Diagram.alt = "XOR Cipher Explanation Image, Shows a basic XOR operation.";
		document.getElementById("Decription").innerHTML = "<u><b>XOR CIPHER</b></u> <br> <br> The XOR Cipher Functions by taking a key and plaintext, and applying a bitwise XOR function on the two to produce a ciphertext <br> For Example, for the letter I, with Key of B. The XOR Function would carry out a bitwise XOR on the 8-bits of their character codes (If bits are the same, the ciphertext bit is 0, if they are not, 1) <br> In the case of a key that is not the length of the plaintext, the key's letters will be repeated as shown below <br> <br> A Downside to this Cipher is that while data confidentiality is in tact, its integrity can be sacrificed. <br> This is shown in this tool, as some letters when decrypting may not always return the same as their plaintext input<br>For the sake of visualisation, the version of the XOR Cipher this app implements uses an extra step, converting the final character into printable unicode range <br> <br> Below is an example of the XOR Cipher being used on the Plaintext 'Keyword' with key 'Hello' ";
		break;
		
		case 5:
		if(Indicator == "Dark Mode"){
			Diagram.src = "Images/OneTimePadDark.png";
		}else if(Indicator == "Light Mode"){
			Diagram.src = "Images/OneTimePadLight.png";
		}
		Diagram.alt = "OTP Explanation Image. Shows a Basic One Time Pad Operation";
		document.getElementById("Decription").innerHTML = "<u><b>ONE TIME PAD</b></u> <br><br> An Example of modern symmetric key encryption. <br> The One Time Pad is a variation of the XOR cipher (Functionality detailed under the XOR Cipher Section) that follows 4 rules: <br><br> 1. The Key must be the same length as plaintext <br> 2. The Key must be truly random <br> 3. The key must never be reused <br> 4. The key must be kept completely secret by the reciever and sender <br><br> Under these conditions, OneTimePad is considered unbreakable. <br> However, should the key be leaked to an attacker, the strength of OneTimePad is lost. <br> Other issues also include the same data integrity issues as the XOR cipher <br> The Use of OneTimePad in real scenarios is limited for a few reasons including that the ability to truly randomly generate keys is highly difficult (a problem this implementation has as it uses standard random generation) and that its counterparts in Asymetric Encryption are considered more secure <br><br> Below is an illustration of the OneTimePad's functionality with the Plaintext 'Keyword' and randomly generated key 'DB'nBdw'. <br> Much like the XOR cipher, the version implemented here adds an extra step that is not present in usual OTPs to convert the output into a printable range for the sake of visualisation";
		break;
	}
	
});

//event listener to change placeholder text for the input/output boxes and key input depending on if encrypting or decrypting
document.getElementById("De/En").addEventListener("change", function(){
	let Direction = Number(document.getElementById("De/En").value); //get whether the chosen method is decryption or encryption
	let InputBox = document.getElementById("PlainTextIn");
	let method = Number(document.getElementById("method-selector").value)
	let XORkey = document.getElementById("key-in");
	
	if(Direction == 1){
		InputBox.placeholder = "Enter Plaintext Here:";
	}else if(Direction == 2){
		InputBox.placeholder = "Enter Ciphertext Here:";
	}
	
	if(method == 5){
		if(Direction == 1){
			key.readOnly = true;
			key.placeholder="Your Key will be generated here as you type";
		}else if(Direction == 2){
			key.readOnly = false;
			key.placeholder = "Enter Your Decryption Key Here";
		}
	}
	
});

function JSONOutput(){
	//relevant information for the JSON file
	let method = Number(document.getElementById("method-selector").value);
	let ciphertext = document.getElementById("CipherTextOut").value;
	let Shift = Number(document.getElementById("shift-in").value);
	let KeyIn = document.getElementById("XOR-key-in").value;
	
	//initialise the JSON variable
	let JsonOut;
	
	//check the method in use, AtBash and Caesar need to be handled differently and the default method selected needs to return an error
	if(method == 0 || ciphertext == ""){
		alert("Please Select a Method and Ensure all fields contain data before Attempting to save your ciphertext"); //error message
	}else if(method == 1){
		let AtBashOut = {Method: method, Ciphertext: ciphertext}; //setup the json data
		JsonOut = JSON.stringify(AtBashOut); //stringify into json object
	}else if(method == 2){
		if(Shift != ""){
			let CaesarOut = {Method: method, Ciphertext: ciphertext, Shift: Shift}; //setup the json data
			JsonOut = JSON.stringify(CaesarOut); //stringify into json object
		}else{
			alert("Please Select a Method and Ensure all fields contain data before Attempting to save your ciphertext"); //error message
		}
	}else if(method == 3 || method == 4 || method == 5){
		if(KeyIn != ""){
			let KeyMethodOut = {Method: method, Ciphertext: ciphertext, Key: KeyIn}; //setup the json data
			JsonOut = JSON.stringify(KeyMethodOut); //stringify into json object
		}else{
			alert("Please Select a Method and Ensure all fields contain data before Attempting to save your ciphertext"); //error message
		}
	}else{
		alert("Please Select a Method and Ensure all fields contain data before Attempting to save your ciphertext"); //error message
	}
	
	//if all data is good and placed in the json object, download the json file using blobs
	if(JsonOut != undefined){
		let JsonBlob = new Blob([JsonOut], {type: "application/json"}); //create a new blob object from the json object
		
		//create an <a> element with the JSON blob as a URL to trigger a download
		let DownloadLink = document.createElement("a"); //create the anchor (<a>)
		DownloadLink.href = URL.createObjectURL(JsonBlob); //embed a link to the json data blob in the <a> tag
		DownloadLink.download = "SavedCipher.json"; //set a default download name
		
		DownloadLink.click(); //trigger a click on the download tag and download the file
		
		alert("Successfully Downloaded Your Cipher! To Upload and Decrypt a Cipher please Press the Upload Button and Select a JSON File Generated from this app");
	}
	
}

function JSONInput(){
	//upload the file
	let	FileUploader = document.createElement("INPUT"); //create an input element once the button is pressed
	FileUploader.setAttribute("type","file"); //specify the type of input to be a file
	FileUploader.setAttribute("accept", ".json"); //make only json files uploadable
	
	FileUploader.click(); //presses the input button that was created and opens file window to let user upload JSON file
	
	//check for a file Upload
	FileUploader.addEventListener("change", function(event){
		let UploadedFile = event.target.files[0];
		
		if(UploadedFile){
			let fileReader = new FileReader(); //variable to read the contents of the file
			fileReader.onload = function(e){
				let CipherData = JSON.parse(e.target.result); //parse the contents of the file and extract the JSON object containing the cipher data
				console.log(CipherData); //send a log of the data to the console
				
				//set to decryption mode
				document.getElementById("De/En").value = 2;
				
				//update the method
				document.getElementById("method-selector").value = CipherData.Method;
				
				//trigger method selector event to make sure that key input boxes appear/have right setting
				document.getElementById("method-selector").dispatchEvent(new Event("change"));
				document.getElementById("De/En").dispatchEvent(new Event("change"));
				
				//update input box
				document.getElementById("PlainTextIn").value = CipherData.Ciphertext;
				
				//if method has a key, update key
				if(CipherData.Method == 2){
					document.getElementById("shift-in").value = CipherData.Shift
				}else if(CipherData.Method == 3 || CipherData.Method == 4 || CipherData.Method == 5){
					document.getElementById("key-in").value == CipherData.Key;
				}
				
				//trigger event to decipher
				document.getElementById("PlainTextIn").dispatchEvent(new Event("input"));
			};
			
			fileReader.readAsText(UploadedFile); //read contents of file as text
		}
	});
}

//Performs an AtBash Cipher
function AtBashCipher(InputText){
	let Result = ""; //initialise string
	
	for(let i = 0; i < InputText.length; i++){
		let CharCode = InputText.charCodeAt(i) //check ascii code for the relevant character
		
		//for lower case letters:
		if(CharCode >= 97 && CharCode <= 122){
			CharCode = 122 - (CharCode - 97); //Get the charcode's distance from a and subtract it from the value of z
		}
		
		//for upper case letter:
		if(CharCode >= 65 && CharCode <= 90){
			CharCode = 90 - (CharCode - 65); //Get the charcode's distance from A and subtract it from the value of Z
		}
		
		Result += String.fromCharCode(CharCode); //accumulate the ciphertext
	}
	
	return Result;
}

//Performs a Caesar Cipher
function CaesarCipher(PlainText, shift, Decrypt){
	
	let FinalResult = ""; //initialises string variable
	
	for(let i = 0; i < PlainText.length; i++){
		let CharacterCode = PlainText.charCodeAt(i); //checks the ascii code for the relevant character of the string
		
		//takes the key away from the char code if decrypting. Adds it if encrypting
		if(Decrypt){
			//lowercase letter handling
			if(CharacterCode >= 97 && CharacterCode <= 122){
			
				CharacterCode -= shift; //adds the shift to the character code, ciphering the Text
			
				if(CharacterCode < 97){ //if the returned character is past A, loop around to Z again
					CharacterCode = 122 - (96 - CharacterCode);
				}
			}else if(CharacterCode >= 65 && CharacterCode <= 90 ){ //uppercase letter handling
			
				CharacterCode -= shift;
			
				if(CharacterCode < 65){
				CharacterCode = 90 - (64 - CharacterCode);
				}
			}
		}else{
			//lowercase letter handling
			if(CharacterCode >= 97 && CharacterCode <= 122){
			
				CharacterCode += shift; //adds the shift to the character code, ciphering the Text
			
				if(CharacterCode > 122){ //if the returned character is past Z, loop around to A again
					CharacterCode = ((CharacterCode - 123) % 26) + 97; //character code for A + overflow
				}
			}else if(CharacterCode >= 65 && CharacterCode <= 90 ){ //uppercase letter handling
			
				CharacterCode += shift;
			
				if(CharacterCode > 90){
				CharacterCode = ((CharacterCode - 91) % 26) + 65;
				}
			}
		}
		FinalResult += String.fromCharCode(CharacterCode); //accumulate the ciphered string
	}
	
	return FinalResult; //return the ciphered string
}

function VigenereCipher(PlainText, key, Decrypt){
	let Result = ""; //initialise result as a string
	let CharNumber = 0;
	
	//ensures the key is comprised of only letters
	for(let i = 0; i < key.length; i++){
		
		let KeyCheck = key.charCodeAt(i);
		
		//checks that the key's letters are in the valid range for letters
		if(!(KeyCheck >= 65 && KeyCheck <= 90) && !(KeyCheck >= 97 && KeyCheck <= 122)){
			Result = "Invalid Characters Used in Key. Please use only letters";
			return Result;
		}
	}
		
	//actual function
	for(let i = 0; i < PlainText.length; i++){
		let CharCode = PlainText.charCodeAt(i);
		let KeyCharCode = key.charCodeAt(CharNumber % key.length); //ensures the looping of the key if not the same length as the input
		
		//Getting the correct shift
		if(KeyCharCode >= 97 && KeyCharCode <= 122){
			KeyCharCode -= 97; //gets shift 0-25 based on letters position in relation to A
		}else if(KeyCharCode >= 65 && KeyCharCode <= 90){
			KeyCharCode -=65;
		}
		
		if(Decrypt){
			if(CharCode >= 97 && CharCode <= 122){
				CharCode = ((CharCode - KeyCharCode - 97 + 26) % 26) + 97; //26 is added in decryption to ensure the number remains positive
				CharNumber++;
			}else if(CharCode >= 65 && CharCode <= 90){
				CharCode = ((CharCode - KeyCharCode - 65 + 26) % 26) + 65;
				CharNumber++;
			}
		}else{
			//handling for lowercase letters
			if(CharCode >= 97 && CharCode <= 122){
				CharCode = ((CharCode + KeyCharCode - 97) % 26) + 97;
				CharNumber++;
			}else if(CharCode >= 65 && CharCode <= 90){ //handling for uppercase letters
				CharCode = ((CharCode + KeyCharCode - 65) % 26) + 65;
				CharNumber++;
			}
		}
		
		Result += String.fromCharCode(CharCode);
	}
	
	if(key == ""){
		Result = PlainText;
	}
	
	return Result;
}

//performs a XOR encryption
function XORCipher(PlainText, XorKey, Decrypt){
	let Result = ""; //initialise final string
	
	for(let i = 0; i< PlainText.length; i++){
		
		let CharCode = PlainText.charCodeAt(i); //char code of letter in the string
		let XorCharCode = XorKey.charCodeAt(i % XorKey.length); //char code of respective part of the XorKey
		
		if(Decrypt){
			CharCode = ((CharCode - 33) + 95) % 95; //reverses the ascii range conversion
			
			CharCode = CharCode ^ XorCharCode; //performs the XOR
			
			Result += String.fromCharCode(CharCode); //adds the character to the string
			
		}else{
			CharCode = CharCode ^ XorCharCode; //logical xor on the binary values of the key and platext letters
		
			CharCode = (CharCode % 95) + 33; //makes sure the output charater is within ascii range of 33 (the first non-space character) and 126 (the final non-space character), for the sake of the tool being for visualising, not always 100% accuracy
		
			Result += String.fromCharCode(CharCode); //accumulate the CipherText
		}
	}
	
	return Result;
	
}

//performs a onetimepad encryption
function OneTimePad(PlainText){
	let Result = ""; //initialise the final result string
	let OneTimeKey = "";
	let KeyBox = document.getElementById("key-in");
	
	//KEY GENERATION
	for(let i = 0; i < PlainText.length; i++){
		let temp = Math.floor(Math.random()*(126-33+1)) + 33; //generate a random integer within the printable ascii range 33 - 126
		OneTimeKey += String.fromCharCode(temp); //add the corresponding character to the key value
	}
	
	KeyBox.value = OneTimeKey; //display the key
	
	//XOR OPERATION. The Actual Encryption bit!
	for(let i = 0; i < PlainText.length; i++){
		let CharCode = PlainText.charCodeAt(i); //ascii char code of character i in the string
		let KeyCharCode = OneTimeKey.charCodeAt(i); //ascii char code of character i in the string
		
		CharCode = CharCode ^ KeyCharCode; //logical XOR on binary values of key and plaintext char codes to produce the ciphertext
		CharCode = (CharCode % 95) + 33; //ensure the XORed value is within ascii printable range
		
		Result += String.fromCharCode(CharCode);
	}
	return Result;
}

//performs a onetimepad decryption
function OneTimePadDecrypt(PlainText, XORkey){
	Result = "";
	
	if(PlainText.length != XORkey.length){
		Result = "ERROR: PlainText and Key must be the same length"; //handling for Key/Plaintext of unequal length
	}else{
		//functionally performs the same as encryption from here
		for(let i = 0; i < PlainText.length; i++){
			let CharCode = PlainText.charCodeAt(i);
			let KeyCharCode = XORkey.charCodeAt(i % XORkey.length);
			
			CharCode = ((CharCode - 33) + 95) % 95; //reverses the ascii range conversion
			
			CharCode = CharCode ^ KeyCharCode;
			
			Result += String.fromCharCode(CharCode);
		}		
	}
	
	return Result;
	
}

function Enigma(PlainText){
	let Result = ""; //initialise result
	let Issue = false; //market for any input issues
	
	const Rotors = ["NOSELECTION", "EKMFLGDQVZNTOWYHxUSPAIBRCJ", "AJDKsIRUXBLHWTMCQGZNPYFVOE", "BDFHJLCPRTXVZNYEIWGAKmUSQO", "ESOVPZJAYQUIRHXLNFTGKdCMWB", "VZBRGITYUPSDNHLXAWMJQOFECk"]; //array of possible rotors. "|" symbolises where a turnover notch would be
	const Reflectors = ["NOSELECTION", "EJMZALYXVBWFCRQUONTSPIKHGD", "YRUHQSLDPXNGOKMIEBFZCWVJAT", "FVPJIAOYEDRZXWGCTKUQSBNMHL"]; //possible Reflectors
	
	//variable setup
	let SelectedRotors = [Number(document.getElementById("RotorTypeSelector1").value), Number(document.getElementById("RotorTypeSelector2").value), Number(document.getElementById("RotorTypeSelector3").value)]; //Get the selected rotor numbers
	let SelectedReflector = Reflectors[Number(document.getElementById("ReflectorSelector").value)]; //sets the reflector
	let RotorInitialValues = [document.getElementById("Rotor-IV1").value, document.getElementById("Rotor-IV2").value, document.getElementById("Rotor-IV3").value];
	let RotorRingSettings = [document.getElementById("Rotor-RS1").value, document.getElementById("Rotor-RS2").value, document.getElementById("Rotor-RS3").value];
	let PlugBoard = document.getElementById("Plugboard-in").value;
	
	//convert plugboard/plaintext/IV/RS values into Uppercase in case not already and selects the rotors and applies them to the array
	PlainText = PlainText.toUpperCase();
	PlugBoard = PlugBoard.toUpperCase();
	
	for(let i = 0; i < 3; i++){
		SelectedRotors[i] = Rotors[SelectedRotors[i]];
		RotorInitialValues[i] = RotorInitialValues[i].toUpperCase();
		RotorRingSettings[i] = RotorRingSettings[i].toUpperCase();
	}
	
	//make sure plugboard values arent repeating and are only letters.
	let PlugBoardLetters = []; //setup an array to record letters that are ok
	for(let i = 0; i < PlugBoard.length; i++){
		if(PlugBoard.charCodeAt(i) >= 65 && PlugBoard.charCodeAt(i) <=90 && !(PlugBoardLetters.includes(PlugBoard[i]))){
			PlugBoardLetters[i] = PlugBoard[i];
		}else if(PlugBoard.charCodeAt(i) == 32){
			//ignore spaces
		}else{
			Result += "Non Letter Character(s) or Duplicate Letter(s) Detected in Plugboard Input, please only enter unique letter pairs \n\n";
			Issue = true; //mark that an issue has been found
			break;
		} 
	}
	
	//make sure IV/RS values are entered/letters and ensure that Rotors are actually selected
	for(let i = 0; i < 3; i++){
		if(SelectedRotors[i] == "NOSELECTION"){
			Result += "No Rotor Selected For Rotor " + (i+1) + "\n\n";
			Issue = true; //mark that an issue has been found
		}
		if(RotorInitialValues[i] == "" || !(RotorInitialValues[i].charCodeAt(0) >= 65 && RotorInitialValues[i].charCodeAt(0) <= 90) ){
			Result += "No Input or Non-Letter Input in Rotor " + (i+1) + " Initial Value \n\n";
			Issue = true; //mark that an issue has been found
		}
		if(RotorRingSettings[i] == "" || !(RotorRingSettings[i].charCodeAt(0) >= 65 && RotorRingSettings[i].charCodeAt(0) <= 90)){
			Result += "No Input or Non-Letter Input in Rotor " + (i+1) + " Ring Setting \n\n";
			Issue = true; //mark that an issue has been found
		}
	}
	
	if(SelectedReflector == "NOSELECTION"){
		Result += "No Reflector Selected \n\n";
		Issue = true; //mark that an issue has been found
	}
	
	//once all are correct, carry out main function of encryption. Else, display that an error has occurred.
	if(Issue == true){
		return Result;
	}else{
		Result = EnigmaEncrypt(PlainText, SelectedRotors, SelectedReflector, RotorRingSettings, RotorInitialValues, PlugBoard);
		return Result;
	}
}

function EnigmaEncrypt(PlainText, Rotors, Reflector, RingSettings, InitialValues, PlugBoard){
	 //Initialise the Result
	let TempStore = "";
	
	let Rotor3pos = (InitialValues[2].charCodeAt(0) - "A".charCodeAt(0));
	let Rotor2pos = (InitialValues[1].charCodeAt(0) - "A".charCodeAt(0));
	let Rotor1pos = (InitialValues[0].charCodeAt(0) - "A".charCodeAt(0));
	
	//loop through every character of plaintext, ignoring non letter characters
	for(let i = 0; i < PlainText.length; i++){
		if(PlainText[i].charCodeAt(0) >= 65 && PlainText[i].charCodeAt(0) <= 90){
			//rotor positions. As a number, obtained by taking the CharCode Value for A away from the chosen number, returning a number between 0 and 25
			
			let CurrentLetter = PlugBoardSwap(PlainText[i], PlugBoard); //Perform Plugboard check and swap
			
			Rotor3pos = (Rotor3pos + 1) % 26; //increments the pos value, making sure it remains between 0-25
			
			
			//check if rotor2/1 need to be incremented
			if(Rotors[2].charCodeAt(Rotor3pos) >= 97 && Rotors[2].charCodeAt(Rotor3pos) <= 122){
				Rotor2pos = (Rotor2pos + 1) % 26; 
			}
			
			if(Rotors[1].charCodeAt(Rotor2pos) >= 97 && Rotors[1].charCodeAt(Rotor2pos) <= 122){
				Rotor1pos = (Rotor1pos + 1) % 26;
			}
			
			
			
			//first rotor swap
			CurrentLetter = Rotor(CurrentLetter, Rotors[2], RingSettings[2], Rotor3pos, true);
			//second rotor swap
			CurrentLetter = Rotor(CurrentLetter, Rotors[1], RingSettings[1], Rotor2pos, true);
			//third rotor swap
			CurrentLetter = Rotor(CurrentLetter, Rotors[0], RingSettings[0], Rotor1pos, true);
			//Reflector swap
			CurrentLetter = ReflectorFunction(CurrentLetter, Reflector);
			//Back through the Rotors
			CurrentLetter = Rotor(CurrentLetter, Rotors[0], RingSettings[0], Rotor1pos, false);
			CurrentLetter = Rotor(CurrentLetter, Rotors[1], RingSettings[1], Rotor2pos, false);
			CurrentLetter = Rotor(CurrentLetter, Rotors[2], RingSettings[2], Rotor3pos, false);
			
			//finally, back through the plugboard
			CurrentLetter = PlugBoardSwap(CurrentLetter, PlugBoard);
		
			 TempStore += CurrentLetter;
		}
	}
	
	let ArrayTemp = TempStore.split("");
	
	//Spacing to be in format XXXX XXXX XXXX XXXX for historical accuracy
	let SpaceCounter = 0;
	for(let i = 1; i < ArrayTemp.length; i++){
		SpaceCounter++;
		
		if(SpaceCounter % 4 == 0){
			ArrayTemp.splice(i, 0, " ");
			SpaceCounter++;
			i += 2; //skip next element as its a space
		}
	}
	
	let CipherText = ArrayTemp.join("");
	
	return CipherText;
}

function PlugBoardSwap(InputChar, PlugBoard){
	
	if(PlugBoard != ""){
		let PlugboardVal;
		let PlugArray = PlugBoard.split(" "); //create an array of the plugboard elements
		let NewPlugString = PlugArray.join(""); //recreate the string, this time with no spaces between the letter pairs
		
		if(NewPlugString.includes(InputChar)){
			//get the pair, and swap
			for(let i = 0; i < NewPlugString.length; i++){
				if(NewPlugString[i] == InputChar){
					PlugBoardVal = i;
				}
			}
			
			//check if pos is even/odd. If even check left, if odd check right, ignores any whitespace/space errors.
			if(PlugBoardVal % 2 == 0){
				if(NewPlugString.charCodeAt(PlugBoardVal + 1) != 32){
					InputChar = NewPlugString[PlugBoardVal + 1];
				}
			}else{
				if(NewPlugString.charCodeAt(PlugBoardVal - 1) != 32){
					InputChar = NewPlugString[PlugBoardVal - 1];
				}
			} 
			
		}
	}
	
	return InputChar; //return the new swapped letter
}

function Rotor(InputChar, ChosenRotor, RingSetting, CurrentPos, Direction){
	
	/* ROTOR THEORY (so i dont forget when writing the explanation section)
	FOR THE FORWARD (first 3 rotor shifts before the reflector)
	-Get the Letter's position in the alphabet 0-25
	-apply forward/backward CaesarCiphers based on the Ring Position and Settings
	-Map the letter to the ring based on the CaesarCiphers
	-Undo the CaesarCiphers on the rotor shifted Letter
	-map back to the alphabet, exit the cipher 
	
	-for the backward post reflector, do each step in reverse
	*/
	
	let FinalChar = ""; //initialise the final character
	let TempChar; //initialise a temporary store for the char as it is worked on, 0 in case of a problem
	
	if(Direction == true){
		//forward direction
		TempChar = (((InputChar.charCodeAt(0) - "A".charCodeAt(0)) + CurrentPos - (RingSetting.charCodeAt(0) - 65) + 26) % 26); //performs the shift, makes sure its in range 0-25
		//adjust in case of hitting the notch indicator
		let RotorLetterButCapital = ChosenRotor[TempChar].toUpperCase(); //makes sure letter is uppercase
		TempChar = ((RotorLetterButCapital.charCodeAt(0) - 65 - CurrentPos + (RingSetting.charCodeAt(0) - 65) + 26) % 26) + 65;
	}else if(Direction == false){
		//backward direction (post reflector), simply the reverse of the forward direction
		TempChar = String.fromCharCode(((InputChar.charCodeAt(0) - "A".charCodeAt(0)) + CurrentPos  -(RingSetting.charCodeAt(0) - 65) + 26) % 26 + 65); //distance of letter from A, 0-25
		let RotorButCapital = ChosenRotor.toUpperCase(); //convert the rotor string to all uppercase ready for next step
		let CharPos = RotorButCapital.indexOf(TempChar); //get the position in the rotor string of the TempChar.
		TempChar = ((CharPos - CurrentPos + (RingSetting.charCodeAt(0) - 65) + 26) % 26) + 65;
	}
	
	FinalChar = String.fromCharCode(TempChar); //get character from the charcode
	return FinalChar;
}

function ReflectorFunction(InputChar, Reflector){
	let InputCharOffset = InputChar.charCodeAt(0) - "A".charCodeAt(0); //letter distance from A
	InputChar = Reflector[InputCharOffset];
	return InputChar;
}
//function to switch between light and dark colour schemes for the app
function DarkLightToggle(){
	
	//changes the colour scheme
	let body = document.body;
	body.classList.toggle("lightmode");
	
	//switches between the icons for the light/dark mode toggle
	let button = document.getElementById("DarkModeToggle"); //get the current contents of the Button
	let currentImg = button.querySelector('img'); //get the contents of the img tag
	let Indicator = document.getElementById("Indicator").textContent;
	
	if(Indicator == "Dark Mode"){
		Indicator = "Light Mode";
		document.getElementById("Indicator").textContent = Indicator;
	}else{
		Indicator = "Dark Mode";
		document.getElementById("Indicator").textContent = Indicator;
	}
	
	if(currentImg.src.includes("LightModeIcon")){ //check what current icon is used
		currentImg.src = "Images/DarkModeIcon.png";
		currentImg.alt = "Toggle Dark Mode"; //change icon to dark if the current mode is Light
	}else{
		currentImg.src = "Images/LightModeIcon.png";
		currentImg.alt = "Toggle Light Mode"; //change icon to light if the current mode is dark
	}
	
	//changes relevant description picture if mode is changed while image is displayed
	let Diagram = document.getElementById("Diagram");
	let Current = Diagram.src;
	
	if (Current.includes("Light")){
		Current = Current.replace("Light", "Dark");
		document.getElementById("Diagram").src = Current;
	}else{
		Current = Current.replace("Dark", "Light");
		document.getElementById("Diagram").src = Current;
	}
}