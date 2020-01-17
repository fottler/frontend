const ApiConfig = {
    production: {
        baseUrl: 'http://fottler',
        urls: {
            event: {
                add: '/api/event/add',
                getAll: '/api/event/getAll',
                getOne: '/api/event/getOne',
                getFavorite: '/api/event/getFavorite',
                getMyEvents: '/api/event/getMyEvents',
                apply: '/api/event/apply',
                addToFavorites: '/api/event/addToFavorites',
                removeFromFavorites: '/api/event/removeFromFavorites',
                acceptRequest: '/api/event/acceptRequest',
                rejectRequest: '/api/event/rejectRequest',
                uploadPicture: '/api/event/uploadPicture',
                pictureFolderUrl: '/uploads/event',
            },
            eventCategory: {
                add: '/api/category/add',
                getAll: '/api/category/getAll'
            },
            feedback: {
                add: '/api/feedback/add',
            },
            message: {
                add: '/api/message/add',
                getOlder: '/api/message/getOlder',
                getNewer: '/api/message/getNewer',
                myMessagesGetAll: '/api/message/myMessages/getAll'
            },
            notification: {
                getAll: '/api/notification/getAll'
            },
            user: {
                login1: '/api/send_verification_sms',
                login2: '/oauth/token',
                getInfo: '/api/user/getInfo',
                edit: '/api/user/edit',
                getAll: '/api/user/getAll',
                getByEvent: '/api/user/getByEvent',
                getOne: '/api/user/getOne',
                changeFriendStatus: '/api/user/changeFriendStatus',
                uploadPicture: '/api/user/uploadPicture',
                pictureFolderUrl: '/uploads/user',
            }
        }
    },
    development: {
        baseUrl: 'http://localhost:8080',
        urls: {
            event: {
                add: '/test_json/dummy.json',
                getAll: '/test_json/events.json',
                getOne: '/test_json/event_single.json',
                getFavorite: '/test_json/favorite.json',
                getMyEvents: '/test_json/my-events.json',
                apply: '/test_json/apply.json',
                addToFavorites: '/test_json/addToFavorites.json',
                removeFromFavorites: '/test_json/removeFromFavorites.json',
                acceptRequest: '/test_json/accept_event_request.json',
                rejectRequest: '/test_json/accept_event_request.json',
                uploadPicture: '/upload.php',
                pictureFolderUrl: '/uploads/event',
            },
            eventCategory: {
                add: '/test_json/add_category.json',
                getAll: '/test_json/categories.json'
            },
            feedback: {
                add: '/test_json/dummy.json',
            },
            message: {
                add: '/test_json/dummy.json',
                getOlder: '/test_json/messages.json',
                getNewer: '/test_json/messages.json',
                myMessagesGetAll: '/test_json/my_messages.json'
            },
            notification: {
                getAll: '/test_json/notifications.json'
            },
            user: {
                login1: '/test_json/login.json',
                login2: '/test_json/login.json',
                getInfo: '/test_json/user.json',
                edit: '/test_json/user.json',
                getAll: '/test_json/users.json',
                getByEvent: '/test_json/users.json',
                getOne: '/test_json/user_single.json',
                changeFriendStatus: '/test_json/change_friend_status.json',
                uploadPicture: '/upload.php',
                pictureFolderUrl: '/uploads/user',
            }
        }
    }
};
export default ApiConfig.production;//todo [process.env.NODE_ENV];