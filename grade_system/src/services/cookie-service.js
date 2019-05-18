export class Cookie {
    static setCookie(name, value, options) {
        options = options || {}; //по умолчанию нет параметров (допустимые: expires, domain, secure, path)
        let expires = options.expires;

        if (typeof expires == "number" && expires) { //если указано время жизни, и это число
            var d = new Date();
            d.setTime(d.getTime() + expires * 1000); //expires в секундах
            expires = options.expires = d;
        }
        if (expires && expires.toUTCString) {
            options.expires = expires.toUTCString();
        }

        value = encodeURIComponent(value);
        let data = name + "=" + value; //строка в формате cookie имеет вид "имя_куки=значение"

        for (let propName in options) {   //дописываем параметры кук (domain, secure, path)
            data += "; " + propName;
            const propValue = options[propName];
            if (propValue !== true) {
                data += "=" + propValue;
            }
        }

        document.cookie = data; //сохраняем куку
    }

    static getCookie(name) {
        const matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    static deleteCoockie(name) {
        const date = new Date(0);
        document.cookie = `${name}=; path=/; expires=` + date.toUTCString();
    }
}