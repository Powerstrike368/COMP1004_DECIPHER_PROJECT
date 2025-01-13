//Event listener detects changes to the plaintext-in textarea
document.getElementById("plaintext-in").addEventListener("input", function(){
	
	let PlainText = document.getElementById("plaintext-in").value; //character array (string) for the Input
	let shift = Number(document.getElementById("shift-in").value); //Input for the shift value (returns null if not a number)
	let method = document.getElementById("method-selector").value; //Method Selector store
	let CipherText = ""; //intialises CipherText array as a string
	
	//checks the selected method type
	if(method == "Default"){
		CipherText = PlainText; //with no selection, output mirrors Input
	}else if(method == "Caesar Cipher"){
		CipherText = CaesarCipher(PlainText, shift); //takes a shift and the plaintext for a caesar cipher
	}
	
    document.getElementById("ciphertext-out").value = CipherText; //displays the ciphertext output to the CipherText-in textarea
});

//AT A LATER SPRINT. ADD JSON FILE HANDLING HERE

//Performs a Caesar Cipher
function CaesarCipher(PlainText, shift){
	
	let FinalResult = ""; //initialises string variable
	
	for(let i = 0; i < PlainText.length; i++){
		let CharacterCode = PlainText.charCodeAt(i); //checks the Unicode for the relevant character of the string
		
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
		
		FinalResult += String.fromCharCode(CharacterCode); //accumulate the ciphered string
	}
	
	return FinalResult; //return the ciphered string
}