<template>
  <div class="index">
    <div>2048小游戏</div>
    <button @click="go">开始</button>
    <button @click="score">最高分</button>
  </div>
</template>

<script>
export default {

};
</script>
<style lang="scss" scoped>
.index{
  div{
    width: 100%;
    font-size: 2rem;
    position: absolute;
    font-weight: bold;
    text-shadow: 7px 5px  5px  rgb(150, 145, 140);
    letter-spacing: 2px;
    top: 30%;text-align: center;
  }
  height: 100vh;width: 100%;
  background-image: linear-gradient(to top,rgb(223, 207, 169) 0%,rgb(211, 175, 97) 100%);
  position: relative;
  button{
    width: 33vw;height: 14vw;
    text-align: center;line-height: 14vw;
    color: #fff;background-color: rgb(221, 124, 68);
    border-radius: 10px;
    border: 0;
    box-shadow: 0 0 5px #aaa;
    top: 60%;margin-top: -7vw;
    position: absolute;
    &:nth-child(2){
      right: 10%;
    }
    &:last-child{
      left: 10%;
    }
  }
}
</style>
<script>
export default {
  methods:{
    go(){
      this.$router.push('/game')
    },
    score(){
      this.$router.push('/score')
    }
  }
}
</script>