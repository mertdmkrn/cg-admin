<template>
    <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

        <!-- Sidebar - Brand -->
        <router-link class="sidebar-brand d-flex align-items-center justify-content-center" to="/">
            <div class="sidebar-brand-icon rotate-n-1">
                <img src="@/assets/img/logo.PNG" loading="lazy" decoding="async" width="35" height="35" />
            </div>
            <div class="sidebar-brand-text mx-2">CG ADMIN</div>
        </router-link>

        <!-- Divider -->
        <hr class="sidebar-divider my-0">

        <!-- Nav Item - Dashboard -->
        <li class="nav-item" :class="this.$route.name == 'DASHBOARD' ? 'active' : ''">
            <router-link class="nav-link" to="/">
                <i class="fas fa-home"></i>
                <span>DASHBOARD</span>
            </router-link>
        </li>

        <!-- Divider -->
        <hr class="sidebar-divider">

        <!-- Heading -->
        <div class="sidebar-heading">
            SHORTCUTS
        </div>

        <li class="nav-item" :class="this.$route.path == 'USERS' ? 'active' : ''">
            <router-link class="nav-link" to="/users">
                <i class="fa-solid fa-users"></i>
                <span>USERS</span>
            </router-link>
        </li>

        <li class="nav-item" :class="this.$route.name == 'BUSINESSES' ? 'active' : ''">
            <router-link class="nav-link" to="/businesses">
                <i class="fa-sharp fa-solid fa-briefcase"></i>
                <span>BUSINESSES</span>
            </router-link>
        </li>

        <li class="nav-item" :class="this.$route.name == 'APPOINTMENTS' ? 'active' : ''">
            <router-link class="nav-link" to="/appointments">
                <i class="fa-solid fa-calendar"></i>
                <span>APPOINTMENTS</span>
            </router-link>
        </li>

        <li class="nav-item" :class="this.$route.name == 'SERVICES' ? 'active' : ''">
            <router-link class="nav-link" to="/services">
                <i class="fa-solid fa-scissors"></i>
                <span>SERVICES</span>
            </router-link>
        </li>

        <li class="nav-item" :class="this.$route.name == 'CAMPAIGNS' ? 'active' : ''">
            <router-link class="nav-link" to="/campaigns">
                <i class="fa-solid fa-percent"></i>
                <span>CAMPAIGNS</span>
            </router-link>
        </li>

        <li class="nav-item" :class="this.$route.name == 'PAYMENTS' ? 'active' : ''">
            <router-link class="nav-link" to="/payments">
                <i class="fa-solid fa-receipt"></i>
                <span>PAYMENTS</span>
            </router-link>
        </li>

        <li class="nav-item" :class="this.$route.name == 'FAQ' ? 'active' : ''">
            <router-link class="nav-link" to="/faq">
                <i class="fa-solid fa-question"></i>                
                <span>FAQ</span>
            </router-link>
        </li>

        <li class="nav-item" :class="this.$route.name == 'SETTINGS' ? 'active' : ''">
            <router-link class="nav-link" to="/settings">
                <i class="fa-solid fa-gears"></i>                
                <span>SETTINGS</span>
            </router-link>
        </li>

        <hr class="sidebar-divider">

        <div class="text-center d-none d-md-inline">
            <button class="rounded-circle border-0" id="sidebarToggle"></button>
        </div>

    </ul>
</template>