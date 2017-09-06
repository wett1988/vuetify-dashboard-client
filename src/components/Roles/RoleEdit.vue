<template>
<v-layout column>

  <v-flex xs12 sm6 offset-sm3>

    <v-alert class="mt-2 mb-2" error icon="warning" :value="!_.isEmpty(validator)">
      {{ validator.message }}
    </v-alert>

    <v-card>

      <Role :role='role' :validator='validator' v-if="!_.isEmpty(role)" />

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
      <v-card-text>Destroy role?</v-card-text>
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
import Role from '@/components/Roles/Role'
import {
  mapGetters,
  mapActions
} from 'vuex'
import _ from 'lodash'
import axios from '@/plugins/axios'

export default {
  components: {
    Role
  },
  data () {
    return {
      current_item: {},
      confirm: false,
      validator: {}
    }
  },
  computed: {
    role: {
      get: function () {
        let tmp = {}
        if (!_.isEmpty(this.roles)) {
          tmp = _.clone(_.find(this.roles, {
            id: Number(this.$route.params.id)
          }))
        }
        return tmp
      },
      set: function (role) {
        this.updateRole(role)
      }
    },
    ...mapGetters({
      roles: 'allRoles'
    })
  },
  methods: {
    destroy () {
      axios.delete('/roles/' + this.role.id)
      .then(function (res) {
        this.setAllRoles(_.remove(this.roles, { id: res.data.id }))
        this.$router.push('/roles')
      }.bind(this))
      .catch(this.onError)
    },
    update () {
      axios.put('/roles/' + this.role.id, this.role)
        .then(function (res) {
          console.log(res.data)
          this.role = res.data.data.role
          this.$router.push('/roles')
        }.bind(this))
        .catch(this.onError)
    },
    onError (error) {
      console.log('error')
      console.log(error)
      if (_.isObject(error.response.data)) {
        this.validator = error.response.data
      } else {
        console.log('Неизвестная ошибка. Попробуйте еще раз.')
      }
    },
    ...mapActions([
      'getAllRoles',
      'updateRole',
      'setAllRoles'
    ])
  },
  mounted () {
    if (_.isEmpty(this.roles)) {
      this.getAllRoles()
    }
  }
}
</script>
