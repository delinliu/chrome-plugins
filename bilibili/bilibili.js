
main();

function main(){
	hideAd();
	toWideEntry();
	bindKey();
}

// hide advertisements
function hideAd(){
	$('.ad-f').css('display', 'none');
	$('.ad').css('display', 'none')
	hidePlayerAd();
}

function hidePlayerAd(){
	
	var promoteWrap = $('.bilibili-player-promote-wrap');
	if(promoteWrap.length > 0){
		promoteWrap.css('display', 'none');
	}else{
		setTimeout(hidePlayerAd, 10);
	}
}

// set the html5 player to wide screen
function toWideEntry(){
	setTimeout(toWide, 10);
}

function toWide(){
	try{
		//document.getElementsByName('widescreen')[0].click();
		$('[name=widescreen]')[0].click();
	}catch(e){
		console.log(e);
		toWideEntry();
	}
}

function bindKey(){
	$(document).keydown(function(e){
		if(e.ctrlKey == true){
			if(e.shiftKey == true){
				if(e.keyCode == 90){ // ctrl + shift + z
					$('[name=browser_fullscreen]')[0].click(); // full screen
					$('[name=widescreen]')[0].click(); // if it quits full screen, set it to wide screen
				}else if(e.keyCode == 88){ // ctrl + shift + x
					$('[name=widescreen]')[0].click(); // wide screen
				}
			}			
		}
	});
}
