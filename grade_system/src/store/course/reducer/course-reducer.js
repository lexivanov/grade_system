import { actionTypes } from '../constants';

export const courseReducer = function (state = {
    courses: [],
    currentTasks: [],
    currentCourseInfo: {}
}, action) {
    const payload = action.payload;

    switch (action.type) {
        case actionTypes.loadCourseTasks: {
            return { ...state, currentTasks: payload };
        }
        case actionTypes.loadCourses: {
            return { ...state, courses: payload };
        }
        case actionTypes.loadCourseInfo: {
            const info = payload;
            const sorted = info.users.sort((a, b) => a.fullname.localeCompare(b.fullname));
            info.users = sorted;
            info.users.forEach(user => {
                const grades = info.grades.filter(x => x.userId === user.id);
                let average = undefined;
                if (grades.length > 0) {
                    average = 0;
                    grades.forEach(item => {
                        average += item.value;
                    });
                    average /= grades.filter(x => !!x.value).length;

                }
                user.average = average;
            });

            return { ...state, currentCourseInfo: info };
        }
        case actionTypes.setGrade: {
            const courseInfo = { ...state.currentCourseInfo };
            const index = courseInfo.grades.findIndex(item => item.taskId === payload.taskId && item.userId === payload.userId);
            if (index === -1) {
                courseInfo.grades.push(payload);
            } else {
                if (payload.value === null) {
                    courseInfo.grades.splice(index, 1);
                } else {
                    courseInfo.grades[index].value = payload.value || null;
                }
            }

            const grades = courseInfo.grades.filter(x => x.userId === payload.userId);
            let average = undefined;
            if (grades.length > 0) {
                average = 0;
                grades.forEach(item => {
                    average += item.value;
                });
                average /= grades.filter(x => !!x.value).length;

            }

            courseInfo.users.find(x => x.id === payload.userId).average = average;

            return { ...state, currentCourseInfo: { ...courseInfo } };
        }
        case actionTypes.addOrEditUser: {
            const courseInfo = { ...state.currentCourseInfo };
            const index = payload.id ? courseInfo.users.findIndex(x => x.id === payload.id) : -1;
            if (index < 0) {
                courseInfo.users.push(payload);
            } else {
                courseInfo.users.splice(index, 1, payload);
            }
            return { ...state, currentCourseInfo: courseInfo };
        }
        case actionTypes.addOrEdit: {
            const tmpList = [...state.courses];
            const index = tmpList.findIndex(x => x.id === payload.id);
            index !== -1 ? tmpList[index] = payload : tmpList.push(payload);
            return { ...state, courses: tmpList };
        }
        case actionTypes.deleteCourse: {
            const tmpList = [...state.courses];
            tmpList.splice(tmpList.findIndex(x => x.id === payload), 1);

            return { ...state, courses: tmpList };
        }
        case actionTypes.filter: {
            const currentCourseInfo = { ...state.currentCourseInfo };
            const { column, order } = payload;
            if (column === 'fullname') {
                const sorted = currentCourseInfo.users.sort((a, b) => order ? b[column].localeCompare(a[column]) : a[column].localeCompare(b[column]));
                currentCourseInfo.users = sorted;
            } else if (column === 'average') {
                const sorted = currentCourseInfo.users.sort((a, b) => order ? b[column] - a[column] : a[column] - b[column]);
                currentCourseInfo.users = sorted;
            } else {
                const sorted = currentCourseInfo.users.sort((a, b) => {
                    let gradeA = currentCourseInfo.grades.find(x => x.userId === a.id && x.taskId === column);
                    gradeA = gradeA ? gradeA.value : 0;
                    let gradeB = currentCourseInfo.grades.find(x => x.userId === b.id && x.taskId === column);
                    gradeB = gradeB ? gradeB.value : 0;
                    return order
                        ? gradeB - gradeA
                        : gradeA - gradeB
                });
                currentCourseInfo.users = sorted;
            }
            return { ...state, currentCourseInfo };
        }
        default: {
            return { ...state };
        }
    }
}
