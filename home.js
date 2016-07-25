$(function(){
	var images = ["weddingBg.jpg", "maujan2016.jpg", "bg.jpg"];
	var image = $('#img0');
	var i=0;
	var offset = 100;
	var windowHeight = window.innerHeight;
	var windowWidth = window.innerWidth;

	var backToTopY = (windowHeight *80 )/100;   //Fix this (3200) to properly adjust #back-to-top
	var histScroll = document.getElementById('our-story').offsetTop;
	var regScroll = document.getElementById('registry').offsetTop;
	var accoScroll = document.getElementById('accomodations').offsetTop;
	var initBackToTopOffsetTop = document.getElementById('back-to-top').offsetTop;
	var floatTestHeightString = document.getElementById('floatTest').style.height;
	var floatTestWidthString = document.getElementById('floatTest').style.width;
	var floatTestHeight = Number(floatTestHeightString[0] + floatTestHeightString[1] + floatTestHeightString[2]);	
	var floatTestWidth = Number(floatTestWidthString[0] + floatTestWidthString[1] + floatTestWidthString[2]);
	var floatTestHeightOffset = floatTestHeight-(floatTestHeight/2);
	var floatTestWidthOffset = floatTestWidth-(floatTestWidth/2);

	/*
	console.log(floatTestHeight);
	console.log(floatTestWidth);
	console.log(floatTestHeightOffset);
	console.log(floatTestWidthOffset);
	*/
	
	//Initial Display or home------------------------------------------------------------------------------------------------//
	


	$('#floatTest').css({"marginTop":-floatTestHeightOffset});
	$('#floatTest').css({"marginLeft":-floatTestWidthOffset});
	
	//$('#floatTest').hide();
	//$('#floatTest').slideDown(1000);


	$('#logOutButton').hide();
	$('#logOutButton').show(1000);
	$('#cancelButton').hide();
	$('#cancelButton').show(1000);


	//alert(windowHeight);
	var resized = false;
	//var reloaded = false;

	
	/*Flag if window has been reloaded or resized-----------------------------------------------*/ 
	

	$(window).resize(function(){
		resized = true;
		//location.reload();
		//console.log("Refreshed! " + initBackToTopOffsetTop);
			
	});
	

	/* -----------------------------------------------------------------*/



	$(document).click(function(){
		//console.log(windowHeight + " " + windowWidth + " " + document.getElementById('registry').offsetTop + " " + document.getElementById('registry').scrollTop);

	});

	/*Animate #main-title-----------------------------------------------*/ 
	
	$('#main-title').hide();
	$('#main-title').fadeIn(2500);
	setInterval(function() {
  		$('#main-title').effect( "bounce", { times: 1 }, 300 );
	},6000);
	
	/* -----------------------------------------------------------------*/
	
	/*Hide and display '#back-to-top' button/link, and overlay color on background image-----------------------*/ 

	$('#back-to-top').hide();

	if (resized){
		$('#back-to-top').show();
		resize = false;
		
	}
	
	
	$('#back-to-top').css({"top":backToTopY});
	$(document).scroll(function(){
		console.log($(this).scrollTop() + " " + offset);
		if ($(this).scrollTop()>offset){				
				$('#back-to-top').fadeIn(250);
				}
		else{
				$('#back-to-top').hide(250);

				}
		if ($(this).scrollTop()>=document.getElementById('our-story').offsetTop-150 && $(this).scrollTop()<=document.getElementById('registry').offsetTop - 200){
				$('#body').css({"background-blend-mode":"overlay"});
				}
		else{
				$('#body').css({"background-blend-mode":"normal"});
				}	

	});
	
	/* -----------------------------------------------------------------*/

	/*Scroll to the Top when #back-to-top is clicked*/ 
	
	$('#back-to-top').click(function(){
		console.log("#back-to-top CLICKED!");
		
		$('html,body').animate({scrollTop:1},500);
	});
	
	/* -----------------------------------------------------------------*/
	
	/*Fade images in and out (HTML commented out)-------------------------------------------*/
	
	setInterval(function(){
		image.hide(1000, function(){
			image.attr("src", images[i++]);
			//console.log(i);
			image.fadeIn(1000);			
		});
		if (i == images.length)
			i=0;
	}, 4000);

	/* -----------------------------------------------------------------*/





	/*Buttons functionality-------------------------------------------*/

	$("#rsvpButton").hover(function(){
	$(this).css({"background-color":"var(--tab-bg-active-color)", "color":"white"});},function(){
			$(this).css({"background-color":"var(--tab-bg-color)", "color":"var(--title-font-color)"})});	
	
	$("#rsvpTab").click(function(){
		//$(this).animate({marginLeft:"-=5px",marginTop:"-=5px",height:"+=10px", width:"+=5px"},100);},function(){$(this).animate({marginLeft:"+=5px",marginTop:"+=5px",height:"-=10px", width:"-=5"},100)
		$(this).effect("shake",{direction:"up",distance:2,times:1},150);
	});
		
	/*$("#rsvpTab").click(function(){
		$(this).toggle("scale",{percent:80 },3000)
	});
	*/	

	$("#histButton").hover(function(){
	$(this).css({"background-color":"var(--tab-bg-active-color)", "color":"white"});},function(){
			$(this).css({"background-color":"var(--tab-bg-color)", "color":"var(--title-font-color)"})});
	$("#histTab").click(function(){
		//$(this).animate({marginLeft:"-=5px",marginTop:"-=5px",height:"+=10px", width:"+=5px"},100);},function(){$(this).animate({marginLeft:"+=5px",marginTop:"+=5px",height:"-=10px", width:"-=5"},100)
		$(this).effect("shake",{direction:"up",distance:2,times:1},150);

	});

	$("#regButton").hover(function(){
	$(this).css({"background-color":"var(--tab-bg-active-color)", "color":"white"});},function(){
			$(this).css({"background-color":"var(--tab-bg-color)", "color":"var(--title-font-color)"})});	
	$("#regTab").click(function(){
		//$(this).animate({marginLeft:"-=5px",marginTop:"-=5px",height:"+=10px", width:"+=5px"},100);},function(){$(this).animate({marginLeft:"+=5px",marginTop:"+=5px",height:"-=10px", width:"-=5"},100)
		$(this).effect("shake",{direction:"up",distance:2,times:1},150);
	});		
			

	
	$("#accoButton").hover(function(){
	$(this).css({"background-color":"var(--tab-bg-active-color)", "color":"white"});},function(){
			$(this).css({"background-color":"var(--tab-bg-color)", "color":"var(--title-font-color)"})});
			
	$("#accoTab").click(function(){
		//$(this).animate({marginLeft:"-=5px",marginTop:"-=5px",height:"+=10px", width:"+=5px"},100);},function(){$(this).animate({marginLeft:"+=5px",marginTop:"+=5px",height:"-=10px", width:"-=5"},100)
		$(this).effect("shake",{direction:"up",distance:2,times:1},150);
		//$('html,body').animate({scrollTop:accoScroll},500);
	});


	$("#churchButton").hover(function(){
	$(this).css({"background-color":"var(--tab-bg-active-color)", "color":"white"});},function(){
			$(this).css({"background-color":"var(--tab-bg-color)", "color":"var(--title-font-color)"})});	
	$("#churchTab").click(function(){
		//$(this).animate({marginLeft:"-=5px",marginTop:"-=5px",height:"+=10px", width:"+=5px"},100);},function(){$(this).animate({marginLeft:"+=5px",marginTop:"+=5px",height:"-=10px", width:"-=5"},100)
		$(this).effect("shake",{direction:"up",distance:2,times:1},150);
		
	});	


	$("#loginButton").hover(function(){
	$(this).css({"background-color":"var(--login-tab-active-color)", "color":"white"});},function(){
			$(this).css({"background-color":"var(--login-button-bg-color)", "color":"var(--title-font-color)"})});
			
	$("#loginTab").click(function(){
		//$(this).animate({marginLeft:"-=5px",marginTop:"-=5px",height:"+=10px", width:"+=5px"},100);},function(){$(this).animate({marginLeft:"+=5px",marginTop:"+=5px",height:"-=10px", width:"-=5"},100)
		$(this).effect("shake",{direction:"up",distance:2,times:1},150);
	});

	$("#logoutButton").hover(function(){
	$(this).css({"background-color":"var(--login-tab-active-color)", "color":"white"});},function(){
			$(this).css({"background-color":"var(--login-button-bg-color)", "color":"var(--title-font-color)"})});
			
	$("#logoutTab").click(function(){
		//$(this).animate({marginLeft:"-=5px",marginTop:"-=5px",height:"+=10px", width:"+=5px"},100);},function(){$(this).animate({marginLeft:"+=5px",marginTop:"+=5px",height:"-=10px", width:"-=5"},100)
		$(this).effect("shake",{direction:"up",distance:2,times:1},150);
	});
	
	
});