<template>
        <!-- Outer Row -->
        <div class="row justify-content-center">

            <div class="col-xl-10 col-lg-12 col-md-9">

                <div class="card o-hidden border-0 shadow-lg my-15">
                    <div class="card-body p-0">
                        <!-- Nested Row within Card Body -->
                        <div class="row">
                            <div class="col-lg-6 d-none d-lg-block bg-login-image"></div>
                            <div class="col-lg-6">
                                <div class="p-5">
                                    <div class="text-center">
                                        <h1 class="h1 text-gray-800 mb-4">CG ADMIN</h1>
                                    </div>
                                    <form class="user">
                                        <div class="form-group">
                                            <input v-model="userData.email" type="email" class="form-control form-control-user"
                                                id="exampleInputEmail" aria-describedby="emailHelp"
                                                placeholder="Email Address">
                                        </div>
                                        <div class="form-group">
                                            <input v-model="userData.password" type="password" class="form-control form-control-user"
                                                id="exampleInputPassword" placeholder="Password" @keyup.enter="onLogin">
                                        </div>
                                        <div class="form-group">
                                            <div v-show="isLoading" class="loader"></div>
                                            <a v-show="!isLoading" @click="onLogin" type="submit" class="btn btn-primary btn-user btn-block">
                                                Login
                                            </a>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
</template>

<script>

export default {
    data(){
        return {
            isLoading : false,
            userData : {
                email : null,
                password : null, 
            },
        }
    },
    methods: {
        async onLogin()
        {
            this.isLoading  = true;
            await this.$appAxios.post("/user/adminlogin", this.userData).then(response => {
                var token = response?.data?.data?.token;
                
                if(token !== undefined)
                {
                    this.$store.commit("setToken", token);
                    setTimeout(200);
                    this.$appAxios.post("/user/get", null, {headers: { 'Authorization': `Bearer ${token}` }}).then(userResponse => {
                        this.$store.commit("setUser", userResponse?.data?.data),
                        this.$router.push({ path: '/' });
                    })
                    .catch(e => { console.log(e);  alert("Böyle bir kullanıcı bulunamadı."); this.isLoading  = false;});
                }
                else
                {
                    this.isLoading  = false;
                    alert("Böyle bir kullanıcı bulunamadı.")
                }

            })
            .catch(e => { console.log(e.message);  alert("Böyle bir kullanıcı bulunamadı."); this.isLoading  = false; });
            
        }
    }
}
</script>