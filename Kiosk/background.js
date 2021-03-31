intervalTimer = setInterval(function(){
	var interval;
	if (localStorage["kiosk_interval"]==null)
		{
			interval = 180;
		}
	else
		{
			interval = parseInt(localStorage["kiosk_interval"]);
		}
	chrome.idle.setDetectionInterval(interval);
	},1000);

//chrome.idle.setDetectionInterval(interval);
chrome.idle.onStateChanged.addListener(function(state)
{
	if(state!="idle") return;
	   chrome.tabs.query({active:false}, function(Tabs) {
		  Tabs.forEach(function(element, index, array)
		  {
			 chrome.tabs.remove(element.id);
		  });
		});
		
	if (localStorage["home_page"]==null) {
        localStorage["home_page"] = 'http://www.amgpgu.ru/';
    }	
	
	chrome.tabs.update(null, {'url': localStorage["home_page"]});
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	/*console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");*/
    if (request.ask == "tellmehomepage"){
		if (localStorage["home_page"]==null)
		{
            localStorage["home_page"] = 'http://www.amgpgu.ru/';
        }
		sendResponse({answer: localStorage["home_page"]});
	}
});