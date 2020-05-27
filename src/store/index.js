import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    score:localStorage.getItem('score')?localStorage.getItem('score'): 0
  },
  mutations: {
    highScore(state,score){
      if(score>state.score){
        state.score=score;
        localStorage.setItem('score',score)
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
