<template>  
    <form v-if="this.isShowForm">
        <div class="form-group row">
            <label for="businessId" class="col-sm-2 col-form-label">Business</label>
            <div class="col-sm-10">
                <ModelListSelect v-if="this.campaign != null"
                     :list="this.businesses"
                     v-model="this.campaign.businessId"
                     option-value="id"
                     option-text="name"
                     id="businessId"
                     placeholder="Select Business">
                </ModelListSelect>
            </div>
        </div>
        <div class="form-group row">
            <label for="path" class="col-sm-2 col-form-label">Image Url</label>
            <div class="col-sm-10">
                <input type="text" v-model="this.campaign.path" class="form-control" id="path" placeholder="Image Url">
            </div>
        </div>
        <div class="form-group row">
            <label for="url" class="col-sm-2 col-form-label">Redirect Url</label>
            <div class="col-sm-10">
                <input type="text" v-model="this.campaign.url" class="form-control" id="url" placeholder="Redirect Url">
            </div>
        </div>
        <div class="form-group row">
            <label for="sortorder" class="col-sm-2 col-form-label">Order</label>
            <div class="col-sm-10">
                <input type="number" v-model="this.campaign.sortOrder" class="form-control" id="sortOrder">
            </div>
        </div>
        <div class="form-group row">
            <div class="col-sm-2">Active</div>
            <div class="col-sm-10">
                <div class="form-check">
                    <input v-model="this.campaign.isActive" class="form-check-input" type="checkbox" id="isActive">
                </div>
            </div>
        </div>
        <div class="form-group row">
            <div class="col-sm-12">
                <div v-show="isLoading" class="loader"></div>
                <a @click="this.saveCampaign()" v-show="!isLoading" class="btn btn-success float-sm-right">Save</a>
            </div>
        </div>
    </form>
    <div class="row">
        <div class="col-sm-4" v-if="this.campaign.path != null">
            <img :src="this.campaign.path" width="300" onerror="this.src = null" />
        </div>  
        <div class="col-sm-6 alert alert-danger" v-show="this.hasError" role="alert">
            <p v-for="alert in this.alerts">{{ alert }}</p>
        </div>
    </div>

</template>

<script>
import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            campaign: {
                id: "00000000-0000-0000-0000-000000000000",
                businessId: "00000000-0000-0000-0000-000000000000",
                path: null,
                url: null,
                isActive: false,
                sortOrder: 1
            },
            businesses: [
                {
                    id: "00000000-0000-0000-0000-000000000000",
                    name: "NULL",
                }
            ],
            alerts: [],
            isLoading: true,
            isShowForm: true,
            hasError: false
        };
    },
    created() {
        var id = this.$route.params.id;
        if (id !== undefined && id !== "00000000-0000-0000-0000-000000000000") {
            this.isNewCampaign = false;
            this.getCampaign(id);
        }
        else {
            this.isLoading = false;
        }
    },
    methods: {
        async getCampaign(id) {
            await this.$appAxios.post("/campaign/getbyid", id).then(response => {
                this.isLoading = false;

                if(response.hasError == true || response.data.data == null)
                {
                    this.isShowForm = false;
                    alert(response.data.message);
                    this.$router.push({ path: "/campaigns" });   
                }
                else{
                    this.campaign = response.data.data;
                }

            }).catch(e => { alert("Error : " + e.message); this.$router.push({ path: "/campaigns" }); });
        },
        async saveCampaign() {
            $(".form-control").css("border", "none");
            this.alerts = [];
            this.hasError = false;
            this.isLoading = true;

            if (this.campaign.id != "00000000-0000-0000-0000-000000000000") {
                await this.$appAxios.post("/campaign/update", this.campaign, { headers: { "Authorization": `Bearer ${this._token}` } }).then(response => {
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
            else {
                await this.$appAxios.post("/campaign/save", this.campaign, { headers: { "Authorization": `Bearer ${this._token}` } }).then(response => {
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

            if(!this.hasError)
            {
                this.$router.push({ path: "/campaigns" });
            }
        }
    },
    computed: {
        ...mapGetters(["_token"])
    }
}
</script>