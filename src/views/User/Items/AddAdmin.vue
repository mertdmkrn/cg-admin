<template>  
    <form>
        <div class="form-group row">
            <label for="fullName" class="col-sm-2 col-form-label">Full Name</label>
            <div class="col-sm-10">
                <input type="text" v-model="this.admin.fullName" class="form-control" id="fullName" placeholder="Mert Demirkıran">
            </div>
        </div>
        <div class="form-group row">
            <label for="email" class="col-sm-2 col-form-label">E-Mail</label>
            <div class="col-sm-10">
                <input type="text" v-model="this.admin.email" class="form-control" id="email" placeholder="mert@gmail.com">
            </div>
        </div>
        <div class="form-group row">
            <label for="telephoneNumber" class="col-sm-2 col-form-label">Telephone</label>
            <div class="col-sm-10">
                <input type="text" v-model="this.admin.telephone" class="form-control" id="telephoneNumber" placeholder="+905555555555">
            </div>
        </div>
        <div class="form-group row">
            <label for="password" class="col-sm-2 col-form-label">Password</label>
            <div class="col-sm-10">
                <input type="text" v-model="this.admin.password" class="form-control" id="password" placeholder="12345678">
            </div>
        </div>
        <div class="form-group row">
            <div class="col-sm-12">
                <div v-show="isLoading" class="loader"></div>
                <a @click="this.saveAdmin()" v-show="!isLoading" class="btn btn-success float-sm-right">Save</a>
            </div>
        </div>
    </form>
    <div class="row">
        <div class="col-sm-12 alert alert-danger" v-show="this.hasError && alerts.length > 0" role="alert">
            <p v-for="alert in this.alerts">{{ alert }}</p>
        </div>
    </div>

</template>

<script>
import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            admin: {
                fullName: null,
                email: null,
                telephone: null,
                password: null
            },
            alerts: [],
            isLoading: false,
            hasError: false
        };
    },
    created() {
    },
    methods: {
        async saveAdmin() {
            $(".form-control").css("border", "none");
            this.alerts = [];
            this.hasError = false;
            this.isLoading = true;

            await this.$appAxios.post("/admin/save", this.admin, { headers: { "Authorization": `Bearer ${this._token}` } }).then(response => {
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
                else if(response.hasError){
                    this.hasError = true;
                    this.alerts.push(response.message);
                }
                else{
                    this.hasError = false;
                }  
                    
                }).catch(e => { this.hasError = true; alert("Error : " + e.message); this.isLoading = false; });
            

            if(!this.hasError)
            {
                alert("Kayıt başarılı " + this.admin.email + " mailine bilgilendirme maili atılmıştır.");
                this.admin = { fullName: null, email: null, telephone: null, password: null };
            }
        }
    },
    computed: {
        ...mapGetters(["_token"])
    }
}
</script>