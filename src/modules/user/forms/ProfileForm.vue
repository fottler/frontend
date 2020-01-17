<template>
    <div>
        <list-row class="right bb">
            <label class="left-label">Имя</label>
            <input type="text"
                   class="w-100 pl-50"
                   placeholder="Введите имя"
                   v-model.lazy="name"
                   @keyup.enter="onSubmit">
            <error :text="errors.name"></error>
        </list-row>

        <list-row class="right bb">
            <label class="left-label">Дата рождения</label>
            <input type="date"
                   v-model.lazy="birthday">
            <error :text="errors.birthday"></error>
        </list-row>

        <list-row class="right bb">
            <label class="left-label">Пол</label>

            <input-list :options="options.genders"
                        v-model="gender"
                        name="gender"
                        type="radio"
                        label-class="mr-5"></input-list>
            <error :text="errors.gender"></error>
        </list-row>

        <list-row class="right bb">
            <label class="left-label">Геоданные</label>

            <switcher v-model.lazy="geolocation"></switcher>
            <error :text="errors.geolocation"></error>
        </list-row>

        <list-row class="bb">
            <form-sidebar-switcher title="Предпочтения в еде"
                                   :value="foodString"
                                   @click="showSidebar(sidebar.food_preferences.type)"></form-sidebar-switcher>
            <error :text="errors.food_preferences"></error>
        </list-row>

        <list-row class="bb">
            <label>Предпочтения в напитках</label>

            <div>
                <input-list :options="options.drinks"
                            v-model="drink_preferences"
                            name="drink_preferences"
                            type="checkbox"
                            label-class="mr-10"></input-list>
                <error :text="errors.drink_preferences"></error>
            </div>
        </list-row>

        <list-row class="bb">
            <form-sidebar-switcher title="Расскажите о себе"
                                   :value="about"
                                   @click="showSidebar(sidebar.about.type)"></form-sidebar-switcher>
            <error :text="errors.about"></error>
        </list-row>

        <list-row class="right bb"
                  style="min-height: 65px;">

            <label class="left-label">
                Держите меня в курсе
                <span class="tip left-tip">(получать уведомления)</span>
            </label>

            <switcher v-model.lazy="is_subscribed"></switcher>
            <error :text="errors.is_subscribed"></error>
        </list-row>

        <list-row>
            <upload-image :value="avatar"
                          :apiUrl="uploadAvatarUrl"
                          :folderUrl="avatarFolderUrl"
                          @before-upload="beforeImageUpload"
                          @input="afterImageUpload"
                          @error="onPictureError"
                          class="upload-avatar"></upload-image>
            <error :text="errors.avatar"
                   class="center"></error>
        </list-row>

        <list-row class="button-wrapper">
            <a href="#"
               class="button yellow-button wide"
               @click.prevent="onSubmit">сохранить</a>
        </list-row>
    </div>
</template>

<script>
    import Error from "@/components/forms/Error";
    import InputList from "@/components/forms/InputList";
    import FormSidebarSwitcher from "@/components/forms/FormSidebarSwitcher";
    import { createHelpers } from 'vuex-map-fields';
    import { createNamespacedHelpers } from 'vuex'
    import {runGeolocation, setError, submit, updatePicture} from "@/store/types";
    import ListConfig from "@/config/ListConfig";
    import UploadImage from "@/components/forms/UploadImage";
    import ApiConfig from "@/config/ApiConfig";
    import ListRow from "@/components/common/ListRow";
    import Switcher from "@/components/forms/Switcher";
    import {addToLoader, removeFromLoader} from "@/store/app/app.types";
    import UserTest from "@/modules/user/models/UserTest";
    import User from "@/modules/user/models/User";

    const { mapActions: mapAppActions } = createNamespacedHelpers('app');
    const { mapState, mapGetters, mapActions } = createNamespacedHelpers('user');
    const { mapFields } = createHelpers({
        getterType: 'user/getEditableUserField',
        mutationType: 'user/updateEditableUserField'
    });

    export default {
        name: 'ProfileForm',
        components: {Switcher, ListRow, UploadImage, FormSidebarSwitcher, InputList, Error},
        props: {
            sidebar: Object
        },
        computed: {
            uploadAvatarUrl(){
                return ApiConfig.baseUrl + ApiConfig.urls.user.uploadPicture;
            },
            avatarFolderUrl(){
                return User.avatarFolderUrl() +'/small';
            },
            options: ()=>ListConfig,
            ...mapGetters(['foodString']),
            ...mapState(['errors']),
            ...mapFields(['name', 'birthday', 'gender', 'geolocation', 'food_preferences', 'drink_preferences', 'about', 'is_subscribed', 'avatar', 'city'])
        },
        watch: {
            geolocation(newValue){
                if(newValue){
                    this.runGeolocation();
                }
                else{
                    this.city = null;
                }
            }
        },
        //todo remvoe
        created(){
            //this['setUser'](UserTest.reset());
        },
        methods: {
            showSidebar(type) {
                this.$emit('show-sidebar', type);
            },
            async onSubmit(){
                const success = await this[submit]();

                if(success){
                    this.$emit('show-modal');
                }
            },
            beforeImageUpload(){
                this[addToLoader]();
            },
            afterImageUpload(fileName){
                this[removeFromLoader]();
                this[updatePicture](fileName);
            },
            onPictureError(error){
                this[removeFromLoader]();
                this[setError]({
                    avatar: error
                });
            },
            //todo remvoe setUser
            ...mapActions([ submit, updatePicture, setError, runGeolocation, 'setUser' ]),
            ...mapAppActions([ addToLoader, removeFromLoader ])
        }
    }
</script>
