import Vue from "vue";
import Router from "vue-router";
import Index from "@/components/Index";
import Class from "@/components/Class";
import ClassTeacher from "@/components/ClassTeacher";
import Create from "@/components/Create";
import Join from "@/components/Join";
import Classdetail from "@/components/Classdetail";
import ClassTeacherdetail from "@/components/ClassTeacherdetail";
import Signed from "@/components/Signed";
import SignedTeacher from "@/components/SignedTeacher";
import Login from "@/components/Login";
import EditPassword from "@/components/EditPassword";
import Cookies from 'js-cookie';
import cookie from '../util/cookie';
Vue.use(cookie)
Vue.use(Router);
Vue.use(Cookies)
const router = new Router({
  routes: [
    {
      path: "/",
      name: "Index",
      component: Index
    },
    {
      path: "/class",
      name: "Class",
      component: Class
    },
    {
      path: "/classteacher",
      name: "ClassTeacher",
      component: ClassTeacher
    },
    {
      path: "/create",
      name: "Create",
      component: Create
    },
    {
      path: "/join",
      name: "Join",
      component: Join
    },
    {
      path: "/classdetail",
      name: "Classdetail",
      component: Classdetail
    },
    {
      path: "/classteacherdetail",
      name: "ClassTeacherdetail",
      component: ClassTeacherdetail
    },
    {
      path: "/signed",
      name: "Signed",
      component: Signed
    },
    {
      path: "/signedTeacher",
      name: "SignedTeacher",
      component: SignedTeacher
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/editpassword",
      name: "EditPassword",
      component: EditPassword
    }
  ]
});
// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  if (
    to.path === "/login"
  )
    return next();
  // 获取token
  const tokenStr =cookie.getCookie('sid')
  if (!tokenStr) return next("/login");
  next();
});
export default router;
