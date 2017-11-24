<?php
require_once __DIR__.'/vendor/autoload.php';

session_start();

$Imgs = [
    'https://tympanus.net/Development/GridLoadingEffects/images/1.jpg',
    'https://tympanus.net/Development/GridLoadingEffects/images/3.jpg',
    'https://d13yacurqjgara.cloudfront.net/users/64706/screenshots/1167254/attachments/152315/SUGARSKULL-01.png',
    'https://tympanus.net/Development/GridLoadingEffects/images/8.jpg',
    'https://tympanus.net/Development/GridLoadingEffects/images/10.png',
    'https://tympanus.net/Development/GridLoadingEffects/images/14.png',
    'https://tympanus.net/Development/GridLoadingEffects/images/9.jpg',
    'https://tympanus.net/Development/GridLoadingEffects/images/13.png',
    'https://tympanus.net/Development/GridLoadingEffects/images/12.png',
    'https://tympanus.net/Development/GridLoadingEffects/images/4.jpg',
    'http://www.thedrum.com/uploads/news/172673/DzrMPF_DeezerPoster_MusicSoundBetterWithYou_03.jpg'
];

$items = '';

for ($i=0; $i < 20; $i++){
    $items .= '<div class="grid-item c' . ($i % 9) . ' wow fadeInUp" ><a href=""><img src="' . $Imgs[$i % count($Imgs)] . '" /></a></div>';
}
header('Access-Control-Allow-Origin: *');
printf($items);



