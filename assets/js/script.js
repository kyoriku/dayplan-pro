$(function () {
  $('.saveBtn').on('click', function () {
    var hourId = $(this).parent().attr('id');
    var description = $(this).siblings('.description').val();
    localStorage.setItem(hourId, description);
  });

  function updateTimeBlocks() {
    var currentHour = dayjs().hour();

    $('.time-block').each(function () {
      var blockHour = parseInt($(this).data('hour'));

      if (blockHour < currentHour) {
        $(this).removeClass('present future').addClass('past');
      } else if (blockHour === currentHour) {
        $(this).removeClass('past future').addClass('present');
      } else {
        $(this).removeClass('past present').addClass('future');
      }
    });
  }

  function loadSavedEvents() {
    $('.time-block').each(function () {
      var hourId = $(this).attr('id');
      var description = localStorage.getItem(hourId);
      if (description !== null) {
        $(this).children('.description').val(description);
      }
    });
  }

  function displayCurrentDate() {
    var currentDate = dayjs().format('dddd, MMMM D, YYYY');
    var currentTime = dayjs().format('h:mm:ss A');
    $('#currentDay').text(currentDate);
    $('#currentTime').text(currentTime);
  }

  updateTimeBlocks();
  loadSavedEvents(); 
  displayCurrentDate();

  setInterval(updateTimeBlocks, 60000);
  setInterval(displayCurrentDate, 1000);
});