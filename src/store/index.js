import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    api: {
      token: process.env.VUE_APP_ACCESS_TOKEN,
      key: process.env.VUE_APP_API_KEY,
      cdnPath: process.env.VUE_APP_IMG_CDN,
      basePath: process.env.VUE_APP_BASE_PATH
    },
    genres: null,
  },
  mutations: {
    loadGenres: (state, data) => {
      var map = new Map()
      data.forEach((item) => {
        map.set(item.id, item.name)
      })
      state.genres = map
      console.log(state.genres)
    },
  },
  actions: {
    fetchGenres({
      commit
    }) {
      axios.get(`${this.state.api.basePath}/genre/movie/list?api_key=${this.state.api.key}&language=en-US`).then(resp => {
        commit('loadGenres', resp.data.genres)
      })
    },
  },
  getters: {
    getGenresById: (state) => (id) => {
      return state.genres.get(id)
    }
  },
  modules: {}
})