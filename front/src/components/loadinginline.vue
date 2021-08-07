<template>
    <div :id="large ? 'square6' : 'square5'">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
    </div>
</template>

<script>
export default {
    name: 'loadinginline',
    props: {
        large: {
            type: Boolean,
            default: false,
        },
    },
}
</script>

<style scoped lang="scss">
#square5 {
  display: flex;
}

#square6 span {
  color: white;
  padding: 1px;
  margin: 1px;
  width: 25px;
  height: 25px;
  background-color: #f4a236;
  border-radius: 50%;
  display: inline-block;
  -webkit-animation: square5 1.4s infinite ease-in-out both;
          animation: square5 1.4s infinite ease-in-out both;
}

#square5 span {
  color: white;
  padding: 1px;
  margin: 1px;
  width: 8.5px;
  height: 8.5px;
  background-color: #000;
  display: inline-block;
  -webkit-animation: square5 1.4s infinite ease-in-out both;
          animation: square5 1.4s infinite ease-in-out both;
}

#square5 span:nth-child(1) {
  left: 5.5px;
  border-radius: 50%;
  -webkit-animation-delay: 0.2s;
          animation-delay: 0.2s;
  background: #F57C00;
}

#square5 span:nth-child(2) {
  left: 11px;
  border-radius: 50%;
  -webkit-animation-delay: 0.4s;
          animation-delay: 0.4s;
  background: #009688;
}

#square5 span:nth-child(3) {
  left: 16px;
  border-radius: 50%;
  -webkit-animation-delay: 0.6s;
          animation-delay: 0.6s;
  background: #1976D2;
}

#square5 span:nth-child(4) {
  left: 22px;
  border-radius: 50%;
  -webkit-animation-delay: 0.8s;
          animation-delay: 0.8s;
  background: #F44336;
}

@keyframes square5 {
  0% {
    -webkit-transform: rotateY(0deg);
            transform: rotateY(0deg);
    -webkit-transform: rotateY(0deg);
            transform: rotateY(0deg);
  }
  50% {
    -webkit-transform: rotateY(180deg);
            transform: rotateY(180deg);
    -webkit-transform: rotateY(180deg);
            transform: rotateY(180deg);
  }
  100% {
    -webkit-transform: rotateX(180deg);
            transform: rotateX(180deg);
    -webkit-transform: rotateX(180deg);
            transform: rotateX(180deg);
  }
}
@-webkit-keyframes square5 {
  0% {
    -webkit-transform: rotateY(0deg);
            transform: rotateY(0deg);
  }
  50% {
    -webkit-transform: rotateY(180deg);
            transform: rotateY(180deg);
  }
  100% {
    -webkit-transform: rotateX(180deg);
            transform: rotateX(180deg);
  }
}
</style>