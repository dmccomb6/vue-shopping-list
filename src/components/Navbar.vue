<template>
  <div class="navbar">
      <nav class="nav-extended blue darken-1">
          <div class="nav-content">
              <router-link :to="{ name: 'Index' }">
                  <span class="nav-title">Shopping List</span>
              </router-link>
              <a href="" class="btn-floating btn-large halfway-fab orange darken-1">
                  <router-link :to="{name: 'AddList' }">
                      <i class="material-icons">add</i>
                  </router-link>
              </a>
          </div>
      </nav>
  </div>
</template>

<script>
export default {
    name: 'Navbar',
    data() {
        
    },
    methods:{

    }
}
</script>

<style>
.nav-content{
border-bottom:5px solid white;
}
.navbar .nav-title{
    padding: 20px 50px;
}
</style>