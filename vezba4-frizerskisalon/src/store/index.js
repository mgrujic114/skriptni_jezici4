import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    proizvodi: [],
    korpa: [],
    narudzbine: [], 
    token: '',
    user_id: ''
  },
  getters: {
    kolicinaProizvoda: state => proizvod => {
      const item = state.korpa.find(i => i.id === proizvod.id)

      if (item) return item.quantity
      else return null
    },
    proizvodiIzKorpe: state => {
      return state.korpa
    },
    ukupnaCena: state => {
      return state.korpa.reduce((a, b) => a + (b.cena * b.quantity * b.kategorija.koeficijent), 0)
    },
    ukupnoProizvoda: state => {
      return state.korpa.reduce((a, b) => a + b.quantity, 0)
    },
    user_id: state => {
      return state.user_id
    }
  },
  mutations: {
    setProizvodi (state, proizvodi) {
      state.proizvodi = proizvodi
    },
    addProizvod (state, proizvod) {
      state.proizvodi[proizvod.id] = proizvod
    },
    setNarudzbine (state, narudzbine) {
      state.narudzbine = narudzbine
    },
    addNarudzbina (state, narudzbina) {
      state.narudzbine.push(narudzbina)
    },
    addUKorpu (state, { proizvod, kolicina }) {
      const item = state.korpa.find(i => i.id === proizvod.id)

      if (item) {
        item.quantity += kolicina
      } else {
        state.korpa.push({ ...proizvod, quantity: kolicina })
      }

      localStorage.setItem('korpa', JSON.stringify(state.korpa))
    },
    removeIzKorpe (state, proizvod) {
      const item = state.korpa.find(i => i.id === proizvod.id)

      if (item) {
        if (item.quantity > 1) {
          item.quantity--
        } else {
          state.korpa = state.korpa.filter(i => i.id !== proizvod.id)
        }
      }

      localStorage.setItem('korpa', JSON.stringify(state.korpa))
    },
    updateKorpaFromLocalStorage (state) {
      const korpa = localStorage.getItem('korpa')

      if (korpa) {
        state.korpa = JSON.parse(korpa)
      }
    },
    setToken(state, token) {
      state.token = token;
      localStorage.token = token;
    },
    removeToken(state) {
      state.token = '';
      localStorage.token = '';
    },
    setUser (state, id) {
      state.user_id = id
    },
    removeUser (state) {
      state.user_id = null
    }
  },
  actions: {
    async fetchProizvodi({ commit }) {
      try {
        const response = await fetch('http://localhost:9000/usluga');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        commit('setProizvodi', data);
      } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
      }
    },    
    async getProizvod ({ commit, state }, proizvodID) {
      return new Promise((resolve, reject) => {
        if (state.proizvodi[proizvodID - 1]) {
          resolve(state.proizvodi[proizvodID - 1])
        } else {
          fetch(`http://localhost:9000/usluga/${proizvodID}`)
            .then(res => res.json())
            .then(data => {
              commit('addProizvod', data)
              resolve(data)
            })
        }
        console.log(reject)
      })
    },
    async fetchNarudzbine ({ commit }) {
      fetch('http://localhost:9000/termin')
        .then(res => res.json())
        .then(data => commit('setNarudzbine', data))
    },
    register({ commit }, obj) {
       fetch('http://127.0.0.1:9001/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
      }).then( res => res.json() )
        .then( data => commit('setToken', data.token) );
    },
    login({ commit }, obj) {
      fetch('http://127.0.0.1:9001/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
    }).then( res => res.json() )
      .then( data => {
        if (data.msg) {
          alert(data.msg);
        } else {
          commit('setToken', data.token)
          commit('setUser', data.id)
        }
      });
    },
    
  },
  modules: {
  }
})