<template>  
    <form>
        <div class="form-group row">
            <label for="name" class="col-sm-2 col-form-label">Name</label>
            <div class="col-sm-10">
            <input type="text" v-model="this.service.name" class="form-control" id="name" placeholder="Name">
            </div>
        </div>
        <div class="form-group row">
            <label for="nameEn" class="col-sm-2 col-form-label">Name En</label>
            <div class="col-sm-10">
            <input type="text" v-model="this.service.nameEn" class="form-control" id="nameEn" placeholder="English Name">
            </div>
        </div>
        <div class="form-group row">
            <label for="className" class="col-sm-2 col-form-label">Class Name</label>
            <div class="col-sm-10">
            <input type="text" v-model="this.service.className" class="form-control" id="className">
            </div>
        </div>
        <div class="form-group row">
            <label for="colorCode" class="col-sm-2 col-form-label">Color Code</label>
            <div class="col-sm-9">
                <input type="text" class="form-control" id="colorCode" v-model="this.service.colorCode">
            </div>
            <div class="col-sm-1">
                <input type="color" :style="{backgroundColor : `${this.service.colorCode}`}" v-model="this.service.colorCode" class="form-control">
            </div>
        </div>
        <div class="form-group row">
            <label for="sortOrder" class="col-sm-2 col-form-label">Order</label>
            <div class="col-sm-10">
            <input type="number" v-model="this.service.sortOrder" class="form-control" id="sortOrder">
            </div>
        </div>
        <div class="col-sm-12">
            <div v-show="isLoading" class="loader"></div>
            <a @click="this.saveService()" v-show="!isLoading" class="btn btn-success float-sm-right">Save</a>
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
            service : {
                id : "00000000-0000-0000-0000-000000000000",
                name : null,
                nameEn : null,
                className : null,
                colorCode : "#ffffff",
                sortOrder : 1
            },
            alerts : [],
            hasError : false,
            isLoading : true,
        }
    },
    created() {
        var id = this.$route.params.id;

        if(id !== undefined && id !== "00000000-0000-0000-0000-000000000000")
        {
            this.getService(id);
        }
        else{
            this.isLoading = false;
        }
    },
    methods: {
        async getService(id)
        {
            await this.$appAxios.post("/service/getbyid", id).then(response => {
                this.isLoading = false;
                
                if(response.hasError == true || response.data.data == null)
                {
                    alert(response.data.message);
                    this.$router.push({ path: "/services" });   
                }
                else{
                    this.service = response.data.data;
                }
            }).catch(e => { this.hasError = true; alert("Error : " + e.message); });
        },
        async saveService()
        {
            $(".form-control").css("border", "none");
            this.alerts = [];
            this.hasError = false;
            this.isLoading = true;

            if(this.service.id != "00000000-0000-0000-0000-000000000000")
            {
                await this.$appAxios.post("/service/update", this.service,  {headers: { 'Authorization': `Bearer ${this._token}`  }}).then(response => {
                    this.isLoading = false;
             
                    var response = response.data;

                    if(response.hasError && response.validationErrors.length > 0)
                    {
                        this.hasError = true;
                        response.validationErrors.forEach(e => {
                            $("#" + e.key).css("border", "2px solid red");
                            this.alerts.push(e.key +  " : " + e.value);
                        });
                    }
                    else{
                        this.hasError = false;
                    }  
                    
                }).catch(e => { this.hasError = true; alert("Error : " + e.message); });
            }
            else
            {
                await this.$appAxios.post("/service/save", this.service, {headers: { 'Authorization': `Bearer ${this._token}` }}).then(response => {
                    this.isLoading = false;

                     var response = response.data;

                    if(response.hasError || response.validationErrors.length > 0)
                    {
                        this.hasError = true;
                        response.validationErrors.forEach(e => {
                            $("#" + e.key).css("border", "2px solid red");
                            this.alerts.push(e.key +  " : " + e.value);
                        });
                    }
                    else{
                        this.hasError = false;
                    }  

                }).catch(e => { this.hasError = true; alert("Error : " + e.message); });
            }

            this.isLoading = false;

            if(!this.hasError)
            {
                this.$router.push({ path: "/services" });
            }
        }
    },
    computed: {
        ...mapGetters(["_token"])
    }
}
</script>