# Project Name
Server Side Calculator

## Description

Your project description goes here. What problem did you solve? How did you solve it?

Additional README details can be found [here](https://github.com/PrimeAcademy/readme-template/blob/master/README.md).

The first important step was to set up the folders with a server folder in the server-calculator folder and a public folder inside that. Inside the public folder are the client.js, index.html, jquery, and the style.css files. Inside the server folder itself is the server.js file. After having set up the folders, I installed node and express for getting the server.js file ready. 

I then moved on to the index.html file to set up the basic structure of what the website would look like. It was not complete at first but having some basic idea of what the end result would look like helped with filling out both the server.js file and the client.js file. Initally, I added a form with input fields for both numbers, 4 buttons (one for each mathematical operation) and a submit button. Later, those operation buttons were changed to have the operators themselves as the button text instead of the operation spelled out (ie + instead of addition) and I reorganized the order of the ids to better match the base mode example provided. I also forgot to source in my client.js file and my jquery file which I had to add later after attempting to test the server. 

Once the index file looked functional, at least for this point, I moved on to the server.js file and set up the server to recognize and use express, use the files in the server/public folders, define the port used as 5000, and then include the bodyParser to makes sure that data from the client is usable. Additionally, I defined a numbers array as an empty array for data from the client to be stored in. 

With the basics ready to go, I then added the app.get, app.post, and app.listen functions. At this point, since I was not entirely sure what the client would look like and function, these functions were left largely empty as a way to remember to come back to them later and fill them out as the program takes shape. I did complete the app.listen function for the server to listen on port 5000 since that was a constent regardless of what happened with the client.js. 

At this point it was time to get to the meat of the problem: the client.js file. To start, I got the document ready for manipulation and created my readyOn function. Within that function, I created 4 functions for when each operator on the DOM is clicked. It is at this point that I need to explain my logic. When visualizing the solution to this problem, I came to a future problem that I know I would have: once the numbers are sent to the server for calculation, how does the server know what to do with it? The server isn't aware of what button was pressed or what to do with it, something needs to be sent over as a "marker" to tell the server what to do with the two numbers. So I declared a global numObject variable with an operator property initially set to null. Depending on the button clicked, this null value is changed to the corresponding operator for the button clicked. So the numbers sent over are sent in a package of sorts with number 1, number 2, and a mathematical operator. The purpose of this will be better explained later in this readme. 

An issue that I encountered early was when I should prevent the webpage from refreshing (a quirk of using form in html) and when to let it. For the operator buttons, I prevented it from refreshing so that the user can enter their numbers. Once those button functions were set up, I created the submit (=) button function. This function fullfilled a myriad of purposes that really launches the app into its series of processes. Firstly, it checks to make sure the user has selected an operator. If they have not, then it alerts the user to do so, and returns 1 to prevent the process from proceeding. This is to prevent junk data from making its way to the server. It also checks to make sure both input fields have a number of some kind. If either do not, the user is alerted and then returns 2 to likewise prevent the process from proceeding. Both of these checks do not refresh the page, so that the user does not need to re-enter any data, just fix what was missing. If both checks are passed, then the numberOperation function is called to continue the process and then the inputs are cleared. The page is allowed to refresh at this point. While not super critical, this prevents the operator button that was clicked from continuing on to the next input, preventing errors with neglecting to select an operator from occuring. 

I also including a click handler for the clear button, which just runs the function to clear the inputs and a delete button that resets the array of data in the server.js to clear the array of data. That is explained better later. 

I moved on to constructing the numberOperation function. This function creates the package that is sent to the server. It takes the values in both input fields and adds 2 properties to the numObject object with values corresponding to the inputs. I then created the ajax function to send that package, with the numbers and the operator, to the server. It then runs the getNumbers function which just receives that numbers array from the server. I also included a .catch in the event that the package could not be sent to the server. 

Afterwards, I created the getNumbers function. This includes an ajax function to 'GET' the array of numbers from the server. It then appends these numbers to the DOM by appending a div class called numbers to the html section of numberHistory. I organized it in a way that the numbers are appended as a single line mathematical formula with the solution to the problem that was calculated server-side. I know this is a running theme at this point, but I do explain this better later when I return to the server.js file. I included a .catch here too in the event that the array could not be received from the server. This function also calls the getSolution function. 

Speaking of getSolution, I need to return to the server.js file for this part. I filled out the app.get and app.post functions so they function in conjunction with the client.js file. In the app.post function, this is where the package is taken in and the solution is calculated. a newNumber object is declared with it being equal to the req.body (the package taken in.) The function then looks at the newNumber.operation and then matches the formula with the corresponding operator. So, for example if the operator comes in as a + (because the + button was clicked), the function checks if it is equal to '+', then adds the two numbers together and sets the global solution variable to that new value. It then pushes this value to the newNumber object as a new property. After that process is done, that newNumber object is pushed to the array and is then sent back to the client to be appended to the DOM in the process I explained above. 

Back to that client file, I created a simple function to clear the inputs, then created a function to append that solution to the DOM. I wanted that solution to be the most recent solution, and to be replaced every time a new mathematical problem was run. So I created a function that takes the value calculated on the server side, and appends it to a different element called recentSum in the html file. This function empties the element every time, so that the most recent sum is the only one shown and is replaced every iteration of the program. 

I also wanted to create a function that deleted or cleared the number history on the server. So I created a function here to send a delete request through ajax to the server. I then added a app.delete function to the server which really just sets the numbers array to an empty array again. This clears all the data and everything that was appended to the DOM. 

## Usage
The program is fairly straightforward. The user enters the two numbers into their fields, chooses the operation, then presses the = button to submit. There is also a clear button (C) and a delete all button that allows the user some control over the data. The program alerts the user to any data problems and with steps to fix those problems. 

The information is cleanly displayed on the DOM and is easy to read.


## Built With Javascript, jQuery, CSS, and HTML 

## Thanks to Prime Digital Academy for the instruction and knowledge to create this application 

## Support 
Email lambe347@umn.edu for any suggestions or problems. 