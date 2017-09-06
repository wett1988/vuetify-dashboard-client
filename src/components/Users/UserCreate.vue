<template>
<v-layout column>

  <v-flex xs12 sm6 offset-sm3>

    <v-alert class="mt-2 mb-2" error icon="warning" :value="!_.isEmpty(validator)">
      {{ validator.message }}
    </v-alert>

    <v-card>

      <User :user='form' :validator='validator' />

      <v-card-actions>

        <v-spacer></v-spacer>

        <v-btn primary @click="store">
          Store
        </v-btn>

      </v-card-actions>

    </v-card>
  </v-flex>

</v-layout>
</template>
<script>
import User from '@/components/Users/User'
import {
  mapGetters,
  mapActions
} from 'vuex'
import _ from 'lodash'
import axios from '@/plugins/axios'

export default {
  components: {
    User
  },
  data () {
    return {
      form: {},
      validator: {}
    }
  },
  computed: {
    ...mapGetters({
      users: 'allUsers'
    })
  },
  methods: {
    getForm () {
      axios.get('/users/create')
        .then((res) => {
          console.log('res.data')
          console.log(res.data)
          this.form = res.data.data.form
        })
    },
    store () {
      axios.post('/users', this.form)
      .then(function (res) {
        console.log('res.data')
        console.log(res.data)
        // let tmp = this.$store.state.users.list
        // tmp.push( res.data )
        // this.$store.commit('users/set', tmp )
        this.setAllUsers(this.users.push(res.data.data.user))
        this.getForm()
        this.$router.push('/users')
      }.bind(this))
      .catch(this.onError)
    },
    onError (error) {
      if (_.isObject(error.response.data)) {
        this.validator = error.response.data
      } else {
        console.log('Неизвестная ошибка. Попробуйте еще раз.')
      }
    },
    ...mapActions([
      'getAllUsers',
      'createUser',
      'setAllUsers'
    ])
  },
  mounted () {
    this.getForm()
  }
}
</script>
