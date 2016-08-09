
var steamId = getCookie("steamId");
var apiKey = "71DE25185EB70B6040AFCC7D6E8799D9"

var globalGames = null
var globalFriendList = []
var currentAchivments = null
var currentGame = 0;

$(document).ready(getPlayerSummery);

function getPlayerSummery(){
	$.ajax({
        url : ' http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=' + apiKey + '&steamids=' + steamId,
        type: 'GET',
        success : playerSummeryHandle,
	dataType: 'jsonp',
	jsonp: 'jsonp'  
    })
}

function getPlayerSummerys(){
	url = 'http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=' + apiKey + '&steamids='
	for (friend in globalFriendList){
		url += friend + ',';
	}
	url = url.substring(0, url.length - 1);
	
        $.ajax({
        url : url,
        type: 'GET',
        success : friendSummerysHandle,
        dataType: 'jsonp',
        jsonp: 'jsonp'
    })
}

function playerSummeryHandle(data) {
	playerName = data["response"]["players"][0]["personaname"];
	document.getElementById('hello').innerHTML += " " + playerName;
	getPlayerGames();
	getPlayerFriends();
}

function friendSummerysHandle(data) {
	friends = data["response"]["players"]
	for (index in friends){
		friend = friends[index]
		globalFriendList[friend['steamid']]['name'] = friend['personaname']
	}
}

function getPlayerGames(){
	getPlayerGamesByPlayer(steamId, playerGamesHandle)
}

function getPlayerGamesByPlayer(id, callback){
        $.ajax({
                url : ' http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=' + apiKey + '&steamid=' + id + '&include_appinfo=1',
                type: 'GET',
                success : callback,
                dataType: 'jsonp',
                jsonp: 'jsonp',
		async:false
            })
}

function getPlayerFriends() {
	$.ajax({
	        url : 'http://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key=' + apiKey + '&steamid=' + steamId + '&relationship=friend',
	        type: 'GET',
	        success : playerFriendsHandle,
	        dataType: 'jsonp',
	        jsonp: 'jsonp'
	    })
}

function playerFriendsHandle(data){
	var friends = data["friendslist"]["friends"]
	$.each(friends, function(i, friend){
		id = friend["steamid"]
	        globalFriendList[id] = [];
	        getPlayerGamesByPlayer(friend["steamid"],function(data) { friendPlayerGamesHandle(i,data)})
	})
	getPlayerSummerys()	
}

function friendPlayerGamesHandle(id,data){
	var games = data["response"]["games"];
	var len = data["response"]["game_count"];
	friendId = 0;
	var j = 0;
	for (temp in globalFriendList){
		if (j == id) friendId = temp;
		j++;
	}
	array = []	
	for (var i = 0; i < len; i++){
		game=games[i];
		array.push(game['appid']);
	}
	globalFriendList[friendId]['games'] = array.sort();
}

function playerGamesHandle(data){
	var games = data["response"]["games"];
	games.sort(function(a,b) {return a['name'].toUpperCase() > b['name'].toUpperCase()})
	var len = data["response"]["game_count"]
	div = document.getElementById('gamescontainer');
	for (var i = 0; i < len; i++){
		game = games[i];
	if (game['img_logo_url'] === "") continue;
		element = '<div class="square"><a href="#myPopup" data-rel="popup" data-position-to="window" data-transition="fade"><img src="http://media.steampowered.com/steamcommunity/public/images/apps/'+game['appid']+'/'+game['img_logo_url']+'.jpg" onclick="getGameSchema(' + game['appid'] +')" /></a></div>';
		div.innerHTML += element;
	}
}

function getGameSchema(appid){
	$.ajax({
                url : 'http://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v2/?key=' + apiKey + '&appid=' + appid,
                type: 'GET',
                success : gameAchivmentsHandle,
                dataType: 'jsonp',
                jsonp: 'jsonp'
        })
	currentGame = appid
}

function showPlayerAchivments(appid){
	$.ajax({
        	url : ' http://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?key=' + apiKey + '&steamid=' + steamId + '&appid=' + appid,
        	type: 'GET',
        	success : playerAchivmentsHandle,
        	dataType: 'jsonp',
        	jsonp: 'jsonp'
    	})
}

function gameAchivmentsHandle(data){
	inner = document.getElementById('myPopup').innerHTML;
	inner = '<table border="1" id="achivmentTable"><tr>';
	inner += '<thead><tr id="achivmentTableHeader"><th></th></tr></thead>';
	achivments = data['game']['availableGameStats']['achievements'];
	inner += '<tbody>'	
	for (key in achivments){
		inner += '<tr id="'+achivments[key]['name']+'"><td>'+achivments[key]['displayName']+'</td></tr>';
	}
	inner += '</table>';
	document.getElementById('myPopup').innerHTML = inner;
	
	document.getElementById('myPopup').style.width = ($( window ).width() *.8 )+ "px";
	document.getElementById('myPopup').style.height = ($( window ).height() *.8 )+ "px";
	document.getElementById('myPopup').style.overflow = "scroll";
	currentAchivments = achivments;
	showPlayerAchivments(currentGame)
	for (friendId in globalFriendList){
		friend = globalFriendList[friendId]
		games = friend['games']
		if (jQuery.inArray(currentGame, games) === -1) continue
		showFriendAchivment(friendId)
	}
}

function playerAchivmentsHandle(data){
	createAchivmentRow("You", data)
}

function createAchivmentRow(name, data) {
	playerStats = data['playerstats']['achievements']
	document.getElementById('achivmentTableHeader').innerHTML += '<th>' +name+ '</th>'
	for (key in playerStats){
		stat = playerStats[key]
		achivData = null;
		for (temp in currentAchivments){
			achiv = currentAchivments[temp]
			if (achiv['name'] !== stat['apiname']) continue;
			achivData = achiv;
			break;
		}
		if (achivData === null) continue;
		if (stat['achieved']) {
			row = '<td><img src="'+achivData['icon']+'"/></td>'
		} else {
			row = '<td><img src="'+achivData['icongray']+'"/></td>'
		}
		document.getElementById(stat['apiname']).innerHTML += row
	}
	
}
function showFriendAchivment(friendId){
        $.ajax({
                url : ' http://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?key=' + apiKey + '&steamid=' + friendId + '&appid=' + currentGame,
                type: 'GET',
                success : friendAchivmentsHandle,
                dataType: 'jsonp',
                jsonp: 'jsonp'
        })
}
function friendAchivmentsHandle (data){
	friend = globalFriendList[data['playerstats']['steamID']]
	createAchivmentRow(friend['name'], data)
}
