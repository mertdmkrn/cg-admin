<template>
    <div class="table-responsive">
        <table class="table table-sm table-bordered table-striped">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Type</th>
                    <th style="width:40px"><router-link to="/setting/edit" class="btn btn-success btn-user btn-block"><i class="fa-solid fa-plus"></i></router-link></th>                </tr>
            </thead>
            <tbody>
                <tr v-show="isLoading">
                   <td class="align-middle" colspan="4"><div class="loader"></div></td> 
                </tr>
                <tr v-for="setting in this.settings" :key="setting.id">
                    <td class="text-center align-middle">{{ setting.name }}</td>
                    <td class="text-center align-middle">{{ setting.description }}</td>
                    <td class="text-center align-middle">{{ settingTypes[setting.type] }}</td>
                    <td class="text-center align-middle">
                        <router-link style="color: #FFBF00;" class="nav-link" :to="'/setting/edit/' + setting.id" >
                            <i class="fa-solid fa-edit"></i>
                        </router-link>
                        <a style="color: #DE3163;" @click="this.deleteSetting(setting)" class="nav-link">
                            <i class="fa-solid fa-trash"></i>
                        </a>
                            
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    data(){
        return {
            settings : [],
            settingTypes : [ "Metin", "Metin Listesi", "Sayı", "Sayı Listesi", "Doğru/Yanlış" ],
            isLoading: true
        }
    },
    created() {
        this.getSettings();
    },
    methods: {
        async getSettings()
        {
            await this.$appAxios.post("/setting/getall", null, {headers: { 'Authorization': `Bearer ${this._token}` }}).then(response => {
                this.settings = response.data.data;
                this.isLoading = false;
            }).catch(e => { alert(e.message); });
        },
        async deleteSetting(item)
        {
            if(confirm("Do you want to delete the record?!")){
                await this.$appAxios.post("/setting/delete", item.id, {headers: { 'Authorization': `Bearer ${this._token}` }}).then(response => {
                  
                    var index = this.settings.indexOf(item);
                    if(index > -1)
                    {
                        this.settings.splice(index, 1);
                    }

                }).catch(e => { alert(e.message); });
            }
        }
    },
    computed: {
        ...mapGetters(["_token"])
    }
}
</script>