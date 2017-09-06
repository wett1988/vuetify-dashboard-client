<template>
<v-layout column>

  <v-flex xs12 sm6 offset-sm3>

    <v-alert class="mt-2 mb-2" error icon="warning" :value="!_.isEmpty(validator)">
      {{ validator.message }}
    </v-alert>

    <v-card>

      <Role :role='form' :validator='validator' />

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
      form: {},
      validator: {}
    }
  },
  computed: {
    ...mapGetters({
      roles: 'allRoles'
    })
  },
  methods: {
    getForm () {
      axios.get('/roles/create')
        .then((res) => {
          console.log('res.data')
          console.log(res.data)
          this.form = res.data.data.form
        })
    },
    store () {
      console.log('this.form')
      console.log(this.form)
      axios.post('/roles', this.form)
      .then(function (res) {
        // console.log('res.data')
        // console.log(res.data)
        this.setAllRoles(this.roles.push(res.data.data.role))
        this.getForm()
        this.$router.push('/roles')
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
      'getAllRoles',
      'createRole',
      'setAllRoles'
    ])
  },
  mounted () {
    this.getForm()
  }
}
</script>
