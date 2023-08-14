/* Homework_29 */

function Student(name, surname, birthday) {
    // Full name
    this.fName = name;
    this.lName = surname;

    // Age
    this.birthday = new Date(birthday);

    // Rating System (maximum of 25)
    this.rating = new Array(25).fill(0);

    // Attendance
    this.attendance = new Array(25).fill(null);
    this.markIndex = 0; // Counter for the current mark index
}

Student.prototype.findAge = function () {
    let today = new Date();
    let age = today.getFullYear() - this.birthday.getFullYear();
    let month = today.getMonth() - this.birthday.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < this.birthday.getDate())) {
        age--;
    }
    return age;
};

Student.prototype.present = function () {
    if (this.attendance.filter(Boolean).length < 25) {
        this.attendance[this.attendance.indexOf(null)] = true;
    } else {
        console.log("Can't have more than 25 entries.");
    }
}

Student.prototype.absent = function () {
    if (this.attendance.filter(Boolean).length < 25) {
        this.attendance[this.attendance.indexOf(null)] = false;
    } else {
        console.log("Can't have more than 25 entries.");
    }
}

Student.prototype.addMark = function (mark) {
    if (this.markIndex < this.attendance.length) {
        if (this.attendance[this.markIndex]) {
            if (typeof mark === "number" && mark >= 0 && mark <= 100) {
                this.rating[this.markIndex] = mark;
                this.markIndex++;
            } else {
                throw new Error("Ratings must be numbers between 0 and 100");
            }
        } else {
            throw new Error("Student was absent for this lesson.");
        }
    } else {
        throw new Error("Maximum number of marks reached.");
    }
}

Student.prototype.summary = function () {
    const presentCount = this.attendance.filter(Boolean).length;
    const attendanceAverage = presentCount / this.attendance.length;

    const ratedMarks = this.rating.filter(mark => mark !== 0);
    const ratingSum = ratedMarks.reduce((sum, mark) => sum + mark, 0);
    const ratingAverage = ratedMarks.length > 0 ? ratingSum / ratedMarks.length : 0;

    if (attendanceAverage > 0.9 && ratingAverage > 90) {
        return "Молодець!";
    } else if (attendanceAverage < 0.9 && ratingAverage < 90) {
        return "Редиска!";
    } else {
        return "Добре, але можна краще";
    }
};

let person1 = new Student("Petro", "Pavliuk", "1994-02-10");
for (let lessonIndex = 0; lessonIndex < 25; lessonIndex++) {
    person1.present();
    if (person1.attendance[lessonIndex]) {
        person1.addMark(95);
    }
}
console.log(person1.summary());


let person2 = new Student("Sam", "Smith", "1994-03-12");
for (let lessonIndex = 0; lessonIndex < 25; lessonIndex++) {
    person2.present();
    if (person2.attendance[lessonIndex]) {
        person2.addMark(45);
    }
}
console.log(person2.summary());


let person3 = new Student("Slaven", "Lebronikov", "1997-10-02");
for (let lessonIndex = 0; lessonIndex < 25; lessonIndex++) {
    person3.absent();
}
console.log(person3.summary());
