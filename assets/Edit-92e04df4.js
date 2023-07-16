import{_ as f,m as g,r as _,o as r,c as l,a as t,w as o,d as n,i as c,j as v,v as m,k as b,F as p,h as E,t as w}from"./index-8bb4651f.js";const k={data(){return{campaign:{id:"00000000-0000-0000-0000-000000000000",businessId:null,path:null,url:null,isActive:!1,sortOrder:1},businesses:[{item1:"00000000-0000-0000-0000-000000000000",item2:"NULL"}],alerts:[],file:null,isLoading:!0,isShowForm:!0,hasError:!1}},created(){var e=this.$route.params.id;e!==void 0&&e!=="00000000-0000-0000-0000-000000000000"?(this.isNewCampaign=!1,this.getCampaign(e)):this.isLoading=!1},mounted(){this.getBusinessSelectList()},methods:{previewFiles(){this.file=this.$refs.file.files[0]},async getCampaign(e){await this.$appAxios.post("/campaign/getbyid",e).then(s=>{this.isLoading=!1,s.hasError==!0||s.data.data==null?(this.isShowForm=!1,alert(s.data.message),this.$router.push({path:"/campaigns"})):this.campaign=s.data.data}).catch(s=>{alert("Error : "+s.message),this.$router.push({path:"/campaigns"})})},async saveCampaign(){$(".form-control").css("border","none"),this.alerts=[],this.hasError=!1,this.isLoading=!0,this.campaign.id!="00000000-0000-0000-0000-000000000000"?await this.$appAxios.post("/campaign/update",this.campaign,{headers:{Authorization:`Bearer ${this._token}`}}).then(s=>{this.isLoading=!1;var s=s.data;s.hasError&&s.validationErrors.length>0?(this.hasError=!0,s.validationErrors.forEach(i=>{$("#"+i.key).css("border","2px solid red"),this.alerts.push(i.key+" : "+i.value)})):this.hasError=!1}).catch(e=>{this.hasError=!0,alert("Error : "+e.message)}):await this.$appAxios.post("/campaign/save",this.campaign,{headers:{Authorization:`Bearer ${this._token}`}}).then(s=>{this.isLoading=!1;var s=s.data;s.hasError&&s.validationErrors.length>0?(this.hasError=!0,s.validationErrors.forEach(i=>{$("#"+i.key).css("border","2px solid red"),this.alerts.push(i.key+" : "+i.value)})):this.hasError=!1}).catch(e=>{this.hasError=!0,alert("Error : "+e.message)}),this.hasError||this.$router.push({path:"/campaigns"})},async fileUpload(){this.alerts=[],this.hasError=!1,this.isLoading=!0;const e=new FormData;e.append("file",this.file),await this.$appAxios.post("/admin/uploadfile",e,{headers:{Authorization:`Bearer ${this._token}`,"Content-Type":"multipart/form-data"}}).then(i=>{this.isLoading=!1;debugger;var i=i.data;i.hasError?(this.hasError=!0,alert(i.message)):(this.campaign.path=i.data,this.file=null)}).catch(s=>{this.hasError=!0,alert("Error : "+s.message),this.isLoading=!1}),this.hasError||alert("Resim başarılı bir şekilde yüklenmiştir")},async getBusinessSelectList(){await this.$appAxios.post("/business/selectlist",null,{headers:{Authorization:`Bearer ${this._token}`}}).then(e=>{this.isLoading=!1,e.hasError==!0||e.data.data==null?(this.isShowForm=!1,alert(e.data.message)):this.businesses=e.data.data}).catch(e=>{alert("Error : "+e.message)})}},computed:{...g(["_token"])}},y={key:0},L={class:"form-group row"},x=t("label",{for:"businessId",class:"col-sm-2 col-form-label"},"Upload Image",-1),U={class:"col-sm-8 mb-2"},A={class:"loader"},B={key:0,class:"col-sm-2"},C={class:"form-group row"},S=t("label",{for:"businessId",class:"col-sm-2 col-form-label"},"Business",-1),F={class:"col-sm-10"},I={class:"form-group row"},V=t("label",{for:"path",class:"col-sm-2 col-form-label"},"Image Url",-1),O={class:"col-sm-10"},z={class:"form-group row"},D=t("label",{for:"url",class:"col-sm-2 col-form-label"},"Redirect Url",-1),M={class:"col-sm-10"},N={class:"form-group row"},R=t("label",{for:"sortorder",class:"col-sm-2 col-form-label"},"Order",-1),T={class:"col-sm-10"},j={class:"form-group row"},G=t("div",{class:"col-sm-2"},"Active",-1),q={class:"col-sm-10"},H={class:"form-check"},J={class:"form-group row"},K={class:"col-sm-12"},P={class:"loader"},Q={class:"row"},W={key:0,class:"col-sm-4"},X=["src"],Y={class:"col-sm-6 alert alert-danger",role:"alert"};function Z(e,s,i,ss,d,h){const u=_("ModelListSelect");return r(),l(p,null,[this.isShowForm?(r(),l("form",y,[t("div",L,[x,t("div",U,[o(t("div",A,null,512),[[n,d.isLoading]]),o(t("input",{class:"file-upload",ref:"file",type:"file",accept:"image/*",onChange:s[0]||(s[0]=(...a)=>h.previewFiles&&h.previewFiles(...a))},null,544),[[n,!d.isLoading]])]),this.file!=null?(r(),l("div",B,[t("button",{class:"btn btn-success",style:{float:"right"},onClick:s[1]||(s[1]=(...a)=>h.fileUpload&&h.fileUpload(...a))},"Upload")])):c("",!0)]),t("div",C,[S,t("div",F,[this.campaign!=null?(r(),v(u,{key:0,list:this.businesses,modelValue:this.campaign.businessId,"onUpdate:modelValue":s[2]||(s[2]=a=>this.campaign.businessId=a),"option-value":"item1","option-text":"item2",id:"businessId",placeholder:"Select Business"},null,8,["list","modelValue"])):c("",!0)])]),t("div",I,[V,t("div",O,[o(t("input",{type:"text","onUpdate:modelValue":s[3]||(s[3]=a=>this.campaign.path=a),class:"form-control",id:"path",placeholder:"Image Url"},null,512),[[m,this.campaign.path]])])]),t("div",z,[D,t("div",M,[o(t("input",{type:"text","onUpdate:modelValue":s[4]||(s[4]=a=>this.campaign.url=a),class:"form-control",id:"url",placeholder:"Redirect Url"},null,512),[[m,this.campaign.url]])])]),t("div",N,[R,t("div",T,[o(t("input",{type:"number","onUpdate:modelValue":s[5]||(s[5]=a=>this.campaign.sortOrder=a),class:"form-control",id:"sortOrder"},null,512),[[m,this.campaign.sortOrder]])])]),t("div",j,[G,t("div",q,[t("div",H,[o(t("input",{"onUpdate:modelValue":s[6]||(s[6]=a=>this.campaign.isActive=a),class:"form-check-input",type:"checkbox",id:"isActive"},null,512),[[b,this.campaign.isActive]])])])]),t("div",J,[t("div",K,[o(t("div",P,null,512),[[n,d.isLoading]]),o(t("a",{onClick:s[7]||(s[7]=a=>this.saveCampaign()),style:{float:"right"},class:"btn btn-success float-sm-right"},"Save",512),[[n,!d.isLoading]])])])])):c("",!0),t("div",Q,[this.campaign.path!=null?(r(),l("div",W,[t("img",{src:this.campaign.path,width:"300",onerror:"this.src = null"},null,8,X)])):c("",!0),o(t("div",Y,[(r(!0),l(p,null,E(this.alerts,a=>(r(),l("p",null,w(a),1))),256))],512),[[n,this.hasError]])])],64)}const es=f(k,[["render",Z]]);export{es as default};
