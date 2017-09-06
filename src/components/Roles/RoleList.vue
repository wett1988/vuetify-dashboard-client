<template>
<v-layout row wrap>
  <v-flex xs12 sm6 offset-sm3>
    <v-card>
      <v-list two-line subheader >
        <v-list-tile v-for='role in roles' :key="role.id" v-if='!_.isEmpty(roles)'>
          <v-list-tile-content>
            <v-list-tile-title>{{ role.name }}</v-list-tile-title>
            <v-list-tile-sub-title>{{ role.desc }}</v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action >
            <v-btn flat :to=" '/roles/edit/' + role.id ">Edit</v-btn>
          </v-list-tile-action>
        </v-list-tile>
        <v-list-tile v-if='_.isEmpty(roles)'>
          <v-list-tile-content>
            <v-list-tile-title>
              <p class="text-xs-center">No roles</p>
            </v-list-tile-title>
            <!-- <v-list-tile-sub-title>
              <v-btn block >
                Create
              </v-btn>
            </v-list-tile-sub-title> -->
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
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
      roles: 'allRoles'
    })
  },
  mounted () {
    if (_.isEmpty(this.roles)) {
      this.getAllRoles()
    }
  },
  methods: {
    create () {
      this.$router.push('/roles/create')
    },
    ...mapActions([
      'getAllRoles'
    ])
  }
}
</script>
