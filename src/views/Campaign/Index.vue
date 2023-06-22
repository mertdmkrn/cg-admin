<template>
    <div class="table-responsive">
        <table class="table table-striped table-bordered">
            <thead>
                <tr>
                    <th>Order</th>
                    <th>Image</th>
                    <th>Url</th>
                    <th>Active</th>
                    <th style="width:40px"><router-link to="/campaign/edit" class="btn btn-success btn-user btn-block"><i class="fa-solid fa-plus"></i></router-link></th>
                </tr>
            </thead>
            <tbody>
                <tr v-show="isLoading">
                    <td class="align-middle" colspan="5"><div class="loader"></div></td> 
                </tr>
                <tr v-for="campaign in this.campaigns" :key="campaign.id">
                    <td class="text-center align-middle">{{ campaign.sortOrder }}</td>
                    <td class="text-center align-middle"><img :src="campaign.path" width="150" /></td>
                    <td class="text-center align-middle"><a class="nav-link" :href="campaign.url" target="_blank">{{ campaign.url }}</a></td>
                    <td class="text-center align-middle">{{ campaign.isActive ? 'YES' : 'NO' }}</td>
                    <td class="text-center align-middle">
                        <router-link class="nav-link" :to="'/campaign/edit/' + campaign.id" >
                            <i style="color: #FFBF00;" class="fa-solid fa-edit"></i>
                        </router-link>
                        <a @click="this.deleteCampaign(campaign)" class="nav-link">
                            <i style="color: #DE3163;" class="fa-solid fa-trash"></i>
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
            campaigns : [],
            isLoading : true
        }
    },
    created() {
        this.getCampaigns();
    },
    methods: {
        async getCampaigns()
        {
            await this.$appAxios.post("/campaign/getall").then(response => {
                this.campaigns = response.data.data;
                this.isLoading = false;
            }).catch(e => { console.log(e.message); });
        },
        async deleteCampaign(item)
        {
            if(confirm("Do you want to delete the record?!")){
                await this.$appAxios.post("/campaign/delete", item.id, {headers: { 'Authorization': `Bearer ${this._token}` }}).then(response => {
                    
                    var index = this.campaigns.indexOf(item);
                    if(index > -1)
                    {
                        this.campaigns.splice(index, 1);
                    }
                    
                }).catch(e => { console.log(e.message); });
            }
        }
    },
    computed: {
        ...mapGetters(["_token"])
    }
}
</script>