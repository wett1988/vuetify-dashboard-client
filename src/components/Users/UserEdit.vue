<template>
<v-layout column>

  <v-flex xs12 sm6 offset-sm3>

    <v-alert class="mt-2 mb-2" error icon="warning" :value="!_.isEmpty(validator)">
      {{ validator.message }}
    </v-alert>

    <v-card>

      <User :user='user' :validator='validator' v-if="!_.isEmpty(user)" />

      <v-card-actions>

        <v-btn error @click.native.stop="confirm = true">
          Destroy
        </v-btn>

        <v-spacer></v-spacer>

        <v-btn primary @click="update">
          Update
        </v-btn>

      </v-card-actions>

    </v-card>
  </v-flex>

  <v-dialog v-model="confirm" persistent>
    <!-- <v-btn primary dark slot="activator">Open Dialog</v-btn> -->
    <v-card>
      <!-- <v-card-title class="headline">Destroy user?</v-card-title> -->
      <v-card-text>Destroy user?</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="red--text darken-1" flat="flat" @click.native="destroy">Destroy</v-btn>
        <v-btn class="darken-1" flat="flat" @click.native="dialog = false">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

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
      current_item: {},
      confirm: false,
      validator: {}
    }
  },
  computed: {
    user: {
      get: function () {
        let tmp = {}
        if (!_.isEmpty(this.users)) {
          tmp = _.clone(_.find(this.users, {
            id: Number(this.$route.params.id)
          }))
        }
        return tmp
      },
      set: function (user) {
        this.updateUser(user)
      }
    },
    ...mapGetters({
      users: 'allUsers'
    })
  },
  methods: {
    destroy () {
      axios.delete('/users/' + this.user.id)
      .then(function (res) {
        this.setAllUsers(_.remove(this.users, { id: res.data.id }))
        this.$router.push('/users')
      }.bind(this))
      .catch(this.onError)
    },
    update () {
      axios.put('/users/' + this.user.id, this.user)
        .then(function (res) {
          console.log('res.data.data.user')
          console.log(res.data.data.user)
          this.user = res.data.data.user
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
      'updateUser',
      'setAllUsers'
    ])
  },
  mounted () {
    if (_.isEmpty(this.users)) {
      this.getAllUsers()
    }
  }
}
</script>
