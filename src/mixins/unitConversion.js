export default {
  methods: {
    miles: function(meters) {
      return (meters * 0.00062137).toFixed(2);
    },

    pace: function(seconds) {
      let minutes = Math.floor(seconds / 60);
      let fractional = (seconds % 60).toString().padStart(2, '0');
      return minutes + ':' + fractional;
    },

    time: function(seconds) {
      let min = Math.floor(seconds / 60);
      let hr = Math.floor(min / 60);
      min = (min % 60).toString().padStart(2, '0');
      let sec = (seconds % 60).toString().padStart(2, '0');
      let time = min + ':' + sec;
      if (hr > 0) {
        time = hr + ':' + time;
      }
      return time;
    }
  }
};