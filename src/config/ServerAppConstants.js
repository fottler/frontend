
const ServerAppConstants = {
    friendStatuses: {
        none: '0',
        requestToMe: '1',
        requestFromMe: '2',
        friend: '3',
    },
    authStatuses: {
        isGuest: '0',
        profileIsNotFilled: '1',
        authorised: '2'
    },
    eventStatuses: {
        none: '0',
        applied: '1',
        rejected: '2',
        confirmed: '3',
        owner: '4'
    },
    genders: {
        male: {
            title: 'муж.',
            id: '1'
        },
        female: {
            title: 'жен.',
            id: '2'
        }
    },
    drinks: {
        spirit: {
            title: 'алк.',
            id: '1',
            requiresAdulthood: true
        },
        non_alcoholic: {
            title: 'безалк.',
            id: '2'
        },
        low_alcohol: {
            title: 'слабоалк.',
            id: '3',
            requiresAdulthood: true
        }
    },
    //todo
    /*drinks: {
        spirit: [
            requiresAdulthood: true,
            {
                title: 'Водка',
                id: '1'
            }
        ],
        non_alcoholic: [
            {
                title: 'Сок',
                id: '2'
            },
            {
                title: 'Чай',
                id: '3'
            }
        ],
        low_alcohol: [
            requiresAdulthood: true,
            {
                title: 'Вино',
                id: '4'
            }
        ]
    },*/
    food: {
        european: {
            title: 'Европейская кухня',
            id: '1'
        },
        asian: {
            title: 'Азиатская кухня',
            id: '2'
        },
        mexican: {
            title: 'Мексиканская кухня',
            id: '3'
        }
    },
    filter: {
        all: 'all',//for service needs
        time: [
            {title: 'все', id: 'all'},
            {title: 'сегодня', id: 'today'},
            {title: 'прошедшие', id: 'past'},
            {title: 'предстоящие', id: 'upcoming'}
        ],
        order: [
            {title: 'дате', id: 'date'},
            {title: 'расстоянию', id: 'distance'}
        ],
        unread: [
            {title: 'все', id: 'all'},
            {title: 'непрочитанные', id: 'unread'}
        ],
        myEvents: [
            {title: 'все', id: 'all'},
            {title: 'созданные мной', id: 'mine'},
            {title: 'прошедшие', id: 'past'},
            {title: 'предстоящие', id: 'upcoming'}
        ],
        notification: [
            {title: 'все', id: 'all'},
            {title: 'новые', id: 'unread'},
            {title: 'события', id: 'events'},
            {title: 'друзья', id: 'users'}
        ]
    },
    messageType: {
        event: 1,
        user: 2
    },
    notificationType: {
        event: {
            request: {
                id: 1,
                template: 'Заявка на ваше событие {{event_name}} от {{user_name}}'
            },
            accept: {
                id: 2,
                template: 'Вашу заявку на событие {{event_name}} одобрили'
            },
            /*reject: {
                id: 3,
                template: 'Вашу заявку на событие {{event_name}} отклонили'
            }*/
        },
        user: {
            request: {
                id: 4,
                template: 'Запрос в друзья от {{user_name}}'
            },
            accept: {
                id: 5,
                template: '{{user_name}} принял ваш запрос в друзья'
            },
            /*reject: {
                id: 6,
                template: '{{user_name}} отклонил ваш запрос в друзья'
            }*/
        }
    }
};
export default ServerAppConstants;