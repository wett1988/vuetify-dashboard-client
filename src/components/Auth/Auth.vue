<template>
<v-card-text>
  <v-text-field label="E-mail" v-model="form.email" required
    :error-messages="!_.isEmpty(validator)? validator.errors.email : []"
  ></v-text-field>

  <v-text-field label="Password" v-model="form.password" type="password" required
    :error-messages="!_.isEmpty(validator)? validator.errors.password : []"
  ></v-text-field>
</v-card-text>
</template>

<script>
export default {
  props: ['form', 'validator']
}
</script>
