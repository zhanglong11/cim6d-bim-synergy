/*
   任务名称：task#2885 【智慧施工2.0-前端】首页切图及功能开发
   开发人员：耿为刚
   日期：2020-04-07
   任务类型：全新代码
 */

/* 主模板 */
import Layout from '@/layout/index-new'
import publicView from '@/views/publicView'
/**
 *
 * hidden: true                   如果设置为true，则项目将不会显示在侧边栏中（默认为false）
 * alwaysShow: true               如果设置为true，将始终显示根菜单
 *                                如果不始终设置Show，则当项具有多个子路由时，
 *                                它将成为嵌套模式，否则不显示根菜单
 * redirect: noRedirect           如果设置为no redirect，则breadcrumb中不会重定向
 * name:'router-name'             名称由<keep alive>使用（必须设置！！！）
 * meta : {
    roles: ['admin','editor']    控制页面角色（可以设置多个角色）
    title: 'title'               侧边栏和面包屑中显示的名称（推荐集）
    icon: 'svg-name'             图标显示在侧栏中,支持/src/icons/svg格式和element-ui icon两种形式
    breadcrumb: false            如果设置为false，则该项将隐藏在breadcrumb中（默认为true）
    activeMenu: '/example/list'  如果设置路径，侧边栏将突出显示您设置的路径
  }
 */
import homeComponent from '@/views/construction/' // 首页
import labourServicesComponent from '@/views/construction/labour-services/' // 劳务管理
import videoComponent from '@/views/construction/video/' // 视频监控
// import procedureComponent from '@/views/construction/procedure/' // 工序进展
import greenConstructionComponent from '@/views/construction/green-construction/' // 绿色施工
import personLocationComponent from '@/views/construction/personLocation/' // 人员定位
import scheduleViewComponent from '@/views/schedule/view/' // 进度视图
import scheduleSimulationComponent from '@/views/schedule/simulation/' // 进度模拟
import scheduleChangeComponent from '@/views/schedule/change/' // 进度变更
import surveyComponent from '@/views/construction/quality-safety/survey' // 质量安全概况
import qualityComponent from '@/views/quality/' // 质量视图
import safetyComponent from '@/views/safety/' // 安全视图
import preventionComponent from '@/views/construction/prevention' // 疫情防控
import informationComponent from '@/views/construction/information/' // 信息管理
import homeMain from '@/views/home' // 地球
import loginComponent from '@/views/login/new-login' // 登录页
import toMain from '@/views/to-admin' // 登录页
export const constructionRoutes = [
  {
    path: '',
    component: Layout,
    name: 'Home',
    redirect: '/login',
    meta: { title: '首页' },
    children: [
      {
        path: 'login',
        hidden: true,
        name: 'login',
        component: loginComponent
      },
      {
        path: 'to-admin',
        hidden: true,
        name: 'toMain',
        component: toMain
      },
      {
        path: 'home',
        hidden: true,
        name: 'homeMain',
        component: homeMain
      },
      { path: 'index', meta: { title: '首页' }, component: homeComponent },
      { path: 'video', meta: { title: '视频监控' }, component: videoComponent },
      {
        path: 'working-procedure',
        meta: { title: '进度视图' },
        redirect: '/working-procedure/view',
        component: publicView,
        children: [
          /* {
            path: 'procedure',
            meta: { title: '工序进展', activeMenu: '/working-procedure' },
            component: procedureComponent
          },*/
          {
            path: 'view',
            meta: { title: '进度视图', activeMenu: '/working-procedure' },
            component: scheduleViewComponent
          },
          {
            path: 'simulation',
            meta: { title: '进度模拟', activeMenu: '/working-procedure' },
            component: scheduleSimulationComponent
          },
          {
            path: 'change',
            meta: { title: '进度变更', activeMenu: '/working-procedure' },
            component: scheduleChangeComponent
          }
        ]
      },
      {
        path: 'labour-services',
        meta: { title: '劳务管理' },
        component: labourServicesComponent
      },
      {
        path: 'green-construction',
        meta: { title: '绿色施工' },
        component: greenConstructionComponent
      },
      {
        path: 'personLocation',
        name: 'PersonLocation',
        meta: { title: '人员定位' },
        component: personLocationComponent
      },
      {
        path: 'quality-safety',
        meta: { title: '质量与安全' },
        component: publicView,
        redirect: '/quality-safety/survey',
        children: [
          {
            path: 'survey',
            meta: { title: '质量安全概况', activeMenu: '/quality-safety' },
            component: surveyComponent
          },
          {
            path: 'quality',
            meta: { title: '质量视图', activeMenu: '/quality-safety' },
            component: qualityComponent
          },
          {
            path: 'safety',
            meta: { title: '安全视图', activeMenu: '/quality-safety' },
            component: safetyComponent
          }
        ]
      },
      //task#2890 张龙 添加疫情防控路由
      { path: 'prevention', meta: { title: '疫情防控' }, component: preventionComponent },
      { path: 'information', meta: { title: '信息管理' }, component: informationComponent }
    ]
  }
]
