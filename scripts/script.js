// Footer
document.querySelector("#currentyear").textContent = new Date().getFullYear();
document.querySelector("#lastmodified").textContent = document.lastModified;


// Course List
const courses = [
    {
        subject: "CSE",
        number: 110,
        title: "Introduction to Programming",
        credits: 2,
        completed: true
    },
    {
        subject: "WDD",
        number: 130,
        title: "Web Fundamentals",
        credits: 2,
        completed: true
    },
    {
        subject: "CSE",
        number: 111,
        title: "Programming with Functions",
        credits: 2,
        completed: false
    },
    {
        subject: "CSE",
        number: 210,
        title: "Programming with Classes",
        credits: 2,
        completed: false
    },
    {
        subject: "WDD",
        number: 131,
        title: "Dynamic Web Fundamentals",
        credits: 2,
        completed: true
    },
    {
        subject: "WDD",
        number: 231,
        title: "Web Frontend Development I",
        credits: 2,
        completed: false
    }
];


// Display Courses
function displayCourses(courseList) {

    const courseContainer = document.querySelector("#course-list");

    courseContainer.innerHTML = "";

    courseList.forEach(course => {

        const card = document.createElement("div");

        card.classList.add("course-card");

        // Mark completed courses
        if (course.completed) {
            card.classList.add("completed");
        }

        card.innerHTML = `
            <h3>${course.subject} ${course.number}</h3>
            <p>${course.title}</p>
            <p>${course.credits} credits</p>
        `;

        courseContainer.appendChild(card);
    });

    // Calculate total credits
    const totalCredits = courseList.reduce(
        (total, course) => total + course.credits,
        0
    );

    document.querySelector("#total-credits").textContent = totalCredits;
}


// Show all courses when page loads
displayCourses(courses);


// Filter buttons
document.querySelector("#all").addEventListener("click", () => {
    displayCourses(courses);
});

document.querySelector("#wdd").addEventListener("click", () => {

    const wddCourses = courses.filter(course => course.subject === "WDD");

    displayCourses(wddCourses);
});

document.querySelector("#cse").addEventListener("click", () => {

    const cseCourses = courses.filter(course => course.subject === "CSE");

    displayCourses(cseCourses);
});
