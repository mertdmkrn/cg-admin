<template>
    <div class="table-responsive">
        <table class="table table-sm table-bordered table-striped">
            <thead>
                <tr>
                    <th>Business</th>
                    <th>Date</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-show="isLoading">
                   <td class="align-middle" colspan="4"><div class="loader"></div></td> 
                </tr>
                <tr v-for="appointment in this.appointments" :key="appointment.id">
                    <td class="text-center align-middle">{{ appointment.business.name }}</td>
                    <td class="text-center align-middle">{{ $filters.formatDateAndHour(appointment.startDate) }}</td>
                    <td class="text-center align-middle">{{ appointment.details.reduce((sum, item) => sum + item.discountPrice, 0) }} ₺</td>
                    <td class="text-center align-middle">
                        <span style="display:block; width: 100%; padding: 5px; color: #fff;" :style="{backgroundColor: statusBColors[appointment.status], color: statusColors[appointment.status]}">
                            {{ statusNames[appointment.status] }}
                        </span>
                    </td>
                    <td class="text-center align-middle">
                        <a style="color: #FFBF00;" class="nav-link" @click="appointmentId = appointment.id; status = appointment.status" data-toggle="modal" data-target="#editAppointmentModal">
                            <i class="fa-solid fa-edit"></i>
                        </a>                            
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="modal fade" id="editAppointmentModal" tabindex="-1" role="dialog" aria-labelledby="editAppointmentModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="editAppointmentModalLabel">Edit Status</h5> 
                        <p><small> ({{ appointmentId }})</small></p>
                        <a type="a" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </a>
                    </div>
                    <div class="modal-body">
                        <div class="form-group row">
                            <div class="col-md-12">
                                <label for="service">Status</label>
                                <select class="form-control" v-model="status">
                                    <option value="0">Pending</option>
                                    <option value="1">Approved</option>
                                    <option value="2">Completed</option>
                                    <option value="3">Cancelled</option>
                                </select>            
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <div v-show="saveLoading" class="loader"></div>
                        <a class="btn btn-warning" @click="updateAppointment()">Update</a>
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
            appointments : [],
            appointmentId : {},
            status: 0, 
            statusNames: ["Pending", "Approved", "Completed", "Cancelled", "All"],
            statusBColors: ["#FEF0C7", "#E0F2FE", "#E4FBCC", "#FEE4E2"],
            statusColors: ["#93370D", "#065986", "#326212", "#912018"],
            isLoading: true
        }
    },
    created() {
        this.getAppointments();
    },
    methods: {
        async getAppointments()
        {
            const body = { 
                "page" : 0,
                "take" : 50
            };
            
            await this.$appAxios.post("/appointment/get", body, {headers: { 'Authorization': `Bearer ${this._token}` }}).then(response => {
                this.appointments = response.data.data;
                this.isLoading = false;
            }).catch(e => { alert(e.message); });
        },
        async updateAppointment()
        {
            const body = { 
                "id" : this.appointmentId,
                "status" : parseInt(this.status)
            };
            
            await this.$appAxios.post("/appointment/changestatus", body, {headers: { 'Authorization': `Bearer ${this._token}` }}).then(response => {
                this.saveLoading = false;
                this.editAppointment = {};
               
                if(!response.hasError)
                {
                    let appointment = this.appointments.filter(x => x.id == this.appointmentId);
                    if(appointment) appointment[0].status = body.status;
                }

                $("#editAppointmentModal").modal("hide");
                alert(response.data.message);
            }).catch(e => { alert(e.message); });
        },
    },
    computed: {
        ...mapGetters(["_token"])
    }
}
</script>