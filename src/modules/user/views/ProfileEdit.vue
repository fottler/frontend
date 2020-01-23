<template>
    <div>
        <div class="top-panel padding-around">
            <menu-switcher></menu-switcher>

            <h2>Профиль</h2>
        </div>

        <div v-if="profileIsNotFilled"
             class="request-bar">
            Пожалуйста, заполните ваш профиль перед тем как продолжить
        </div>

        <profile-form :sidebar="sidebar"
                      @show-sidebar="showSidebar"
                      @show-modal="showModal"></profile-form>

        <profile-form-sidebar :sidebar="sidebar"></profile-form-sidebar>

        <Modal class="service-modal"
               v-model="modal.shown">
            <div>Ваши изменения успешно сохранены.</div>
        </Modal>
    </div>
</template>

<script>
    import modalHandler from "@/mixins/modalHandler";
    import sidebarHandler from "@/mixins/sidebarHandler";
    import ProfileForm from "@/modules/user/forms/ProfileForm";
    import ProfileFormSidebar from "@/modules/user/forms/ProfileFormSidebar";
    import Modal from "@/components/common/Modal";
    import { createNamespacedHelpers } from 'vuex'
    import MenuSwitcher from "@/components/menu/MenuSwitcher";

    const { mapGetters } = createNamespacedHelpers('auth');

    export default {
        name: 'ProfileEdit',
        components: {MenuSwitcher, Modal, ProfileFormSidebar, ProfileForm},
        mixins: [modalHandler, sidebarHandler],
        computed: {
            ...mapGetters(['profileIsNotFilled']),
        },
        data(){
            return {
                sidebar: {
                    food_preferences: {
                        type: 1,
                        headline: 'Предпочтения в еде'
                    },
                    about: {
                        type: 2,
                        headline: 'Расскажите о себе'
                    }
                }
            }
        }
    }
</script>
