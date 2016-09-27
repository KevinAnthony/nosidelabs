<ul class="navmenu">
    <li class="navitem"><a onclick="window.location.href = 'http://www.nosidelabs.com/';">Home</a></li>
    <li class="navitem"><a href='http://www.nosidelabs.com/steam.php'>Steam</a></li>
    <?php
        if(!isset($_SESSION['steamid'])) {
            echo '<li class="navitem" style="float:right; padding: 0px 8px;"><a href="?login"><img src="http://cdn.steamcommunity.com/public/images/signinthroughsteam/sits_01.png"></a></li>';
        } else {
            include ('steamauth/userInfo.php');
            echo '<li class="navitem" style="float:right; padding: 0px 8px;"><img width="45px" height=45px" src="'.$steamprofile['avatarfull'].'" title="" alt="" />' . $steamprofile['personaname'] . '</li>';
        }
    ?>
</ul>
