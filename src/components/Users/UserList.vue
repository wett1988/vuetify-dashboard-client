<template>
<v-layout row wrap>
  <v-flex xs12 sm4 v-for="user in users" :key="user.id">

    <v-card class="ma-1">



      <v-card-title primary-title>
        <div>
          <h5 class="mb-0">{{ user.name }}</h5>
          <div>{{ user.email }}</div>
        </div>
      </v-card-title>
      <v-card-actions>
        <v-btn flat :to=" '/users/edit/' + user.id ">Edit</v-btn>
      </v-card-actions>
    </v-card>



  </v-flex>


  <v-btn
  dark
  fab
  bottom
  right
  fixed
  class="red"
  @click="create"
>
  <v-icon>add</v-icon>
</v-btn>


</v-layout>
</template>
<script>
import {
  mapGetters,
  mapActions
} from 'vuex'
import _ from 'lodash'

export default {
  computed: {
    ...mapGetters({
      users: 'allUsers'
    })
  },
  mounted () {
    if (_.isEmpty(this.users)) {
      this.getAllUsers()
    }
  },
  methods: {
    create () {
      this.$router.push('/users/create')
    },
    ...mapActions([
      'getAllUsers'
    ])
  }
}
</script>
