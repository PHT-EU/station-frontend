import {createRouter, createWebHashHistory} from 'vue-router'
import Home from '../views/Home.vue'
import Trains from "@/views/Trains";
import Data from "@/views/Data";
import Station from "@/views/Station"
import Settings from "@/views/Settings";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/trains',
        name: 'Trains',
        component: Trains
    },
    {
        path: '/data',
        name: 'Data',
        component: Data
    },
    {
        path: '/settings',
        name: 'Settings',
        component: Settings
    },
    {
        path: '/station',
        name: 'Station',
        component: Station
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
