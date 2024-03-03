import{_ as h,m as p,r as u,o as n,c as i,a as t,e as c,j as r,w as g,d as m,F as f,g as x,t as l}from"./index-8f6b8265.js";const b={data(){return{campaigns:[],isLoading:!0}},created(){this.getCampaigns()},methods:{async getCampaigns(){await this.$appAxios.post("/campaign/getall").then(e=>{this.campaigns=e.data.data,this.isLoading=!1}).catch(e=>{console.log(e.message)})},async deleteCampaign(e){confirm("Do you want to delete the record?!")&&await this.$appAxios.post("/campaign/delete",e.id,{headers:{Authorization:`Bearer ${this._token}`}}).then(a=>{var o=this.campaigns.indexOf(e);o>-1&&this.campaigns.splice(o,1)}).catch(a=>{console.log(a.message)})}},computed:{...p(["_token"])}},k={class:"table-responsive"},v={class:"table table-sm table-striped table-bordered"},y=t("th",null,"Order",-1),w=t("th",null,"Image",-1),C=t("th",null,"Url",-1),$=t("th",null,"Active",-1),A={style:{width:"40px"}},B=t("i",{class:"fa-solid fa-plus"},null,-1),F=t("td",{class:"align-middle",colspan:"5"},[t("div",{class:"loader"})],-1),D=[F],L={class:"text-center align-middle"},O={class:"text-center align-middle"},E=["src"],N={class:"text-center align-middle"},S=["href"],z={class:"text-center align-middle"},I={class:"text-center align-middle"},V=t("i",{style:{color:"#FFBF00"},class:"fa-solid fa-edit"},null,-1),j=["onClick"],G=t("i",{style:{color:"#DE3163"},class:"fa-solid fa-trash"},null,-1),U=[G];function Y(e,a,o,q,_,H){const d=u("router-link");return n(),i("div",k,[t("table",v,[t("thead",null,[t("tr",null,[y,w,C,$,t("th",A,[c(d,{to:"/campaign/edit",class:"btn btn-success btn-user btn-block"},{default:r(()=>[B]),_:1})])])]),t("tbody",null,[g(t("tr",null,D,512),[[m,_.isLoading]]),(n(!0),i(f,null,x(this.campaigns,s=>(n(),i("tr",{key:s.id},[t("td",L,l(s.sortOrder),1),t("td",O,[t("img",{src:s.path,width:"150",loading:"lazy",decoding:"async"},null,8,E)]),t("td",N,[t("a",{class:"nav-link",href:s.url,target:"_blank"},l(s.url),9,S)]),t("td",z,l(s.isActive?"YES":"NO"),1),t("td",I,[c(d,{class:"nav-link",to:"/campaign/edit/"+s.id},{default:r(()=>[V]),_:2},1032,["to"]),t("a",{onClick:J=>this.deleteCampaign(s),class:"nav-link"},U,8,j)])]))),128))])])])}const M=h(b,[["render",Y]]);export{M as default};