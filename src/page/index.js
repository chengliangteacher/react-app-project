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
const ReferralProgram = Loadable({
    loader: () => import('./ReferralProgram'),
    loading: Loading,
});
const Programmanage = Loadable({
    loader: () => import('./Programmanage'),
    loading: Loading,
});
const Implementplan = Loadable({
    loader: () => import('./Implementplan'),
    loading: Loading,
});
const TaskIssuedmanage = Loadable({
    loader: () => import('./TaskIssuedmanage'),
    loading: Loading,
});
const Sampling = Loadable({
    loader: () => import('./Sampling'),
    loading: Loading,
});
const Dimensionality = Loadable({
    loader: () => import('./Dimensionality'),
    loading: Loading,
});
const Getsample = Loadable({
    loader: () => import('./Getsample'),
    loading: Loading,
});
const Inspectionlink_manage = Loadable({
    loader: () => import('./Inspectionlink_manage'),
    loading: Loading,
});
const Index_complete_data = Loadable({
    loader: () => import('./Index_complete_data'),
    loading: Loading,
});
const Management = Loadable({
    loader: () => import('./Management'),
    loading: Loading,
});
const DisposalRecord = Loadable({
    loader: () => import('./DisposalRecord'),
    loading: Loading,
});
const Scene = Loadable({
    loader: () => import('./Scene'),
    loading: Loading,
});
const Objection = Loadable({
    loader: () => import('./Objection'),
    loading: Loading,
});
const GetTask = Loadable({
    loader: () => import('./GetTask'),
    loading: Loading,
});
const DoTask = Loadable({
    loader: () => import('./DoTask'),
    loading: Loading,
});
const CheckTask = Loadable({
    loader: () => import('./CheckTask'),
    loading: Loading,
});
const ChangeArea = Loadable({
    loader: () => import('./ChangeArea'),
    loading: Loading,
});
const DeleteTask = Loadable({
    loader: () => import('./DeleteTask'),
    loading: Loading,
});
const PublicSubmit = Loadable({
    loader: () => import('./PublicSubmit'),
    loading: Loading,
});
const PublicAudit = Loadable({
    loader: () => import('./PublicAudit'),
    loading: Loading,
});
const PublicDownLoad = Loadable({
    loader: () => import('./PublicDownLoad'),
    loading: Loading,
});
const ExaminationFrontPage = Loadable({
    loader: () => import('./ExaminationFrontPage'),
    loading: Loading,
});
const Target = Loadable({
    loader: () => import('./Target'),
    loading: Loading,
});
const CountAllGet = Loadable({
    loader: () => import('./CountAllGet'),
    loading: Loading,
});
const CheckReason = Loadable({
    loader: () => import('./CheckReason'),
    loading: Loading,
});
const LoadingTasks = Loadable({
    loader: () => import('./LoadingTasks'),
    loading: Loading,
});
const SampleDistribution = Loadable({
    loader: () => import('./SampleDistribution'),
    loading: Loading,
});
const InspectedUnitmanage = Loadable({
    loader: () => import('./InspectedUnitmanage'),
    loading: Loading,
});
const Productsmanage = Loadable({
    loader: () => import('./Productsmanage'),
    loading: Loading,
});
const UnitMaintenance = Loadable({
    loader: () => import('./UnitMaintenance'),
    loading: Loading,
});
const Foodtypesmanage = Loadable({
    loader: () => import('./Foodtypesmanage'),
    loading: Loading,
});
const Testprogramsmanage = Loadable({
    loader: () => import('./Testprogramsmanage'),
    loading: Loading,
});
const Judgestandards = Loadable({
    loader: () => import('./Judgestandards'),
    loading: Loading,
});
const Detectionstandards = Loadable({
    loader: () => import('./Detectionstandards'),
    loading: Loading,
});
const Totalwarehouses = Loadable({
    loader: () => import('./Totalwarehouses'),
    loading: Loading,
});
const Usermanage = Loadable({
    loader: () => import('./Usermanage'),
    loading: Loading,
});
const Rolemanage = Loadable({
    loader: () => import('./Rolemanage'),
    loading: Loading,
});
const Organizationmanage = Loadable({
    loader: () => import('./Organizationmanage'),
    loading: Loading,
});
const Companymanage = Loadable({
    loader: () => import('./Companymanage'),
    loading: Loading,
});
const Resourcemanage = Loadable({
    loader: () => import('./Resourcemanage'),
    loading: Loading,
});
const Logmanage = Loadable({
    loader: () => import('./Logmanage'),
    loading: Loading,
});
const Addrule = Loadable({
    loader: () => import('./Addrule'),
    loading: Loading,
});
const Ruleinfo = Loadable({
    loader: () => import('./Ruleinfo'),
    loading: Loading,
});
const Department = Loadable({
    loader: () => import('./Department'),
    loading: Loading,
});
export {
    TestA, TestB,
    ReferralProgram, Programmanage, Implementplan, TaskIssuedmanage, Sampling, Dimensionality,
    Getsample, Inspectionlink_manage, Index_complete_data, Management,
    DisposalRecord, Scene, Objection, GetTask, DoTask, CheckTask, ChangeArea, DeleteTask, PublicSubmit,
    PublicAudit, PublicDownLoad, ExaminationFrontPage, Target, CountAllGet, CheckReason, LoadingTasks,
    SampleDistribution, InspectedUnitmanage, Productsmanage, UnitMaintenance, Foodtypesmanage,
    Testprogramsmanage, Judgestandards, Detectionstandards, Totalwarehouses, Usermanage, Rolemanage,
    Organizationmanage, Companymanage, Resourcemanage, Logmanage, Addrule, Ruleinfo,Department
}