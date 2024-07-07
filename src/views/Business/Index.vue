<template>
    <details style="margin-bottom: 10px;">
        <summary>Filter</summary>
        <div class="form-group-sm row p-3" style="border: 1px solid #e3e6f0; border-radius: 1px; width:99.95%; margin-left:0.025%">
            <div class="col-md-3">
                <label class="col-form-label-sm" for="name">Full Name</label>
                <input type="text" v-model="searchModel.name" class="form-control form-control-sm" id="name">
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
                <label class="col-form-label-sm" for="workingGenderType">Gender Type</label>
                <select class="form-control form-control-sm" v-model="searchModel.workingGenderType">
                    <option v-for="(item, index) in this.workingGenderTypeList" :key="item" :value="index">
                        {{ item }}
                    </option>
                </select>                     
            </div>
            <div class="col-md-2">              
                <div class="form-check form-switch ml-4 mt-2">
                    <input class="form-check-input form-check-input-sm" @change="searchModel.isOnlyNotActive = false" v-model="searchModel.isOnlyActive" type="checkbox" id="isOnlyActive">
                    <label class="form-check-label col-form-label-sm" for="isOnlyActive">Only Active</label>
                </div>           
                <div class="form-check form-switch ml-4">
                    <input class="form-check-input form-check-input-sm" @change="searchModel.isOnlyActive = false" v-model="searchModel.isOnlyNotActive" type="checkbox" id="isOnlyNotActive">
                    <label class="form-check-label col-form-label-sm" for="isOnlyNotActive">Only Not Active</label>
                </div>                     
            </div>
            <div class="col-md-1 mt-4 d-none d-lg-flex">
                <a @click="this.getBusinesses()" v-if="!saveLoading" class="btn btn-sm m-2 btn-primary">Search</a>
            </div>
            <div class="col-md-12 mt-1 d-flex d-lg-none">
                <a @click="this.getBusinesses()" v-if="!saveLoading" class="btn d-block btn-sm m-2 btn-primary" style="width: 105%;">Search</a>
            </div>
        </div>
    </details>
    <div class="table-responsive">
        <table class="table table-sm table-bordered table-striped">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>NameForUrl</th>
                    <th>City - Province</th>
                    <th>Created Date</th>
                    <th>Gender</th>
                    <th>Active</th>
                    <th style="width:40px"><a class="btn btn-success btn-user btn-block" @click="editBusiness = {}" data-toggle="modal" data-target="#editBusinessModal"><i class="fa-solid fa-plus"></i></a></th>
                </tr>
            </thead>
            <tbody>
                <tr v-show="isLoading">
                   <td class="align-middle" colspan="7"><div class="loader"></div></td> 
                </tr>
                <tr v-for="item in this.businesses" :key="item.id">
                    <td class="text-center align-middle">{{ item.name }}</td>
                    <td class="text-center align-middle">{{ item.nameForUrl }}</td>
                    <td class="text-center align-middle">{{ item.city }} - {{ item.province }}</td>
                    <td class="text-center align-middle">{{ $filters.formatDate(item.createDate) }}</td>
                    <td class="text-center align-middle">{{ workingGenderTypeList[item.workingGenderType] }}</td>
                    <td class="text-center align-middle">{{ item.isActive ? "YES" : "NO" }}</td>
                    <td class="text-center align-middle">
                        <router-link style="color: #FFBF00;" class="nav-link" :to="'/business/edit/' + item.id" >
                            <i class="fa-solid fa-edit"></i>
                        </router-link>
                        <a style="color: #DE3163;" @click="this.deleteBusiness(item)" class="nav-link">
                            <i class="fa-solid fa-trash"></i>
                        </a>
                            
                    </td>
                </tr>
            </tbody>
        </table>
        <pagination v-model="page" :records="records" :per-page="perPage" @paginate="getBusinesses"/>
    </div>
    <div class="modal fade" id="editBusinessModal" tabindex="-1" role="dialog" aria-labelledby="editBusinessModalLabel" aria-hidden="true">
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
        </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    data(){
        return {
            page: 1,
            perPage: 5,
            records: 0,
            businesses: [],
            editBusiness: {},
            searchModel: {
                page: null,
                take: null,
                name: null,
                city: null,
                workingGenderType: 3,
                isOnlyActive: false,
                isOnlyNotActive: false
            },
            isLoading: true,
            saveLoading: false,
            workingGenderTypeList: ["Everyone", "Female", "Male", "All"],
            cities: []
        }
    },
    created() {
        this.getBusinesses();
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
        async getBusinesses()
        {
            this.businesses = [];
            this.isLoading = true;
            this.searchModel.page = this.page - 1;
            this.searchModel.take = this.perPage;

            await this.$appAxios.post("/admin/searchbusiness", this.searchModel, {headers: { 'Authorization': `Bearer ${this._token}` }}).then(response => {
                this.businesses = response.data.data;
                this.records = this.businesses.length > 0 ? this.businesses[0].itemCount : 0;
                this.isLoading = false;
            }).catch(e => { alert(e.message); });
        },
        async saveBusiness()
        {
            this.saveLoading = true;

            await this.$appAxios.post("/business/save", this.editBusiness, {headers: { 'Authorization': `Bearer ${this._token}` }}).then(response => {
                this.saveLoading = false;
                var response = response.data;
                var message = response.message;

                if(response.hasError)
                {
                    if(response.validationErrors.length > 0)
                    {
                        response.validationErrors.forEach(e => {
                            message += e.key +  " : " + e.value;
                        });
                    }
                }
                
                alert(message);
                $("#editBusinessModal").modal("hide");

                if(!response.hasError)
                {
                    this.$router.push({ path: "/business/edit/" + response.data.id});
                }       
            }).catch(e => { alert(e.message); });
        },
        async deleteBusiness(item)
        {
            if(confirm("Do you want to delete the record?!")){
                await this.$appAxios.post("/business/delete", item, {headers: { 'Authorization': `Bearer ${this._token}` }}).then(response => {
                  
                    alert(response.data.message);

                    if(!response.data.hasError)
                    {
                        var index = this.businesses.indexOf(item);
                        if(index > -1)
                        {
                            this.businesses.splice(index, 1);
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