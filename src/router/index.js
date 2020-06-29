import * as components from '../page' //导入页面
import tree from "../page/login/tree.json"
//通过组件配置路由
const defaultTree = tree.children;
const routes = [];
let dealRoutes =  function(data) {
    data.forEach(item => {
        if (item.hasChildren) {
            dealRoutes(item.children);
        } else {
            routes.push({ ...item, path: item.url, component: components.TestA })
        }
    })
}
dealRoutes(defaultTree);
routes.forEach(item => {
    const url = item.url;
    if(url) {
        if (url.split('/').length > 3) {
            item.component = components.TestB;
        } else if (url.split('/').length === 3){
            if (url.split('/')[2].split('-').length>1) {
                item.component = components.TestB;
            } else {
                item.component = url.split('/')[2];
                item.component = item.component.substring(0, 1).toUpperCase() + item.component.substring(1);
                item.componentname = item.component.substring(0, 1).toUpperCase() + item.component.substring(1);
                item.component = components[item.componentname]
            }
        }
    } else {
        item.component = components.TestA;
    }
})
export default routes
