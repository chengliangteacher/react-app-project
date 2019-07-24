import {
    TestA, TestB
} from '../page' //导入页面
//通过组件配置路由
const routes = [{
    path: '/a',
    component: TestA,
    name: "测试模块一"
}, {
    path: '/b',
    component: TestB,
    name: "测试模块二",
    haschidren: true,
    chidren: [{
        path: "/b/b",
        name: "测试模块1-1",
        component: TestA,
        haschidren: true,
        chidren: [{
            path: "/b/b/b",
            name: "测试模块1-1-1",
            component: TestA,
            haschidren: true,
            chidren: [{
                path: "/b/b/b/b",
                name: "测试模块1-1-1-1",
                component: TestA,

            }]
        }]

    }]
}
];
export default routes