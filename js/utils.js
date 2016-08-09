function log() {
    document.getElementById('out').innerText = '';

    Array.prototype.forEach.call(arguments, function(msg) {
        if (msg instanceof Error){
            msg = "Error: " + msg.message;
        }
        else if (typeof msg !== 'string') {
            msg = JSON.stringify(msg, null, 2);
        }
        document.getElementById('out').innerHTML += msg + '\r\n';
    });
}

function getCookie(name) {
  var start = document.cookie.indexOf(name + "=");
  var len = start + name.length + 1;
  if ((!start) && (name != document.cookie.substring(0, name.length))) {
    return null;
  }

  if (start == -1) return null;
  var end = document.cookie.indexOf(';', len);
  if (end == -1) end = document.cookie.length;
  return unescape(document.cookie.substring(len, end));
}
