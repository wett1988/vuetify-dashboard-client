import * as types from '../mutation-types'
import axios from '@/plugins/axios'
import _ from 'lodash'

// const tmp = [
//  { name: 'name1', email: 'email1@yandex.ru', id: '1' },
//  { name: 'name2', email: 'email2@yandex.ru', id: '2' },
//  { name: 'name3', email: 'email3@yandex.ru', id: '3' },
//  { name: 'name4', email: 'email4@yandex.ru', id: '4' }
// ]

// initial state
const state = {
  all: []
//  all: tmp
}

// getters
const getters = {
  allUsers: state => state.all
}

// actions
const actions = {
  getAllUsers ({ commit }) {
//    commit(types.RECEIVE_USERS, { tmp })
    axios.get('/users').then(function (res) {
      console.log('res')
      // console.log(tmp)
      console.log(res.data.data.users)
      let users = res.data.data.users
      commit(types.RECEIVE_USERS, { users })
    })
//    shop.getUsers(users => {
//      commit(types.RECEIVE_USERS, { users })
//    })
  },
  updateUser ({ commit }, user) {
    commit(types.UPDATE_USER, { user })
  },
  setAllUsers ({ commit }, users) {
    commit(types.RECEIVE_USERS, { users })
  }
}

// mutations
const mutations = {
  [types.RECEIVE_USERS] (state, { users }) {
    state.all = users
  },
  [types.UPDATE_USER] (state, { user }) {
    _.assign(_.find(state.all, { id: Number(user.id) }), user)

    // let index = _.findIndex(state.all, { id: Number(user.id) })
    // state.all.splice(index, 1, user)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
