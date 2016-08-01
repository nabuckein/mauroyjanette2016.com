var signupOrLogin = 0;
	var globalCurrentUser; 
	var userCreatedNewAccount = false;
	var signupFirstName;
	var signupLastName;
	var facebookCredential;
	var emailAndPasswordCredential; 
	var provider = new firebase.auth.FacebookAuthProvider();
	var rsvpAllowed = false;
	
	//var facebookCredential = firebase.auth.FacebookAuthProvider.credential();
	displayHome();

	firebase.auth().onAuthStateChanged(function(user) {
		
	  if (user) {
	    // User is signed in.
	    //globalCurrentUser = firebase.auth().currentUser;
	    //var facebookAccessToken = provider.accessToken;				
	    //var credential = firebase.auth.FacebookAuthProvider.credential(facebookAccessToken);

	    console.log("User has logged in");
	    //emailAndPasswordCredential = firebase.auth.EmailPasswordAuthProvider.credential(email, password);

	 	rsvpAllowed = true;
    	
	    
	    if (user.displayName != null){
	    	document.getElementById('loginStatus').innerHTML = "Hi, " + user.displayName;
   	    	document.getElementById('status').innerHTML = "Welcome, " + user.displayName;
   	    	console.log("User signed-in: " + user.displayName);
   	    }
	    else if(userCreatedNewAccount){
	    	
	    	console.log("User logged in, displayName is null, and user created new account.");

	    	user.updateProfile({
			  displayName: signupFirstName + " " + signupLastName
			  //photoURL: "https://example.com/jane-q-user/profile.jpg"
			}).then(function() {
			  // Update successful.
			  console.log('updateProfile executed succesfully');
			  document.getElementById('loginStatus').innerHTML = "Hi, " + user.displayName;
   	    	  document.getElementById('status').innerHTML = "Welcome, " + user.displayName;
   	    	  console.log("User signed-in: " + user.displayName);

			}, function(error) {
			  // An error happened.
			  console.log('updateProfile error');

			});
			userCreatedNewAccount = false;		
			console.log("User signed-in: " + user.displayName);
			minimizeLoginWindow(100,100);
	    }
	    
	    else{
	    	console.log("User displayName = " + user.displayName);
	    }

	    minimizeLoginWindow(100,100);
	    $('#loginTab').hide();
	    $('#signupTab').hide();
	    $('#logoutTab').fadeIn(500); 


	  }
	  else {
	    // No user is signed in.
	    document.getElementById('loginStatus').innerHTML = "Please sign up or log in.";
	    console.log("User signed-in: None");
	    $('#loginTab').fadeIn(500);
	    $('#signupTab').fadeIn(500);
	    $('#logoutTab').hide();  
	  }
	});




	firebase.auth().getRedirectResult().then(function(result) {
	  if (result.credential) {
	    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
	    var token = result.credential.accessToken;
	    // ...
	    facebookCredential = result.credential;
		

	    /*
	    var emailForCredential = prompt("Please enter the e-mail you want to link to the Facebook account you signed up with:", "");
  	  	var passwordForCredential = prompt("Please enter the password you want to link to the Facebook account you signed up with:", "");
  	  	emailAndPasswordCredential = firebase.auth.EmailPasswordAuthProvider.credential(emailForCredential, passwordForCredential);
  	  	user.link(emailAndPasswordCredential);
		*/

	  }
	  // The signed-in user info.
	  var user = result.user;



      console.log("User signed-in: " + user.displayName);
	  console.log("User displayName = " + user.displayName);
	  document.getElementById('loginStatus').innerHTML = "Hi, " + user.displayName;
   	  document.getElementById('status').innerHTML = "Welcome, " + user.displayName;
   	  $('#loginTab').hide();
	  $('#signupTab').hide();
	  $('#logoutTab').fadeIn(500);
	  rsvpAllowed = true;

	  


	}).catch(function(error) {
	  // Handle Errors here.
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  // The email of the user's account used.
	  var email = error.email;
	  // The firebase.auth.AuthCredential type that was used.
	  var credential = error.credential;

	  // ...

	  console.log("errorCode = " + errorCode + ". errorMessage = " + errorMessage + ". errorEmail = " + email);

	  var auth = firebase.auth();
	  

	  if (error.code === 'auth/account-exists-with-different-credential') {
	    // Step 2.
	    // User's email already exists.
	    // The pending Facebook credential.
	    facebookCredential = error.credential;
	    // The provider account's email address.
	    var email = error.email;
	    // Get registered providers for this email.
	    auth.fetchProvidersForEmail(email).then(function(providers) {
	      // Step 3.
	      // If the user has several providers,
	      // the first provider in the list will be the "recommended" provider to use.
	      console.log(providers);
	      if (providers[0] === 'password') {
		        // Asks the user his password.
		        // In real scenario, you should handle this asynchronously.
		        var password = prompt("Please confirm your password",''); // Implement promptUserForPassword.
		        auth.signInWithEmailAndPassword(email, password).then(function(user) {
		          // Step 4a.
		          return user.link(facebookCredential);
		        }).then(function() {
		          // Facebook account successfully linked to the existing Firebase user.
		          //goToApp();
		          console.log("successfully linked!");
		        });
		        return;
		      }
		      // All the other cases are external providers.
		      // Construct provider object for that provider.
		      // TODO: implement getProviderForProviderId.
		      //var provider = getProviderForProviderId(providers[0]);
		      // At this point, you should let the user know that he already has an account
		      // but with a different provider, and let him validate the fact he wants to
		      // sign in with this provider.
		      // Sign in to provider. Note: browsers usually block popup triggered asynchronously,
		      // so in real scenario you should ask the user to click on a "continue" button
		      // that will trigger the signInWithPopup.
	/*	      auth.signInWithPopup(provider).then(function(result) {
		        // Remember that the user may have signed in with an account that has a different email
		        // address than the first one. This can happen as Firebase doesn't control the provider's
		        // sign in flow and the user is free to login using whichever account he owns.
		        // Step 4b.
		        // Link to Facebook credential.
		        // As we have access to the pending credential, we can directly call the link method.
		        result.user.link(facebookCredential).then(function() {
		          // Facebook account successfully linked to the existing Firebase user.
		          goToApp();
		        });
		      }); */
		    });
		  }

	 
	  

	});



	var map;
	var infowindow;
	var loggedIn = ''; //variable to determine how user is logged in.
	var logInMethod = '0';
	 // Initialize Firebase
	
	

	  ////////////////////////////////////////////////////

	function callback(results, status) {
	  if (status === google.maps.places.PlacesServiceStatus.OK) {
	    for (var i = 0; i < results.length; i++) {
	      createMarker(results[i]);
	    }
	  }
	}

	function createMarker(place) {
	  var placeLoc = place.geometry.location;
	  var marker = new google.maps.Marker({
	    map: map,
	    position: place.geometry.location
	  });
	  

	  google.maps.event.addListener(marker, 'click', function() {
	    infowindow.setContent(place.name);

	    infowindow.open(map, this);
	  });
	}



	  // Load the facebook SDK asynchronously
	  

	  function logoutFB(){
		FB.logout(function(response) {
		    document.getElementById('status').innerHTML = "You've been logged out FB, thanks for using our app " + response.name + '!';
		});
	  }

	  //////////////////////////////////////////////////////////
	

	function displayHome(){

		$('#floatTest').hide();
		//$('#loginTab').hide();
		$('#rsvpConfirm').hide();
		$('#userFirstName').hide();
		$('#userLastName').hide();
		$('#churchDisplay').hide();
		$('#our-story').hide();
		$('#registry').hide();
		$('#accomodations').hide();
		$('#rsvpConfirm').hide();
		$('#logoutConfirm').hide();
		$('#rsvpNotAllowed').hide();
		$('#cont1').fadeIn(500);

	}
	function ourStory(){
		$('#initialDisplay').hide();
		$('#registry').hide();
		$('#accomodations').hide();		
		$('#churchDisplay').hide();
		$('#our-story').fadeIn(500);
	}
	function registry(){
		$('#initialDisplay').hide();
		$('#our-story').hide();
		$('#accomodations').hide();		
		$('#churchDisplay').hide();
		$('#registry').fadeIn(500);
	}
	function accomodations(){
		$('#initialDisplay').hide();
		$('#registry').hide();
		$('#our-story').hide();		
		$('#churchDisplay').hide();
		$('#accomodations').fadeIn(500);
		initMap();
	}

	function churchDisplay(){
		$('#initialDisplay').hide();
		$('#registry').hide();
		$('#our-story').hide();
		$('#accomodations').hide();		
		$('#churchDisplay').fadeIn(500);
	}

	function maximizeLoginWindow(buttonPressed){

		$('#cont1').hide();
		$('#status').fadeIn(500);
		$('#fb-login-button').fadeIn(500);		
		$('#logoutTab').fadeIn(500);
		console.log(buttonPressed);
		$('#floatTest').fadeIn(500);

		if (buttonPressed == 0){
			console.log("0 passed");
			$('#loginFirstNameLabel').fadeIn(500);
			$('#loginFirstNameInput').fadeIn(500);
			$('#loginLastNameLabel').fadeIn(500);
			$('#loginLastNameInput').fadeIn(500);
			$('#loginButtonFirebase').hide();
			$('#loginButtonFacebook').hide();
			$('#signupFirebase').fadeIn(500);
			document.getElementById('status').innerHTML = "Please sign up."
		}
		else{

			console.log("1 passed");
			$('#loginFirstNameLabel').hide();
			$('#loginFirstNameInput').hide();
			$('#loginLastNameLabel').hide();
			$('#loginLastNameInput').hide();
			$('#signupFirebase').hide();
			$('#loginButtonFirebase').fadeIn(500);
			$('#loginButtonFacebook').fadeIn(500);
			document.getElementById('status').innerHTML = "Please log in with your e-mail and password or your Facebook credentials."

			//alert("False");

		}
		
	}

	function minimizeLoginWindow(hideRate, fadeInRate){
		$('#floatTest').hide(hideRate);
		$('#cont1').fadeIn(fadeInRate);
		

		if (globalCurrentUser) {
		  // User is signed in.
		  $('#loginTab').hide();
		  $('#signupTab').hide();
		  $('#logoutTab').fadeIn(500);
		  

		} else {
		  // No user is signed in.
		  $('#logoutTab').hide();
		  $('#loginTab').fadeIn(500);
		  $('#signupTab').fadeIn(500);
		}
	}
	
	function writeUserData(userId, email) {
		name = document.getElementById('loginInput').value;
		firebase.database().ref('users/' + userId).set({
		username: name,
		email: email
	  });
	}

	function logoutConfirmation(){
		$('#cont1').hide();
		$('#logoutConfirm').fadeIn(500);
	}

	function minimizeLogoutConfirmation(){
		$('#cont1').fadeIn(500);
		$('#logoutConfirm').hide();
	}

	function rsvpConfirmation(){
		
		if (rsvpAllowed){
			$('#enterAttendantsInfo').hide();
			$('#userFirstNameLabel').hide();
			$('#userFirstNameInput').hide();
			$('#userLastNameLabel').hide();
			$('#userLastNameInput').hide();
			$('#userEmailLabel').hide();
			$('#userEmailInput').hide();
			$('#userEntreeLabel').hide();
			$('#userEntreeLabel1').hide();
			$('#userEntreeLabel2').hide();
			$('#userEntreeInputRadio1').hide();
			$('#userEntreeInputRadio2').hide();

			$('#guestEntreeChoices1').hide();
			$('#guestEntreeChoices2').hide();
			$('#guestEntreeChoices3').hide();
			$('#guestEntreeChoices4').hide();		

			$('#submitAttendantsInfo').hide();
			$('#cancelSubmitAttendantsInfo').hide();	

			$('#bringingGuests').hide();
			$('#yesBringingGuest').hide();
			$('#noBringingGuest').hide();		
			$('#howManyGuestsLabel').hide();
			$('#howManyGuestsInput').hide();	
			$('#howManyGuestsButton').hide();	
			$('#rsvpGuestConfirmText').hide();
			$('#firstNameLabel1').hide();
			$('#firstNameInput1').hide();
			$('#lastNameLabel1').hide();
			$('#lastNameInput1').hide();
			$('#firstNameLabel2').hide();
			$('#firstNameInput2').hide();
			$('#lastNameLabel2').hide();
			$('#lastNameInput2').hide();
			$('#firstNameLabel3').hide();
			$('#firstNameInput3').hide();
			$('#lastNameLabel3').hide();
			$('#lastNameInput3').hide();
			$('#firstNameLabel4').hide();
			$('#firstNameInput4').hide();
			$('#lastNameLabel4').hide();
			$('#lastNameInput4').hide();
			$('#firstNameLabel5').hide();
			$('#firstNameInput5').hide();
			$('#lastNameLabel5').hide();
			$('#lastNameInput5').hide();
			$('#submitGuestsInfo').hide();
			$('#cont1').hide();
			$('#rsvpConfirm').fadeIn(500);
		}
		else{
			$('#cont1').hide();
			$('#rsvpNotAllowed').fadeIn(500);
		}
		$('#rsvpButton').css({"background-color":"var(--tab-bg-color)", "color":"var(--title-font-color)"}) //Need this becaus when popping up #rsvpConfirm the RSVP button doesn't get a chance to get back to its initial color and background state.


	}

	function minimizeRsvpConfirmation(){
		$('#rsvpConfirm').hide();
		$('#cont1').fadeIn(500);
	}

	function minimizeRsvpNotAllowed(){
		
		
		$('#rsvpNotAllowed').hide();
		$('#cont1').fadeIn(500);
	}

	function submitAttendantsInfo(){
		var submitValid = false;
		
			$('#enterAttendantsInfo').hide();
			$('#rsvpConfirmText').hide();
			$('#userFirstNameLabel').hide();
			$('#userFirstNameInput').hide();
			$('#userLastNameLabel').hide();
			$('#userLastNameInput').hide();
			$('#userEmailLabel').hide();
			$('#userEmailInput').hide();
			$('#userEntreeLabel').hide();
			$('#userEntreeLabel1').hide();
			$('#userEntreeLabel2').hide();
			$('#userEntreeInputRadio1').hide();
			$('#userEntreeInputRadio2').hide();

			$('#submitAttendantsInfo').hide();		
			$('#cancelSubmitAttendantsInfo').hide();

			var usersFirstName = document.getElementById('userFirstNameInput').value;
			var usersLastName = document.getElementById('userLastNameInput').value;
			var usersEmail = document.getElementById('userEmailInput').value;
			var usersEntree1 = document.getElementById('userEntreeInputRadio1').checked;
			var usersEntree2 = document.getElementById('userEntreeInputRadio2').checked;
			var userEntreeChoice;
			//console.log(usersEntree1 + " " + usersEntree2);
			if (usersEntree1){
				userEntreeChoice = 'River Roast Chicken';
				submitValid = true;
			}
			else if (usersEntree2){
				userEntreeChoice = 'Slow Roasted Pork';
				submitValid = true;
			}
			else{
				alert('Please pick an entree');
				minimizeRsvpConfirmation();
				rsvpConfirmation();
				$('#enterAttendantsInfo').fadeIn(500);
				$('#rsvpConfirmText').fadeIn(500);
				$('#userFirstNameLabel').fadeIn(500);
				$('#userFirstNameInput').fadeIn(500);
				$('#userLastNameLabel').fadeIn(500);
				$('#userLastNameInput').fadeIn(500);
				$('#userEmailLabel').fadeIn(500);
				$('#userEmailInput').fadeIn(500);
				$('#userEntreeLabel').fadeIn(500);
				$('#userEntreeLabel1').fadeIn(500);
				$('#userEntreeLabel2').fadeIn(500);
				$('#userEntreeInputRadio1').fadeIn(500);
				$('#userEntreeInputRadio2').fadeIn(500);
				$('#cancelSubmitAttendantsInfo').fadeIn(500);
				$('#submitAttendantsInfo').fadeIn(500);
			}
			console.log(userEntreeChoice);
			if (usersFirstName!='' && usersLastName !='' && submitValid){
				var userFirstAndLastName = usersFirstName + " " + usersLastName;
				firebase.database().ref('users/' + userFirstAndLastName).push({
					e_mail: usersEmail,
					entree: userEntreeChoice
				});
				$('#bringingGuests').fadeIn(500);
				$('#yesBringingGuest').fadeIn(500);
				$('#noBringingGuest').fadeIn(500);
			}else{
				alert('Please make sure you entered your first name and last name.');
				minimizeRsvpConfirmation();
				rsvpConfirmation();
				$('#enterAttendantsInfo').fadeIn(500);
				$('#rsvpConfirmText').fadeIn(500);
				$('#userFirstNameLabel').fadeIn(500);
				$('#userFirstNameInput').fadeIn(500);
				$('#userLastNameLabel').fadeIn(500);
				$('#userLastNameInput').fadeIn(500);
				$('#userEmailLabel').fadeIn(500);
				$('#userEmailInput').fadeIn(500);
				$('#userEntreeLabel').fadeIn(500);
				$('#userEntreeLabel1').fadeIn(500);
				$('#userEntreeLabel2').fadeIn(500);
				$('#userEntreeInputRadio1').fadeIn(500);
				$('#userEntreeInputRadio2').fadeIn(500);

				$('#submitAttendantsInfo').fadeIn(500);
				$('#cancelSubmitAttendantsInfo').fadeIn(500);

			}
			
		
	}

	function cancelSubmitAttendantsInfo(){
		$('#rsvpConfirm').hide();
		$('#cont1').fadeIn(500);
	}

	function yesBringingGuest(){
		$('#noBringingGuest').hide();
		$('#yesBringingGuest').hide();
		$('#howManyGuestsLabel').fadeIn(500);
		$('#howManyGuestsInput').fadeIn(500);
		$('#howManyGuestsButton').fadeIn(500);		
	}			
	
	function noBringingGuest(){
		$('#noBringingGuest').hide();
		$('#yesBringingGuest').hide();
		document.getElementById('bringingGuests').innerHTML = 'Thank you, we look forward to seeing you there!';
		$('#submitGuestsInfo').fadeIn(500);

	}

	function howManyGuests(){
		$('#yesBringingGuest').hide();
		$('#noBringingGuest').hide();
		$('#rsvpConfirmText').hide();
		$('#howManyGuestsLabel').hide();
		$('#howManyGuestsInput').hide();
		$('#howManyGuestsButton').hide();
		$('#rsvpGuestConfirmText').fadeIn(500);
		var correctNumberOfGuests=false;


		var howManyGuests = document.getElementById('howManyGuestsInput').value;

		switch(howManyGuests){
			case '1':
				$('#firstNameLabel1').fadeIn(500);
				$('#firstNameInput1').fadeIn(500);
				$('#lastNameLabel1').fadeIn(500);
				$('#lastNameInput1').fadeIn(500);

				$('#guestEntreeChoices1').fadeIn(500);
				
				correctNumberOfGuests=true;
				break;

			case '2':
				$('#firstNameLabel1').fadeIn(500);
				$('#firstNameInput1').fadeIn(500);
				$('#lastNameLabel1').fadeIn(500);
				$('#lastNameInput1').fadeIn(500);
				$('#firstNameLabel2').fadeIn(500);
				$('#firstNameInput2').fadeIn(500);
				$('#lastNameLabel2').fadeIn(500);
				$('#lastNameInput2').fadeIn(500);

				$('#guestEntreeChoices1').fadeIn(500);
				$('#guestEntreeChoices2').fadeIn(500);
				
				correctNumberOfGuests=true;
				break;

			case '3':
				$('#firstNameLabel1').fadeIn(500);
				$('#firstNameInput1').fadeIn(500);
				$('#lastNameLabel1').fadeIn(500);
				$('#lastNameInput1').fadeIn(500);
				$('#firstNameLabel2').fadeIn(500);
				$('#firstNameInput2').fadeIn(500);
				$('#lastNameLabel2').fadeIn(500);
				$('#lastNameInput2').fadeIn(500);
				$('#firstNameLabel3').fadeIn(500);
				$('#firstNameInput3').fadeIn(500);
				$('#lastNameLabel3').fadeIn(500);
				$('#lastNameInput3').fadeIn(500);

				$('#guestEntreeChoices1').fadeIn(500);
				$('#guestEntreeChoices2').fadeIn(500);
				$('#guestEntreeChoices3').fadeIn(500);

				correctNumberOfGuests=true;
				break;

			case '4':
				$('#firstNameLabel1').fadeIn(500);
				$('#firstNameInput1').fadeIn(500);
				$('#lastNameLabel1').fadeIn(500);
				$('#lastNameInput1').fadeIn(500);
				$('#firstNameLabel2').fadeIn(500);
				$('#firstNameInput2').fadeIn(500);
				$('#lastNameLabel2').fadeIn(500);
				$('#lastNameInput2').fadeIn(500);
				$('#firstNameLabel3').fadeIn(500);
				$('#firstNameInput3').fadeIn(500);
				$('#lastNameLabel3').fadeIn(500);
				$('#lastNameInput3').fadeIn(500);
				$('#firstNameLabel4').fadeIn(500);
				$('#firstNameInput4').fadeIn(500);
				$('#lastNameLabel4').fadeIn(500);
				$('#lastNameInput4').fadeIn(500);

				$('#guestEntreeChoices1').fadeIn(500);
				$('#guestEntreeChoices2').fadeIn(500);
				$('#guestEntreeChoices3').fadeIn(500);
				$('#guestEntreeChoices4').fadeIn(500);

				correctNumberOfGuests=true;
				break;
			
			default:
				alert("Please enter up to 4 guests. Thank you! :)");
				$('#submitGuestsInfo').hide();
				$('#rsvpGuestConfirmText').hide();
				$('#yesBringingGuest').fadeIn(500);
				$('#noBringingGuest').fadeIn(500);
				correctNumberOfGuests=false;									
		}
		if (correctNumberOfGuests){
			$('#submitGuestsInfo').fadeIn(500);
			$('#rsvpGuestConfirmText').fadeIn(500);
		}
		else{
			$('#submitGuestsInfo').hide();
			$('#rsvpGuestConfirmText').hide();
		}
		
	}


	
	function submitGuestsInfo(){
		
		$('#rsvpConfirm').hide();
		$('#cont1').fadeIn(500);
		var firstNameInput1 = document.getElementById('firstNameInput1').value;
		var lastNameInput1 = document.getElementById('lastNameInput1').value;
		var firstNameInput2 = document.getElementById('firstNameInput2').value;
		var lastNameInput2 = document.getElementById('lastNameInput2').value;
		var firstNameInput3 = document.getElementById('firstNameInput3').value;
		var lastNameInput3 = document.getElementById('lastNameInput3').value;
		var firstNameInput4 = document.getElementById('firstNameInput4').value;
		var lastNameInput4 = document.getElementById('lastNameInput4').value;
		//var firstNameInput5 = document.getElementById('firstNameInput5').value;
		//var lastNameInput5 = document.getElementById('lastNameInput5').value;

		var usersFirstName = document.getElementById('userFirstNameInput').value;
		var usersLastName = document.getElementById('userLastNameInput').value;
		var userFirstAndLastName = usersFirstName + " " + usersLastName;

		var n; 
	
		for (n=1 ; n<=3 ; n++){
			var getGuestsEntreeChoice = 'guestEntreeInputRadio1' + n;
			var inputNumber = document.getElementById(getGuestsEntreeChoice).checked;
				if (inputNumber){
					var pos = 'guestEntreeLabel1' + n;
					var choice = document.getElementById(pos).innerHTML;
					firebase.database().ref('users/' + userFirstAndLastName).push({
						guest_1: firstNameInput1 + " " + lastNameInput1,
						entree_choice: choice
					});
				}
				
		}
		n=1;
		for (n=1 ; n<=3 ; n++){
			var getGuestsEntreeChoice = 'guestEntreeInputRadio2' + n;
			var inputNumber = document.getElementById(getGuestsEntreeChoice).checked;
				if (inputNumber){
					var pos = 'guestEntreeLabel2' + n;
					var choice = document.getElementById(pos).innerHTML;
					firebase.database().ref('users/' + userFirstAndLastName).push({
						guest_2: firstNameInput2 + " " + lastNameInput2,
						entree_choice: choice
					});
				}
				
		}
		n=1;
		for (n=1 ; n<=3 ; n++){
			var getGuestsEntreeChoice = 'guestEntreeInputRadio3' + n;
			var inputNumber = document.getElementById(getGuestsEntreeChoice).checked;
				if (inputNumber){
					var pos = 'guestEntreeLabel3' + n;
					var choice = document.getElementById(pos).innerHTML;
					firebase.database().ref('users/' + userFirstAndLastName).push({
						guest_3: firstNameInput3 + " " + lastNameInput3,
   						entree_choice: choice
					});
				}
				
		}
		n=1;
		for (n=1 ; n<=3 ; n++){
			var getGuestsEntreeChoice = 'guestEntreeInputRadio4' + n;
			var inputNumber = document.getElementById(getGuestsEntreeChoice).checked;
				if (inputNumber){
					var pos = 'guestEntreeLabel4' + n;
					var choice = document.getElementById(pos).innerHTML;
					var guestNumber = 'guest_' + n;
					firebase.database().ref('users/' + userFirstAndLastName).push({
						guest_4: firstNameInput4 + " " + lastNameInput4,
						entree_choice: choice
					});
				}
				
		}
		

		
		
	}
	function saveCurrentUserAsAttendant(){
		$('#yesRsvpButton').hide();
		$('#noRsvpButton').hide();
		$('#enterAttendantsInfo').fadeIn();
		$('#userFirstNameLabel').fadeIn(1000);
		$('#userFirstNameInput').fadeIn(1000);
		$('#userLastNameLabel').fadeIn(1000);
		$('#userLastNameInput').fadeIn(1000);
		$('#userEmailLabel').fadeIn(1000);
		$('#userEmailInput').fadeIn(1000);
		$('#userEntreeLabel').fadeIn(1000);
		$('#userEntreeLabel1').fadeIn(1000);
		$('#userEntreeLabel2').fadeIn(1000);
		$('#userEntreeInputRadio1').fadeIn(1000);
		$('#userEntreeInputRadio2').fadeIn(1000);
		$('#submitAttendantsInfo').fadeIn(1000);	
		$('#cancelSubmitAttendantsInfo').fadeIn(500);	

		
	}



  function signupFirebase(){
  	userCreatedNewAccount = true;

  	if (document.getElementById('loginUsernameInput').value != '' && document.getElementById('loginPasswordInput').value != ''){
  		var usernameFirebase = document.getElementById('loginUsernameInput').value;
  		var passwordFirebase = document.getElementById('loginPasswordInput').value;
  		signupFirstName = document.getElementById('loginFirstNameInput').value;
  		signupLastName = document.getElementById('loginLastNameInput').value;
  		//var loginStatus = document.getElementById('loginStatus').innerHTML;

  		console.log("Username Firebase = " + usernameFirebase + ", Password Firebase = " + passwordFirebase );

  		firebase.auth().createUserWithEmailAndPassword(usernameFirebase, passwordFirebase).catch(function(error) {
		  // Handle Errors here.
		  console.log(error.code + error.message);
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  if (errorCode = 'auth/email-already-in-use'){
		  	//alert("Error when creating new user. " + errorMessage );
		  	document.getElementById('status').innerHTML = "Error when creating new user. " + errorMessage ;
		  }
		  else{
		  	document.getElementById('status').innerHTML = "Something went wrong, please create a new user, try again, or try signing in with Facebook";
		  }
		  
		});
  		
  		

  	}
  	else{
  		document.getElementById('status').innerHTML = "Please check Username and Password fields...";
  	}
  	
  }

  
  



  function logIntoFacebook(){

  	firebase.auth().signInWithRedirect(provider);

  }

  function logIntoFirebase(){

  	if (document.getElementById('loginUsernameInput').value != '' && document.getElementById('loginPasswordInput').value != ''){
  		var usernameFirebase = document.getElementById('loginUsernameInput').value;
  		var passwordFirebase = document.getElementById('loginPasswordInput').value;

  		console.log("Username Firebase = " + usernameFirebase + ", Password Firebase = " + passwordFirebase );



  		firebase.auth().signInWithEmailAndPassword(usernameFirebase, passwordFirebase).catch(function(error) {
		  // Handle Errors here.
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  console.log("errorCode = " + errorCode);
		  if (errorCode == 'auth/user-not-found'){
		  	document.getElementById('status').innerHTML = "User does not exist, please sign up or log in with Facebook.";
		  	$('#loginButtonFirebase').hide();
		  	$('#signupFirebase').fadeIn(500);
		  }
		  else if (errorCode == 'auth/invalid-email'){
		  	document.getElementById('status').innerHTML = "Looks like the e-mail address is not valid, please enter a valid one.";

		  }
		  else if (errorCode == 'auth/wrong-password'){
		  	var providerAuth = firebase.auth();
  			if (providerAuth.fetchProvidersForEmail(usernameFirebase)!=null){ //look for other auth providers used before with same e-mail


  				var providers = providerAuth.fetchProvidersForEmail(usernameFirebase);
  				console.log("User already exists with the following provider: " + providers[0]);  	
  				
  				providerAuth.signInWithRedirect(provider);
  				
  				console.log("!!!!!!!!!!!!!!!!");
  					
  			}
		  	else{
		  		document.getElementById('status').innerHTML = "Looks like your password is wrong, please try re-entering it.";
		  	}

		  }else if (errorCode == 'auth/user-disabled'){
		  	document.getElementById('status').innerHTML = "Your user has been disabled.";

		  }  	
		  

		  // ...
		});



  	}
  	else{
  		console.log("Username OR Password OR both are null");
  		document.getElementById('status').innerHTML = "Please check Username and Password fields...";
  	}
  	
  }


function yesLogoutPressed(){
  	//logoutFB(); //CAUTION, this will log you out from Facebook as well
  	firebase.auth().signOut().then(function() {
	  // Sign-out successful.
	}, function(error) {
	  // An error happened.
	});
	$('#loginTab').fadeIn(500);
	$('#signupTab').fadeIn(500);
	rsvpAllowed = false;
  	minimizeLogoutConfirmation();

  }