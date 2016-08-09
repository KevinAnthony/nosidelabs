<!DOCTYPE html>
<?php
    require ('steamauth/steamauth.php');
?>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Hello World</title>
	<link rel="stylesheet" type="text/css" href="css/steam.css">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="http://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.css">
	<script src="http://code.jquery.com/jquery-1.11.3.min.js"></script>
	<script src="http://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.js"></script>
    </head>
    <body height='100%'>
	<?php
            if(!isset($_SESSION['steamid'])) {
		header("Location: http://www.nosidelabs.com/index.php"); /* Redirect browser */
		exit();
            } else {
                include ('steamauth/userInfo.php');
		 
                //Protected content
                logoutbutton();
		$date_of_expiry = time() + 60 ;
		setcookie( "steamId", $_SESSION['steamid'], $date_of_expiry );
		echo "<div class='page' height='100%'>";
	    	echo "<h1 id='hello'>Hello</h1>";
		echo "<div class=\"container\" id=\"gamescontainer\"></div>";
		echo "</div>";
		echo "<div data-role=\"popup\" id=\"myPopup\" class=\"ui-content\" data-overlay-theme=\"b\"></div>";
	       	echo "<script src=\"/js/utils.js\" type=\"text/javascript\"></script>";
        	echo "<script src=\"/js/jquery.js\" type=\"text/javascript\"></script>";
	        echo "<script src=\"/js/steam.js\" type=\"text/javascript\"></script>";
            }
        ?>
    </body>
</html>
