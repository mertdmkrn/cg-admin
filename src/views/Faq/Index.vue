<template>
    <div class="table-responsive">
        <table class="table table-sm table-bordered table-striped">
            <thead>
                <tr>
                    <th>Order</th>
                    <th>Question</th>
                    <th>QuestionEn</th>
                    <th>Answer</th>
                    <th>AnswerEn</th>
                    <th>Category</th>
                    <th>CategoryEn</th>
                    <th style="width:40px"><router-link to="/faq/edit" class="btn btn-success btn-user btn-block"><i class="fa-solid fa-plus"></i></router-link></th>
                </tr>
            </thead>
            <tbody>
                <tr v-show="isLoading">
                   <td class="align-middle" colspan="8"><div class="loader"></div></td> 
                </tr>
                <tr v-for="faq in this.faqs" :key="faq.id">
                    <td class="text-center align-middle">{{ faq.sortOrder }}</td>
                    <td class="text-center align-middle">{{ faq.question }}</td>
                    <td class="text-center align-middle">{{ faq.questionEn }}</td>
                    <td class="text-center align-middle">{{ faq.answer }}</td>
                    <td class="text-center align-middle">{{ faq.answerEn }}</td>
                    <td class="text-center align-middle">{{ faq.category }}</td>
                    <td class="text-center align-middle">{{ faq.categoryEn }}</td>
                    <td class="text-center align-middle">
                        <router-link style="color: #FFBF00;" class="nav-link" :to="'/faq/edit/' + faq.id" >
                            <i class="fa-solid fa-edit"></i>
                        </router-link>
                        <a style="color: #DE3163;" @click="this.deleteFaq(faq)" class="nav-link">
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
            faqs : [],
            isLoading: true
        }
    },
    created() {
        this.getFaqs();
    },
    methods: {
        async getFaqs()
        {
            await this.$appAxios.post("/user/getfaqs", null, {headers: { 'Authorization': `Bearer ${this._token}` }}).then(response => {
                this.faqs = response.data.data.faqs;
                console.log(this.faqs);
                this.isLoading = false;
            }).catch(e => { alert(e.message); });
        },
        async deleteFaq(item)
        {
            if(confirm("Do you want to delete the record?!")){
                await this.$appAxios.post("/admin/deletefaq", item.id, {headers: { 'Authorization': `Bearer ${this._token}` }}).then(response => {
                  
                    var index = this.faqs.indexOf(item);
                    if(index > -1)
                    {
                        this.faqs.splice(index, 1);
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