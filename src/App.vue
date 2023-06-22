<template>

  <div class="container" v-if="this.$route.name == 'LOGİN'">
    <router-view></router-view>
  </div>
    <div v-else id="wrapper">
        <AppSidebar/>
        <div id="content-wrapper" class="d-flex flex-column">
            <div id="content">
               <AppHeader/>
                <div class="container-fluid">
                  <router-view></router-view>
                </div>
            </div>
            <AppFooter/>
        </div>
    </div>
</template>
