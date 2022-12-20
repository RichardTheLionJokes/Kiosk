var urlStr = window.location.toString();
var currentX,currentY,previousX,previousY,scrolldifX,scrolldifY,currentscrollX,currentscrollY;
var touchtimer,inertiontimer,scrollTimer;
var touchflag = false;

function touch(){
	scrolldifX = previousX - currentX;
	scrolldifY = previousY - currentY;
	previousX = currentX;
	previousY = currentY;
}

function inertion(){
	if (window.pageXOffset != currentscrollX || window.pageYOffset != currentscrollY) clearInterval(inertiontimer); 
	window.scrollBy(scrolldifX/10,scrolldifY/10);
	currentscrollX = window.pageXOffset;
	currentscrollY = window.pageYOffset;
	scrolldifX -= Math.sign(scrolldifX);
	scrolldifY -= Math.sign(scrolldifY);
	if ((scrolldifX==0||scrolldifX==-0)&&(scrolldifY==0||scrolldifY==-0)) clearInterval(inertiontimer);
}

if (urlStr.lastIndexOf(".pdf")!=urlStr.length-4) {
	document.documentElement.style.cssText = 'overflow: hidden;';
	if (document.body) document.body.style.cssText = '-webkit-user-select: none;';

	scrollUp = document.createElement("div");
	scrollUp.style.cssText = '\
		position:fixed;	z-index:9999; right:30px; top:60px;\
		border: 1px solid rgba(0,0,0,0.5); border-bottom: 3px solid rgba(0,0,0,0.5); border-radius: 10px;\
		box-shadow:\
			0 2px 8px rgba(0,0,0,0.5), inset 0 1px rgba(255,255,255,0.3), inset 0 10px rgba(255,255,255,0.2),\
			inset 0 10px 20px rgba(255,255,255,0.25), inset 0 -15px 30px rgba(0,0,0,0.3);\
			-webkit-user-select: none;';
	scrollUp.innerHTML = "<a ondragstart='return false;' ondrop='return false;' onmouseover='this.style.opacity=0.5;' onmouseout='this.style.opacity=1.0;'>\
	<img src='http://www.amgpgu.ru/bitrix/templates/amgpgu/images/scroll-up.png' width='64px' height='64px' alt='' style='vertical-align:middle; cursor:pointer;'></a>";
	if (document.body) {
		document.body.appendChild(scrollUp);
		scrollUp.id = "scrollUp";
		document.getElementById('scrollUp').onmousedown = function() {scrollTimer = setInterval(function(){window.scrollBy(0,-50);},100)};
		document.getElementById('scrollUp').onmouseup = function() {clearInterval(scrollTimer)};
		document.getElementById('scrollUp').onmouseout = function() {clearInterval(scrollTimer)};
	}

	scrollDown = document.createElement("div");
	scrollDown.style.cssText = '\
		position:fixed;	z-index:9999; right:30px; top:146px;\
		border: 1px solid rgba(0,0,0,0.5); border-bottom: 3px solid rgba(0,0,0,0.5); border-radius: 10px;\
		box-shadow:\
			0 2px 8px rgba(0,0,0,0.5), inset 0 1px rgba(255,255,255,0.3), inset 0 10px rgba(255,255,255,0.2),\
			inset 0 10px 20px rgba(255,255,255,0.25), inset 0 -15px 30px rgba(0,0,0,0.3);\
			-webkit-user-select: none;';
	scrollDown.innerHTML = "<a ondragstart='return false;' ondrop='return false;' onmouseover='this.style.opacity=0.5;' onmouseout='this.style.opacity=1.0;'>\
	<img src='http://www.amgpgu.ru/bitrix/templates/amgpgu/images/scroll-down.png' width='64px' height='64px' alt='' style='vertical-align:middle; cursor:pointer;'></a>";
	if (document.body) {
		document.body.appendChild(scrollDown);
		scrollDown.id = "scrollDown";
		document.getElementById('scrollDown').onmousedown = function() {scrollTimer = setInterval(function(){window.scrollBy(0,50);},100)};
		document.getElementById('scrollDown').onmouseup = function() {clearInterval(scrollTimer)};
		document.getElementById('scrollDown').onmouseout = function() {clearInterval(scrollTimer)};
	}
	
	home = document.createElement("div");
	home.style.cssText = '\
		position:fixed; z-index:9999; right:30px; top:232px;\
		border: 1px solid rgba(0,0,0,0.5); border-bottom: 3px solid rgba(0,0,0,0.5); border-radius: 10px;\
		box-shadow:\
			0 2px 8px rgba(0,0,0,0.5), inset 0 1px rgba(255,255,255,0.3), inset 0 10px rgba(255,255,255,0.2),\
			inset 0 10px 20px rgba(255,255,255,0.25), inset 0 -15px 30px rgba(0,0,0,0.3);\
			-webkit-user-select: none;';
	home.innerHTML = "<a ondragstart='return false;' ondrop='return false;' onmouseover='this.style.opacity=0.5;' onmouseout='this.style.opacity=1.0;'>\
	<img src='http://www.amgpgu.ru/bitrix/templates/amgpgu/images/ext-home.png' width='64px' height='64px' alt='' title='Перейти на домашнюю страницу' style='vertical-align:middle; cursor:pointer;'></a>";
	if (document.body) {
		document.body.appendChild(home);
		home.id = "home";
		document.getElementById('home').onclick = function() {
			chrome.runtime.sendMessage({ask: "tellmehomepage"},function(response) {
				document.location = response.answer;
			});
		};
	}

	document.onmousedown = function(event) {
		touchflag = true;
		clearInterval(inertiontimer);
		previousX = event.clientX;
		currentX = event.clientX;
		previousY = event.clientY;
		currentY = event.clientY;
		touchtimer = setInterval(touch,100);
	};
	document.onmouseup = function(event) {
		touchflag = false;
		clearInterval(touchtimer);
		currentscrollX = window.pageXOffset;
		currentscrollY = window.pageYOffset;
		inertiontimer = setInterval(inertion,10);	
	};
	document.onmousemove = function(event){
		if (touchflag == true){
			window.scrollBy(0, (currentY - event.clientY));
			currentX = event.clientX;
			currentY = event.clientY;
		}
	}
	
	if (document.body) {
		for (var i = 0; i < document.body.children.length; i++){
			document.body.children[i].ondragstart = function() {return false};
			document.body.children[i].ondrop = function() {return false};
		}
	}
}
			
if (urlStr.lastIndexOf(".pdf")==urlStr.length-4 || urlStr.lastIndexOf(".doc")==urlStr.length-4 || urlStr.lastIndexOf(".docx")==urlStr.length-5 || urlStr=="chrome-extension://gbkeegbaiigmenfmjfclcdgdpimamgkj/views/app.html")
	{
		back = document.createElement("div");
		back.style.cssText = '\
		position:fixed; z-index:9999; left:30px; top:30px;\
		border: 1px solid rgba(0,0,0,0.5); border-bottom: 3px solid rgba(0,0,0,0.5); border-radius: 10px;\
		box-shadow:\
			0 2px 8px rgba(0,0,0,0.5), inset 0 1px rgba(255,255,255,0.3), inset 0 10px rgba(255,255,255,0.2),\
			inset 0 10px 20px rgba(255,255,255,0.25), inset 0 -15px 30px rgba(0,0,0,0.3);\
			-webkit-user-select: none;';			
		back.innerHTML = "<a onclick='history.back();' ondragstart='return false;' ondrop='return false;' onmouseover='this.style.opacity=0.5;' onmouseout='this.style.opacity=1.0;'>\
		<img src='http://www.amgpgu.ru/bitrix/templates/amgpgu/images/back-button.png' width='64px' height='64px' alt='' title='Назад' style='vertical-align:middle; cursor:pointer;'></a>";
		if (document.body) document.body.appendChild(back);
		
		noPrint = document.createElement("div");
		noPrint.style.cssText = 'position:fixed; z-index:9999; right:20px; bottom:2px;';
		noPrint.innerHTML = "<img ondragstart='return false;' ondrop='return false;' src='http://www.amgpgu.ru/bitrix/templates/amgpgu/images/ext-header.jpg'\
		width='300px' height='70px' alt='' style='vertical-align:middle; border-radius: 10px; box-shadow:0 2px 8px rgba(0,0,0,0.5); -webkit-user-select: none;'>";
		if (document.body) document.body.appendChild(noPrint);
	}