<template>
    <div>
        <div class="top-panel padding-around">
            <menu-switcher></menu-switcher>

            <h2>Новое событие</h2>
        </div>

        <event-create-form :sidebar="sidebar"
                           @show-sidebar="showSidebar"
                           @show-modal="showModal"></event-create-form>

        <event-create-form-sidebar :sidebar="sidebar"></event-create-form-sidebar>

        <Modal class="service-modal"
               v-model="modal.shown">
            <div>Событие успешно создано.</div>
        </Modal>
    </div>
</template>

<script>
    import sidebarHandler from "@/mixins/sidebarHandler";
    import EventCreateForm from "@/modules/event/forms/EventCreateForm";
    import EventCreateFormSidebar from "@/modules/event/forms/EventCreateFormSidebar";
    import modalHandler from "@/mixins/modalHandler";
    import Modal from "@/components/common/Modal";
    import MenuSwitcher from "@/components/menu/MenuSwitcher";

    export default {
        name: 'EventCreate',
        components: {MenuSwitcher, Modal, EventCreateFormSidebar, EventCreateForm},
        mixins: [sidebarHandler, modalHandler],
        data(){
            return {
                sidebar: {
                    category: {
                        type: 1,
                        headline: 'Категории'
                    },
                    food_preferences: {
                        type: 2,
                        headline: 'Что будете кушать?'
                    },
                    drink_preferences: {
                        type: 3,
                        headline: 'Что будете пить?'
                    },
                    members: {
                        type: 4,
                        headline: 'Количество людей'
                    },
                    address: {
                        type: 5,
                        headline: 'Адрес'
                    }
                }
            }
        }
    }
</script>
