export class AuthController {
    static getUser() {
        const promise = new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open("GET", `http://localhost:3000/api/auth`, true);
            
            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status !== 200) {
                        reject(xhr.responseText);
                    }
                    else {
                        const user = xhr.responseText;
                        resolve(user);
                    }
                }
            };

            xhr.send();
        });

        return promise;
    }

    static register(newUser) {
        const promise = new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open("POST", `http://localhost:3000/api/auth`, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            
            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status !== 200) {
                        reject(xhr.responseText);
                    }
                    else {
                        const user = xhr.responseText;
                        resolve(user);
                    }
                }
            };
            xhr.send(JSON.stringify(newUser));
        });

        return promise;
    }

    static login(newUser) {
        const promise = new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open("POST", `http://localhost:3000/api/login`, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            
            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status !== 200) {
                        reject(xhr.responseText);
                    }
                    else {
                        const user = xhr.responseText;
                        resolve(JSON.parse(user));
                    }
                }
            };
            xhr.send(JSON.stringify(newUser));
        });

        return promise;
    }

    static logout() {
        const promise = new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open("POST", `http://localhost:3000/api/logout`, true);
            
            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status !== 200) {
                        reject(xhr.responseText);
                    }
                    else {
                        const user = xhr.responseText;
                        resolve(JSON.parse(user));
                    }
                }
            };
            xhr.send();
        });

        return promise;
    }

    static verify(hash) {
        const promise = new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open("POST", `http://localhost:3000/api/verify/${hash}`, true);
            
            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status !== 200) {
                        reject(xhr.responseText);
                    }
                    else {
                        const user = xhr.responseText;
                        resolve(user);
                    }
                }
            };
            xhr.send();
        });

        return promise;
    }
}