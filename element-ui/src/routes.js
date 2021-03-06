import Login from './views/Login.vue'
import ImageList from './views/ImageList.vue'
import ImagePage from './views/ImagePage.vue'
import HomePage from './views/HomePage.vue'
//import Main from './views/Main.vue'


let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/imgPage',
        component: ImageList,
        name: '',
        hidden: true
    },
    {
        path: '/',
        component: HomePage,
        name: '',
        hidden: true
    },
	/*
    {
        path: '/',
        component: Home,
        name: '导航一',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/main', component: Main, name: '主页', hidden: true }
            
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
	*/
];

export default routes;