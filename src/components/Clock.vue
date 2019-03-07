<template>
  <h1>{{ timeLeft }}</h1>
</template>

<script>
export default {
  name: "Clock",
  data() {
    return {
      currentTime: Date.now(),
      moved: false
    };
  },
  props: {
    alarm: Number,
    autoMove: Function
  },
  computed: {
    timeLeft: function() {
      // console.log("recomputing");
      if (this.alarm <= this.currentTime - 1000) {
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
        this.moved = false;
        this.currentTime = currentTime;
      } else if (!this.moved) {
        this.autoMove();
        this.moved = true;
      }
    }
  },
  mounted() {
    window.setInterval(this.updateTime, 500);
  }
};
</script>

<style lang="scss" scoped></style>
