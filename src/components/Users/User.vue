<template>
<v-card-text>

  <v-text-field
    label="E-mail"
    v-model="user.email"
    required
    :error-messages="!_.isEmpty(validator)? validator.errors.email : []"></v-text-field>

  <v-text-field label="Name" v-model="user.name" required :error-messages="!_.isEmpty(validator)? validator.errors.name : []"></v-text-field>

  <v-select
  label="Roles"
  :items="roles"
  v-model="user.roles"
  item-text="name"
  item-value="id"
  multiple
  chips
  persistent-hint
>

</v-select>

</v-card-text>
</template>
<script>
import {
  mapGetters,
  mapActions
} from 'vuex'
import _ from 'lodash'

export default {
  props: ['user', 'validator'],
  mounted () {
    if (_.isEmpty(this.roles)) {
      this.getAllRoles()
    }
  },
  computed: {
    ...mapGetters({
      roles: 'allRoles'
    })
  },
  methods: {
    ...mapActions([
      'getAllRoles'
    ])
  }
}
</script>
