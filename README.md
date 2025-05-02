# webtech-project
Web Technologies SET08101/401/801

## Deployed site
The GitHub Pages deployed version of the site can be found here:
https://cam-napier.github.io/webtech-project/

## Overview
The site is written entirely using vanilla javascript, css, and html. No libraries or frameworks were used.

## Data storage
All jokes were stored in a javascript file so that it can be easily loaded without worrying about asychronous fetch calls or handling network errors. It also means the site can work via local file access via file://

* The view individual joke uses the Session Storage api so a new page can be loaded and then the joke can be read in and displayed
* The user added jokes and jokes marked as a favourite are stored in Local Storage so they can persist and be acccess on subsequent visits

## Other technologies used
### AudioContext
AudioContext was used to produce two sounds: when adding a favourite joke, and when removing it.
### CSS Animations
Sublte movements were added through out the site to give it a playful and interactive feeling, in keeping with the fun topic of the site. In particlar, when clicking the "Add to favourites" and "Remove from Favourites" buttons, CSS keframe animations were used to animate size and colour for a fun feel.