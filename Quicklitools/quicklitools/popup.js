// var stepRegex = /(.+)\.applitools\.com\/app\/sessions\/([0-9]+)\/([0-9]+)\/steps\/(?:[0-9]+)(?:.*)\?(?:.*)accountId=([^\&]+)[\&]?(?:.*)/g;
var stepRegex = /(.+)\.applitools\.com\/app\/(?:[^\/]+)\/([0-9]+)\/([0-9]+)(?:.*)\?(?:.*)accountId=([^\&]+)[\&]?(?:.*)/g;
var teamRegex = /(.+)\.applitools\.com\/app\/admin\/team\/([^\/\?]+)\/*\?*(?:.+)/g;
var adminPanelRegex = /(.+)\.applitools\.com\/app\/admin(?:.+)orgId=([^\&]+)[\&]?(?:.*)/g;
var adminPanelUsersRegex = /(.+)\.applitools\.com\/app\/admin\/users(?:.+)orgId=([^\&]+)[\&]?(?:.*)/g;
var adminPanelTeamsRegex = /(.+)\.applitools\.com\/app\/admin\/teams(?:.+)orgId=([^\&]+)[\&]?(?:.*)/g;
var generalAccountIdRegex = /(.+)\.applitools\.com(?:.*)\?(?:.*)accountId=([^\&]+)[\&]?(?:.*)/g;


chrome.tabs.query({active: true, currentWindow: true}, function(arrayOfTabs) {

	// chrome.runtime.sendMessage(
	// 	{
	// 		"type":"pocDoc",
	// 		"url": "https://docs.google.com/document/create"
	// 	}x
	// );

    // return;

   	$("#view").hide()
	$("#loading").show();
	hideScreens();
	createScreens(arrayOfTabs);

 });

// Sophie : finish replacing hide in popup.html with this logic. 
function hideScreens(){

    $("#wrapperAdminUsersPanel").hide();
    $("#NotificationsContainer").hide();
    $("#unknownPage").hide();
    $("#accountInfo").hide();
    $("#wrapperStep").hide();
    $("#stepView").hide();
    $("#wrapperTeam").hide();
    $("#wrapperAdminTeamsPanel").hide();
}

function createScreens(arrayOfTabs){
	var fitFound = false;

	var activeTab = arrayOfTabs[0];
	var activeTabUrl = activeTab.url; 
	

	if (isType(activeTabUrl, generalAccountIdRegex)){
		handleGeneralAccountId(activeTabUrl);
		fitFound = true;
	}

	if (isType(activeTabUrl, stepRegex)){
		handleStepTab(activeTabUrl);
		fitFound = true;
	}
	else if (isType(activeTabUrl, teamRegex)){
		handleTeamTab(activeTabUrl);
		fitFound = true;
	}
	else if (isType(activeTabUrl, adminPanelUsersRegex)){
		handleAdminPanelUsersTab(activeTabUrl);
		fitFound = true;
	}
	else if(isType(activeTabUrl, adminPanelTeamsRegex)) {
        handleAdminPanelTeamsTab(activeTabUrl);
        fitFound = true;
	}
	else if (isType(activeTabUrl, adminPanelRegex)){
		handleAdminPanelTab(activeTabUrl);
		fitFound = true;
	}


	if(fitFound==false){
		var images = ["1.jpeg", "2.jpeg", "3.jpg", "4.jpeg", "5.jpg", "6.jpg"];
		var randNum = Math.floor(Math.random() * images.length) ;
		
		var image = $("<img></img>").attr("src","images/nothingToSee/" + images[randNum]);
		$("#unknownPage").append(image);
		$("#unknownPage").show();
		showView();
	}
}

function handleAdminPanelTeamsTab(activeTabUrl){

    var match = adminPanelRegex.exec(activeTabUrl);
    var serverPrefix = match[1];
    var orgId = match[2];

	var getTeamUrl = serverPrefix + ".applitools.com/api/admin/orgs/" + orgId + "/teams?orgId=" + orgId + "&format=json";

	window.teamURL = getTeamUrl;

    // $.get(getTeamUrl).then(function(TeamInfo){
    //     window.teams = TeamInfo;
    //
    //     // $("#TeamList").click(function(){
    //     //
    //     // });
    // });
    $("#wrapperAdminTeamsPanel").show();
    showView();

}

function showView() {
	$("#loading").hide();
	$("#view").slideDown();
}

function isType(url, regex){

	if (url.match(regex)) {
	  return true;
	} else {
	  return false;
	}
}

function handleGeneralAccountId(activeTabUrl){

	var match = generalAccountIdRegex.exec(activeTabUrl);

	var serverPrefix = match[1];
	var accountId = match[2];


	$.get(serverPrefix + ".applitools.com/api/admin/orgs?&by=" + accountId + "&format=json").then(function(accounts){

		console.log(accounts);
		console.log(accounts[0].id)
		var adminUrl = serverPrefix + ".applitools.com/app/admin/?orgId=" + accounts[0].id;
		var accountUrl = serverPrefix + ".applitools.com/app/admin/account?orgId=" + accounts[0].id;
		var usersUrl = serverPrefix + ".applitools.com/app/admin/users?orgId=" + accounts[0].id;
		var teamsUrl = serverPrefix + ".applitools.com/app/admin/teams?orgId=" + accounts[0].id;
		var thisteamUrl = serverPrefix + ".applitools.com/app/admin/team/" + encodeURIComponent(btoa(accountId)) + "?orgId=" + accounts[0].id;

		$("#linkToAdmin").click(function(){
			chrome.runtime.sendMessage(
				{
					"type":"openTab",
					"url":adminUrl
				}
			);
		});

		$("#linkToAccount").click(function(){
			chrome.runtime.sendMessage(
				{
					"type":"openTab",
					"url":accountUrl
				}
			);
		});

		$("#linkToUsers").click(function(){
			chrome.runtime.sendMessage(
				{
					"type":"openTab",
					"url":usersUrl
				}
			);
		});

		$("#linkToTeams").click(function(){
			chrome.runtime.sendMessage(
				{
					"type":"openTab",
					"url":teamsUrl
				}
			);
		});

		$("#linkToThisTeam").click(function(){
			chrome.runtime.sendMessage(
				{
					"type":"openTab",
					"url":thisteamUrl
				}
			);
		});

		var startDate = getOnlyDate(accounts[0].statusStartedAt);
		var EndDate = getOnlyDate(accounts[0].statusExpiresAt);

		if ((EndDate != undefined) && EndDate.indexOf("NaN") < 0){
			var currentTime = new Date();
			var expiresDate = new Date(accounts[0].statusExpiresAt);

			var timeDiff = expiresDate.getTime() - currentTime.getTime();
			var diffDays = Math.ceil(Math.abs(timeDiff) / (1000 * 3600 * 24)); 	

			var accountManagerName = "the relevant account manager";

			if ((accounts[0].owner != undefined) && (accounts[0].owner.indexOf("NaN") < 0)){
				accountManagerName = accounts[0].owner;
			}

			if ((timeDiff > 0) && (diffDays<100)){

				addNotification("RENEWAL ALERT: Account is about to expire in " + diffDays + 
					" days. Please make sure to inform " + accountManagerName + " about any open cases that might " +
					"affect the renewal.")
			}

			if (timeDiff <=0){
				addNotification("RENEWAL ALERT: Account expired " + Math.abs(diffDays) + 
					" days ago. Please make sure to inform " + accountManagerName + ".")
			}
		}

		showAccountInfo(startDate, EndDate, accounts[0].owner, accounts[0].status);	
	})

	$("#wrapperGeneralAccountID").css("display", "flex");

}

function getOnlyDate(fullDateString){
	var fullDate = new Date(fullDateString);

	var twoDigitMonth = (fullDate.getMonth() + 1) +""; if(twoDigitMonth.length==1)	twoDigitMonth="0" + twoDigitMonth;
	var twoDigitday = (fullDate.getDate() + 1)+""; if(twoDigitday.length==1)	twoDigitday="0" +twoDigitday;
	 
	var currentDate = fullDate.getFullYear() + "-" + twoDigitMonth + "-" + twoDigitday;
	return currentDate;
}

function handleAdminPanelUsersTab(activeTabUrl){
	// $("#wrapperAdminUsersPanel").removeAttr("hidden");
	// AddDisplays();

	var match = adminPanelRegex.exec(activeTabUrl);
    var serverPrefix = match[1];
    var orgId = match[2];
    var allMembers;
    var Users;

	var getAccountUrl = serverPrefix + ".applitools.com/api/admin/orgs/" + orgId + "/accounts?orgId=" + orgId + "&format=json";
	var getUsersUrl = serverPrefix + ".applitools.com/api/admin/orgs/" + orgId + "/users?orgId=" + orgId + "&format=json";


    $.get(getUsersUrl).then(function(usersInfo){
        window.users = usersInfo;
        Users = usersInfo;

        $.get(getAccountUrl).then(function(accountInfo){

            window.allAccountInfo = accountInfo;

            allMembers = [,,]; // name, isViewer, isAdmin

            for (var i=0; i<accountInfo.length; i++){
                $.each(accountInfo[i].members, function(memberIndex, memberInfo) {
                    allMembers = addMember(allMembers, memberInfo);
                });
            }

            var ViewOnly = getViewOnlyUsers(allMembers);
            window.allMembers = allMembers;

            window.viewOnly = ViewOnly;
            var AdminList = getAdminUsers(allMembers);
            window.AdminList = AdminList;
            var GuestUsers = getAllGuestUsers(window.users, allMembers);
            window.GuestUsers = GuestList;
            // appendMetaInfo("Batch Name", testMetadata.startInfo.batchInfo.name , $("#AdminUsers"));

            appendUsersUserPanel(AdminList, "#AdminUsersContainer");
            appendUsersUserPanel(viewOnly, "#ViewOnlyUsersContainer");
            appendUsersUserPanel(GuestUsers, "#GuestUsersContainer");

            $("#AdminUsers").click(function(){
                showHideUserList("#AdminUsersContainer");
            });
            $("#ViewOnlyUsers").click(function(){
                showHideUserList("#ViewOnlyUsersContainer");
            });
            $("#GuestUsers").click(function(){
                showHideUserList("#GuestUsersContainer");
            });

            SetButtonNameAndSum("#AdminUsers", AdminList.length);
            SetButtonNameAndSum("#ViewOnlyUsers", ViewOnly.length);
            SetButtonNameAndSum("#GuestUsers", GuestUsers.length);


            // setTimeout(function () {
            //     $('#loading').hide();
            //     $("#wrapperAdminUsersPanel").removeAttr("hidden");
            // }, 1000);

            $("#wrapperAdminUsersPanel").show();
            showView();

        });

    });

}

// function Loading(TurnOn, container){
// 	if(TurnOn)
//         $('#loading').show();
// 	else if(container != undefined){
//         $('#loading').hide();
//         $(container).removeAttr("hidden");
// 	}
//
// }

function SetButtonNameAndSum(container, size) {

	if(container == "#AdminUsers")
		$(container).text('Admin Users (' + size + ')');
	else if(container == "#ViewOnlyUsers")
        $(container).text('View Only Users (' + size + ')');
	else if(container == "#GuestUsers")
        $(container).text('Guest Users (' + size + ')');

}
function addMember(allMembers, memberInfo){

	var alreadyExists = false;


	for (var i=0; i< allMembers.length; i++){
		if (allMembers[i] != undefined){
			if (allMembers[i][0]==memberInfo.name){
				alreadyExists = true;
				// changed the condition in the view only members to and instead of is so it will indicate a user that is view only in all team on not at least one team.
				allMembers[i][1] = memberInfo.isViewer && allMembers[i][1];
				allMembers[i][2] = memberInfo.isAdmin || allMembers[i][2];
			}
		}
	}

	if (alreadyExists == false)
	{
		allMembers.push([memberInfo.name, memberInfo.isViewer, memberInfo.isAdmin]);
	}

	return allMembers;
}

function getAllGuestUsers(accountUsers, allMembers) {
	var GuestUsers = [];
	var GuestUsersIndex = 0;
	var isGuest = true;

	window.account_length =  accountUsers.length;
    //
	   for(var i = 0; i < allMembers.length; i++)
	   {

           if (allMembers[i] != undefined){

				for(var j = 0; j < accountUsers.length; j++) {
						if(allMembers[i][0] == accountUsers[j].id)
							isGuest = false;
					}
            }

           if(isGuest && allMembers[i] != undefined) {
				GuestUsers[GuestUsersIndex] = allMembers[i];
				GuestUsersIndex++;
           }
           else {
		   		isGuest = true;
		   }

	   }

	window.GuestList = GuestUsers;
	return GuestUsers;

}

//an admin is at least in one team
function getAdminUsers(allMembers) {
    AdminList = []
    AdminIndex = 0
    for (var i=0; i<allMembers.length; i++){

    	if(allMembers[i] != undefined) {

            if (allMembers[i][2] == true) {

                AdminList[AdminIndex] = allMembers[i];
                AdminIndex += 1;
            }
        }

    }

    //window.AdminList = AdminList;
    return AdminList;

}

// a viewOnly user must be viewOnly in all the teams he is a member of.
function getViewOnlyUsers(allMembers) {
	viewOnly = []
	viewOnlyIndex = 0

	for (var i=0; i<allMembers.length; i++){

        if(allMembers[i] != undefined){

		 if( allMembers[i][1] == true)
			{
				viewOnly[viewOnlyIndex] = allMembers[i];
				viewOnlyIndex += 1;
			}
        }

	}

	//window.viewOnly = viewOnly;
	return viewOnly;

}

function handleTeamTab(activeTabUrl){



	var match = teamRegex.exec(activeTabUrl);
	var serverPrefix = match[1];
	var teamId =  atob(decodeURIComponent(match[2]));

	var dashboardUrl = serverPrefix + ".applitools.com/app/test-results/?accountId=" + teamId;
	

	$("#linkToDashboard").click(function(){
		chrome.runtime.sendMessage(
			{
				"type":"openTab",
				"url":dashboardUrl
			}
		);
	});

	
	$("#authenticationLinkCopy").click(function(){
		var email = $("#userEmailForAuthLink").val();
		var link = serverPrefix +".applitools.com/?accountId=" + encodeURIComponent(teamId) + "&userName=" + encodeURIComponent(email);
		copyToClipboard(link);
	})

	// chrome.tabs.executeScript(activeTab.id, { 
	// 	code: "document.querySelector('#wrapper > div > div.app-content > div > div.main-content > div > form:nth-child(1) > div > div:nth-child(4) > input').value;"
	// }, function(results){

	// });

    $("#wrapperTeam").show();
    showView();

}

function handleStepTab(activeTabUrl){

	var match = stepRegex.exec(activeTabUrl);
	var serverPrefix = match[1];
	var batchId = match[2];
	var sessionId = match[3];
	var accountId = match[4];

	metaDataUrl = serverPrefix + ".applitools.com/api/sessions/batches/" + batchId + "/" + sessionId + "/?accountId=" + accountId;

	$.get(metaDataUrl + "&format=json").then(function(testMetadata){
		console.log(testMetadata);

		appendMetaInfo("Batch Name", testMetadata.startInfo.batchInfo.name , $("#infoBlock"));
		appendMetaInfo("Batch Id", testMetadata.startInfo.batchInfo.id, $("#infoBlock"));
		appendMetaInfo("App Name", testMetadata.startInfo.appName , $("#infoBlock"));
		appendMetaInfo("Test Name", testMetadata.scenarioName , $("#infoBlock"));
		appendMetaInfo("Viewport (checkpoint)", testMetadata.startInfo.environment.displaySize.width + " X " + testMetadata.startInfo.environment.displaySize.height, $("#infoBlock"));
		appendMetaInfo("Host App (checkpoint)", testMetadata.startInfo.environment.hostingApp, $("#infoBlock"));
		appendMetaInfo("Host OS (checkpoint)", testMetadata.startInfo.environment.os, $("#infoBlock"));
		appendMetaInfo("Match Level", testMetadata.startInfo.defaultMatchSettings.matchLevel, $("#infoBlock"));
		appendMetaInfo("SDK", testMetadata.startInfo.agentId, $("#infoBlock"));
		appendMetaInfo("User Agent", testMetadata.startInfo.environment.inferred, $("#infoBlock"));

        $("#stepView").show();
        $("#wrapperStep").show();
        tabsLogic();
        showView();

	});

	$("#metaDataPageLink").click(function(){
		chrome.runtime.sendMessage(
			{
				"type":"openTab",
				"url":metaDataUrl
			}
		);
	});

}

function appendMetaInfo(key, value, container){

	if ((value != undefined) && (value != "")){

		var infoBlockKey = $("<span></span>").text(key + ":");
		$(infoBlockKey).addClass('infoBlockKey');

		var infoBlockValue = $("<span></spen").text(value);
		$(infoBlockValue).addClass('infoBlockValue');

		var infoBlock = $("<div></div>").addClass('infoBlock').append(infoBlockKey).append(infoBlockValue);

		var infoBlockCopy = $("<span class='appliFont'></span>")
		$(infoBlock).append(infoBlockCopy);

		$(infoBlockKey).click(function(){copyInfoBlockValueToClipboard($(infoBlockValue))});
		$(infoBlockValue).click(function(){copyInfoBlockValueToClipboard($(infoBlockValue))});
		$(infoBlockCopy).click(function(){copyInfoBlockValueToClipboard($(infoBlockValue))});

		$(container).append(infoBlock);
		
	}
}

function showHideUserList(container){
    if($(container).is(":hidden")) {
        $(container).slideDown();
    }
    else
        $(container).slideUp();
}

function appendUsersUserPanel(userList, container) {

    var list = "<ol>";

	for (var i = 0; i < userList.length; i++) {
		if(userList[i] != undefined) {
          list +=  "<li>" + userList[i][0] + "</li>";

        }
    }

    list += "</ol>";

	window.check_list = list;
    $(container).append(list);
}

function copyInfoBlockValueToClipboard(caller){
	var copyText = $(caller).text();
	copyToClipboard(copyText);
}

function copyToClipboard(copyText){

	const el = document.createElement('textarea');
	el.value = copyText;
	document.body.appendChild(el);
	el.select();
	document.execCommand('copy');
	document.body.removeChild(el);
}

function showAccountInfo(start, end, owner, type){
	$("#accountInfo").show();

	addAccountInfo("accountStartDate", start, "test");
	addAccountInfo("accountEndDate", end);
	addAccountInfo("accountOwner", owner);
	addAccountInfo("accountType", type);

}

function add3Dots(string, limit) {
  var dots = "...";
  if(string.length > limit)
  {
    // you can also use substr instead of substring
    string = string.substring(0,limit) + dots;
  }

    return string;
}

function addAccountInfo(id, value, toolTip){
	var e = $("#" + id + " > span.infoBlockValue");
	
	if ((value != undefined) && value.indexOf("NaN") < 0){
		value = add3Dots(value, 16);
		e.text(value);	
	}
	else
	{
		e.text("MISSING");	
		e.css("color","red");
		addNotification("The value for " + id + " is missing. Please check internally and update this field in the backoffice.")
	}


	// var spanElement = $("<span></span>").addClass("toolTiptext").text(toolTip);
	// var divElement = $("<div class='toolTip'>i</div>").append(spanElement);

	// $("#" + id).append(divElement);

}

function addNotification(notificationMessage){

	$("#NotificationsContainer").slideDown();
	var span = $("<span></span>").text(notificationMessage);

	$("#notifications").append(span);


}

function tabsLogic() {
    var tabs=new ddtabcontent("tabs") //enter ID of Tab Container
    tabs.setpersist(true) //toogle persistence of the tabs' state
    tabs.setselectedClassTarget("link") //"link" or "linkparent"
    tabs.init()
}

