export class CourseController {
    static getAll() {
        const promise = new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open("GET", "http://localhost:3000/api/course", true);
            xhr.send();
            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status !== 200) {
                        reject(xhr.responseText);
                    }
                    else {
                        const courses = JSON.parse(xhr.responseText);
                        resolve(courses);
                    }
                }
            };
        });

        return promise;
    }

    static getGrades(id) {
        const promise = new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open("GET", `http://localhost:3000/api/grade/${id}`, true);
            xhr.send();
            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status !== 200) {
                        reject(xhr.responseText);
                    }
                    else {
                        const courses = JSON.parse(xhr.responseText);
                        resolve(courses);
                    }
                }
            };
        });

        return promise;
    }

    static getTasks(id) {
        const promise = new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open("GET", `http://localhost:3000/api/course/${id}/tasks`, true);
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

    static getCourseInfo(id) {
        const promise = new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open("GET", `http://localhost:3000/api/course/${id}/info`, true);
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

    static addEdit(newCourse) {
        const promise = new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open("POST", `http://localhost:3000/api/course`, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            
            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status !== 200) {
                        reject(xhr.responseText);
                    }
                    else {
                        const course = JSON.parse(xhr.response);
                        resolve(course);
                    }
                }
            };

            xhr.send(JSON.stringify(newCourse));
        });

        return promise;
    }

    static delete(id) {
        const promise = new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open("DELETE", `http://localhost:3000/api/course/${id}`, true);
           
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