/* Members page: fill in the head-count next to each section name, so numbers never go stale. */
document.querySelectorAll('[data-count]').forEach(function (el) {
  var sec = document.getElementById(el.getAttribute('data-count'));
  if (sec) el.textContent = sec.querySelectorAll('.person').length;
});
