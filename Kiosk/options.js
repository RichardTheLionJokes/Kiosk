function viewOptions(){
	if (localStorage["kiosk_interval"]==null)
		{
            localStorage["kiosk_interval"] = 180;
        }
		document.getElementById("kiosk_interval").value = localStorage["kiosk_interval"];
		
	if (localStorage["home_page"]==null)
		{
            localStorage["home_page"] = 'http://www.amgpgu.ru/';
        }
		document.getElementById("home_page").value = localStorage["home_page"];
}

document.addEventListener("DOMContentLoaded",function(){
	
	document.getElementById("adskoe_body").addEventListener("load",viewOptions());
	
	document.getElementById("kiosk_interval").addEventListener("change",function(){
		document.getElementById("kiosk_interval").style.cssText='border: 2px solid red;';
	});
	
	document.getElementById("home_page").addEventListener("change",function(){
		document.getElementById("home_page").style.cssText='border: 2px solid red;';
	});
	
	document.getElementById("save_options").addEventListener("click",function(){
		localStorage["kiosk_interval"] = document.getElementById('kiosk_interval').value;
		document.getElementById("kiosk_interval").style.cssText='border: 2px solid green;';
		
		localStorage["home_page"] = document.getElementById('home_page').value;
		document.getElementById("home_page").style.cssText='border: 2px solid green;';
	});
});