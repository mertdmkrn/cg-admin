import{_ as h,m as u,r as p,o as i,c as l,a as t,f as c,h as r,w as g,d as m,F as f,e as x,t as n}from"./index-eec37736.js";const b={data(){return{faqs:[],isLoading:!0}},created(){this.getFaqs()},methods:{async getFaqs(){await this.$appAxios.post("/user/getfaqs",null,{headers:{Authorization:`Bearer ${this._token}`}}).then(s=>{this.faqs=s.data.data.faqs,console.log(this.faqs),this.isLoading=!1}).catch(s=>{alert(s.message)})},async deleteFaq(s){confirm("Do you want to delete the record?!")&&await this.$appAxios.post("/admin/deletefaq",s.id,{headers:{Authorization:`Bearer ${this._token}`}}).then(o=>{var a=this.faqs.indexOf(s);a>-1&&this.faqs.splice(a,1)}).catch(o=>{alert(o.message)})}},computed:{...u(["_token"])}},k={class:"table-responsive"},y={class:"table table-sm table-bordered table-striped"},w=t("th",null,"Order",-1),v=t("th",null,"Question",-1),F=t("th",null,"QuestionEn",-1),q=t("th",null,"Answer",-1),E=t("th",null,"AnswerEn",-1),$=t("th",null,"Category",-1),A=t("th",null,"CategoryEn",-1),B={style:{width:"40px"}},C=t("i",{class:"fa-solid fa-plus"},null,-1),D=t("td",{class:"align-middle",colspan:"8"},[t("div",{class:"loader"})],-1),L=[D],O={class:"text-center align-middle"},z={class:"text-center align-middle"},N={class:"text-center align-middle"},Q={class:"text-center align-middle"},S={class:"text-center align-middle"},V={class:"text-center align-middle"},G={class:"text-center align-middle"},I={class:"text-center align-middle"},j=t("i",{class:"fa-solid fa-edit"},null,-1),H=["onClick"],J=t("i",{class:"fa-solid fa-trash"},null,-1),K=[J];function M(s,o,a,P,_,R){const d=p("router-link");return i(),l("div",k,[t("table",y,[t("thead",null,[t("tr",null,[w,v,F,q,E,$,A,t("th",B,[c(d,{to:"/faq/edit",class:"btn btn-success btn-user btn-block"},{default:r(()=>[C]),_:1})])])]),t("tbody",null,[g(t("tr",null,L,512),[[m,_.isLoading]]),(i(!0),l(f,null,x(this.faqs,e=>(i(),l("tr",{key:e.id},[t("td",O,n(e.sortOrder),1),t("td",z,n(e.question),1),t("td",N,n(e.questionEn),1),t("td",Q,n(e.answer),1),t("td",S,n(e.answerEn),1),t("td",V,n(e.category),1),t("td",G,n(e.categoryEn),1),t("td",I,[c(d,{style:{color:"#FFBF00"},class:"nav-link",to:"/faq/edit/"+e.id},{default:r(()=>[j]),_:2},1032,["to"]),t("a",{style:{color:"#DE3163"},onClick:T=>this.deleteFaq(e),class:"nav-link"},K,8,H)])]))),128))])])])}const W=h(b,[["render",M]]);export{W as default};
