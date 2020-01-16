import Vue from 'vue'
import Vuex from 'vuex'
import eventCategory from '@/modules/eventCategory/store'
import event from '@/modules/event/store/event'
import eventUsers from '@/modules/event/store/eventUsers'
import eventMessages from '@/modules/event/store/eventMessages'
import userMessages from '@/modules/user/store/userMessages'
import home from '@/modules/home/store'
import favorite from '@/modules/favorite/store'
import feedback from '@/modules/feedback/store'
import user from '@/modules/user/store/user'
import users from '@/modules/user/store/users'
import userSearch from '@/modules/user/store/userSearch'
import friends from '@/modules/friends/store'
import notifications from '@/modules/notifications/store'
import myMessages from '@/modules/myMessages/store'
import myEvents from '@/modules/myEvents/store'
import auth from '@/modules/user/store/auth'
import userProfileEvent from '@/modules/user/store/userProfileEvent'
import app from '@/store/app'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
      eventCategory,
      event,
      eventUsers,
      eventMessages,
      myEvents,
      favorite,

      auth,
      user,
      users,
      userSearch,
      friends,
      userMessages,
      userProfileEvent,

      app,
      home,
      feedback,
      myMessages,
      notifications
  },
  strict: true
})
