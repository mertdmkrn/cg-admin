<template>
    <div class="row">
        <div class="col-sm-12" style="display: table; text-align: center; margin: 0 auto">
            <div style="width: 200px; height:200px; border-radius: 100%; overflow: hidden; margin: 0 auto; position: relative; background: #ddd; text-align: center;">
                <i v-if="this.user.imageUrl == null" style="display: inline-block; font-size:120px; padding-top: 35px;" class="fa-solid fa-user"></i>
                <img v-else style="width:200px; height: 200px; display:inline-block" :src="this.user.imageUrl" loading="lazy" decoding="async" />
            </div>

            <input class="file-upload mt-3" ref="file" type="file" accept="image/*" @change="previewFiles"/>
        </div>
    </div>
    <div class="row mt-5 float-right">
        <div v-show="isLoading" class="loader"></div>
        <button v-if="this.file != null && !this.isLoading" class="btn btn-success" @click="saveImage">Resmi Kaydet</button>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            user: {
                imageUrl : null,
            },
            file: null,
            alerts: [],
            isLoading: false,
            hasError: false
        };
    },
    created() {
        this.user.imageUrl = this.$store.state.user?.imageUrl;
    },
    methods: {
        previewFiles() {
            this.file = this.$refs.file.files[0];
            var reader = new FileReader();
            reader.readAsDataURL(this.file);
            reader.onload = function (e) {
                this.user.imageUrl = e.target.result;
            }.bind(this);
        },
        async saveImage() {
            this.alerts = [];
            this.hasError = false;
            this.isLoading = true;

            const formData = new FormData();
            formData.append("file", this.file)

            await this.$appAxios.post("/user/setprofilephoto", formData, { headers: { "Authorization": `Bearer ${this._token}`, "Content-Type": "multipart/form-data" } }).then(response => {
                this.isLoading = false;

                var response = response.data;
                if(response.hasError)
                {
                    this.hasError = true;
                    alert(response.message);
                }
                else{
                    this.$appAxios.post("/user/get", null, {headers: { 'Authorization': `Bearer ${this._token}` }}).then(userResponse => {
                        this.$store.commit("setUser", userResponse?.data?.data);
                    })
                }  
                    
                }).catch(e => { this.hasError = true; alert("Error : " + e.message); this.isLoading = false; });
            

            if(!this.hasError)
            {
                alert("Resim başarılı bir şekilde yüklenmiştir");
                this.$router.push({ path: '/' });
            }
        }
    },
    computed: {
        ...mapGetters(["_token"])
    }
}
</script>