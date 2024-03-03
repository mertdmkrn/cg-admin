<template>
  <ul class="d-none d-lg-flex nav nav-tabs">
    <li class="active"><a data-toggle="tab" href="#generalinformation" class="active">GENERAL INFORMATION</a></li>
    <li><a data-toggle="tab" href="#workinginfo">WORKING INFO</a></li>
    <li><a data-toggle="tab" href="#service">SERVICES</a></li>
    <li><a data-toggle="tab" href="#gallery">GALLERY</a></li>
    <li><a data-toggle="tab" href="#personal">PERSONAL</a></li>
    <li><a data-toggle="tab" href="#properties">SETTINGS</a></li>
    <li><a data-toggle="tab" href="#discount">DISCOUNTS</a></li>
  </ul>
  <ul class="d-flex d-lg-none nav nav-tabs" style="font-size: 21.5px;">
    <li class="active"><a data-toggle="tab" href="#generalinformation" class="active"><i class="fa-solid fa-circle-info"></i></a></li>
    <li><a data-toggle="tab" href="#workinginfo"><i class="fa-solid fa-calendar-check"></i></a></li>
    <li><a data-toggle="tab" href="#service"><i class="fa-solid fa-scissors"></i></a></li>
    <li><a data-toggle="tab" href="#gallery"><i class="fa-solid fa-images"></i></a></li>
    <li><a data-toggle="tab" href="#personal"><i class="fa-solid fa-user-tie"></i></a></li>
    <li><a data-toggle="tab" href="#properties"><i class="fa-solid fa-gears"></i></a></li>
    <li><a data-toggle="tab" href="#discount"><i class="fa-solid fa-percent"></i></a></li>
  </ul>

  <div v-show="isLoading" class="loader"></div>
  <div class="tab-content" v-show="!isLoading">
    <div id="generalinformation" class="tab-pane fade in active show">
        <form>
            <div class="form-row">
                <div class="form-group col-md-4">
                    <label for="name">Name</label>
                    <input type="text" v-model="business.name" class="form-control" id="name" placeholder="X Hair Studio">
                </div>
                <div class="form-group col-md-4">
                    <label for="telephone">Telephone</label>
                    <input type="text" v-model="business.telephone" class="form-control" id="telephone" placeholder="+905000000000">
                </div>
                <div class="form-group col-md-4">
                    <label for="email">E-Mail</label>
                    <input type="email" v-model="business.email" class="form-control" id="email" placeholder="business@gmail.com">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-8">
                    <label for="address">Address</label>
                    <input type="text" v-model="business.address" class="form-control" id="address" style="padding-right:26px">
                    <i class="fa fa-location" style="position: absolute; right:13px; top: 43px; color: #4e73df;" @click="getLocation()"></i>
                </div>
                <div class="form-group col-md-2">
                    <label for="latitude">Latitude</label>
                    <input type="text" v-model="business.latitude" class="form-control" id="latitude">
                </div>
                <div class="form-group col-md-2">
                    <label for="longitude">Longitude</label>
                    <input type="text" v-model="business.longitude" class="form-control" id="longitude">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-4">
                    <label for="city">City</label>
                    <input type="text" v-model="business.city" class="form-control" id="city">
                </div>
                <div class="form-group col-md-4">
                    <label for="province">Province</label>
                    <input type="text" v-model="business.province" class="form-control" id="province">
                </div>
                <div class="form-group col-md-4">
                    <label for="district">District</label>
                    <input type="text" v-model="business.district" class="form-control" id="district">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="description">Description</label>
                    <textarea rows="3" v-model="business.description" class="form-control" id="description"></textarea>
                </div>
                <div class="form-group col-md-6">
                    <label for="descriptionEn">DescriptionEn</label>
                    <textarea rows="3" v-model="business.descriptionEn" class="form-control" id="descriptionEn"></textarea>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-2 ml-4 my-4">
                    <div class="form-check form-switch">
                        <input class="form-check-input" v-model="business.verified" type="checkbox" id="verified">
                        <label class="form-check-label" for="verified">Verified</label>
                    </div>
                </div>
                <div class="form-group col-md-2 ml-4 my-4">
                    <div class="form-check form-switch">
                        <input class="form-check-input" v-model="business.isActive" type="checkbox" id="active">
                        <label class="form-check-label" for="active">Active</label>
                    </div>
                </div>
                <div class="form-group col-md-2 ml-4 my-4">
                    <div class="form-check form-switch">
                        <input class="form-check-input" v-model="business.isFeatured" type="checkbox" id="isfeatured">
                        <label class="form-check-label" for="isfeatured">IsFeatured</label>
                    </div>
                </div>
                <div class="form-group ml-4 my-4">
                    <div class="form-check form-switch">
                        <input class="form-check-input" v-model="business.hasPromotion" type="checkbox" id="haspromotion">
                        <label class="form-check-label" for="haspromotion">HasPromotion</label>
                    </div>
                </div>
                <div class="form-group col-md-12">
                    <div v-show="saveLoading" class="loader"></div>
                    <a class="btn btn-primary d-md-block d-none float-right px-3" v-if="!saveLoading" style="margin-top: -57px; width: 20%;" @click="saveBusinessInfo()">Save</a>
                    <a class="btn btn-primary d-md-none d-block float-right py-2" v-if="!saveLoading" style="width: 100%;" @click="saveBusinessInfo()">Save</a>
                </div>
            </div>
        </form>
    </div>
    <div id="workinginfo" class="tab-pane fade">
        <form>
            <div class="form-group row">
                <div class="col-md-2">
                    <div class="form-check form-switch ml-4 mt-1 col-sm-12">
                        &nbsp;&nbsp;<input class="form-check-input" v-model="workingInfo.mondayOpen" type="checkbox"> Monday 
                    </div>
                    <div class="col-sm-12">
                        <input type="time" class="form-control" v-if="workingInfo.mondayOpen" v-model="workingInfo.mondayStartHour">
                        <input type="time" class="form-control" v-else disabled>
                    </div>
                    <div class="col-sm-12">
                        <input type="time" class="form-control" v-if="workingInfo.mondayOpen" v-model="workingInfo.mondayEndHour">
                        <input type="time" class="form-control" v-else disabled>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="form-check form-switch ml-4 mt-1 col-sm-12">
                        &nbsp;&nbsp;<input class="form-check-input" v-model="workingInfo.tuesdayOpen" type="checkbox"> Tuesday 
                    </div>
                    <div class="col-sm-12">
                        <input type="time" class="form-control" v-if="workingInfo.tuesdayOpen" v-model="workingInfo.tuesdayStartHour">
                        <input type="time" class="form-control" v-else disabled>
                    </div>
                    <div class="col-sm-12">
                        <input type="time" class="form-control" v-if="workingInfo.tuesdayOpen" v-model="workingInfo.tuesdayEndHour">
                        <input type="time" class="form-control" v-else disabled>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="form-check form-switch ml-4 mt-1 col-sm-12">
                        &nbsp;&nbsp;<input class="form-check-input" v-model="workingInfo.wednesdayOpen" type="checkbox"> Wednesday 
                    </div>
                    <div class="col-sm-12">
                        <input type="time" class="form-control" v-if="workingInfo.wednesdayOpen" v-model="workingInfo.wednesdayStartHour">
                        <input type="time" class="form-control" v-else disabled>
                    </div>
                    <div class="col-sm-12">
                        <input type="time" class="form-control" v-if="workingInfo.wednesdayOpen" v-model="workingInfo.wednesdayEndHour">
                        <input type="time" class="form-control" v-else disabled>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="form-check form-switch ml-4 mt-1 col-sm-12">
                        &nbsp;&nbsp;<input class="form-check-input" v-model="workingInfo.thursdayOpen" type="checkbox"> Thursday 
                    </div>
                    <div class="col-sm-12">
                        <input type="time" class="form-control" v-if="workingInfo.thursdayOpen" v-model="workingInfo.thursdayStartHour">
                        <input type="time" class="form-control" v-else disabled>
                    </div>
                    <div class="col-sm-12">
                        <input type="time" class="form-control" v-if="workingInfo.thursdayOpen" v-model="workingInfo.thursdayEndHour">
                        <input type="time" class="form-control" v-else disabled>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="form-check form-switch ml-4 mt-1 col-sm-12">
                        &nbsp;&nbsp;<input class="form-check-input" v-model="workingInfo.fridayOpen" type="checkbox"> Friday 
                    </div>
                    <div class="col-sm-12">
                        <input type="time" class="form-control" v-if="workingInfo.fridayOpen" v-model="workingInfo.fridayStartHour">
                        <input type="time" class="form-control" v-else disabled>
                    </div>
                    <div class="col-sm-12">
                        <input type="time" class="form-control" v-if="workingInfo.fridayOpen" v-model="workingInfo.fridayEndHour">
                        <input type="time" class="form-control" v-else disabled>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="form-check form-switch ml-4 mt-1 col-sm-12">
                        &nbsp;&nbsp;<input class="form-check-input" v-model="workingInfo.saturdayOpen" type="checkbox"> Saturday 
                    </div>
                    <div class="col-sm-12">
                        <input type="time" class="form-control" v-if="workingInfo.saturdayOpen" v-model="workingInfo.saturdayStartHour">
                        <input type="time" class="form-control" v-else disabled>
                    </div>
                    <div class="col-sm-12">
                        <input type="time" class="form-control" v-if="workingInfo.saturdayOpen" v-model="workingInfo.saturdayEndHour">
                        <input type="time" class="form-control" v-else disabled>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="form-check form-switch ml-4 mt-1 col-sm-12">
                        &nbsp;&nbsp;<input class="form-check-input" v-model="workingInfo.sundayOpen" type="checkbox"> Sunday 
                    </div>
                    <div class="col-sm-12">
                        <input type="time" class="form-control" v-if="workingInfo.sundayOpen" v-model="workingInfo.sundayStartHour">
                        <input type="time" class="form-control" v-else disabled>
                    </div>
                    <div class="col-sm-12">
                        <input type="time" class="form-control" v-if="workingInfo.sundayOpen" v-model="workingInfo.sundayEndHour">
                        <input type="time" class="form-control" v-else disabled>
                    </div>
                </div>
                <div class="form-group col-md-2 mt-4">
                    <label for="appointmentTimeInterval">Time Interval</label>
                    <input type="number" v-model="business.appointmentTimeInterval" class="form-control" id="appointmentTimeInterval">
                </div>
                <div class="form-group col-md-2 mt-4">
                    <label for="appointmentPeopleCount">People Count</label>
                    <input type="number" v-model="business.appointmentPeopleCount" class="form-control" id="appointmentPeopleCount">
                </div>
                <div class="form-group col-md-2 mt-4">
                    <label for="workingGenderType">Gender Type</label>
                    <select v-model="business.workingGenderType" class="form-control" id="workingGenderType">
                        <option value="0" selected>Everyone</option>
                        <option value="1">Female Only</option>
                        <option value="2">Male Only</option>
                    </select>
                </div>
                <div class="form-group col-md-3 ml-4" style="margin-top: 60px;">
                    <div class="form-check form-switch">                       
                        <input class="form-check-input" v-model="business.officialHolidayAvailable" type="checkbox" id="officialHolidayAvailable">
                        <label class="form-check-label" for="officialHolidayAvailable">Official Holiday Available</label>
                    </div>
                </div>
                <div class="form-group col-md-12">
                    <div v-show="saveLoading" class="loader"></div>
                    <a class="btn btn-primary d-md-block d-none float-right px-3" v-if="!saveLoading" @click="saveBusinessWorkingInfo()" style="margin-top: -57px;">Save</a>
                    <a class="btn btn-primary d-md-none d-block float-right py-2" v-if="!saveLoading" @click="saveBusinessWorkingInfo()" style="width: 100%;">Save</a>
                </div>
            </div>
        </form>
    </div>
    <div id="service" class="tab-pane fade">
        <div class="table-responsive">
            <table class="table table-sm table-bordered table-striped">
                <thead>
                    <tr>
                        <th>Service</th>
                        <th>Name</th>
                        <th>NameEn</th>
                        <th>Duration</th>
                        <th>Price</th>
                        <th style="width:40px"><a class="btn btn-success btn-user btn-block" @click="editService = {}" data-toggle="modal" data-target="#editServiceModal"><i class="fa-solid fa-plus"></i></a></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in this.business.services" :key="item.id">
                        <td class="text-center align-middle">{{ services.find(x => x.id == item.serviceId).nameEn }}</td>
                        <td class="text-center align-middle">{{ item.name }}</td>
                        <td class="text-center align-middle">{{ item.nameEn }}</td>
                        <td class="text-center align-middle">{{ item.minDuration }}{{ item.maxDuration > item.minDuration ? ' - ' + item.maxDuration : '' }} min</td>
                        <td class="text-center align-middle">{{ item.price }} ₺</td>
                        <td class="text-center align-middle">
                            <a style="color: #FFBF00;" class="nav-link" @click="editService = item" data-toggle="modal" data-target="#editServiceModal">
                                <i class="fa-solid fa-edit"></i>
                            </a>
                            <a style="color: #DE3163;" class="nav-link" @click="deleteService(item.id)">
                                <i class="fa-solid fa-trash"></i>
                           </a>                                
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="modal fade" id="editServiceModal" tabindex="-1" role="dialog" aria-labelledby="editServiceModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="editServiceModalLabel">{{ editService.id != null ? 'Edit' : 'Add' }} Service</h5>
                        <a type="a" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </a>
                    </div>
                    <div class="modal-body">
                        <div class="form-group row">
                            <div class="col-md-12">
                                <label for="service">Service</label>
                                <ModelListSelect
                                    :list="this.services"
                                    v-model="editService.serviceId"
                                    option-value="id"
                                    option-text="nameEn"
                                    id="serviceId"
                                    placeholder="Select Service">
                                </ModelListSelect>                      
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-md-6">
                                <label for="name">Name</label>
                                <input type="text" v-model="editService.name" class="form-control" id="name">
                            </div>
                            <div class="col-md-6">
                                <label for="nameEn">NameEn</label>
                                <input type="text" v-model="editService.nameEn" class="form-control" id="nameEn">
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-md-12">
                                <label for="spot">Spot</label>
                                <textarea v-model="editService.spot" class="form-control" id="spot"></textarea>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-md-12">
                                <label for="spotEn">SpotEn</label>
                                <textarea v-model="editService.spotEn" class="form-control" id="spotEn"></textarea>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-md-4">
                                <label for="minDuration">Min Duration</label>
                                <input type="number" v-model="editService.minDuration"  class="form-control" id="minDuration">
                            </div>
                            <div class="col-md-4">
                                <label for="maxDuration">Max Duration</label>
                                <input type="number" v-model="editService.maxDuration" class="form-control" id="maxDuration">
                            </div>
                            <div class="col-md-4">
                                <label for="price">Price</label>
                                <input type="number" v-model="editService.price" class="form-control" id="price">
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <div v-show="saveLoading" class="loader"></div>
                        <a v-if="editService.id == null && !saveLoading" class="btn btn-primary" @click="saveService()">Save</a>
                        <a v-else-if="editService.id != null && !saveLoading" class="btn btn-warning" @click="saveService()">Update</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="gallery" class="tab-pane fade">
        <div class="row">
            <div v-for="item in this.business.galleries" :key="item.id" class="col-md-3 mt-1 mb-2">
                <a class="btn btn-danger" @click="deleteGallery(item.id)"  style="width: 30px; height:30px; border-radius:50%; position: absolute; right: 18px; top: 38px; text-align: center; padding: 5px; font-size: 14px; color: #fff;">
                    <i class="fa fa-trash"></i>
                </a>
                <a @click="editGallery = item" class="btn btn-warning"  style="width: 30px; height:30px; border-radius:50%; position: absolute; right: 18px; top: 5px; text-align: center; padding: 5px; font-size: 14px; color: #fff;" data-toggle="modal" data-target="#editGalleryModal">
                    <i class="fa fa-edit"></i>
                </a>
                <div v-if="item.isProfilePhoto" title="Profile Photo" alt="Profile Photo" style="width: 65px; height:35px; background: #becd36; border-radius:5px; opacity: 0.7; position: absolute; right: 18px; bottom: 5px; text-align: center; padding: 6px; color: #fff;">
                    <i class="fa-solid fa-image"></i> PP
                </div>
                <div v-if="item.isSliderPhoto" title="Slider Photo" alt="Slider Photo" style="width: 65px; height:35px; background: #becd36; border-radius:5px; opacity: 0.7; position: absolute; left: 18px; bottom: 5px; text-align: center; padding: 6px; color: #fff;">
                    <i class="fa-solid fa-image"></i> SP
                </div>
                <img :src="item.imageUrl" style="width: 100%; border-radius: 5px; aspect-ratio:16/9; object-fit:cover;" loading="lazy" decoding="async" class="thumbnail">
            </div>
            <div class="col-md-12">
                <a class="btn btn-success d-md-block d-none float-right px-3 py-1" @click="editGallery = {}" data-toggle="modal" data-target="#editGalleryModal"><i class="fa-solid fa-plus"></i></a>
                <a class="btn btn-success d-md-none d-block float-right py-2" @click="editGallery = {}" style="width: 100%;" data-toggle="modal" data-target="#editGalleryModal">ADD IMAGE</a>
            </div>
        </div>
        <div class="modal fade" id="editGalleryModal" tabindex="-1" role="dialog" aria-labelledby="editGalleryModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="editGalleryModalLabel">Add Image</h5>
                        <a type="a" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </a>
                    </div>
                    <div class="modal-body">
                        <div class="col-md-12">
                            <div v-if="editGallery.imageUrl == null" style="display: inline-block; width: 100%; height: 300px; background: #323233;"></div>
                            <img v-else style="width:100%; height: 300px; display:inline-block; border-radius: 5px; aspect-ratio:16/9; object-fit:cover;" loading="lazy" decoding="async" :src="this.editGallery.imageUrl" />

                            <input v-if="editGallery.id == null" class="file-upload mt-3" ref="file" type="file" accept="image/*" @change="previewFiles"/>
                        </div>
                   
                        <div class="form-group col-md-12 mt-3">
                            <label for="sortOrder">Sort Order</label>                  
                            <input type="number" class="form-control" v-model="editGallery.sortOrder" id="sortOrder">
                        </div>

                        <div v-if="!this.profilePhotoAvailable" class="form-group col-md-5 ml-4">
                            <div class="form-check form-switch">                       
                                <input class="form-check-input" v-model="editGallery.isProfilePhoto" type="checkbox" id="isProfilePhoto">
                                <label class="form-check-label" for="isProfilePhoto">Profile Photo</label>
                            </div>
                        </div>
                        <div class="form-group col-md-5 ml-4">
                            <div class="form-check form-switch">                       
                                <input class="form-check-input" v-model="editGallery.isSliderPhoto" type="checkbox" id="isSliderPhoto">
                                <label class="form-check-label" for="isSliderPhoto">Slider Photo</label>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <div v-show="saveLoading" class="loader"></div>
                        <a @click="saveGallery()" v-if="editGallery.id == null && editGallery.imageUrl != null && !saveLoading" class="btn btn-primary">Save</a>
                        <a @click="saveGallery()" v-else-if="editGallery.imageUrl != null && !saveLoading" class="btn btn-warning">Update</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="personal" class="tab-pane fade">
        <div class="row">
            <div v-for="item in this.business.workers" :key="item.id" class="col-md-3 mt-1 mb-2">
                <div class="personal-card" style="height: auto; display: block; background: #fff; border-radius: 5px;">
                    <div class="thumbnail">
                        <img :src="item.path" style="width: 100%; height: auto; object-fit: cover; border-top-right-radius: 5px; border-top-left-radius: 5px;" loading="lazy" decoding="async">
                    </div>
                    <div class="personal-info" style="height: 70px; padding: 10px;">
                        <strong>{{ item.name }}</strong> - <i>{{ item.title }}</i><br>
                        <small> {{ getBusinessServiceNames(item.serviceIds) }}</small>
                    </div>
                </div>
                <a @click="item.serviceIdList = item.serviceIds.split(';'); editWorker = item" class="btn btn-warning" style="width: 30px; height:30px; border-radius:50%; position: absolute; right: 18px; top: 5px; text-align: center; padding: 5px; font-size: 14px; color: #fff;" data-toggle="modal" data-target="#editPersonalModal">
                    <i class="fa fa-edit"></i>
                </a>
                <a @click="deleteWorker(item.id)" class="btn btn-danger" style="width: 30px; height:30px; border-radius:50%; position: absolute; right: 18px; top: 38px; text-align: center; padding: 5px; font-size: 14px; color: #fff;">
                    <i class="fa fa-trash"></i>
                </a>
            </div>
            <div class="col-md-12">
                <a class="btn btn-success d-md-block d-none float-right px-3 py-1" @click="editWorker = {}" data-toggle="modal" data-target="#editPersonalModal"><i class="fa-solid fa-plus"></i></a>
                <a class="btn btn-success d-md-none d-block float-right py-2" @click="editWorker = {}" style="width: 100%;" data-toggle="modal" data-target="#editPersonalModal">ADD PERSONAL</a>
            </div>
        </div>
        <div class="modal fade" id="editPersonalModal" tabindex="-1" role="dialog" aria-labelledby="editPersonalModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="editPersonalModalLabel">{{ editWorker.id != null ? 'Edit' : 'Add' }} Personal</h5>
                        <a type="a" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </a>
                    </div>
                    <div class="modal-body">
                        <div style="width: 150px; height:150px; border-radius: 100%; overflow: auto; margin: 0 auto; position: relative; background: #ddd; text-align: center;">
                            <i v-if="this.editWorker.path == null" style="display: inline-block; font-size:80px; padding-top: 35px;" class="fa-solid fa-user"></i>
                            <img v-else width="150" height="150" style="width:150px; height: 150px; object-fit:cover; display:inline-block" :src="this.editWorker.path" />
                        </div>
                        <a class="btn btn-primary" v-if="file2 != null" @click="fileUpload" style="width: 30px; height:30px; border-radius:50%; position: absolute; right: 35%; top: 120px; text-align: center; padding: 5px; font-size: 14px; color: #fff;">
                            <i class="fa-solid fa-upload"></i>
                        </a>
                        <input class="file-upload mt-3" ref="file2" type="file" accept="image/*" @change="previewFiles2"/>
                        <div class="form-group row mt-2">
                            <div class="col-md-12">
                                <label for="service">Services</label>
                                <select multiple class="form-control" v-model="editWorker.serviceIdList">
                                    <option v-for="item in this.business.services" :key="item.id" :value="item.id">
                                        {{ item.nameEn }}
                                    </option>
                                </select>              
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-md-6">
                                <label for="name">Name</label>
                                <input type="text" v-model="editWorker.name" class="form-control" id="name">
                            </div>
                            <div class="col-md-6">
                                <label for="title">Title</label>
                                <input type="text" v-model="editWorker.title" class="form-control" id="title">
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-md-8">
                                <label for="path">Path</label>
                                <input type="text" v-model="editWorker.path" class="form-control" id="path">
                            </div>
                            <div class="col-md-4" v-if="editWorker.id != null">
                                <div class="form-check form-switch ml-4 mt-3">
                                    <input class="form-check-input" v-model="editWorker.isActive" type="checkbox" id="active">
                                    <label class="form-check-label" for="active">Active</label>
                                </div>           
                                <div class="form-check form-switch ml-4 mt-2">
                                    <input class="form-check-input" v-model="editWorker.isAvailable" type="checkbox" id="active">
                                    <label class="form-check-label" for="active">Available</label>
                                </div>                 
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <div v-show="saveLoading" class="loader"></div>
                        <a @click="saveWorker()" v-if="editWorker.id == null && !saveLoading" class="btn btn-primary">Save</a>
                        <a @click="saveWorker()" v-else-if="!saveLoading" class="btn btn-warning">Update</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="properties" class="tab-pane fade">
        <div class="table-responsive">
            <table class="table table-sm table-bordered table-striped">
                <thead>
                    <tr>
                        <th>Key</th>
                        <th>Value</th>
                        <th style="width:40px"><a class="btn btn-success btn-user btn-block" @click="editProperties = {}" data-toggle="modal" data-target="#editPropertiesModal"><i class="fa-solid fa-plus"></i></a></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in this.business.properties" :key="item.id">
                        <td class="text-center align-middle">{{ item.key }}</td>
                        <td class="text-center align-middle">{{ item.value }}</td>
                        <td class="text-center align-middle">
                            <a style="color: #FFBF00;" class="nav-link" @click="editProperties = item" data-toggle="modal" data-target="#editPropertiesModal">
                                <i class="fa-solid fa-edit"></i>
                            </a>
                            <a style="color: #DE3163;" class="nav-link" @click="deleteProperties(item)">
                                <i class="fa-solid fa-trash"></i>
                           </a>                                
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="modal fade" id="editPropertiesModal" tabindex="-1" role="dialog" aria-labelledby="editPropertiesModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="editPropertiesModalLabel">{{ editProperties.id != null ? 'Edit' : 'Add' }} Property</h5>
                        <a type="a" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </a>
                    </div>
                    <div class="modal-body">
                        <div class="form-group row">
                            <div class="col-md-12">
                                <label for="key">Key</label>
                                <input type="text" v-model="editProperties.key" class="form-control" id="key">                 
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-md-12">
                                <label for="value">Value</label>
                                <input type="text" v-model="editProperties.value" class="form-control" id="value">                 
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <div v-show="saveLoading" class="loader"></div>
                        <a v-if="editProperties.id == null && !saveLoading" class="btn btn-primary" @click="saveProperties()">Save</a>
                        <a v-else-if="editProperties.id != null && !saveLoading" class="btn btn-warning" @click="saveProperties()">Update</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="discount" class="tab-pane fade">
        <div class="table-responsive">
            <table class="table table-sm table-bordered table-striped">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>DescriptionEn</th>
                        <th>Rate</th>
                        <th>Type</th>
                        <th>Services</th>
                        <th>Active</th>
                        <th>Color</th>
                        <th style="width:40px"><a class="btn btn-success btn-user btn-block" @click="editDiscount = {}" data-toggle="modal" data-target="#editDiscountModal"><i class="fa-solid fa-plus"></i></a></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in this.business.discounts" :key="item.id">
                        <td class="text-center align-middle">{{ item.description }}</td>
                        <td class="text-center align-middle">{{ item.descriptionEn }}</td>
                        <td class="text-center align-middle">%{{ item.rate }}</td>
                        <td class="text-center align-middle">{{ getDiscountTypeString(item.type) }}</td>
                        <td class="text-center align-middle">{{ getServiceNames(item.serviceIds) }}</td>
                        <td class="text-center align-middle">{{ item.isActive ? "YES" : "NO" }}</td>
                        <td class="text-center align-middle"><span style="padding: 5px; color: #fff;" :style="{backgroundColor: item.colorCode }">{{ item.colorCode }}</span></td>
                        <td class="text-center align-middle">
                            <a style="color: #FFBF00;" class="nav-link" @click="item.serviceIdList = item.serviceIds.split(';'); editDiscount = item" data-toggle="modal" data-target="#editDiscountModal">
                                <i class="fa-solid fa-edit"></i>
                            </a>
                            <a style="color: #DE3163;" class="nav-link" @click="deleteDiscount(item.id)">
                                <i class="fa-solid fa-trash"></i>
                           </a>                                
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="modal fade" id="editDiscountModal" tabindex="-1" role="dialog" aria-labelledby="editDiscountModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="editDiscountModalLabel">{{ editDiscount.id != null ? 'Edit' : 'Add' }} Discount</h5>
                        <a type="a" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </a>
                    </div>
                    <div class="modal-body">
                        <div class="form-group row">
                            <div class="col-md-6">
                                <label for="type">Type</label>
                                <select class="form-control" v-model="editDiscount.type">
                                    <option value="0">All Days</option>
                                    <option value="1">Week Days</option>
                                    <option value="2">Week End</option>
                                </select>
                            </div>
                            <div class="col-md-6">
                                <label for="rate">Rate</label>
                                <input class="form-control" type="number" v-model="editDiscount.rate" min="1" max="100" id="rate">
                            </div>
                        </div>
                        <div class="form-group row">
                        <div class="col-md-12">
                                <label for="service">Services</label>
                                <select multiple class="form-control" v-model="editDiscount.serviceIdList">
                                    <option v-for="item in this.services" :key="item.id" :value="item.id">
                                        {{ item.nameEn }}
                                    </option>
                                </select>              
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-md-12">
                                <label for="description">Description</label>
                                <textarea v-model="editDiscount.description" class="form-control" id="description"></textarea>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-md-12">
                                <label for="descriptionEn">DescriptionEn</label>
                                <textarea v-model="editDiscount.descriptionEn" class="form-control" id="descriptionEn"></textarea>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-md-10">
                                    <input type="text" class="form-control" id="colorCode" v-model="editDiscount.colorCode">
                                </div>
                                <div class="col-md-2">
                                    <input type="color" :style="{backgroundColor : `${editDiscount.colorCode}`}" v-model="editDiscount.colorCode" class="form-control">
                                </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-md-4 mx-4">
                                <div class="form-check form-switch">
                                    <input class="form-check-input" v-model="editDiscount.isActive" type="checkbox" id="isActive">
                                    <label class="form-check-label" for="isActive">Active</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <div v-show="saveLoading" class="loader"></div>
                        <a v-if="editDiscount.id == null && !saveLoading" class="btn btn-primary" @click="saveDiscount()">Save</a>
                        <a v-else-if="editDiscount.id != null && !saveLoading" class="btn btn-warning" @click="saveDiscount()">Update</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from 'vuex';

export default {
  data () {
    return {
      business : {},
      workingInfo: {
        mondayStartHour : null,
        mondayEndHour : null,
        mondayOpen : true,
        tuesdayStartHour : null,
        tuesdayEndHour : null,
        tuesdayOpen : true,
        wednesdayStartHour : null,
        wednesdayEndHour : null,
        wednesdayOpen : true,
        thursdayStartHour : null,
        thursdayEndHour : null,
        thursdayOpen : true,
        fridayStartHour : null,
        fridayEndHour : null,
        fridayOpen : true,
        saturdayStartHour : null,
        saturdayEndHour : null,
        saturdayOpen : true,
        sundayStartHour : null,
        sundayEndHour : null,
        sundayOpen : true,
        appointmentTimeInterval : 0,
        appointmentPeopleCount : 0,
        workingGenderType : 0,
        officialHolidayAvailable : true
      },
      editService: {},
      editDiscount: {},
      worker: {
        id: null,
        name: null,
        title: null,
        path: null,
        serviceIdList: null,
        serviceIds: null,
        isActive: true,
        isAvailable: true
      },
      editWorker: {},
      editProperties: {},
      editGallery: {},
      services: [],
      file: null,
      file2: null,
      isLoading: true,
      saveLoading: false,
      serviceIds: null
    }
  }, 
  created() {
    this.getServices();
    this.getBusiness(this.$route.params.id);
  },
  methods: {
        async getServices()
        {
            await this.$appAxios.post("/service/getall").then(response => {
                this.services = response.data.data;
            }).catch(e => { alert(e.message); });
        },
        async getBusiness(id)
        {
            await this.$appAxios.post("/business/getbyid", id, {headers: { 'Authorization': `Bearer ${this._token}`}}).then(response => {
                this.business = response.data.data;
                if(this.business.workingInfos != null && this.business.workingInfos.length > 0)
                {
                    this.setWorkingInput(this.business.workingInfos[0]);
                }

                this.isLoading = false;
            }).catch(e => { alert(e.message); this.$router.push({ path: "/businesses" }); });
        },
        async fileUpload() {
            this.saveLoading = true;

            const formData = new FormData();
            formData.append("file", this.file2)

            await this.$appAxios.post("/admin/uploadfile", formData, { headers: { "Authorization": `Bearer ${this._token}`, "Content-Type": "multipart/form-data" } }).then(response => {
                this.saveLoading = false;
                var response = response.data;

                if(response.hasError)
                {
                    this.hasError = true;
                    alert(response.message);
                }
                else{
                    this.editWorker.path = response.data;
                    this.file2 = null;
                }  
                    
                }).catch(e => {alert("Error : " + e.message); this.saveLoading = false; });
        },
        async saveBusinessInfo()
        {
            this.saveLoading = true;
            await this.$appAxios.post("/business/update", this.business, {headers: { 'Authorization': `Bearer ${this._token}`}}).then(response => {
                this.saveLoading = false;
                alert(response.data.message);
            }).catch(e => { alert(e.message); });
        },
        async saveBusinessWorkingInfo()
        {
            this.saveLoading = true;
            await this.$appAxios.post("/business/saveworkinginfo", this.workingInfoRequestObject, {headers: { 'Authorization': `Bearer ${this._token}`}}).then(response => {
                this.saveLoading = false;
                alert(response.data.message);
            }).catch(e => { alert(e.message); });
        },
        async saveService()
        {
            this.saveLoading = true;
            var isSave = this.editService.id == null;

            var requestUrl = isSave ? "/businessservice/save" : "/businessservice/update";
            
            if(isSave)
            {
                this.editService.id = "00000000-0000-0000-0000-000000000000"
            }
                
            this.editService.businessId = this.business.id;

            await this.$appAxios.post(requestUrl, this.editService, {headers: { 'Authorization': `Bearer ${this._token}`}}).then(response => {

                if(isSave)
                {
                    this.business.services.push(response.data.data);
                }
                else 
                {
                    var index = this.business.services.indexOf(x => x.id == this.editService.id);
                    this.business.services.splice(index, response.data.data);
                }

                $("#editServiceModal").modal("hide");
                this.saveLoading = false;
                alert(response.data.message);

            }).catch(e => { alert(e.message); this.saveLoading = false; });
        },
        async deleteService(id)
        {
            if(confirm("Do you want to delete the record?!"))
            {
                await this.$appAxios.post("/businessservice/delete", id, {headers: { 'Authorization': `Bearer ${this._token}`}}).then(response => {
                    this.saveLoading = false;
                    alert(response.data.message);
                    this.business.services = this.business.services.filter(x => x.id != id);
                }).catch(e => { alert(e.message); this.saveLoading = false; });
            }
        },
        async saveGallery()
        {
            this.saveLoading = true;
            var isSave = this.editGallery.id == null;

            var requestUrl = isSave ? "/business/addGalleryPhoto" : "/business/updateGalleryPhoto";

            if(isSave)
            {
                const formData = new FormData();
                formData.append("file", this.file);
                formData.append("businessId", this.business.id);
                formData.append("isProfilePhoto", this.editGallery.isProfilePhoto == undefined ? false : this.editGallery.isProfilePhoto);
                formData.append("isSliderPhoto", this.editGallery.isSliderPhoto == undefined ? false : this.editGallery.isSliderPhoto);

                await this.$appAxios.post(requestUrl, formData, { headers: { "Authorization": `Bearer ${this._token}`, "Content-Type": "multipart/form-data" } }).then(response => {
                    
                    $("#editGalleryModal").modal("hide");
                    this.saveLoading = false;
                    alert(response.data.message);
                    this.business.galleries.push(response.data.data);

                }).catch(e => { alert(e.message); this.saveLoading = false; });
            }
            else
            {
                await this.$appAxios.post(requestUrl, this.editGallery, { headers: { "Authorization": `Bearer ${this._token}`} }).then(response => {
                    
                    $("#editGalleryModal").modal("hide");
                    this.saveLoading = false;
                    alert(response.data.message);

                }).catch(e => { alert(e.message); this.saveLoading = false; });
            }
        },
        async deleteGallery(id)
        {
            if(confirm("Do you want to delete the record?!"))
            {
                await this.$appAxios.post("/business/deletegalleryphoto", id, {headers: { 'Authorization': `Bearer ${this._token}`}}).then(response => {
                    this.saveLoading = false;
                    alert(response.data.message);
                    this.business.galleries = this.business.galleries.filter(x => x.id != id);
                }).catch(e => { alert(e.message); this.saveLoading = false; });
            }
        },
        async saveWorker()
        {
            this.saveLoading = true;
            var isSave = this.editWorker.id == null;

            var requestUrl = isSave ? "/worker/save" : "/worker/update";
            
            if(isSave)
            {
                this.editWorker.id = "00000000-0000-0000-0000-000000000000"
            }
               
            this.editWorker.serviceIds = this.editWorker.serviceIdList.join(";");
            this.editWorker.businessId = this.business.id;

            await this.$appAxios.post(requestUrl, this.editWorker, {headers: { 'Authorization': `Bearer ${this._token}`}}).then(response => {

                if(isSave)
                {
                    this.business.workers.push(response.data.data);
                }
                else 
                {
                    var index = this.business.workers.indexOf(x => x.id == this.workers.id);
                    this.business.workers.splice(index, response.data.data);
                }

                $("#editPersonalModal").modal("hide");
                this.saveLoading = false;
                alert(response.data.message);

            }).catch(e => { alert(e.message); this.saveLoading = false; });
        },
        async deleteWorker(id)
        {
            if(confirm("Do you want to delete the record?!"))
            {
                await this.$appAxios.post("/worker/delete", id, {headers: { 'Authorization': `Bearer ${this._token}`}}).then(response => {
                    this.saveLoading = false;
                    alert(response.data.message);
                    this.business.workers = this.business.workers.filter(x => x.id != id);
                }).catch(e => { alert(e.message); this.saveLoading = false; });
            }
        },
        async getLocation()
        {
            var key = 'AIzaSyDVdQrZ7hQwIY2McHPDDQjjGYXumxrylxI';
            await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.business.address}&key=${key}`).then(response => {
                var data = response.data;
                if(data.status == "OK" && data.results.length > 0)
                {
                    data = data.results[0];

                    data.address_components.forEach(item => {
                        if(item.types.includes("administrative_area_level_4")) this.business.district = item.long_name;
                        if(item.types.includes("administrative_area_level_2")) this.business.province = item.long_name;
                        if(item.types.includes("administrative_area_level_1")) this.business.city = item.long_name;
                    });

                    this.business.latitude = data.geometry.location.lat;
                    this.business.longitude = data.geometry.location.lng;
                }
                else
                {
                    alert("Address is not found...");
                }

            }).catch(e => { alert("Error : " + e.message); });
        },
        async saveProperties()
        {
            this.saveLoading = true;
            var isSave = this.editProperties.id == null;

            var requestUrl = isSave ? "/businessproperties/save" : "/businessproperties/update";
            
            if(isSave)
            {
                this.editProperties.id = "00000000-0000-0000-0000-000000000000"
            }
                
            this.editProperties.businessId = this.business.id;

            await this.$appAxios.post(requestUrl, this.editProperties, {headers: { 'Authorization': `Bearer ${this._token}`}}).then(response => {

                if(isSave)
                {
                    this.business.properties.push(response.data.data);
                }
                else 
                {
                    var index = this.business.properties.indexOf(x => x.id == this.editService.id);
                    this.business.properties.splice(index, response.data.data);
                }

                $("#editPropertiesModal").modal("hide");
                this.saveLoading = false;
                alert(response.data.message);

            }).catch(e => { alert(e.message); this.saveLoading = false; });
        },
        async deleteProperties(item)
        {
            if(confirm("Do you want to delete the record?!"))
            {
                await this.$appAxios.post("/businessproperties/delete", item, {headers: { 'Authorization': `Bearer ${this._token}`}}).then(response => {
                    this.saveLoading = false;
                    alert(response.data.message);
                    this.business.properties = this.business.properties.filter(x => x.id != item.id);
                }).catch(e => { alert(e.message); this.saveLoading = false; });
            }
        },
        setWorkingInput(workingInfo)
        {
            console.log(workingInfo);
            if(workingInfo.mondayWorkHours == null)
            {
                this.workingInfo.mondayOpen = false;
                this.workingInfo.mondayStartHour = null;
                this.workingInfo.mondayEndHour = null;
            }
            else
            {
                this.workingInfo.mondayOpen = true;
                this.workingInfo.mondayStartHour = workingInfo.mondayWorkHours.split('-')[0];
                this.workingInfo.mondayEndHour = workingInfo.mondayWorkHours.split('-')[1];
            }

            if(workingInfo.tuesdayWorkHours == null)
            {
                this.workingInfo.tuesdayOpen = false;
                this.workingInfo.tuesdayStartHour = null;
                this.workingInfo.tuesdayEndHour = null;
            }
            else
            {
                this.workingInfo.tuesdayOpen = true;
                this.workingInfo.tuesdayStartHour = workingInfo.tuesdayWorkHours.split('-')[0];
                this.workingInfo.tuesdayEndHour = workingInfo.tuesdayWorkHours.split('-')[1];
            }

            if(workingInfo.wednesdayWorkHours == null)
            {
                this.workingInfo.wednesdayOpen = false;
                this.workingInfo.wednesdayStartHour = null;
                this.workingInfo.wednesdayEndHour = null;
            }
            else
            {
                this.workingInfo.wednesdayOpen = true;
                this.workingInfo.wednesdayStartHour = workingInfo.wednesdayWorkHours.split('-')[0];
                this.workingInfo.wednesdayEndHour = workingInfo.wednesdayWorkHours.split('-')[1];
            }

            if(workingInfo.thursdayWorkHours == null)
            {
                this.workingInfo.thursdayOpen = false;
                this.workingInfo.thursdayStartHour = null;
                this.workingInfo.thursdayEndHour = null;
            }
            else
            {
                this.workingInfo.thursdayOpen = true;
                this.workingInfo.thursdayStartHour = workingInfo.thursdayWorkHours.split('-')[0];
                this.workingInfo.thursdayEndHour = workingInfo.thursdayWorkHours.split('-')[1];
            }

            if(workingInfo.fridayWorkHours == null)
            {
                this.workingInfo.fridayOpen = false;
                this.workingInfo.fridayStartHour = null;
                this.workingInfo.fridayEndHour = null;
            }
            else
            {
                this.workingInfo.fridayOpen = true;
                this.workingInfo.fridayStartHour = workingInfo.fridayWorkHours.split('-')[0];
                this.workingInfo.fridayEndHour = workingInfo.fridayWorkHours.split('-')[1];
            }

            if(workingInfo.saturdayWorkHours == null)
            {
                this.workingInfo.saturdayOpen = false;
                this.workingInfo.saturdayStartHour = null;
                this.workingInfo.saturdayEndHour = null;
            }
            else
            {
                this.workingInfo.saturdayOpen = true;
                this.workingInfo.saturdayStartHour = workingInfo.saturdayWorkHours.split('-')[0];
                this.workingInfo.saturdayEndHour = workingInfo.saturdayWorkHours.split('-')[1];
            }

            if(workingInfo.sundayWorkHours == null)
            {
                this.workingInfo.sundayOpen = false;
                this.workingInfo.sundayStartHour = null;
                this.workingInfo.sundayEndHour = null;
            }
            else
            {
                this.workingInfo.sundayOpen = true;
                this.workingInfo.sundayStartHour = workingInfo.sundayWorkHours.split('-')[0];
                this.workingInfo.sundayEndHour = workingInfo.sundayWorkHours.split('-')[1];
            }
        },
        previewFiles() {
            this.file = this.$refs.file.files[0];
            var reader = new FileReader();
            reader.readAsDataURL(this.file);
            reader.onload = function (e) {
                this.editGallery.imageUrl = e.target.result;
            }.bind(this);
        },
        previewFiles2() {
            this.file2 = this.$refs.file2.files[0];
            var reader = new FileReader();
            reader.readAsDataURL(this.file2);
            reader.onload = function (e) {
                this.editWorker.path = e.target.result;
            }.bind(this);
        },
        getBusinessServiceNames(serviceIds) {
            if(this.business.services == null || this.business.services.length == 0) return "-";

            if(serviceIds == null || serviceIds == "") return "-";
            
            var retval = "";

            serviceIds.split(";").forEach(id => {

                var service = this.business.services.find(x => x.id.toString() == id);
                retval += service.nameEn;
                retval += ", ";

            });

            return retval.trimEnd(' ').trimEnd(',');
        },
        getServiceNames(serviceIds) {
            if(this.services == null || this.services.length == 0) return "All Services";

            if(serviceIds == null || serviceIds == "") return "All Services";
            
            var retval = "";

            serviceIds.split(";").forEach(id => {
                var service = this.services.find(x => x.id.toString() == id);
                if(service)
                {
                    retval += service.nameEn;
                    retval += ", ";
                }
            });

            return retval.trimEnd(' ').trimEnd(',');
        },
        async saveDiscount()
        {
            this.saveLoading = true;
            var isSave = this.editDiscount.id == null;

            var requestUrl = isSave ? "/discount/save" : "/discount/update";
            
            if(isSave)
            {
                this.editDiscount.id = "00000000-0000-0000-0000-000000000000"
            }
                
            this.editDiscount.businessId = this.business.id;
            this.editDiscount.type = parseInt(this.editDiscount.type);
            this.editDiscount.serviceIds = this.editDiscount.serviceIdList.join(";");

            await this.$appAxios.post(requestUrl, this.editDiscount, {headers: { 'Authorization': `Bearer ${this._token}`}}).then(response => {

                if(isSave)
                {
                    this.business.discounts.push(response.data.data);
                }
                else 
                {
                    var index = this.business.discounts.indexOf(x => x.id == this.editDiscount.id);
                    this.business.discounts.splice(index, response.data.data);
                }

                $("#editDiscountModal").modal("hide");
                this.saveLoading = false;
                alert(response.data.message);

            }).catch(e => { alert(e.message); this.saveLoading = false; });
        },
        async deleteDiscount(id)
        {
            if(confirm("Do you want to delete the record?!"))
            {
                await this.$appAxios.post("/discount/delete", id, {headers: { 'Authorization': `Bearer ${this._token}`}}).then(response => {
                    this.saveLoading = false;
                    alert(response.data.message);
                    this.business.discounts = this.business.discounts.filter(x => x.id != id);
                }).catch(e => { alert(e.message); this.saveLoading = false; });
            }
        },
        getDiscountTypeString(type)
        {
            switch(type)
            {
                case 0 : return "All Days";
                case 1 : return "Week Days";
                case 2 : return  "Week End";
                default : return "All Days";
            }
        }
    },
    computed: {
        ...mapGetters(["_token"]),
        
        workingInfoRequestObject()
        {
            var workingInfoRequestObject = {
                businessId: this.business.id,
                appointmentPeopleCount: this.business.appointmentPeopleCount,
                appointmentTimeInterval: this.business.appointmentTimeInterval,
                officialHolidayAvailable: this.business.officialHolidayAvailable,
                workingGenderType: parseInt(this.business.workingGenderType),
                businessWorkingInfo: {
                    mondayWorkHours: this.workingInfo.mondayOpen ? this.workingInfo.mondayStartHour + "-" + this.workingInfo.mondayEndHour : null,
                    tuesdayWorkHours: this.workingInfo.tuesdayOpen ? this.workingInfo.tuesdayStartHour + "-" + this.workingInfo.tuesdayEndHour : null,
                    wednesdayWorkHours: this.workingInfo.wednesdayOpen ? this.workingInfo.wednesdayStartHour + "-" + this.workingInfo.wednesdayEndHour : null,
                    thursdayWorkHours: this.workingInfo.thursdayOpen ? this.workingInfo.thursdayStartHour + "-" + this.workingInfo.thursdayEndHour : null,
                    fridayWorkHours: this.workingInfo.fridayOpen ? this.workingInfo.fridayStartHour + "-" + this.workingInfo.fridayEndHour : null,
                    saturdayWorkHours: this.workingInfo.saturdayOpen ? this.workingInfo.saturdayStartHour + "-" + this.workingInfo.saturdayEndHour : null,
                    sundayWorkHours: this.workingInfo.sundayOpen ? this.workingInfo.sundayStartHour + "-" + this.workingInfo.sundayEndHour : null,
                }
            }

            return workingInfoRequestObject;
        },
        profilePhotoAvailable()
        {
            if(this.business.galleries == null)
                return false;
               
            if(this.business.galleries.length == 0)
                return false;
            
            return this.business.galleries.find(x => x.isProfilePhoto === true) != null;
        }
    }
}
</script>