
// Global Variables:
        var photos; // The photos array. Gets defined in the slideshow funct.
        var currIndex = 1;
        var arraySize;
        var timeoutID;

        main();

        function main() {
            // Get the elements from the page.
            var slideShowButton = document.getElementById("slideShow");
            var randomSlide = document.getElementById("randShow");
            var display = document.getElementById("imageDisplay");
            // Get the buttons.
            var nextSlide = document.getElementById("nextSlide");
            var prevSlide = document.getElementById("prevSlide");
            var autoSlideshow = document.getElementById("autoShow");
            var randAutoShow = document.getElementById("autoRandom");
            var stopAutoAll = document.getElementById("stopAuto");

            // When submit button is clicked it will generate the slide show.
            slideShowButton.onclick = getArrayPhotoNames;
            randomSlide.onclick = randomize;
            display.onclick = goNextSlide;
            nextSlide.onclick = goNextSlide;
            prevSlide.onclick = goPrevSlide;

            autoSlideshow.onclick = goAutoShow;
            randAutoShow.onclick = goAutoRandom;
            stopAutoAll.onclick = stopAutoShow;
        }
        /* This function will read the folder name, common name,
    start photo number, and end photo number and will return
    an array with the names of the photos that belong to the
    specified number range. */
        function getArrayPhotoNames() {
            // Get the required elements from the page to create a slideshow.
            var slideShowButton = document.getElementById("slideShow");
            var display = document.getElementById("imageDisplay");
            var pathFolder = document.getElementById("folder").value;
            var commonName = document.getElementById("name").value;
            var startNum = document.getElementById("startNum");
            var endNum = document.getElementById("endNum");
            var imagesource = pathFolder + commonName;
            // Local vairables
            var imageNumber = startNum.value;
            // For debugging purposes.
            console.log("Image source val: " + imagesource);
            // Calculate the array size.
            arraySize = endNum.value - startNum.value + 1;
            // only alert when the start number  is greater than the end
            if (arraySize < 1 || endNum.value == "" || startNum.value == "") {
                alert("Invalid Numbers!");
                console.log("Error");
                return false;
            }
            // Create the array of image srcs.
            photos = new Array(arraySize);
            for (i = 1; i <= arraySize; i++) {
                photos[i] = imagesource + "" + imageNumber + ".jpg";
                imageNumber++;
            }
            console.log("Photo src value: " + photos[1]);
            // Update the image src.
            display.setAttribute("src", photos[1]);
        }

        /*Create a randomly ordered slide show.*/
        function randomize() {
            console.log("Random slideshow function called.");
            // Call the oridinal slide show function to set up the slide show before randomizing.
            getArrayPhotoNames();
            // Local variables.
            var randNum;
            var temp;
            // Randomize and swap the elements.
            for (i = 1; i <= Math.floor(arraySize / 2); i++) {
                // Generate a new random index position.
                randNum = (Math.floor(Math.random() * arraySize)) + 1;
                console.log(randNum);
                // Swap the image sources.
                temp = photos[i];
                photos[i] = photos[randNum];
                photos[randNum] = temp;
            }
            console.log(photos);
        }

        // Goes to the next slide in the array
        function goNextSlide() {
            console.log("Nextslide function called.");
            var newIndex = currIndex += 1;
            var display = document.getElementById("imageDisplay");
            if (newIndex <= arraySize) {
                // Increment the index.
                display.setAttribute("src", photos[newIndex]);
            } else {
                // When the array reaches the end, loop back to start.
                display.setAttribute("src", photos[1]);
                currIndex = 1;
            }
        }
        // Goes to the previous slide in the array.
        function goPrevSlide() {
            console.log("Prevslide function called.");
            var newIndex = currIndex -= 1;
            var display = document.getElementById("imageDisplay");
            if (newIndex <= 0) {
                // When the array reaches the end, loop back to start.
                display.setAttribute("src", photos[arraySize]);
                currIndex = arraySize;
            } else {
                // Decrement the index.
                display.setAttribute("src", photos[newIndex]);
            }
        }

        // Plays the auto slide show.
        function goAutoShow() {
            getArrayPhotoNames();
            timeoutID = window.setInterval(goNextSlide, 1000);
        }
        // Plays the randomized slide show.
        function goAutoRandom() {
            getArrayPhotoNames();
            timeoutID = window.setInterval(getRandom, 1000);
        }
        // Helper function to change the display src individualy.
        function getRandom() {
            var display = document.getElementById("imageDisplay");
            var fetch = (Math.floor(Math.random() * arraySize)) + 1;
            // Change the src to the random index of array.
            display.setAttribute("src", photos[fetch]);
        }
        // Stops any ongoing auto slide show.
        function stopAutoShow() {
            console.log("Auto slideshow stopped.");
            window.clearInterval(timeoutID);
        }
