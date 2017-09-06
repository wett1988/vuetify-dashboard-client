<template>
<v-layout row wrap>
  <v-flex xs12 sm6 offset-sm3>

    <v-alert class="mt-2 mb-2" error icon="warning" :value="!_.isEmpty(validator)">
      {{ validator.message }}
    </v-alert>

    <v-card>

      <v-card-title primary-title>
        <div>
          <h3 class="headline mb-0">Login</h3>
          <div>Signin to start session</div>
        </div>
      </v-card-title>

      <Auth :form='form' :validator='validator'/>

      <v-card-actions>

        <v-btn primary block @click="login" >
          Login
        </v-btn>

      </v-card-actions>

    </v-card>

  </v-flex>
</v-layout>
</template>
<script>
import Auth from '@/components/Auth/Auth'
import _ from 'lodash'
export default {
  components: {
    Auth
  },
  data () {
    return {
      form: {
        email: 'wett@yandex.ru',
        password: '12345678'
      },
      validator: {}
    }
  },
  methods: {
    login () {
      let redirect = this.$auth.redirect()
      let onError = this.onError

      this.$auth.login({
        data: this.form,
        redirect: {
          name: redirect ? redirect.from.name : 'home'
        },
        fetchUser: true,
        success () {
          console.log('success ')
          console.log(this.$auth.user())
        },
        error (error) {
          onError(error)
        }
      })
    },
    onError (error) {
      console.log('error')
      console.log(error)
      if (_.isObject(error.response.data)) {
        this.validator = error.response.data
      } else {
        console.log('Неизвестная ошибка. Попробуйте еще раз.')
      }
    }
  }
}
</script>
