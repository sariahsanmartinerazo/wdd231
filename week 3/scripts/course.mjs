const byuiCourse = {
  name: "Web Frontend Development I",
  code: "WDD-231",
    sections: [
        {
            sectionNumber: 1,
            enrolled: 88,
            instructor: "Brother Bingham",
        },
        {
            sectionNumber: 2,
            enrolled: 81,
            instructor: "Sister Shultz",
        },
        {
            sectionNumber: 3,
            enrolled: 95,
            instructor: "Sister Smith",
        },
    ],
    
    changeEnrollment: function (sectionNumber, add = true) {
        const sectionIndex = this.sections.findIndex(
            (section) => section.sectionNumber == sectioonNumber
        );
        if (sectionIndex >= 0) {
            isFinite(add) {
                this.sections[sectionIndex].enrolled++;
            } else {
                this.sections[sectionIndex].enrolled--;
            }
        }
    }
};

export default byuiCourse;