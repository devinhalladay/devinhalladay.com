function showButton(el1, el2) {
  document.getElementById(el1).style.display = 'inline-flex';
  document.getElementById(el2).style.display = 'none';
}

function toggleFullScreen() {
  if ((document.fullScreenElement && document.fullScreenElement !== null) ||
   (!document.mozFullScreen && !document.webkitIsFullScreen)) {
    if (document.documentElement.requestFullScreen) {
      document.documentElement.requestFullScreen();
      showButton('retract', 'expand');
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
      showButton('retract', 'expand');
    } else if (document.documentElement.webkitRequestFullScreen) {
      document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
      showButton('retract', 'expand');
    }
  } else {
    if (document.cancelFullScreen) {
      document.cancelFullScreen();
      showButton('expand', 'retract');
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
      showButton('expand', 'retract');
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
      showButton('expand', 'retract');
    }
  }
}


var windowObjectReference;
var strWindowFeatures = "menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes";

function openWindow() {
  // windowObjectReference = window.open("tau", "Interface", strWindowFeatures);
  document.getElementById('window').classList.add("open");
}

function closeWindow() {
  // windowObjectReference = window.open("tau", "Interface", strWindowFeatures);
  document.getElementById('window').classList.remove("open");
}

function enterWindow() {
  document.getElementById('window').classList.add("full");
  showButton('retract', 'expand');
}

function exitWindow() {
  document.getElementById('window').classList.remove("full");
  showButton('expand', 'retract');
}
