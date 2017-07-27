
timer_id = null
// if (new RegExp('https://rally1.rallydev.com/#/[a-zA-Z0-9]+/*').test(location.href)) {
if (true) {
	console.log('rally plugin on')
	main();
} else {
	console.log('rally plugin off')
}

function main(){
	bindKey();
}

function bindKey(){
	$(document).keydown(function(e){
		if(e.ctrlKey == true){
			if(e.shiftKey == true){
				if(e.keyCode == 'Z'.charCodeAt(0)){ // ctrl + shift + z
					if(timer_id == null){
						timer_id = window.setInterval(fullscreen, 5)
					}
				}else if(e.keyCode == 'X'.charCodeAt(0)){ // ctrl + shift + x
					window.clearInterval(timer_id)
					quit_fullscreen()
					timer_id = null
				}
			}			
		}
	});
}

function quit_fullscreen() {
	container = null
	body = null

	items = $('[id*=rallytreegrid')
	for(var i=0; i<items.length; i++) {
		if(/^rallytreegrid-\d\d\d\d$/.test(items[i].id)){
			container = items[i]
		} else if(/^rallytreegrid-\d\d\d\d-body$/.test(items[i].id)){
			body = items[i]
		}
	}
	$(container).css('position', '')
	$(container).css('top', '')
	$(container).css('height', container_height)
	$(body).css('height', body_height)
	$($(body).children()[0]).css('height', body_child_height)
	$($('[id*=rallytreepagingtoolbar]')[0]).css('display', 'block')
	$('.alm-header-container').css('display', 'block')
	is_set_height = false
}

is_set_height = false
container_height = null
body_height = null
body_child_height = null

function fullscreen() {
	container = null
	body = null

	items = $('[id*=rallytreegrid')
	for(var i=0; i<items.length; i++) {
		if(/^rallytreegrid-\d\d\d\d$/.test(items[i].id)){
			container = items[i]
		} else if(/^rallytreegrid-\d\d\d\d-body$/.test(items[i].id)){
			body = items[i]
		}
	}
	
	if (!is_set_height) {
		container_height = $(container).css('height')
		body_height = $(body).css('height')
		body_child_height = $($(body).children()[0]).css('height')
		is_set_height = true
	}

	$(container).css('position', 'fixed')
	$(container).css('top', '0px')
	$(container).css('height', document.body.clientHeight)
	$(body).css('height', document.body.clientHeight)
	$($(body).children()[0]).css('height', document.body.clientHeight-50)
	$($('[id*=rallytreepagingtoolbar]')[0]).css('display', 'none')
	$('.alm-header-container').css('display', 'none')
}