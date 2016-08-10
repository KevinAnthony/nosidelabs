<!DOCTYPE html>
<?php 
    require ('steamauth/steamauth.php');
?>
<html lang="en">
    <head>
        <meta charset="utf-8">

	<!-- Material Design fonts -->
        <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Roboto:300,400,500,700">	
        <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/icon?family=Material+Icons">

	<link rel="stylesheet" type="text/css" href="css/style.css">

	<script src="/js/utils.js" type="text/javascript"></script>
	<!--<script src="/js/oidc-client.js" type="text/javascript"></script>-->
        <title>Noside Labs</title>
    </head>
    <body>
	<ul class="navmenu">
	   <li class="navitem"><a onclick="window.location.href = 'http://www.nosidelabs.com/';">Home</a></li>
	   <li class="navitem"><a href='http://www.nosidelabs.com/steam.php'>Steam</a></li>
	   <?php
                if(!isset($_SESSION['steamid'])) {
	   	    echo '<li class="navitem" style="float:right; padding: 0px 8px;"><a href="?login"><img src="http://cdn.steamcommunity.com/public/images/signinthroughsteam/sits_01.png"></a></li>';
                } else {
                    include ('steamauth/userInfo.php');
                //    echo "Welcome back " . $steamprofile['personaname'];
                    echo '<li class="navitem" style="float:right; padding: 0px 8px;"><img width="45px" height=45px" src="'.$steamprofile['avatarfull'].'" title="" alt="" />' . $steamprofile['personaname'] . '</li>';
                }
           ?>
	</ul>
    </body>
</html>
