var last_known_scroll_position = 0;
var ticking = false;
var header = document.getElementsByTagName('header');

function doSomething(scroll_pos) {
  if (scroll_pos >= 64) {
    header[0].className = 'sticky-header';
  }
  else {
    header[0].className = '';
  }
}

window.addEventListener('scroll', function(e) {
  last_known_scroll_position = window.scrollY;
  if (!ticking) {
    window.requestAnimationFrame(function() {
      doSomething(last_known_scroll_position);
      ticking = false;
    });
  }
  ticking = true;
});
