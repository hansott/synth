(function() {

  class Synth {
    constructor(audioContext) {
      this.audioContext = audioContext;
      this.oscillator = this.audioContext.createOscillator();
    }

    connect(destination) {
      this.oscillator.start();
      this.oscillator.connect(destination);
    }

    setFrequency(frequency) {
      this.oscillator.frequency.value = frequency;
    }

    setWaveform(waveform) {
      this.oscillator.type = waveform;
    }
  }

  const audioContext = new AudioContext();
  const synth = new Synth(audioContext);
  const gain = audioContext.createGain();
  gain.gain.value = 0;
  synth.connect(gain);
  gain.connect(audioContext.destination);

  const notes = {
    "c": 261.63,
    "c#": 277.18,
    "d": 293.66,
    "d#": 311.13,
    "e": 329.63,
    "f": 349.23,
    "f#": 369.99,
    "g": 392.00,
    "g#": 415.30,
    "a": 440,
    "a#": 466.16,
    "b": 493.88,
  };

  const piano = document.getElementById('piano');

  piano.addEventListener('mousedown', event => {
    if (event.target instanceof HTMLButtonElement) {
      const note = event.target.getAttribute('data-note');
      if (note in notes) {
        const frequency = notes[note];
        synth.setFrequency(frequency);
        gain.gain.value = 1;
      }
    }
  });

  piano.addEventListener('mouseup', () => {
    gain.gain.value = 0;
  });

  const waveformSelector = document.getElementById('waveform');

  waveformSelector.addEventListener('change', event => {
    synth.setWaveform(event.target.value);
  });

})();
