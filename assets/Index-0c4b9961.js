import{_ as h,m as u,r as p,o as n,c as i,a as t,f as c,h as r,w as m,d as f,F as g,e as x,t as o,q as v}from"./index-eec37736.js";const b={data(){return{services:[],isLoading:!0}},created(){this.getServices()},methods:{async getServices(){await this.$appAxios.post("/service/getall").then(s=>{this.services=s.data.data,this.isLoading=!1}).catch(s=>{alert(s.message)})},async deleteService(s){confirm("Do you want to delete the record?!")&&await this.$appAxios.post("/service/delete",s.id,{headers:{Authorization:`Bearer ${this._token}`}}).then(a=>{var l=this.services.indexOf(s);l>-1&&this.services.splice(l,1)}).catch(a=>{alert(a.message)})}},computed:{...u(["_token"])}},k={class:"table-responsive"},y={class:"table table-sm table-bordered table-striped"},C=t("th",null,"Order",-1),w=t("th",null,"Name",-1),S=t("th",null,"NameEn",-1),$=t("th",null,"Class",-1),B=t("th",null,"Color",-1),F={style:{width:"40px"}},N=t("i",{class:"fa-solid fa-plus"},null,-1),D=t("td",{class:"align-middle",colspan:"6"},[t("div",{class:"loader"})],-1),E=[D],L={class:"text-center align-middle"},A={class:"text-center align-middle"},O={class:"text-center align-middle"},z={class:"text-center align-middle"},V={class:"text-center align-middle"},q={class:"text-center align-middle"},G=t("i",{class:"fa-solid fa-edit"},null,-1),I=["onClick"],j=t("i",{class:"fa-solid fa-trash"},null,-1),H=[j];function J(s,a,l,K,_,M){const d=p("router-link");return n(),i("div",k,[t("table",y,[t("thead",null,[t("tr",null,[C,w,S,$,B,t("th",F,[c(d,{to:"/service/edit",class:"btn btn-success btn-user btn-block"},{default:r(()=>[N]),_:1})])])]),t("tbody",null,[m(t("tr",null,E,512),[[f,_.isLoading]]),(n(!0),i(g,null,x(this.services,e=>(n(),i("tr",{key:e.id},[t("td",L,o(e.sortOrder),1),t("td",A,o(e.name),1),t("td",O,o(e.nameEn),1),t("td",z,o(e.className),1),t("td",V,[t("span",{style:v([{padding:"5px",color:"#fff"},{backgroundColor:e.colorCode}])},o(e.colorCode),5)]),t("td",q,[c(d,{style:{color:"#FFBF00"},class:"nav-link",to:"/service/edit/"+e.id},{default:r(()=>[G]),_:2},1032,["to"]),t("a",{style:{color:"#DE3163"},onClick:P=>this.deleteService(e),class:"nav-link"},H,8,I)])]))),128))])])])}const R=h(b,[["render",J]]);export{R as default};
