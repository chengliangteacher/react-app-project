import {
    TestA
} from '../page' //导入页面
//通过组件配置路由
const tree = JSON.parse(localStorage.tree).children;
const routes = [];
let dealRoutes =  function(data) {
    data.forEach(item => {
        if (item.hasChildren) {
            dealRoutes(item.children);
        } else {
            routes.push({ ...item, path: item.url, component: TestA })
        }
    })
}
dealRoutes(tree);
export default routes 
