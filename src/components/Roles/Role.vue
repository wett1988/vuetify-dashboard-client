<template>
<v-card-text>

  <v-text-field
    label="Name"
    v-model="role.name"
    required
    :error-messages="!_.isEmpty(validator)? validator.errors.name : []"></v-text-field>

  <v-text-field label="Slug" v-model="role.slug" required :error-messages="!_.isEmpty(validator)? validator.errors.slug : []"></v-text-field>

  <v-text-field
  label="Desc"
  v-model="role.desc"
  multi-line
></v-text-field>

</v-card-text>
</template>
<script>
export default {
  props: ['role', 'validator']
}
</script>
