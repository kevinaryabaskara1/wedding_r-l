function execCmd(command, value = null) {
    document.execCommand(command, false, value);
}

function toggleItalic() {
    execCmd('italic');
}

function toggleOrderedList() {
    execCmd('insertOrderedList');
}

function changeFontSize(size) {
    execCmd('fontSize', size);
}

function toggleColorMenu() {
    var colorMenu = document.getElementById('colorMenu');
    colorMenu.style.display = (colorMenu.style.display === 'block') ? 'none' : 'block';
}

function createLink() {
    var url = prompt("Enter the URL:");
    if (url) {
        execCmd('createLink', url);
    }
}

function clearField() {
    document.getElementById('editor').innerHTML = '';
}

document.getElementById('fileInput').addEventListener('change', function () {
    var file = this.files[0];
    var allowedTypes = ['image/png', 'image/jpeg', 'video/mp4', 'audio/mpeg', 'application/pdf'];

    if (allowedTypes.includes(file.type)) {
        var reader = new FileReader();
        reader.onload = function (event) {
            var fileType = file.type.split('/')[0];
            if (fileType === 'image') {
                execCmd('insertImage', event.target.result);
            } else if (fileType === 'video') {
                execCmd('insertVideo', event.target.result);
            } else if (fileType === 'audio') {
                execCmd('insertAudio', event.target.result);
            } else if (fileType === 'application') {
                execCmd('insertHtml', '<a href="' + event.target.result + '">Attached File</a>');
            }
        }
        reader.readAsDataURL(file);
    } else {
        alert('Invalid file type. Please select a valid file.');
    }
});

function updateCount() {
    var editor = document.getElementById('editor');
    var content = editor.textContent || editor.innerText;
    var characterCount = content.length;
    var wordCount = content.split(/\s+/).filter(Boolean).length;
    document.getElementById('charCount').textContent = "Characters: " + characterCount;
    document.getElementById('wordCount').textContent = "Words: " + wordCount;
}

// waktu mundur
// Set the date we're counting down to
var countDownDate = new Date("July 25, 2024 08:00:00").getTime();

// Update the count down every 1 second
var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();
    
  // Find the distance between now and the count down date
  var distance = countDownDate - now;
    
  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
  // Output the result in an element with id="demo"
//   document.getElementById("waktu").innerHTML = days + "d " + hours + "h "
//   + minutes + "m " + seconds + "s ";
    
    document.getElementById("days").innerHTML = days;
    document.getElementById("hours").innerHTML = hours;
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;

  // If the count down is over, write some text 
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("waktu").innerHTML = "EXPIRED";
  }
}, 1000);