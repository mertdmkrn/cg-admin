<template>
    <details style="margin-bottom: 10px;">
        <summary>Filter</summary>
        <div class="form-group-sm row p-3" style="border: 1px solid #e3e6f0; border-radius: 1px; width:99.95%; margin-left:0.025%">
            <div class="col-md-3">
                <label class="col-form-label-sm" for="name">Email</label>
                <input type="text" v-model="searchModel.email" class="form-control form-control-sm" id="email">
            </div>
            <div class="col-md-3">
                <label class="col-form-label-sm" for="city">City</label>
                <ModelListSelect
                    :list="this.cities"
                    v-model="searchModel.city"
                    id="city"
                    option-value="value"
                    option-text="name"
                    class="form-control form-control-sm"
                    placeholder="Select City">
                </ModelListSelect>            
            </div>
            <div class="col-md-3">
                <label class="col-form-label-sm" for="workingGenderType">Gender</label>
                <select class="form-control form-control-sm" v-model="searchModel.gender">
                    <option v-for="(item, index) in this.genderList" :key="item" :value="index">
                        {{ item }}
                    </option>
                </select>                     
            </div>
            <div class="col-md-3">
                <label class="col-form-label-sm" for="workingGenderType">Role</label>
                <select class="form-control form-control-sm" v-model="searchModel.role">
                    <option value="">Nothing</option>
                    <option value="User">User</option>
                    <option value="Admin">Admin</option>
                </select>                     
            </div>
            <div class="col-md-1 mt-4 d-none d-lg-flex">
                <a @click="this.page = 1; this.getUsers()" v-if="!saveLoading" class="btn btn-sm m-2 btn-primary">Search</a>
            </div>
            <div class="col-md-12 mt-1 d-flex d-lg-none">
                <a @click="this.page = 1; this.getUsers()" v-if="!saveLoading" class="btn d-block btn-sm m-2 btn-primary" style="width: 105%;">Search</a>
            </div>
        </div>
    </details>
    <div class="table-responsive">
        <table class="table table-sm table-bordered table-striped">
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>City - Province</th>
                    <th>Created Date</th>
                    <th>Gender</th>
                    <th>Telephone</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th style="width:40px">
                        <router-link to="/user/add" class="btn btn-success btn-user btn-block" title="ADD ADMIN"> <i class="fa-solid fa-plus"></i> </router-link>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-show="isLoading">
                   <td class="align-middle" colspan="9"><div class="loader"></div></td> 
                </tr>
                <tr v-for="item in this.users" :key="item.id">
                    <td class="text-center align-middle">
                        <div style="width:60px; margin: 0 auto; background: #e3e6f0; height: 60px; border-radius: 100%; font-size: 25px;">
                            <img v-if="item.imageUrl != null" :src="item.imageUrl" width="60" height="60" loading="lazy" decoding="async" style="border-radius: 100%;">
                            <i v-else class="fa-solid fa-user" style="padding-top: 18px;"></i>
                        </div>                        
                    </td>
                    <td class="text-center align-middle">
                        <span style="padding: 5px;">{{ item.fullName }}</span>                
                    </td>
                    <td class="text-center align-middle">{{ item.city ?? "-" }}</td>
                    <td class="text-center align-middle">{{ $filters.formatDate(item.createDate) }}</td>
                    <td class="text-center align-middle">{{ genderList[item.gender] }}</td>
                    <td class="text-center align-middle">{{ item.telephone }}</td>
                    <td class="text-center align-middle">{{ item.email }}</td>
                    <td class="text-center align-middle">{{ item.role }}</td>
                    <td class="text-center align-middle">
                        <a style="color: #DE3163;" @click="this.deleteUser(item)" class="nav-link">
                            <i class="fa-solid fa-trash"></i>
                        </a>                        
                    </td>
                </tr>
            </tbody>
        </table>
        <pagination v-model="page" :records="records" :per-page="perPage" @paginate="getUsers"/>
    </div>
    <!-- <div class="modal fade" id="editBusinessModal" tabindex="-1" role="dialog" aria-labelledby="editBusinessModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="editPersonalModalLabel">Add Business</h5>
                        <a type="a" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </a>
                    </div>
                    <div class="modal-body">
                        <div class="form-group row">
                            <div class="col-md-12">
                                <label for="name">Name</label>
                                <input type="text" v-model="editBusiness.name" class="form-control" id="name">
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-md-12">
                                <label for="email">Email</label>
                                <input type="email" v-model="editBusiness.email" class="form-control" id="email">
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-md-12">
                                <label for="telephone">Telephone</label>
                                <input type="text" v-model="editBusiness.telephone" class="form-control" id="telephone">
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-md-6">
                                <label for="password">Password</label>
                                <input type="password" v-model="editBusiness.password" class="form-control" id="password">
                            </div>
                            <div class="col-md-6">
                                <label for="retryPassword">Retry Password</label>
                                <input type="password" v-model="editBusiness.retryPassword" class="form-control" id="retryPassword">
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <div v-show="saveLoading" class="loader"></div>
                        <a @click="saveBusiness()" v-if="!saveLoading" class="btn btn-primary">Save</a>
                    </div>
                </div>
            </div>
    </div> -->
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    data(){
        return {
            page: 1,
            perPage: 7,
            records: 0,
            users: [],
            editUser: {},
            searchModel: {
                page: null,
                take: null,
                email: null,
                city: null,
                gender: 3,
                role: ""
            },
            isLoading: true,
            saveLoading: false,
            genderList: ["Women", "Male", "Unspecified", "Nothing"],
            cities: []
        }
    },
    created() {
        this.getUsers();
        this.getCities();
    },
    methods: {
        async getCities()
        {
            this.isLoading = true;
            await this.$appAxios.post("/definition/getcities").then(response => {
                this.cities = response.data.data.map(cityName => {
                    return {
                        name: cityName,
                        value: cityName
                    };
                });
                this.isLoading = false;
            }).catch(e => { alert(e.message); });
        },
        async getUsers()
        {
            this.users = [];
            this.isLoading = true;
            this.searchModel.page = this.page - 1;
            this.searchModel.take = this.perPage;

            await this.$appAxios.post("/admin/getusers", this.searchModel, {headers: { 'Authorization': `Bearer ${this._token}` }}).then(response => {
                this.users = response.data.data;
                this.records = this.users.length > 0 ? this.users[0].itemCount : 0;
                this.isLoading = false;
            }).catch(e => { alert(e.message); });
        },
        // async saveBusiness()
        // {
        //     this.saveLoading = true;

        //     await this.$appAxios.post("/business/save", this.editBusiness, {headers: { 'Authorization': `Bearer ${this._token}` }}).then(response => {
        //         this.saveLoading = false;
        //         var response = response.data;
        //         var message = response.message;

        //         if(response.hasError)
        //         {
        //             if(response.validationErrors.length > 0)
        //             {
        //                 response.validationErrors.forEach(e => {
        //                     message += e.key +  " : " + e.value;
        //                 });
        //             }
        //         }
                
        //         alert(message);
        //         $("#editBusinessModal").modal("hide");

        //         if(!response.hasError)
        //         {
        //             this.$router.push({ path: "/business/edit/" + response.data.id});
        //         }       
        //     }).catch(e => { alert(e.message); });
        // },
        async deleteUser(item)
        {
            if(confirm("Do you want to delete the record?!")){
                await this.$appAxios.post("/admin/deleteuser", item.id, {headers: { 'Authorization': `Bearer ${this._token}` }}).then(response => {
                  
                    alert(response.data.message);

                    if(!response.data.hasError)
                    {
                        var index = this.users.indexOf(item);
                        if(index > -1)
                        {
                            this.users.splice(index, 1);
                            this.records--;
                        }
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
