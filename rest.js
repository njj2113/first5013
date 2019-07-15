/*
A dataset exists for angles that have been converted. Each angle has whether or not it is in degrees (as opposed to radians), what angle was typed in, and the output of the conversion (to degrees or to radians). We will end up popping and pushing elements of data later in the JS.
*/
var data = [
	{
    degrees: true,
    angle: 30,
    output: .52
	},
	{
		degrees: false,
    angle: 3,
    output: 171.89
	},
	{
		degrees: false,
    angle: .5,
    output: 28.65
	}
];

//who is taking the quiz starts off as an empty string
var who = "";

//angle we are going to convert starts off as an empty string.
var angleToConvert = "";
//this allows us to quickly reference the HTML element the converted angles go into
var convertOutputEl = document.getElementById('convertedAngle');
//this allows us to reference the HTML element where the angle is input to be converted
var inputter = document.querySelector('#angleConversionSpot');

//question A's number of degrees variable declared
var randomDegrees;

//have to call getRandomDegree function to get question A populated for first page load
getRandomDegree();

//we need the scores and how many questions were answered from each section of the quiz
var scoreA = 0;
var scoreB = 0;
var scoreC = 0;
var answeredA = 0;
var answeredB = 0;
var answeredC = 0;

//this is our end score variable (how many the user got correct)
var score;

// function sets who to the correct value based on what was selected from the drop-down menu in the HTML
function whoTaking(input)
{
  //the variable who is set to the value of the input at the spot where the function is called
  who = input.value;
}

//function draws an angle on the canvas or clears canvas based on arguments
//0, 90, 180, 270 expected for angle, true or false for cleared: true if clearing canvas, false if drawing an angle on canvas
function drawAngle(angle, cleared)
{
  /*
  code was retrieved from: https://stackoverflow.com/questions/11895807/why-cant-i-draw-two-lines-of-varying-colors-in-my-html5-canvas
  and from: https://www.w3schools.com/tags/canvas_linewidth.asp
  */

  //more easily reference the canvas element of the HTML
  var c = document.getElementById("myCanvas");
  //write to the canvas in 2d
  var ctx = c.getContext("2d");
  //lines we draw on the canvas should be 15px wide
  ctx.lineWidth = 15;
  //necessary line to start drawing the lines on the canvas
  ctx.beginPath();
  //lines should all be red
  ctx.strokeStyle = '#f00';
  //move the line-drawing canvas cursor to the point (250,150) relative to the bottom left
  //we are basically drawing on the canvas as though it is quadrant I of the Cartesian plane
  ctx.moveTo(250, 150);
  //completes the line from (1,0) to (0,0) on the graph
  ctx.lineTo(145, 150);

  //if angle argument is 90, signifying 90 degrees was selected
  if (angle == 90)
  {
    //draw a line upward to (0,1) on the graph
    ctx.lineTo(145, 50);
  }
  //otherwise, if angle argument is 180, signifying 180 degrees was selected
  else if (angle == 180)
  {
    //draw a line leftward to (-1,0) on the graph
    ctx.lineTo(45, 150);
  }
  //otherwise, if angle argument is 270, signifying 270 degrees was selected
  else if (angle == 270)
  {
    //draw a line downward to (0,-1) on the graph
    ctx.lineTo(145, 250);
  }

  //we don't need an else for 0/360 degrees, since we already drew from (1,0) to (0,0)

  //actually draw the lines
  ctx.stroke();

  //but if we are clearing the canvas, not drawing
  if (cleared)
  {
    //draw a clear rectangle over the whole canvas
    ctx.clearRect(0, 0, 345, 300);
    /*code retrieved from: https://www.w3schools.com/tags/tryit.asp?filename=tryhtml5_canvas_clearrect */
  }
}

//clears the data on conversions and calls another function to reflect that change on the output page
function clearConversions()
{
  while (data.length > 0)
  {
    data.pop();
  }

  //this seems more efficient, but I felt better about using pop to counter push
  //data = [];

  //reset the input box to be empty
  //code retrieved from Tinker: https://codepen.io/jmk2142/pen/oGxwPQ
  resetInput();
  //call the displayConversions function, thus redrawing all of the conversions we have in data (of which there are now none)
  displayConversions();
}

//checks whether an angle conversion already exists in the data we are listing on the page
//if degree, angle, and output are all the same, then we don't end up adding it to the list
function noMatches(deg,ang,out)
{
  //for every conversion already in the data
  for (conversion of data)
  {
    //if all of those properties match
    if (conversion.degrees == deg && conversion.angle == ang && conversion.output == out)
      {
        //return false, that is, there IS at least one match
        return false;
      }
  }

  //return true if after checking every conversion in data, we find no matches between an old conversion and the new proposed conversion
  return true;
}

//just changes the text of whatever element we hover over and which calls this function
function hoverGreeting(element)
{
  //that element's html is changed to this text
  //it specifically welcomes a person if they were selected from the drop-down menu
  //but if no one is selected, who is just an empty string and it still works properly
  element.innerHTML = "WELCOME" + who.toUpperCase() + "!";
}

//when you stop hovering on the welcome heading, it goes back to a general title
function hoverOutgoing(element)
{
  //by changing the HTML of that heading to a standard message
  element.innerHTML = "UNIT CIRCLE FUN!";
}

//initializes angle we are going to convert based on input text
function setAngleToConvert() {
  //angle is the integer version of the text inside the input that called this function
	angleToConvert = parseInt(event.target.value);
}

//resets the input so that you can convert another angle
function resetInput()
{
  //sets what is written in the box to an empty string
	inputter.value = "";
  //also resets angle to be converted in the JS so that it doesn't linger past visibly resetting it
  angleToConvert = "";
}

//displays all the conversions
//we start with three
function displayConversions()
{
  //we are going to write paragraphs within that lone original paragraph by adding HTML
  var conversionList = "Hover over button to add conversion to list: ";

  //for each conversion in the data set
  for (conversion of data)
  {
    //start writing a paragraph into the variable that will be added into the HTML paragraph
    conversionList += `<p `;

    //if the conversion is from degrees
    if (conversion.degrees == true)
    {
      //add two classes and write a sentence based on the data
      conversionList += `class="degreeConversions conversions"> ${conversion.angle}&deg; is ${conversion.output} (radians).`;
    }
    //but if the conversion is instead from radians
    else
    {
      //convert accordingly based on the data
      conversionList += `class="radianConversions conversions"> ${conversion.angle} (radians) is ${conversion.output}&deg;.`;
    }
    //end the paragraph tag that will be written to the HTML regardless of whether it was from degrees or from radians
    conversionList += `</p>`;
  }

  //write those paragraphs into the other paragraph in the HTML
  convertOutputEl.innerHTML = conversionList;
}

//converts angle input given into radians or degrees
//as specified by the boolean parameter isDegrees
function convertAngle(isDegrees)
{
  //if there is no angle to convert
  if (angleToConvert == "")
  {
    //return i.e. leave the function and convert nothing
    return;
  }

  //start a new conversion object
  var newConversion = {
    //object has property degrees which is just the isDegrees parameter
		degrees: isDegrees
	};

  //that new conversion object has property angle which is set from the output of a previous function
  newConversion.angle = angleToConvert;
  //that new conversion object has property output which is set to be the mathematically converted angle to two decimal places
  //code about two decimal places retrieved from: /*https://www.w3schools.com/jsref/jsref_tofixed.asp*/
  newConversion.output = (angleToConvert / 2 / Math.PI * 360).toFixed(2);

  //but if the conversion is from degrees
  if (isDegrees)
  {
    //the calculation is this other one, so overwrite the last calculation
    newConversion.output = (angleToConvert * 2 * Math.PI / 360).toFixed(2);
  }

  //if these property-value pairs match no conversions previously written into data
  if (noMatches(newConversion.degrees, newConversion.angle, newConversion.output))
  {
    //push the new conversion into data
    data.push(newConversion);
  }
  //display all of the conversions in data right now, after having possibly pushed another one into data
  displayConversions();
  //reset the input box whether or not you added a new conversion to data
  resetInput();
}

//writes question A by finding a random degree
//we need to save that random degree as a variable so we can reference it when verifying answer
function getRandomDegree()
{
  //randomDegrees is set to a random number 0 to 1
  randomDegrees = Math.random();
  //multiply randomDegrees by 1000, so random number from 0 to 1000
  randomDegrees *= 1000;
  //subtract randomDegrees by 500, so random number from -500 to 500
  randomDegrees -= 500;
  //take the floor of randomDegrees (so we get an integer number of degrees)
  randomDegrees = Math.floor(randomDegrees);

  //the string we will write the HTML for the question uses this random number of degrees
  var randString = "A) What quadrant does " + randomDegrees + "&deg; fall into?"
  //write question A into the correct element of the HTML
  document.querySelector("#whereDegreesGoes").innerHTML = randString;
}

//counts number of questions correct and responded to in A
function countA()
{
  //answer to the question uses randomDegrees
  var answerAInt = randomDegrees;

  //but while that value is still negative
  while (answerAInt < 0)
  {
    //add 360 degrees
    answerAInt += 360;
  }
  //and while that value is still at least 360
  while (answerAInt >= 360)
  {
    //subtract 360 degrees
    answerAInt -= 360;
  }

  //declare variable for where correct answer is in HTML
  var answerAQuadId;

  //if value for answer is less than 90
  if (answerAInt < 90)
  {
    //quadrant I is the correct answer
    answerAQuadId = 'qI';
  }
  //but if value for answer is less than 180
  else if (answerAInt < 180)
  {
    //quadrant II is the correct answer
    answerAQuadId = 'qII';
  }
  //but if value for answer is less than 270
  else if (answerAInt < 270)
  {
    //quadrant III is the correct answer
    answerAQuadId = 'qIII';
  }
  //or in the last-case scenario (but if value for answer is less than 360)
  else
  {
    //quadrant IV is the correct answer
    answerAQuadId = 'qIV';
  }

  //if the correct answer was checked
  if(document.getElementById(answerAQuadId).checked)
  {
    //add one to correct and to answered for question A
    scoreA += 1;
    answeredA += 1;
  }
  //but if any of the possible answers are checked (presumed to be wrong)
  else if (document.getElementById('qI').checked || document.getElementById('qII').checked || document.getElementById('qIII').checked || document.getElementById('qIV').checked)
  {
    //add one to the answered for question A
    answeredA += 1;
  }
}

//counts number of questions correct and responded to in B
function countB()
{
  //if any of the boxes for question B are checked
  if (document.getElementById('B0').checked || document.getElementById('B1').checked || document.getElementById('B2').checked || document.getElementById('B3').checked || document.getElementById('B4').checked)
  {
    //treat it as though user answered 5 questions
    answeredB += 5;

    //if the first box isn't checked
    if(!(document.getElementById('B0').checked))
    {
      //get a point on question B
      scoreB += 1;
    }
    //if the second box is checked
    if(document.getElementById('B1').checked)
    {
      scoreB += 1;
    }
    //if the third box is checked
    if(document.getElementById('B2').checked)
    {
      scoreB += 1;
    }
    //if the fourth box isn't checked
    if(!(document.getElementById('B3').checked))
    {
      scoreB += 1;
    }
    //if the fifth box is checked
    if(document.getElementById('B4').checked)
    {
      scoreB += 1;
    }
  }
}

//counts number of questions correct and responded to in C
function countC()
{
  //if any of the boxes for question C are checked
  if (document.getElementById('C0').checked || document.getElementById('C1').checked || document.getElementById('C2').checked || document.getElementById('C3').checked)
  {
    //treat it as though user answered 4 questions
    answeredC += 4;

    //if the first quadrant is checked
    if(document.getElementById('C0').checked)
    {
      //get a point on question C
      scoreC += 1;
    }
    //if the second quadrant isn't checked
    if(!(document.getElementById('C1').checked))
    {
      scoreC += 1;
    }
    //if the third quadrant isn't checked
    if(!(document.getElementById('C2').checked))
    {
      scoreC += 1;
    }
    //if the fourth quadrant is checked
    if(document.getElementById('C3').checked)
    {
      scoreC += 1;
    }
  }
}

//gets feedback for user when they click final button
//based on whether they selected their name from drop-down menu
//and whether they answered any questions at all
function getFeedback(grade)
{
  //string we will write into HTML has variable declard
  var feedbackString;

  //basic if-else if-else based on grade parameter
  //initializes feedback string based on grade
  if (grade < 60)
  {
    feedbackString = ". Yikes. You failed :(";
  }
  else if (grade < 70)
  {
    feedbackString = ". You passed, but barely.";
  }
  else if (grade < 80)
  {
    feedbackString = ". Ok.";
  }
  else if (grade < 90)
  {
    feedbackString = "! Nice job!";
  }
  else
  {
    feedbackString = "! Great job!";
  }

  //start writing the full text of the alert
  var fullAlert = "Y";

  //if who is taking the quiz drop-down menu does have a name selected
  if (who != "")
  {
    //address the alert to that person
    fullAlert = who + ", y"
  }

  //if they didn't answer any questions so the user's grade is not a number
  if (isNaN(grade))
  {
    //finish the alert message saying they didn't answer anything
    fullAlert += "ou didn't answer any questions...";
  }
  //but if they did answer something
  else
  {
    //if they answered all 10 and got 10 points
    //i.e. if they answered everything and answered it all correctly
    if (answered == 10 && score == 10)
    {
      //finish the alert saying they truly completed the quiz
      fullAlert += "ou had a perfect score on the whole page! Show your teacher!";
    }
    //but if they didn't answer all 10 questions correctly
    else
    {
      //finish the full alert giving them their grade and feedback based on that grade
      fullAlert += "ou earned a " + grade +"% on the quiz" + feedbackString;
    }
  }

  //alert the user with the full message just composed
  alert(fullAlert);
}

/*The page would count how many questions were answered of three and add up the correct number of answers in the answered problems (1 possible answer in A, 5 in B, and 4 in C). The result would be displayed as a percent by taking this fraction and multiplying it by 100, then printing a percent symbol.
*/
function count()
{
  //call the score counting functions of questions A, B, and C
  countA();
  countB();
  countC();

  //add the score for each section
  score = scoreA + scoreB + scoreC;
  //add the number of questions answered for each section
  answered = answeredA + answeredB + answeredC;
  //calculate the final score and take the floor of the standard calculation
  var finalScore = Math.floor(score / answered * 100);

  //call getFeedback function on an argument of that final score
  getFeedback(finalScore);
}

//call displayConversions once as page first runs
displayConversions();
