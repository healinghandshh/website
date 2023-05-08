javascript slideshow using display none:

/* onclick for each button  hide other slideshow items and fade out current slide into new slide

variable for newslide

variable for currentslide 

variable for displayslide

variable for previousslide

when displayslide equals currentslide do nothing

when displayslide equals newslide fade out current slide fade in newslide and let previousslide equal current slide 


prereqs
know how to grab items by class
know how to modify visibility
know how to use transitions


use displayslide to choose quote and hightlight button


*/


let displaySlide = 1;

let currentSlide = document.getElementsByClassName(displaySlide);


function nextSlide () {
   if (displaySlide == document.getElementsByClassName('slide').length) {
       displaySlide = 1;
   } else {
       displaySlide++;
   }
}

function prevSlide {
    if (displaySlide == 1) {
        displaySlide = document.getElementsByClassName('slide').length;
    } else {
        displaySlide--;
    }
}

/* add onclick for each button at bottom of the thing */