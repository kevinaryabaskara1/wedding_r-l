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