import * as types from '../mutation-types'
import axios from '@/plugins/axios'
import _ from 'lodash'

// initial state
const state = {
  all: []
//  all: tmp
}

// getters
const getters = {
  allRoles: state => state.all
  // allRoleSlugs: (state) => {
  //
  //   return _.map(state.all, 'id')
  // }
}

// actions
const actions = {
  getAllRoles ({ commit }) {
    axios.get('/roles').then(function (res) {
      console.log(res.data.data.roles)
      let roles = res.data.data.roles
      commit(types.RECEIVE_ROLES, { roles })
    })
  },
  updateRole ({ commit }, role) {
    commit(types.UPDATE_ROLE, { role })
  },
  setAllRoles ({ commit }, roles) {
    commit(types.RECEIVE_ROLES, { roles })
  }
}

// mutations
const mutations = {
  [types.RECEIVE_ROLES] (state, { roles }) {
    state.all = roles
  },
  [types.UPDATE_ROLE] (state, { role }) {
    _.assign(_.find(state.all, { id: Number(role.id) }), role)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
