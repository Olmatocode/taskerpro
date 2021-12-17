import {createRouter, createWebHashHistory} from 'vue-router'
import Home from '../views/Home.vue'
import About from "@/views/About";
import TaskList from "@/views/TaskList";
import TaskIndividual from "@/views/TaskIndividual";
import {markRaw} from "vue";
import NewTask from "@/views/NewTask";
import LoginPage from "@/views/LoginPage";
import TaskManager from "@/views/TaskManager";
import Register from "@/views/Register";
import {createWebHistory} from "vue-router/dist/vue-router.esm-browser";

const routes = [
    {
        path: '/',
        name: 'LoginPage',
        component: LoginPage,
        // meta: {
        //     // guest: true,
        //     layout: 'MyLayout'
        // }
    },
    {
        path: '/login',
        name: 'Home',
        component: Home,
        // meta: {
        //     // guest: true,
        //     layout: 'MyLayout'
        // }
    },
    {
        path: '/newtask',
        name: 'NewTask',
        component: NewTask
    },
    {
        path: '/Register/',
        name: 'Register',
        component: Register
    },
    {
        path: '/taskmanager/:id',
        name: 'TaskManager',
        component: TaskManager
    },
    {
        path: '/tasklist/',
        name: 'Tasklist',
        component: TaskList,
        // meta: {
        //     // requiresAuth: true,
        //     layout: 'MyLayout'
        // }
    },
    {
        path: '/task/:id',
        name: 'TaskIndividual',
        component: TaskIndividual
        // meta: {
        //     // requiresAuth: true,
        //     layout: 'MyLayout'
        // }
    },
    {
        path: '/newTask',
        name: 'NewTask',
        component: NewTask,
        // meta: {
        //     // requiresAuth: true,
        //     layout: 'MyLayout'
        // }
    },
    {
        path: '/about',
        name: 'About',
        component: About,
        // meta: {
        //     // requiresAuth: true,
        //     layout: 'MyLayout'
        // }
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    // mode: history,
    routes
})
// markRaw(routes)

export default router
