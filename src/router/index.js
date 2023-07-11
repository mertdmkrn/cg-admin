import { createRouter, createWebHashHistory } from "vue-router";
import store from '../store';

const routes = [
    {
        name : "LOGİN",
        path : "/login",
        component : () => import("../views/Login.vue"),
        meta: { bodyClass: 'bg-gradient-primary' }
    },
    {
        name : "DASHBOARD",
        path : "/",
        component : () => import("../views/Dashboard/Index.vue")
    },
    {
        name : "BUSINESSES",
        path : "/businesses",
        component : () => import("../views/Business/Index.vue")
    },
    {
        name : "PAYMENTS",
        path : "/payments",
        component : () => import("../views/Payment/Index.vue")
    },
    {
        name : "RATINGS",
        path : "/ratings",
        component : () => import("../views/Rating/Index.vue")
    },
    {
        name : "USERS",
        path : "/users",
        component : () => import("../views/User/Index.vue")
    },
    {
        name : "ADD ADMIN",
        path : "/user/add",
        component : () => import("../views/User/Items/AddAdmin.vue")
    },
    {
        name : "CAMPAIGNS",
        path : "/campaigns",
        component : () => import("../views/Campaign/Index.vue")
    },
    {
        name : "ADD CAMPAIGN",
        path : "/campaign/edit",
        component : () => import("../views/Campaign/Edit.vue")
    },
    {
        name : "EDIT CAMPAIGN",
        path : "/campaign/edit/:id",
        component : () => import("../views/Campaign/Edit.vue")
    },
    {
        name : "SERVICES",
        path : "/services",
        component : () => import("../views/Service/Index.vue")
    },
    {
        name : "ADD SERVICE",
        path : "/service/edit",
        component : () => import("../views/Service/Edit.vue")
    },
    {
        name : "EDIT SERVICE",
        path : "/service/edit/:id",
        component : () => import("../views/Service/Edit.vue")
    },
    {
        name : "EDIT PROFILE",
        path : "/profile",
        component : () => import("../views/Profile/Index.vue")
    },
]

const router = createRouter({
    routes,
    history : createWebHashHistory()
});

router.beforeEach((to, from, next) => {
    debugger;
    const authNotRequiredRoutes = ["LOGİN"];
    const _isAuthenticated = store.getters._isAuthenticated; 

    if(authNotRequiredRoutes.indexOf(to.name) < 0)
    {
        if(!_isAuthenticated) next({ name: "LOGİN"})
        else next();
    }
    else{
        if(_isAuthenticated) next(false);
        else next();
    }
});

export default router;