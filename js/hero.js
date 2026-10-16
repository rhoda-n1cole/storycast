// Home hero: muted YouTube background video with accessible Pause and Sound controls.
// - Uses the YouTube IFrame API so sound and playback can be controlled.
// - Respects prefers-reduced-motion (the video starts paused).
// - Announces state changes through an aria-live region.
// - If the API never loads, the poster image stays and the controls stay hidden.
document.addEventListener('DOMContentLoaded', () => {
  const hero = document.querySelector('.hero');
  const mount = hero?.querySelector('[data-video-id]');
  if (!mount) return;

  const videoId = mount.dataset.videoId;
  const controls = hero.querySelector('.hero__controls');
  const playBtn = hero.querySelector('[data-hero-play]');
  const soundBtn = hero.querySelector('[data-hero-sound]');
  const status = hero.querySelector('.hero__status');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let player = null;
  let isPlaying = !reduceMotion;
  let isMuted = true;

  function announce(message) {
    if (status) status.textContent = message;
  }

  function setButton(btn, text) {
    const label = btn?.querySelector('.hero__control-text');
    if (label) label.textContent = text;
  }

  function updateButtons() {
    setButton(playBtn, isPlaying ? 'Pause video' : 'Play video');
    setButton(soundBtn, isMuted ? 'Turn sound on' : 'Turn sound off');
    playBtn?.querySelector('[data-icon="pause"]')?.toggleAttribute('hidden', !isPlaying);
    playBtn?.querySelector('[data-icon="play"]')?.toggleAttribute('hidden', isPlaying);
    soundBtn?.querySelector('[data-icon="muted"]')?.toggleAttribute('hidden', !isMuted);
    soundBtn?.querySelector('[data-icon="sound"]')?.toggleAttribute('hidden', isMuted);
  }

  function onReady(event) {
    const iframe = event.target.getIframe();
    // The background video is decorative: keep it out of the tab order and accessibility tree.
    iframe.setAttribute('tabindex', '-1');
    iframe.setAttribute('aria-hidden', 'true');
    iframe.setAttribute('title', 'Background video: Harvest Service at Noble Family Church');

    if (isPlaying) event.target.playVideo();
    controls?.removeAttribute('hidden');
    updateButtons();
  }

  window.onYouTubeIframeAPIReady = () => {
    player = new YT.Player(mount, {
      videoId,
      playerVars: {
        autoplay: isPlaying ? 1 : 0,
        mute: 1, // browsers only allow muted autoplay
        controls: 0,
        loop: 1,
        playlist: videoId, // required for loop to work
        rel: 0,
        playsinline: 1,
        disablekb: 1,
        cc_load_policy: 1,
      },
      events: { onReady },
    });
  };

  playBtn?.addEventListener('click', () => {
    if (!player) return;
    isPlaying = !isPlaying;
    if (isPlaying) player.playVideo();
    else player.pauseVideo();
    updateButtons();
    announce(isPlaying ? 'Background video playing.' : 'Background video paused.');
  });

  soundBtn?.addEventListener('click', () => {
    if (!player) return;
    isMuted = !isMuted;
    if (isMuted) {
      player.mute();
    } else {
      player.unMute();
      player.setVolume(80);
      if (!isPlaying) {
        isPlaying = true;
        player.playVideo();
      }
    }
    updateButtons();
    announce(isMuted ? 'Sound off.' : 'Sound on.');
  });

  const tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/iframe_api';
  document.head.appendChild(tag);
});
