export class UserController {
    static getAll() {
        const promise = new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open("GET", "http://localhost:3000/api/user", true);
            xhr.send();
            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status !== 200) {
                        reject(xhr.responseText);
                    }
                    else {
                        const users = JSON.parse(xhr.responseText);
                        resolve(users);
                    }
                }
            };
        });

        return promise;
    }

    static getGrades(id) {
        const promise = new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open("GET", `http://localhost:3000/api/user-grade/${id}`, true);
            xhr.send();
            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status !== 200) {
                        reject(xhr.responseText);
                    }
                    else {
                        const grades = JSON.parse(xhr.responseText);
                        resolve(grades);
                    }
                }
            };
        });

        return promise;
    }
}