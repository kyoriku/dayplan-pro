$(function () {
  $('.saveBtn').on('click', function () {
    var timeSlotId = $(this).parent().attr('id');
    var timeSlotDescription = $(this).siblings('.description').val();
    localStorage.setItem(timeSlotId, timeSlotDescription);
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
      var savedDescription = localStorage.getItem(hourId);
      if (savedDescription !== null) {
        $(this).children('.description').val(savedDescription);
      }
    });
  }

  function displayCurrentDate() {
    var dateNow = dayjs().format('dddd, MMMM D, YYYY');
    var timeNow = dayjs().format('h:mm:ss A');
    $('#currentDate').text(dateNow);
    $('#currentTime').text(timeNow);
  }

  updateTimeBlocks();
  loadSavedEvents();
  displayCurrentDate();

  setInterval(updateTimeBlocks, 60000);
  setInterval(displayCurrentDate, 1000);
});