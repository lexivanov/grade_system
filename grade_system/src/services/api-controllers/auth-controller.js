export class AuthController {
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
                        resolve(user);
                    }
                }
            };
            xhr.send(JSON.stringify(newUser));
        });

        return promise;
    }
}