<?php
$dir = '.';
$files = scandir($dir);
echo '<ul>';
foreach ($files as $file) {
	if ($file != '.' && $file != '..') {
		if (is_dir($file)) {
			echo '<li><a href="'.$file.'">'.$file.'/</a></li>';
		} else {
			echo '<li><a href="'.$file.'">'.$file.'</a></li>';
		}
	}
}
echo '</ul>';
?>