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
import Code from "@/components/Code";
import CodeTeacher from "@/components/CodeTeacher";
import UserInfo from "@/components/UserInfo";
import Cookies from "js-cookie";
import cookie from "../util/cookie";
import Scan from "@/components/Scan";
import Register from "@/components/Register"
Vue.use(cookie);
Vue.use(Router);
Vue.use(Cookies);
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
      component: Classdetail,
      meta: { keepAlive: true }
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
    },
    {
      path: "/code",
      name: "Code",
      component: Code
    },
    {
      path: "/codeteacher",
      name: "CodeTeacher",
      component: CodeTeacher
    },
    {
      path: "/userinfo",
      name: "UserInfo",
      component: UserInfo
    },
    {
      path: "/scan",
      name: "Scan",
      component: Scan
    },
    {
      path: "/register",
      name: "Register",
      component: Register
    }
  ]
});
router.beforeEach((to, from, next) => {
  if ((to.path === "/login")||(to.path === "/register")) return next();
  // const tokenStr =Cookies.get('sid')
  const tokenStr = window.localStorage.getItem("sid");
  // alert(tokenStr);
  if (!tokenStr) return next("/login");
  if ((to.path === "/")&&(!tokenStr)) return next("/userinfo");
  next();
});
export default router;
