$(document).ready(function(){

  function convertSecsToHrsMinsSecs(seconds) {
    var h = Math.floor(seconds / 3600);
    var m = Math.floor((seconds % 3600) / 60);
    var s = Math.floor(seconds - (h*3600) - (m*60));
    h = h >= 1 ? h + ':' : '';
    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;
    return h + m + ':' + s;
  }

  var i;
  for (i = 0; i < 8; (i++) ) {
    $('#finishHours').append(
      $('<option>', { value:i, text:i })
    );
  }
  var j;
  for (j = 0; j < 60; (j = j+5) ) {
    var jj = j < 10 ? '0' + j : j;
    $('#finishMins').append(
      $('<option>', { value:j, text:jj })
    );
  }

  function calculate(e) {
    e.preventDefault();
    var unit = $("input[type='radio']:checked").attr('value');
    if (unit < 1) {
      var timePerUnit = 'per mile';
      var unitPerHour = 'miles per hour';
    } else {
      var timePerUnit = 'per kilometer';
      var unitPerHour = 'kilometers per hour';
    }

    var finishHoursInSecs = $('#finishHours').find(":selected").attr('value') * 3600;
    var finishMinsInSecs = $('#finishMins').find(":selected").attr('value') * 60;
    var finishTime = finishHoursInSecs + finishMinsInSecs - 1; // to be 1 second within your target

    var distance = $('#distance').find(":selected").attr('value');
    var pace = finishTime / (distance*unit); // seconds per unit
    var speed = Math.ceil( (3600 / pace) * 10 ) / 10; // to one decimal place

    if (pace > 0) {
      $('#results').hide().fadeIn();
      $('#resultPace').text(convertSecsToHrsMinsSecs(pace));
      $('#timePerUnit').text(timePerUnit);
      $('#resultSpeed').text(speed);
      $('#unitPerHour').text(unitPerHour);
    }
  }

  $('#results').hide();
  $('#submit').click(calculate);

});
