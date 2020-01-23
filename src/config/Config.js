const Config = {
    chat: {
        interval: 4000
    },
    error: {
        isEmpty: 'Заполните поле',
        isNotChosen: 'Выберите из списка'
    },
    event: {
        about: {
            maxLength: 80
        }
    },
    imageUpload: {
        allowedExtensions: "gif,jpg,jpeg,png,webp",
        accept: "image/png,image/gif,image/jpeg,image/webp",
        maxSize: 10*1024*1024,
        errorMessages: {
            size: 'Максимальный размер изображения 10Мб',
            extension: 'Разрешены только изображения',
            network: 'Изображение не может быть загружено. Проверьте подключение к интернету',
            abort: 'Загрузка была прервана',

            timeout: 'Ошибка #1 на сервере. Попробуйте снова',
            denied: 'Ошибка #2 на сервере. Попробуйте снова',
            server: 'Ошибка #3 на сервере. Попробуйте снова'
        }
    },
    map: {
        zoom: 14,
        markerIcon: {
            src: '/images/icons/marker.svg',
            height: 32,
        },

        geolocation: {
            networkTimeout: 10000,
            errorMessages: {
                1: 'Включите геолокацию на устройстве или разрешите доступ к вашей геопозиции для продолжения',
                2: 'Местоположение не доступно. Возможно ваше устройство не поддерживает геолокацию',
                3: 'Время запроса вашей геопозиции превысило лимит',
                browser_support: 'Ваш браузер не поддерживает геолокацию',
                default: 'Возникла ошибка в геолокации'
            }
        },
        locationInfo: {
            errorMessages: {
                zero_results: 'Местоположение не найдено',
                error_status: 'Произошла ошибка #K.1',
                threw_error: 'Произошла ошибка #K.2'
            }
        },
    },
    message: {
        listIsEmpty: 'Здесь пока пусто',
        userListIsEmpty: 'Здесь пока никого нет',
        eventListIsEmpty: 'Здесь пока ничего нет',
        nothingFound: 'Ничего не найдено',
        nobodyFound: 'Никто не найден'
    }
};
export default Config;