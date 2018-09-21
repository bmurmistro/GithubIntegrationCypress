chrome.runtime.onMessage.addListener(function(response, sender, sendResponse){

	if (response.type == "openTab"){
		chrome.tabs.create({ url: response.url });
	}

	if (response.type == "pocDoc"){
		chrome.tabs.create({ url: response.url }, function(tab){ 
			confirm("Please wait until document is loaded and then confirm generation of POC Report");
		})
	}

})

