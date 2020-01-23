<template>
    <div>
        <list-row class="bb">
            <input type="text"
                   class="w-100 pl"
                   placeholder="Введите название события"
                   v-model.lazy="title"
                   @keyup.enter="onSubmit">
            <error :text="errors.title"
                   class="pl"></error>
        </list-row>

        <list-row class="bb"
                  icon="category"
                  icon-width="18">
            <form-sidebar-switcher title="Категории"
                                   :value="categoriesString(category)"
                                   @click="showSidebar(sidebar.category.type)"></form-sidebar-switcher>
            <error :text="errors.category"></error>
        </list-row>

        <list-row class="bb"
                  icon="food"
                  icon-width="20"
                  icon-top="12"
                  icon-left="13">
            <form-sidebar-switcher title="Что будете кушать?"
                                   :value="foodString"
                                   @click="showSidebar(sidebar.food_preferences.type)"></form-sidebar-switcher>
            <error :text="errors.food_preferences"></error>
        </list-row>

        <list-row class="bb"
                  icon="drinks"
                  icon-width="19"
                  icon-left="13">
            <form-sidebar-switcher title="Что будете пить?"
                                   :value="drinksString"
                                   @click="showSidebar(sidebar.drink_preferences.type)"></form-sidebar-switcher>
            <error :text="errors.drink_preferences"></error>
        </list-row>

        <list-row class="right bb"
                  icon="date"
                  icon-width="18"
                  icon-left="13">

            <label class="left-label">Когда?</label>

            <input type="datetime-local"
                   placeholder="Когда?"
                   v-model.lazy="datetime">
            <error :text="errors.datetime"></error>
        </list-row>

        <list-row class="bb"
                  icon="gender"
                  icon-width="22"
                  icon-top="13"
                  icon-left="12">
            <form-sidebar-switcher title="Количество людей"
                                   :value="maxMembersString"
                                   @click="showSidebar(sidebar.members.type)"></form-sidebar-switcher>
            <error :text="errors.max_males_number"></error>
            <error v-if="!errors.max_males_number"
                   :text="errors.max_females_number"></error>
        </list-row>

        <list-row class="bb"
                  icon="address"
                  icon-width="18"
                  icon-top="12">
            <form-sidebar-switcher title="Адрес"
                                   :value="address"
                                   @click="showSidebar(sidebar.address.type)"></form-sidebar-switcher>
            <error :text="errors.address"></error>
        </list-row>

        <list-row class="bb">
            <input type="text"
                   class="w-100 pl"
                   placeholder="Введите краткое описание"
                   :value="about"
                   @input="about = $event.target.value"
                   @keyup.enter="onSubmit">
            <error :text="errors.about"
                   class="pl"></error>

            <div class="field-description pl"
                 :class="aboutSymbolsLeft<0 ? 'red' : ''">{{aboutSymbolsString}}</div>
        </list-row>

        <div class="list-row">
            <upload-image :value="picture"
                          :apiUrl="uploadPictureUrl"
                          :folderUrl="pictureFolderUrl"
                          @before-upload="beforeImageUpload"
                          @input="afterImageUpload"
                          @error="onPictureError"></upload-image>
            <error :text="errors.picture"
                   class="center"></error>
        </div>

        <div class="list-row button-wrapper">
            <a href="#"
               class="button yellow-button wide1"
               @click.prevent="onSubmit">разместить</a>
        </div>
    </div>
</template>

<script>
    import Error from "@/components/forms/Error";
    import { createHelpers } from 'vuex-map-fields';
    import { createNamespacedHelpers } from 'vuex'
    import FormSidebarSwitcher from "@/components/forms/FormSidebarSwitcher";
    import {setError, submit, updatePicture} from "@/store/types";
    import UploadImage from "@/components/forms/UploadImage";
    import ApiConfig from "@/config/ApiConfig";
    import ListRow from "@/components/common/ListRow";
    import Config from "@/config/Config";
    import {addToLoader, removeFromLoader} from "@/store/app/app.types";
    import Event from "@/modules/event/models/Event";

    const { mapActions: mapAppActions } = createNamespacedHelpers('app');
    const { mapGetters: mapCategoryGetters } = createNamespacedHelpers('eventCategory');
    const { mapState, mapGetters, mapActions } = createNamespacedHelpers('event');
    const { mapFields } = createHelpers({
        getterType: 'event/getNewEventField',
        mutationType: 'event/updateNewEventField',
    });

    export default {
        name: 'EventCreateForm',
        components: {ListRow, UploadImage, FormSidebarSwitcher, Error},
        props: {
            sidebar: Object
        },
        computed: {
            aboutSymbolsLeft(){
                return Config.event.about.maxLength - this.about.length;
            },
            aboutSymbolsString(){
                const symbolsLeft = this.aboutSymbolsLeft;

                return symbolsLeft>=0
                    ? 'Осталось '+ symbolsLeft +' символов'
                    : 'Превышен лимит символов';
            },
            uploadPictureUrl(){
                return ApiConfig.baseUrl + ApiConfig.urls.event.uploadPicture;
            },
            pictureFolderUrl(){
                return Event.pictureFolderUrl() +'/small';
            },
            ...mapCategoryGetters(['categoriesString']),
            ...mapGetters(['foodString', 'drinksString', 'maxMembersString']),
            ...mapState(['errors']),
            ...mapFields(['title', 'category', 'datetime', 'about', 'picture', 'address'])
        },
        methods: {
            showSidebar(type) {
                this.$emit('show-sidebar', type);
            },
            async onSubmit(){
                const success = await this.submit();

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
                    picture: error
                });
            },
            ...mapActions([ submit, updatePicture, setError ]),
            ...mapAppActions([ addToLoader, removeFromLoader ])
        }
    }
</script>
