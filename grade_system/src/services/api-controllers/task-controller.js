export class TaskController {
    static getAll() {
        const promise = new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open("GET", "http://localhost:3000/api/task", true);
            xhr.send();
            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status !== 200) {
                        reject(xhr.responseText);
                    }
                    else {
                        const tasks = JSON.parse(xhr.responseText);
                        resolve(tasks);
                    }
                }
            };
        });

        return promise;
    }

    static getByID(id) {
        const promise = new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open("GET", `http://localhost:3000/api/task/${id}`, true);
            xhr.send();
            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status !== 200) {
                        reject(xhr.responseText);
                    }
                    else {
                        const task = JSON.parse(xhr.responseText);
                        resolve(task);
                    }
                }
            };
        });

        return promise;
    }

    static addEdit(newTask) {
        const promise = new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open("POST", `http://localhost:3000/api/task`, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            
            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status !== 200) {
                        reject(xhr.responseText);
                    }
                    else {
                        const task = JSON.parse(xhr.response);
                        resolve(task);
                    }
                }
            };

            xhr.send(JSON.stringify(newTask));
        });

        return promise;
    }

    static delete(id) {
        const promise = new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open("DELETE", `http://localhost:3000/api/task/${id}`, true);
           
            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status !== 200) {
                        reject(xhr.responseText);
                    }
                    else {
                        const deleteResult = JSON.parse(xhr.responseText);
                        resolve(deleteResult);
                    }
                }
            };
            xhr.send();
        });

        return promise;
    }
}