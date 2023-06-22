<template>
    <div class="table-responsive">
        <table class="table table-bordered table-striped">
            <thead>
                <tr>
                    <th>Order</th>
                    <th>Name</th>
                    <th>NameEn</th>
                    <th>Class</th>
                    <th>Color</th>
                    <th style="width:40px"><router-link to="/service/edit" class="btn btn-success btn-user btn-block"><i class="fa-solid fa-plus"></i></router-link></th>                </tr>
            </thead>
            <tbody>
                <tr v-show="isLoading">
                   <td class="align-middle" colspan="6"><div class="loader"></div></td> 
                </tr>
                <tr v-for="service in this.services" :key="service.id">
                    <td class="text-center align-middle">{{ service.sortOrder }}</td>
                    <td class="text-center align-middle">{{ service.name }}</td>
                    <td class="text-center align-middle">{{ service.nameEn }}</td>
                    <td class="text-center align-middle">{{ service.className }}</td>
                    <td class="text-center align-middle"><span style="padding: 5px; color: #fff;" :style="{backgroundColor: '#' + service.colorCode }">{{ service.colorCode }}</span></td>
                    <td class="text-center align-middle">
                        <router-link style="color: #FFBF00;" class="nav-link" :to="'/service/edit/' + service.id" >
                            <i class="fa-solid fa-edit"></i>
                        </router-link>
                        <a style="color: #DE3163;" @click="this.deleteService(service)" class="nav-link">
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
            services : [],
            isLoading: true
        }
    },
    created() {
        this.getServices();
    },
    methods: {
        async getServices()
        {
            await this.$appAxios.post("/service/getall").then(response => {
                this.services = response.data.data;
                this.isLoading = false;
            }).catch(e => { alert(e.message); });
        },
        async deleteService(item)
        {
            if(confirm("Do you want to delete the record?!")){
                await this.$appAxios.post("/service/delete", item.id, {headers: { 'Authorization': `Bearer ${this._token}` }}).then(response => {
                  
                    var index = this.services.indexOf(item);
                    if(index > -1)
                    {
                        this.services.splice(index, 1);
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