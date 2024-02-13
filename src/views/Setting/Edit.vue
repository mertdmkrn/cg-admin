<template>  
    <form>
        <div v-if="isSave" class="form-group row">
            <label for="name" class="col-sm-2 col-form-label">Name</label>
            <div class="col-sm-10">
            <input type="text" v-model="setting.name" class="form-control" id="name" placeholder="Name">
            </div>
        </div>
        <div v-if="isSave" class="form-group row">
            <label for="description" class="col-sm-2 col-form-label">Description</label>
            <div class="col-sm-10">
                <input type="text" v-model="setting.description" class="form-control" id="description" placeholder="Description">
            </div>
        </div>
        <div v-if="isSave" class="form-group row">
            <label for="answer" class="col-sm-2 col-form-label">Type</label>
            <div class="col-sm-10">
                <select class="form-control" v-model="setting.type" @change="changeSettingType">
                    <option v-for="(item, index) in settingTypes" :key="item" :value="index">
                        {{ item }}
                    </option>
                </select> 
            </div>
        </div>
        <div class="col-md-12">
                <div class="card px-3">
                    <div class="card-body">
                        <h4 class="card-title">{{ setting.name ? `'${setting.name}' ` : ` ` }}</h4>
                        <div v-if="setting.type === 0" class="list-wrapper row">
                            <div class="col-md-6">
                                <textarea rows="3" v-model="valueObj.tr" class="form-control" id="description" placeholder="Türkçe" />
                            </div>
                            <div class="col-md-6">
                                <textarea rows="3" v-model="valueObj.en" class="form-control" id="description" placeholder="İngilizce" />
                            </div>
                        </div>
                        <div v-else-if="setting.type === 1" class="list-wrapper table-responsive">
                            <table class="table table-sm table-striped">
                                <th>
                                    <input type="text" v-model="valueObj.tr" class="form-control" id="description" placeholder="Türkçe">
                                </th>
                                <th>
                                    <input type="text" v-model="valueObj.en" class="form-control" id="description" placeholder="İngilizce">
                                </th>
                                <th>
                                    <a class="add btn btn-primary font-weight-bold todo-list-add-btn" @click="this.addValue()" style="width: 100%;"><i class="fa-solid fa-plus"></i></a>
                                </th>
                            <tbody>
                                <tr v-for="value in valueArr" :key="value.tr">
                                    <td class="text-center align-middle">{{ value.tr }}</td>
                                    <td class="text-center align-middle">{{ value.en }}</td>
                                    <td class="text-center align-middle">
                                        <a style="color: #DE3163;" @click="this.deleteValue(value)" class="nav-link">
                                            <i class="fa-solid fa-trash"></i>
                                        </a>                                           
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        </div>
                        <div v-else-if="setting.type === 2" class="list-wrapper row">
                            <div class="col-md-12">
                                <input type="number" v-model="value" class="form-control">
                            </div>
                        </div>
                        <div v-else-if="setting.type === 3" class="list-wrapper table-responsive">
                            <table class="table table-sm table-striped">
                                <th>
                                    <input type="number" v-model="value" class="form-control" id="description" placeholder="Sayı">
                                </th>
                                <th>
                                    <a class="add btn btn-primary font-weight-bold todo-list-add-btn" @click="this.addValue()" style="width: 100%;"><i class="fa-solid fa-plus"></i></a>
                                </th>
                            <tbody>
                                <tr v-for="value in valueArr" :key="value">
                                    <td class="text-center align-middle">{{ value }}</td>
                                    <td class="text-center align-middle">
                                        <a style="color: #DE3163;" @click="this.deleteValue(value)" class="nav-link">
                                            <i class="fa-solid fa-trash"></i>
                                        </a>                                           
                                    </td>
                                </tr>
                            </tbody>
                            </table>
                        </div>
                        <div v-else class="list-wrapper row">
                            <div class="col-sm-2">Aktif</div>
                            <div class="col-sm-10">
                                <div class="form-check">
                                    <input v-model="this.valueBoolean" class="form-check-input" type="checkbox" id="isActive">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
        <div class="col-sm-12 mt-2">
            <div v-show="isLoading" class="loader"></div>
            <a @click="this.saveSetting()" v-show="!isLoading" class="btn btn-success float-sm-right">Save</a>
        </div>
    </form>
    <br>
    <div class="row">
        <div class="alert alert-danger" v-show="this.hasError && alerts.length > 0" role="alert">
            <p v-for="alert in this.alerts">{{ alert }}</p>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    data(){
        return {
            setting : {
                id : "00000000-0000-0000-0000-000000000000",
                name : null,
                description : null,
                type : 0,
                value : ""
            },
            valueObj: {},
            valueArr: [],
            value: null,
            valueBoolean: false,
            alerts : [],
            settingTypes : [ "Metin", "Metin Listesi", "Sayı", "Sayı Listesi", "Doğru/Yanlış" ],
            hasError: false,
            isLoading: true,
            isSave: true,
        }
    },
    created() {
        var id = this.$route.params.id;

        if(id !== undefined && id !== null)
        {
            this.isSave = false;
            this.getSetting(id);
        }
        else{
            this.isLoading = false;
        }

    },
    methods: {
        async getSetting(id)
        {
            await this.$appAxios.post("/setting/getbyid", id, {headers: { 'Authorization': `Bearer ${this._token}`}}).then(response => {
                this.isLoading = false;
                
                if(response.hasError == true || response.data.data == null)
                {
                    alert(response.data.message);
                    this.$router.push({ path: "/faq" });   
                }
                else{
                    this.setting = response.data.data;
                    this.getValue();
                }
            }).catch(e => { this.hasError = true; alert("Error : " + e.message); });
        },
        async saveSetting()
        {
            $(".form-control").css("border", "none");
            this.alerts = [];
            this.hasError = false;
            this.isLoading = true;
            this.setValue();

            var url = this.isSave ? "/setting/save" : "/setting/update";

            await this.$appAxios.post(url, this.setting,  {headers: { 'Authorization': `Bearer ${this._token}`  }}).then(response => {
                this.isLoading = false;
                var response = response.data;

                    if(response.hasError && response.validationErrors.length > 0)
                    {
                        this.hasError = true;
                        response.validationErrors.forEach(e => {
                            if(!e.key("value")) {
                                $("#" + e.key).css("border", "2px solid red");
                            }
                            this.alerts.push(e.key +  " : " + e.value);
                        });
                    }
                    else{
                        this.hasError = false;
                    }  

                    this.isLoading = false;

                    alert(response.message);

                    if(!this.hasError)
                    {
                        this.$router.push({ path: "/settings" });
                    }
                    
                }).catch(e => { this.hasError = true; alert("Error : " + e.message); });
        },
        getValue()
        {
            if(this.setting.type == 0)
            {
                var valueArr = this.setting.value.split('|');
                this.valueObj = {tr: valueArr[0], en: valueArr[1]};
            }
            else if(this.setting.type == 1)
            {
                var valuesArr = this.setting.value.split('~');
                
                valuesArr.forEach(element => {
                    var valueArr = element.split('|');
                    this.valueArr.push({tr: valueArr[0], en: valueArr[1]});
                });
            }
            else if(this.setting.type == 2)
            {
                this.value = this.setting.value;
            }
            else if(this.setting.type == 3)
            {
                var valueArr = this.setting.value.split('~');
                valueArr.forEach(element => {
                    this.valueArr.push(element);
                });
            }
            else if(this.setting.type == 4)
            {
                this.valueBoolean = this.setting.value === "true";
            }

            return true;
        },
        setValue()
        {
            this.setting.value = "";

            if(this.setting.type == 0)
            {
                this.setting.value = `${this.valueObj.tr}|${this.valueObj.en}`
            }
            else if(this.setting.type == 1)
            {
                if(this.valueArr.length == 0)
                    return false;

                this.valueArr.forEach(element => {
                    this.setting.value += `${element.tr}|${element.en}~`;
                });

                this.setting.value = this.trimEndChar(this.setting.value, "~");
            }
            else if(this.setting.type == 2)
            {
                this.setting.value = this.value.toString();
            }
            else if(this.setting.type == 3)
            {
                if(this.valueArr.length == 0)
                    return false;

                this.valueArr.forEach(element => {
                    this.setting.value += `${element}~`;
                });

                this.setting.value = this.trimEndChar(this.setting.value, "~");
            }
            else if(this.setting.type == 4)
            {
                this.setting.value = this.valueBoolean.toString().toLowerCase();
            }

            return true;
        },
        changeSettingType(){
            this.valueObj = {};
            this.valueArr = [];
            this.value = null;
            this.valueBoolean = false;
        },
        addValue()
        {
            if(this.setting.type == 1)
            {
                if(this.valueObj.tr && this.valueObj.en)
                {
                    var newValue = {tr: this.valueObj.tr, en: this.valueObj.en}
                    this.valueArr.push(newValue);
                    this.valueObj = {};
                }
                else{
                    alert("İnputlar dolu olmalı!!!");
                }
            }
            else   
            {
                if(this.value)
                {
                    var newValue = this.value;
                    this.valueArr.push(newValue);
                    this.value = null;
                }
                else{
                    alert("İnput dolu olmalı!!!");
                }
            } 
        },
        deleteValue(valueObj)
        {
            this.valueArr = this.valueArr.filter(x => x != valueObj);
        },
        trimEndChar(str, charToRemove) {
            while(str.charAt(str.length - 1) === charToRemove) {
                str = str.substring(0, str.length - 1);
            }
            return str;
        }
    },
    computed: {
        ...mapGetters(["_token"])
    }
}
</script>