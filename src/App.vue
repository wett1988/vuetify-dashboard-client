<template>
  <v-app>
    <v-navigation-drawer
      persistent
      v-model="drawer"
      enable-resize-watcher
      app
    >
      <v-list dense>
        <template v-for="item in items">
          <v-list-tile v-if="item.action" @click="$router.push(item.href)" v-show="$auth.check(item.roles)">
            <v-list-tile-action>
              <v-icon>{{ item.action }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider v-else-if="item.divider"></v-divider>
          <v-subheader v-else-if="item.header" v-text="item.header"></v-subheader>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar light fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Application</v-toolbar-title>
    </v-toolbar>

    <main>
      <v-content>
        <v-container fluid fill-height>
          <v-layout
            justify-center
            align-center
          >
          <v-slide-y-transition mode="out-in">
            <router-view></router-view>
          </v-slide-y-transition>
          </v-layout>
        </v-container>
      </v-content>
    </main>
    <v-footer app>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      drawer: true,
      items: [
        {
          action: 'home',
          title: 'Home',
          href: '/'
        },
        { divider: true },
        { header: 'Users' },
        {
          action: 'people',
          title: 'Users',
          href: '/users'
        },
        {
          action: 'label',
          title: 'Roles',
          href: '/roles'
          // scopes: ['regular']
        }
      ]
    }),
    logout () {
      let redirect = this.$auth.redirect()
      this.$auth.logout({
        makeRequest: true,
        redirect: {
          name: redirect ? redirect.from.name : 'login'
        },
        success () {
          console.log('success ' + this.context)
        },
        error () {
          console.log('error ' + this.context)
        }
      })
    }
  }
</script>

<style lang="stylus">
  @import './stylus/main'
</style>
