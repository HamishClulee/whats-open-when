import Vue from 'vue'
import VueRouter from 'vue-router'

/** Website routes */
const home = () => import('../views/home.vue')
const docs = () => import('../views/docs.vue')

/** Admin routes */
const adminmain = () => import('../views/admin/adminmain.vue')
const serverlogs = () => import('../views/admin/serverlogs.vue')

/** Protected application routes */
const authed = () => import('../views/authed.vue')

/** Auth routes */
const auth = () => import('../views/auth.vue')
const login = () => import('../views/auth/login.vue')
const signup = () => import('../views/auth/signup.vue')
const reset = () => import('../views/auth/reset.vue')
const forgot = () => import('../views/auth/forgot.vue')
const verifyemail = () => import ('../views/auth/verifyemail.vue')

/** Account routes */
const account = () => import('../views/account/account.vue')

/** Site routes */
const contact = () => import('../views/contact.vue')

/** Misc plumbing routes */
const notfound = () => import('../views/notfound.vue')
const authcb = () => import('../views/authcb.vue')

import overwritemetas from '../utils/seo'

Vue.use(VueRouter)

const routes = [
    // -------------------------------------------------------------------
    // --------------------------- SITE
    // -------------------------------------------------------------------
    {
        path: '/',
        name: 'home',
        component: home,
        beforeEnter: (to: any, from: any, next: any) => {
            overwritemetas({
                title: 'Welcome QR | Description',
                description: `Brief description of how Welcome QR functions and the benefits it can provide to customers.`,
                index: true,
            }, next)
        },
    },
    {
        path: '/contact',
        name: 'contact',
        component: contact,
        beforeEnter: (to: any, from: any, next: any) => {
            overwritemetas({
                title: 'Welcome QR | Contact Us',
                description: `Get in touch with us about; bug reports, feature requests, account queries or kind words of encoragement. We would love to hear from you!`,
                index: true,
            }, next)
        },
    },
    {
        path: '/docs/:category/:subcat',
        name: 'docs',
        component: docs,
        beforeEnter: (to: any, from: any, next: any) => {
            overwritemetas({
                title: 'Welcome QR | Contact Us',
                description: `Get in touch with us about; bug reports, feature requests, account queries or kind words of encoragement. We would love to hear from you!`,
                index: true,
            }, next)
        },
    },
    // -------------------------------------------------------------------
    // --------------------------- ADMIN
    // -------------------------------------------------------------------
    {
        path: '/admin',
        name: 'adminmain',
        redirect: { name: 'serverlogs' },
        meta: { requiresAuth: true, requiresAdmin: true },
        component: adminmain,
        beforeEnter: (to: any, from: any, next: any) => { overwritemetas({ index: false }, next)},
        children: [
            {
                path: '/admin/server-logs',
                name: 'serverlogs',
                meta: { requiresAuth: true, requiresAdmin: true },
                component: serverlogs,
                beforeEnter: (to: any, from: any, next: any) => { overwritemetas({ index: false }, next) },
            },
        ],
    },
    // -------------------------------------------------------------------
    // --------------------------- ACCOUNT
    // -------------------------------------------------------------------
    {
        path: '/account',
        name: 'account',
        meta: {
            requiresAuth: true,
        },
        component: account,
        beforeEnter: (to: any, from: any, next: any) => {
            overwritemetas({
                title: 'Welcome QR | Account',
                description: `Manage all the information we need to keep your account working as intended`,
                index: true,
            }, next)
        },
    },
    // -------------------------------------------------------------------
    // --------------------------- AUTH
    // -------------------------------------------------------------------
    {
        path: '/authcb',
        name: 'authcb',
        meta: {
            requiresAuth: false,
        },
        component: authcb,
        beforeEnter: (to: any, from: any, next: any) => {
            overwritemetas({
                index: false,
            }, next)
        },
    },
    {
        path: '/auth',
        name: 'auth',
        component: auth,
        redirect: { name: 'login' },
        children: [
            {
                path: '/auth/login',
                name: 'login',
                component: login,
                beforeEnter: (to: any, from: any, next: any) => {
                    overwritemetas({
                        title: 'Login ~ Signup',
                        description: `Login and Signup here!`,
                        index: true,
                    }, next)
                },
            },
            {
                path: '/auth/signup',
                name: 'signup',
                component: signup,
                beforeEnter: (to: any, from: any, next: any) => {
                    overwritemetas({
                        title: 'Login ~ Signup',
                        description: `Login and Signup here!`,
                        index: true,
                    }, next)
                },
            },
            {
                path: '/auth/reset',
                name: 'reset',
                component: reset,
                beforeEnter: (to: any, from: any, next: any) => {
                    overwritemetas({
                        title: 'Login ~ Signup',
                        description: `Login and Signup here!`,
                        index: true,
                    }, next)
                },
            },
            {
                path: '/auth/forgot',
                name: 'forgot',
                component: forgot,
                beforeEnter: (to: any, from: any, next: any) => {
                    overwritemetas({
                        title: 'Login ~ Signup',
                        description: `Login and Signup here!`,
                        index: true,
                    }, next)
                },
            },
        ],
    },
    // -------------------------------------------------------------------
    // --------------------------- APPLICATION
    // -------------------------------------------------------------------\
    {
        path: '/authed',
        name: 'authed',
        component: authed,
        beforeEnter: (to: any, from: any, next: any) => {
            overwritemetas({
                title: 'Login ~ Signup',
                description: `Login and Signup here!`,
                index: true,
            }, next)
        },
    },
    // -------------------------------------------------------------------
    // --------------------------- PLUMBING
    // -------------------------------------------------------------------
    {
        path: '/verify-your-email',
        name: 'verifyemail',
        component: verifyemail,
        beforeEnter: (to: any, from: any, next: any) => { overwritemetas({ index: false }, next) },
    },
    {
        path: '*',
        name: 'notfound',
        component: notfound,
        beforeEnter: (to: any, from: any, next: any) => {
            overwritemetas({ index: false}, next)
        },
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
    scrollBehavior (to, from, savedPosition) {
        return savedPosition ? savedPosition : { x: 0, y: 0 }
    },
})

const tokenOk = () => {

    return !!localStorage.getItem('AuthToken') && localStorage.getItem('AuthToken') !== ''

}

router.beforeEach((to, from, next) => {

    if (to.meta.requiresAuth && !tokenOk()) {

        next({ name: 'login', query: { authRedirect: 'true' } })

    } else { next() }

})

export default router
