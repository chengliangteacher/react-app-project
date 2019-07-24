import Loadable from 'react-loadable';
// import Loading from './my-loading-component';
// 意思是在加载的时候 显示 都加载组件没有组件的时候 我们可以写为
const Loading = () => null;  //加载时不现实loading

const TestA = Loadable({
    loader: () => import('./a'), //按需加载 点击时只加载一个页面
    loading: Loading,
});
const TestB = Loadable({
    loader: () => import('./b'),
    loading: Loading,
});
export {
    TestA, TestB
}