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

        <!-- Bootstrap -->
        <link rel="stylesheet" type="text/css" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">

        <title>Hello World</title>
    </head>
    <body>
        <h1>Hello World</h1>
        <p>
            I waz here. 
        </p>
	<!--<img id="signin" src="https://steamcommunity-a.akamaihd.net/public/images/signinthroughsteam/sits_01.png"  width="180" height="35" border="0" />-->
    	<?php
	    if(!isset($_SESSION['steamid'])) {
    	        echo "welcome guest! please login<br><br>";
                loginbutton(); //login button    
            } else {
                include ('steamauth/userInfo.php');
                //Protected content
                echo "Welcome back " . $steamprofile['personaname'] . "</br>";
                echo "here is your avatar: </br>" . '<img src="'.$steamprofile['avatarfull'].'" title="" alt="" /><br>'; // Display their avatar!    
                logoutbutton();
            }    
        ?>  
	<pre id='out'></pre>	
	
	<script src="/js/utils.js" type="text/javascript"></script>
	<!--<script src="/js/oidc-client.js" type="text/javascript"></script>-->
	<script src="/js/signin.js" type="text/javascript"></script>
    </body>
</html>
