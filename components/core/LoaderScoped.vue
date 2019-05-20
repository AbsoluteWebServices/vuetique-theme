<template>
  <div class="loader-container absolute bg-grey-lightest z-loader">
    <div class="loader-inner-container absolute">
      <div class="spinner relative">
        <div class="double-bounce1 absolute w-full rounded-full bg-primary"/>
        <div class="double-bounce2 absolute w-full rounded-full bg-primary"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoaderScoped'
}
</script>

<style lang="scss" scoped>
.loader-container {
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

.loader-inner-container {
  left: 50%;
  top: 50%;
  transform: translateY(-50%) translateX(-50%);
}

.spinner {
  width: 40px;
  height: 40px;
  margin: 0 auto;
}

.double-bounce1,
.double-bounce2 {
  height: 100%;
  opacity: 0.6;
  top: 0;
  left: 0;
  -webkit-animation: sk-bounce 2s infinite ease-in-out;
  animation: sk-bounce 2s infinite ease-in-out;
}

.double-bounce2 {
  -webkit-animation-delay: -1s;
  animation-delay: -1s;
}

@-webkit-keyframes sk-bounce {
  0%,
  100% {
    -webkit-transform: scale(0);
  }
  50% {
    -webkit-transform: scale(1);
  }
}

@keyframes sk-bounce {
  0%,
  100% {
    transform: scale(0);
    -webkit-transform: scale(0);
  }
  50% {
    transform: scale(1);
    -webkit-transform: scale(1);
  }
}
</style>
