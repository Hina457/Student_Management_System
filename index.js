#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
//define the  student class
class Student {
    static Counter = 10000;
    id;
    name;
    courseEnrolled;
    balance;
    constructor(name) {
        this.id = Student.Counter++;
        this.name = name;
        this.courseEnrolled = [];
        this.balance = 100;
    }
    //Method to enroll a student in a course.
    enroll_course(courseEnrolled) {
        this.courseEnrolled.push(courseEnrolled);
    }
    // Method to view a student balance .
    view_balance() {
        console.log(`Balance for ${this.name}: ${this.balance}`);
    }
    //Mthod to pay student fees.
    pay_fees(amount) {
        this.balance -= amount;
        console.log(`${amount} fees paid successfully for ${this.name}`);
        console.log(`Remaining Balance:$${this.balance}`);
    }
    //Mthod to display student status.
    show_student_status() {
        console.log(`id:${this.id}`);
        console.log(`name:${this.name}`);
        console.log(`courseenrolled:${this.courseEnrolled}`);
        console.log(`Balance:${this.balance}`);
        // console.log(`show status:${this.show_student_status}`);
    }
}
//Defining  a student_manager class to manage students.
class students_manager {
    students;
    constructor() {
        this.students = [];
    }
    //Method to add a new student.
    add_student(name) {
        let data = new Student(name);
        this.students.push(data);
        console.log(`student: ${name} added successfully. student ID:${data.id}`);
    }
    //Mthod to enroll a student in a course.
    enroll_student(Student_id, course) {
        let students = this.students.find((study) => study.id === Student_id);
        if (students) {
            students.enroll_course(course);
            console.log(`${students.name} enrolled in ${course} successfully`);
        }
    }
    //Method to view a student balance
    view_student_balance(Student_id) {
        let students = this.find_student(Student_id);
        if (students) {
            students.view_balance();
        }
        else {
            console.log("student not found. please enter a correct student id");
        }
    }
    //Method to  pay student fees.
    pay_student_fees(Student_id, amount) {
        let students = this.find_student(Student_id);
        if (students) {
            students.pay_fees(amount);
        }
        else {
            console.log("student not found. please entewr a correct student id");
        }
    }
    //Method to display student status
    show_student_status(Student_id) {
        let students = this.find_student(Student_id);
        if (students) {
            students.show_student_status();
        }
    }
    //Method to find a student by student_id.
    find_student(Student_id) {
        return this.students.find((study) => study.id === Student_id);
    }
}
//main function to run the program.
async function main() {
    console.log(chalk.red("-".repeat(50)));
    console.log(chalk.yellowBright("Wellcome to Hina alvi Student Management system"));
    console.log(chalk.red("-".repeat(50)));
    let student_manager = new students_manager();
    //while loop to keep program running.
    while (true) {
        let choice = await inquirer.prompt([
            {
                name: "choices",
                type: "list",
                message: "Select an option",
                choices: [
                    "Add student",
                    "Enroll student",
                    "view student balance",
                    "pay fees",
                    "Show status",
                    "Exit",
                ],
            },
        ]);
        //using switch case to handle user choice.
        switch (choice.choices) {
            case "Add student":
                let name_input = await inquirer.prompt([
                    {
                        name: "Name",
                        type: "input",
                        message: "Enter a student Name?",
                    },
                ]);
                student_manager.add_student(name_input.Name);
                break;
            case "Enroll student":
                let course_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a Student ID",
                    },
                    {
                        name: "course",
                        type: "input",
                        message: "Enter a course Name",
                    },
                ]);
                student_manager.enroll_student(course_input.student_id, course_input.course);
                break;
            case "view student balance":
                let balance_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a student ID",
                    },
                ]);
                student_manager.view_student_balance(balance_input.student_id);
                break;
            case "pay fees":
                let fees_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Entwer a student ID",
                    },
                    {
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to pay",
                    },
                ]);
                student_manager.pay_student_fees(fees_input.student_id, fees_input.amount);
                break;
            case "Show status":
                let status_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a student ID",
                    },
                ]);
                student_manager.show_student_status(status_input.student_id);
                break;
            case "Exit":
                console.log("Exiting...");
                console.log("*".repeat(20));
                console.log(chalk.red("Thank you!"));
                process.exit();
        }
    }
}
main();
