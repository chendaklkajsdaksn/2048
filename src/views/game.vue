<template>
  <div class="game">
    <div class="bg">
      <!-- <img :src="require('../assets/images/psb.jpg')" alt=""> -->
    </div>
    <div class="head">
      <button @click="back">返回</button>
      <div>2048</div>
    </div>
    <div class="score">{{score}}</div>
    <div class="highScore">
      最高纪录：
      <div>{{this.$store.state.score}}</div>
    </div>
    <div class="again" @click="again">再来一次</div>
    <div class="games" @touchstart.prevent="start" @touchend.stop.prevent="end" id="change">
      <div
        v-for="(e,i) in num"
        :key="i"
        :class="e>8?`text_white bg${e>0?Math.round(Math.log(e)/Math.log(2)):1}`:`text_dark  bg${e>0?Math.round(Math.log(e)/Math.log(2)):1}`"
      >{{e}}</div>
    </div>
    <div v-if="ended" class="end">
      <div>游戏结束</div>
      <button @click="again">再来一局</button>
      <button @click="back">返回首页</button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.text_dark {
  color: #444;
}

.text_white {
  color: #eee;
}
@for $i from 1 through 14 {
  .bg#{$i} {
    background-color: rgba(255, (275-20 * $i), (275-20 * $i), 0.8);
  }
}
.big {
  transform: scale(1.2) !important;
  -ms-transform: scale(1.2) !important; /* IE 9 */
  -moz-transform: scale(1.2) !important; /* Firefox */
  -webkit-transform: scale(1.2) !important; /* Safari 和 Chrome */
  -o-transform: scale(1.2) !important;
  font-size: 2rem !important;
}
.game {
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(
    to top,
    rgb(226, 213, 98) 0%,
    rgb(214, 180, 30) 100%
  );
  div.bg {
    &:first-child {
      width: 100vw;
      height: 100vh;
      filter: blur(4px);
      background: url("../assets/images/psb.jpg") 60% 100%;
      opacity: 0.4;
      position: absolute;
    }
  }
  div.end {
    width: 60vw;
    height: 40vw;
    border-radius: 3vw;
    background: rgba(0, 0, 0, 0.7);
    text-align: center;
    font-size: 1.3rem;
    position: absolute;
    margin-left: -30vw;
    margin-top: -10vw;
    left: 50%;
    top: 50%;
    color: #eee;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-direction: column;
    button {
      background: rgba(199, 182, 105, 1);
      border: 0;
      padding: 1.5vw 3vw;
      border-radius: 1vw;
      color: #444;
    }
  }
  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.5rem;
    color: #000;
    font-weight: bold;
    padding: 2vw 4vw;
    height: 8vw;
    position: relative;
    background-color: rgba(0, 0, 0, 1);
    color: #fff;
    order: 10;
    letter-spacing: 1px;

    button {
      background: rgba(0, 0, 0, 0);
      border: 0;
      color: #fff;
      &:first-child {
        font-size: 1.2rem;
        letter-spacing: 2px;
      }
    }
  }
  .score {
    font-size: 3rem;
    letter-spacing: 5px;
    font-weight: bold;
    position: absolute;
    color: #333;
    top: 10%;
    left: 10%;
  }
  .highScore {
    box-sizing: border-box;
    width: 20vw;
    height: 12vw;
    text-align: center;
    padding: 1vw;
    font-size: 0.8rem;
    color: rgba(200, 200, 200, 0.6);
    border-radius: 5px;
    background: rgba(0, 0, 0, 0.3);
    position: absolute;
    right: 10%;
    top: 10%;
    div {
      color: #ccc;
      font-size: 1.3rem;
      line-height: 7.5vw;
    }
  }
  .again {
    box-sizing: border-box;
    width: 30vw;
    height: 10vw;
    text-align: center;
    line-height: 10vw;
    font-size: 1.3rem;
    color: #ccc;
    border-radius: 5px;
    background: rgba(0, 0, 0, 0.3);
    position: absolute;
    right: 10%;
    top: 20%;
  }
  .games {
    width: 90vw;
    height: 90vw;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 3vw;
    position: absolute;
    top: 40%;
    right: 5%;
    padding: 3vw;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(4, 1fr);
    gap: 3vw;
    box-sizing: border-box;
    div {
      font-size: 1.6rem;
      font-weight: bold;
      line-height: 18.75vw;
      text-align: center;
      border-radius: 2vw;
      transition: all 0.5s;
    }
  }
}
</style>
<script>
export default {
  data() {
    return {
      num: ["2", "", "", "", "", "2", "", "", "", "", "", "", "", "", "", ""],
      x1: 0,
      y1: 0,
      score: 0,
      code: 0,
      ended: false
    };
  },
  methods: {
    back() {
      this.$router.back();
      this.$store.commit("highScore", this.score);
    },
    start(e) {
      this.x1 = e.changedTouches[0].clientX;
      this.y1 = e.changedTouches[0].clientY;
    },
    end(e) {
      let x2 = e.changedTouches[0].clientX;
      let y2 = e.changedTouches[0].clientY;
      let state = [];
      //向不同方向滑动时执行函数,滑动距离太少则不执行函数
      if (Math.abs(this.x1 - x2) < 10 && Math.abs(this.y1 - y2) < 10) {
        return;
      } else if (Math.abs(this.x1 - x2) > Math.abs(this.y1 - y2)) {
        if (this.x1 > x2) {
          for (var j = 0; j < 3; j++) {
            this.num.forEach((e, i, arr) => {
              if (i < 3) {
                if (!arr[i]) {
                  arr[i] = arr[i + 1];
                  arr[i + 1] = null;
                } else if (arr[i] == arr[i + 1]) {
                  // console.log(arr[i])
                  arr[i] *= 2;
                  arr[i + 1] = null;
                  state.push("1");
                  this.score += arr[i];
                }
              } else if (i > 3 && i < 7) {
                if (!arr[i]) {
                  arr[i] = arr[i + 1];
                  arr[i + 1] = null;
                } else if (arr[i] == arr[i + 1]) {
                  // console.log(arr[i])
                  arr[i] *= 2;
                  arr[i + 1] = null;
                  state.push("1");
                  this.score += arr[i];
                }
              } else if (i > 7 && i < 11) {
                if (!arr[i]) {
                  arr[i] = arr[i + 1];
                  arr[i + 1] = null;
                } else if (arr[i] == arr[i + 1]) {
                  // console.log(arr[i])
                  state.push("1");
                  arr[i] *= 2;
                  arr[i + 1] = null;
                  this.score += arr[i];
                }
              } else if (i > 11 && i < 15) {
                if (!arr[i]) {
                  arr[i] = arr[i + 1];
                  arr[i + 1] = null;
                } else if (arr[i] == arr[i + 1]) {
                  // console.log(arr[i])
                  arr[i] *= 2;
                  arr[i + 1] = null;
                  state.push("1");
                  this.score += arr[i];
                }
              }
            });
          }
          let numEmp = [];
          this.num.forEach((e, i, arr) => {
            if (!e) {
              numEmp.push(i);
            }
            // console.log(e,i)
          });
          if (state[0] || this.code != 1)
            this.num[numEmp[Math.floor(Math.random() * numEmp.length)]] = 2;
          this.num.reverse().reverse();
          console.log(state);
          this.code = 1;
        } else {
          for (var j = 0; j < 3; j++) {
            this.num.forEach((e, i, arr) => {
              if (i < 4 && i > 0) {
                if (!arr[i]) {
                  arr[i] = arr[i - 1];
                  arr[i - 1] = null;
                } else if (arr[i] == arr[i - 1]) {
                  // console.log(arr[i])
                  state.push("1");
                  arr[i] *= 2;
                  arr[i - 1] = null;
                  this.score += arr[i];
                }
              } else if (i > 4 && i < 8) {
                if (!arr[i]) {
                  arr[i] = arr[i - 1];
                  arr[i - 1] = null;
                } else if (arr[i] == arr[i - 1]) {
                  // console.log(arr[i])
                  state.push("1");
                  arr[i] *= 2;
                  arr[i - 1] = null;
                  this.score += arr[i];
                }
              } else if (i > 8 && i < 12) {
                if (!arr[i]) {
                  arr[i] = arr[i - 1];
                  arr[i - 1] = null;
                } else if (arr[i] == arr[i - 1]) {
                  // console.log(arr[i])
                  state.push("1");
                  arr[i] *= 2;
                  arr[i - 1] = null;
                  this.score += arr[i];
                }
              } else if (i > 12 && i < 16) {
                if (!arr[i]) {
                  arr[i] = arr[i - 1];
                  arr[i - 1] = null;
                } else if (arr[i] == arr[i - 1]) {
                  // console.log(arr[i])
                  state.push("1");
                  arr[i] *= 2;
                  arr[i - 1] = null;
                  this.score += arr[i];
                }
              }
            });
          }
          let num1 = [];
          this.num.forEach((e, i, arr) => {
            if (!e) {
              num1.push(i);
            }
            // console.log(e,i)
          });
          if (state[0] || this.code != 2)
            this.num[num1[Math.floor(Math.random() * num1.length)]] = 2;
          this.num.reverse().reverse();
        }
        this.code = 2;
      } else {
        if (this.y1 > y2) {
          console.log("向上");
          for (let j = 0; j < 4; j++) {
            this.num.forEach((e, i, arr) => {
              if (i < 12) {
                if (!arr[i]) {
                  arr[i] = arr[i + 4];
                  arr[i + 4] = null;
                } else if (arr[i] == arr[i + 4]) {
                  // console.log(arr[i])
                  state.push("1");
                  arr[i] *= 2;
                  arr[i + 4] = null;
                  this.score += arr[i];
                }
              }
            });
          }
          let num1 = [];
          this.num.forEach((e, i, arr) => {
            if (!e) {
              num1.push(i);
            }
            // console.log(e,i)
          });
          if (state[0] || this.code != 3)
            this.num[num1[Math.floor(Math.random() * num1.length)]] = 2;
          this.num.reverse().reverse();
          this.code = 3;
        } else {
          console.log("向下");
          for (let j = 0; j < 4; j++) {
            this.num.forEach((e, i, arr) => {
              if (i > 3) {
                if (!arr[i]) {
                  arr[i] = arr[i - 4];
                  arr[i - 4] = null;
                } else if (arr[i] == arr[i - 4]) {
                  // console.log(arr[i])
                  state.push("1");
                  arr[i] *= 2;
                  arr[i - 4] = null;
                  this.score += arr[i];
                }
              }
            });
          }
          let num1 = [];
          this.num.forEach((e, i, arr) => {
            if (!e) {
              num1.push(i);
            }
            // console.log(e,i)
          });
          if (state[0] || this.code != 4)
            this.num[num1[Math.floor(Math.random() * num1.length)]] = 2;
          this.num.reverse().reverse();
          this.code = 4;
        }
      }
    },
    again() {
      this.num.forEach((e, i, arr) => {
        if (i == 0 || i == 5) {
          arr[i] = 2;
        } else {
          arr[i] = null;
        }
        this.ended = false;
      });
      this.num.reverse().reverse();
      this.score = 0;
      console.log(this.num);
    }
  },
  watch: {
    num() {
      let exist = false;
      if (
        this.num.every((e, i) => {
          return e > 0;
        })
      ) {
        this.num.forEach((e, i, arr) => {
          for (let m = 0; m < 4; m++) {
            if (i % 4 !== 0) {
              if (arr[i] == arr[i - 1]) {
                exist = true;
              } else if (i < 12) {
                if (arr[i] == arr[i + 4]) {
                  exist = true;
                }
              }
            }
          }
        });
      }
      if (!exist) {
        this.ended = true;
        this.$store.commit("highScore", this.score);
      }
    }
  }
};
</script>