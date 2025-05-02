# webtech-project
Web Technologies SET08101/401/801

The GitHub Pages deployed version of the site can be found here:
https://cam-napier.github.io/webtech-project/

##Overview
The site is written entirely using vanilla javascript, css, and html. No libraries or frameworks were used.

##Data storage
All jokes were stored in a javascript file so that it can be easily loaded without worrying about asychronous fetch calls or handling network errors. It also means the site can work via local file access via file://

* The view individual joke uses the Session Storage api so a new page can be loaded and then the joke can be read in and displayed
* The user added jokes and jokes marked as a favourite are stored in Local Storage so they can persist and be acccess on subsequent visits

