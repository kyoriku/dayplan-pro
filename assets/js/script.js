$(function () {
  // This code block runs when the document is ready (when the DOM is fully loaded)

  // Event handler for save buttons with the 'saveBtn' class
  $('.saveBtn').on('click', function () {
    // Get the ID of the parent time slot of the clicked button
    var timeSlotId = $(this).parent().attr('id');
    // Get the description from the sibling element with the 'description' class
    var timeSlotDescription = $(this).siblings('.description').val();
    // Store the description in the browser's local storage with 'timeSlotId' as the key
    localStorage.setItem(timeSlotId, timeSlotDescription);
  });

  // Function to update the visual styling of time blocks based on the current time
  function updateTimeBlocks() {
    // Get the current hour using the 'dayjs' library
    var currentHour = dayjs().hour();

    // Loop through elements with the 'time-block' class
    $('.time-block').each(function () {
      // Get the 'hour' data attribute of the time block and parse it as an integer
      var blockHour = parseInt($(this).data('hour'));

      // Update CSS classes to indicate whether the block is in the past, present, or future
      if (blockHour < currentHour) {
        $(this).removeClass('present future').addClass('past');
      } else if (blockHour === currentHour) {
        $(this).removeClass('past future').addClass('present');
      } else {
        $(this).removeClass('past present').addClass('future');
      }
    });
  }

  // Function to load saved events from local storage and populate the input fields
  function loadSavedEvents() {
    // Loop through elements with the 'time-block' class
    $('.time-block').each(function () {
      // Get the 'id' attribute of the time block
      var hourId = $(this).attr('id');
      // Retrieve the saved event description from local storage using 'hourId' as the key
      var savedDescription = localStorage.getItem(hourId);
      // If a saved description exists in local storage, set it as the value of the 'description' input
      if (savedDescription !== null) {
        $(this).children('.description').val(savedDescription);
      }
    });
  }

  // Function to display the current date and time on the web page
  function displayCurrentDate() {
    // Get the current date and time using the 'dayjs' library and format them
    var dateNow = dayjs().format('dddd, MMMM D, YYYY');
    var timeNow = dayjs().format('h:mm:ss A');
    // Update the content of elements with 'currentDate' and 'currentTime' IDs
    $('#currentDate').text(dateNow);
    $('#currentTime').text(timeNow);
  }

  // Initial function calls to set up the page
  updateTimeBlocks(); // Update time block styling
  loadSavedEvents(); // Load saved events from local storage
  displayCurrentDate(); // Display the current date and time

  // Set up intervals to periodically update time blocks and the current time display
  setInterval(updateTimeBlocks, 60000); // Update every minute
  setInterval(displayCurrentDate, 1000); // Update every second
});