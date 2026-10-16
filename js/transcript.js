// Story pages: show/hide transcript.
// The transcript is visible by default in the HTML, so it still works without JavaScript.
// The button exposes its state with aria-expanded and points at the panel with aria-controls.
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.transcript__toggle').forEach((button) => {
    const panel = document.getElementById(button.getAttribute('aria-controls'));
    const label = button.querySelector('.transcript__toggle-text');
    if (!panel) return;

    button.hidden = false;
    button.addEventListener('click', () => {
      const expanded = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!expanded));
      panel.hidden = expanded;
      if (label) label.textContent = expanded ? 'Show transcript' : 'Hide transcript';
    });
  });
});
