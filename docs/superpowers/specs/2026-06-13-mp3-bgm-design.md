# MP3 BGM Design

## Goal

Replace the synthesized Web Audio background music with `audio/background.mp3` while preserving the existing settings switch and saved preference behavior.

## Playback

- Use one lazily created `HTMLAudioElement`.
- Load `./audio/background.mp3`, enable looping, and preload the file.
- Play at a target volume of `0.4`.
- Fade in after playback starts and fade out before pausing.
- Keep `isBgmPlaying()` false when playback is unavailable or `play()` is rejected.

## Integration

- Keep the existing `startBgm`, `stopBgm`, `toggleBgm`, and `isBgmPlaying` module boundary.
- Make start and toggle operations asynchronous so the UI and local preference reflect the actual result of `audio.play()`.
- Add the `audio/mpeg` MIME type to the local development server.

## Verification

- Add a Node regression test using a fake `Audio` implementation.
- Verify successful playback configuration, stopping behavior, rejected playback, the MP3 asset, and server MIME configuration.
- Rebuild `app.bundle.js` and run the existing regression suite.
