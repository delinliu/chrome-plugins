
var type;
main();

function main(){
	var mainUrl = location.href;
	var videoReg = '^https?://www\\.bilibili\\.com/video/av.*';
	var playerReg = '^https?://www\\.bilibili\\.com/html/html5player\\.html';
	var animationReg = '^https?://www\\.bangumi\\.bilibili\\.com/anime/*';
	console.log(mainUrl);
	if(new RegExp(videoReg).test(mainUrl)){
		type = 'video';
		addShadow();
		toWideEntry();
		bindKey();
		scrollPage();
	}else if(new RegExp(playerReg).test(mainUrl)){
		type = 'player';
		addShadow();
		toWideEntry();
		bindKey();
	}else if(new RegExp(animationReg).test(mainUrl)){
		type = 'animation';
		console.log('animation')
	}
}

// it cannot be used because chrome security policy
function waitPlayerLoaded(){
	if($('.bilibiliHtml5Player')[0] === undefined){
		setTimeout(waitPlayerLoaded, 10);
	}else if($($('.bilibiliHtml5Player')[0].contentWindow.document).find('[name=widescreen]')[0] === undefined){
		setTimeout(waitPlayerLoaded, 10);
	}else{
		$($('.bilibiliHtml5Player')[0].contentWindow.document).find('[name=widescreen]')
		console.log($('.bilibiliHtml5Player')[0]);
	}
	//console.log($('.bilibiliHtml5Player')[0].contentWindow.document)
}

function addShadow(){
	$('body').append('<div id="shadow-001" style="z-index:2147483647;bottom:0;position:fixed;height:0px;width:100%;background:black"></div>');
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
				var shadowId = '#shadow-001';
				if(e.keyCode == 'Z'.charCodeAt(0)){ // ctrl + shift + z
					$('[name=browser_fullscreen]')[0].click(); // full screen
					$('[name=widescreen]')[0].click(); // if it quits full screen, set it to wide screen
				}else if(e.keyCode == 'X'.charCodeAt(0)){ // ctrl + shift + x
					$('[name=widescreen]')[0].click(); // wide screen
				}else if(e.keyCode == 'A'.charCodeAt(0)){ // ctrl + shift + a
					$('[name=pause_button]')[0].click();
				}else if(e.keyCode == '6'.charCodeAt(0)){ // ctrl + shift + 6
					$(shadowId).height($(shadowId).height()+1);
				}else if(e.keyCode == '7'.charCodeAt(0)){ // ctrl + shift + 7
					$(shadowId).height($(shadowId).height()-1);
				}else if(e.keyCode == '8'.charCodeAt(0)){ // ctrl + shift + 8
					var length = $(shadowId).css('bottom').length;
					var bottom = Number($(shadowId).css('bottom').substring(0, length-2));
					bottom++;
					$(shadowId).css('bottom', bottom + 'px');
				}else if(e.keyCode == '9'.charCodeAt(0)){ // ctrl + shift + 9
					var length = $(shadowId).css('bottom').length;
					var bottom = Number($(shadowId).css('bottom').substring(0, length-2));
					bottom--;
					$(shadowId).css('bottom', bottom + 'px');
				}else if(e.keyCode == '4'.charCodeAt(0)){ // ctrl + shift + 4
					$(shadowId).css('display', 'block');
				}else if(e.keyCode == '5'.charCodeAt(0)){ // ctrl + shift + 5
					$(shadowId).css('display', 'none');
				}
			}			
		}
	});
}


function scrollPage(){
	$(document).scrollTop($('.nav-main').offset().top)
}