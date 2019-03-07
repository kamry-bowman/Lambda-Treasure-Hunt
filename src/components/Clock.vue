<template>
  <h1>{{ timeLeft }}</h1>
</template>

<script>
export default {
  name: "Clock",
  data() {
    return {
      currentTime: Date.now()
    };
  },
  props: {
    alarm: Number
  },
  computed: {
    timeLeft: function() {
      // console.log("recomputing");
      if (this.alarm <= this.currentTime) {
        return 0;
      } else {
        return ((this.alarm - this.currentTime) / 1000).toFixed(0);
      }
    }
  },
  methods: {
    updateTime: function() {
      const currentTime = Date.now();
      // console.log(currentTime, this.alarm);
      if (currentTime <= this.alarm) {
        this.currentTime = currentTime;
      }
    }
  },
  mounted() {
    window.setInterval(this.updateTime, 1000);
  }
};
</script>

<style lang="scss" scoped></style>
