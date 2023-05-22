// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // Added a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage.
  //
  // Added code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour.
  //
  // Added code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements.
  //
  // Added code to display the current date in the header of the page.

  // Add a listener for click events on the save button
  $(".saveBtn").on("click", function () {
  
    // Get the hour from the id of the time-block containing the button
    var hour = $(this).parent().attr("id");
    // Get the user input from the textarea
    var event = $(this).siblings(".description").val();
    // Save the user input in local storage using the hour as the key
    localStorage.setItem(hour, event);
  });

  // Apply the past, present, or future class to each time block
  $(".time-block").each(function () {
    // Get the hour from the id of the time-block
    var hour = $(this).attr("id");
    // Remove "hour-" from the hour to get the numerical value
    hour = parseInt(hour.replace("hour-", ""));
    // Get the current hour using Day.js
    var currentHour = dayjs().hour();
    // Compare the current hour with the hour of the time-block
    if (hour < currentHour) {
      console.log(currentHour);
      $(this).addClass("past");
    } else if (hour === currentHour) {
      $(this).removeClass("past");
      $(this).addClass("present");
    } else {
      $(this).removeClass("past");
      $(this).removeClass("present");
      $(this).addClass("future");
      
    }
  });

  // Get any user input saved in localStorage and set the values of the corresponding textarea elements
  $(".time-block").each(function () {
    var hour = $(this).attr("id");
    var event = localStorage.getItem(hour);
    $(this).children(".description").val(event);
  });

  // Display the current date in the header of the page
  $("#currentDay").text(dayjs().format("dddd, MMMM D, YYYY"));
});
