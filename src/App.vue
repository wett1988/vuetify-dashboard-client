<template>
  <v-app light v-if="$auth.ready()">
    <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
      v-show="$auth.check()"
    >
      <v-list>
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
    <v-toolbar fixed
      v-show="$auth.check()"
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer" light></v-toolbar-side-icon>
      <!-- <v-btn
        icon
        light
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn> -->
      <!-- <v-btn
        icon
        light
        @click.stop="clipped = !clipped"
      >
        <v-icon>web</v-icon>
      </v-btn> -->
      <!-- <v-btn
        icon
        light
        @click.stop="fixed = !fixed"
      >
        <v-icon>remove</v-icon>
      </v-btn> -->
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        icon
        light
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-avatar size="38px">
          <img src="http://placehold.it/48" :alt="$auth.user().name">
        </v-avatar>
      </v-btn>
    </v-toolbar>
    <main>
      <v-container fluid>
        <v-slide-y-transition mode="out-in">
            <router-view></router-view>
        </v-slide-y-transition>
      </v-container>
    </main>
    <v-navigation-drawer
      temporary
      :right="right"
      v-model="rightDrawer"
    >

    <v-toolbar flat class="transparent">
      <v-list class="pa-0">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img src="http://placehold.it/48" />
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{ $auth.user().name }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

    </v-toolbar>

    <v-list>
      <v-list-tile
      @click="logout"
      >

          <v-list-tile-action>
            <v-icon light>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>

             <v-list-tile-title>Logout</v-list-tile-title>


          </v-list-tile-content>

      </v-list-tile>
    </v-list>
    </v-navigation-drawer>
    <v-footer :fixed="fixed" v-show="$auth.check()">
      <span>&copy; 2017 <a target="_blank" href="http://wett.pw">wett.pw</a></span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        clipped: false,
        drawer: true,
        fixed: false,
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
        ],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'Dashboard'
      }
    },
    methods: {
      nav () {

      },
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
  }
</script>

<style lang="stylus">
  @import './stylus/main'
</style>
