<template>  
    <form>
        <div class="form-group row">
            <label for="question" class="col-sm-2 col-form-label">Question</label>
            <div class="col-sm-10">
            <input type="text" v-model="this.faq.question" class="form-control" id="question" placeholder="Question">
            </div>
        </div>
        <div class="form-group row">
            <label for="questionEn" class="col-sm-2 col-form-label">QuestionEn</label>
            <div class="col-sm-10">
            <input type="textn" v-model="this.faq.questionEn" class="form-control" id="questionEn" placeholder="QuestionEn">
            </div>
        </div>
        <div class="form-group row">
            <label for="answer" class="col-sm-2 col-form-label">Answer</label>
            <div class="col-sm-10">
            <input type="text" v-model="this.faq.answer" class="form-control" id="answer" placeholder="Answer">
            </div>
        </div>
        <div class="form-group row">
            <label for="answerEn" class="col-sm-2 col-form-label">AnswerEn</label>
            <div class="col-sm-10">
            <input type="text" v-model="this.faq.answerEn" class="form-control" id="answerEn" placeholder="AnswerEn">
            </div>
        </div>
        <div class="form-group row">
            <label for="category" class="col-sm-2 col-form-label">Category</label>
            <div class="col-sm-10">
                <select class="form-control" v-model="this.faq.category" id="category">
                    <option v-for="item in this.categories" :value="item" :key="item">
                        {{ item }}
                    </option>
                </select>
            </div>
        </div>
        <div class="form-group row">
            <label for="sortOrder" class="col-sm-2 col-form-label">Order</label>
            <div class="col-sm-10">
            <input type="number" v-model="this.faq.sortOrder" class="form-control" id="sortOrder">
            </div>
        </div>
        <div class="col-sm-12">
            <div v-show="isLoading" class="loader"></div>
            <a @click="this.saveFaq()" v-show="!isLoading" class="btn btn-success float-sm-right">Save</a>
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
            faq : {
                id : "00000000-0000-0000-0000-000000000000",
                question : null,
                questionEn : null,
                answer : null,
                answerEn : null,
                category : null,
                sortOrder : 1
            },
            alerts : [],
            categories : [],
            hasError : false,
            isLoading : true,
        }
    },
    created() {
        var id = this.$route.params.id;

        if(id !== undefined && id !== null)
        {
            this.getFaq(id);
        }
        else{
            this.isLoading = false;
        }

        this.getFaqCategories();
    },
    methods: {
        async getFaq(id)
        {
            await this.$appAxios.post("/admin/getfaq", id, {headers: { 'Authorization': `Bearer ${this._token}`}}).then(response => {
                this.isLoading = false;
                
                if(response.hasError == true || response.data.data == null)
                {
                    alert(response.data.message);
                    this.$router.push({ path: "/faq" });   
                }
                else{
                    this.faq = response.data.data;
                }
            }).catch(e => { this.hasError = true; alert("Error : " + e.message); });
        },
        async getFaqCategories()
        {
            await this.$appAxios.post("/admin/getfaqcategories", null, {headers: { 'Authorization': `Bearer ${this._token}`}}).then(response => {
                this.isLoading = false;
                
                if(response.hasError == true || response.data.data == null)
                {
                    alert(response.data.message);
                    this.$router.push({ path: "/faq" });   
                }
                else{
                    this.categories = response.data.data;
                }
            }).catch(e => { this.hasError = true; alert("Error : " + e.message); });
        },
        async saveFaq()
        {
            $(".form-control").css("border", "none");
            this.alerts = [];
            this.hasError = false;
            this.isLoading = true;

            if(this.faq.id != "00000000-0000-0000-0000-000000000000")
            {
                await this.$appAxios.post("/admin/updatefaq", this.faq,  {headers: { 'Authorization': `Bearer ${this._token}`  }}).then(response => {
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
                await this.$appAxios.post("/admin/savefaq", this.faq, {headers: { 'Authorization': `Bearer ${this._token}` }}).then(response => {
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
                this.$router.push({ path: "/faq" });
            }
        }
    },
    computed: {
        ...mapGetters(["_token"])
    }
}
</script>