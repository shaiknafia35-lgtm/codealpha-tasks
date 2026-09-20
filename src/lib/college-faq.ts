/**
 * Predefined college FAQ knowledge base.
 *
 * IMPORTANT: every value here is SAMPLE data used for demonstration because the
 * real college information has not been provided. It is labelled as SAMPLE so the
 * assistant never presents it as official college information.
 */

export type FaqEntry = {
  topic: string;
  content: string;
};

export const COLLEGE_FAQ: FaqEntry[] = [
  {
    topic: "College timings",
    content: `SAMPLE timings (not official):
- Working days: Monday to Saturday (2nd and 4th Saturday holiday)
- Class hours: 9:00 AM – 4:30 PM
- Morning assembly / attendance: 8:50 AM
- Lunch break: 12:30 PM – 1:15 PM
- Administrative / college office counter: 9:30 AM – 5:00 PM`,
  },
  {
    topic: "Library timings and rules",
    content: `SAMPLE library information (not official):
- Open: Monday to Saturday, 8:30 AM – 7:00 PM (Sunday closed)
- Reading hall stays open until 8:00 PM during exam weeks
- Borrowing: up to 3 books for 14 days with the student ID card
- Renewal: one renewal allowed if no one else has reserved the book
- Late fee: ₹2 per book per day
- Digital section: e-journals and past question papers available on campus Wi-Fi`,
  },
  {
    topic: "Examination information",
    content: `SAMPLE exam information (not official):
- Two internal assessments per semester (around week 6 and week 12)
- One end-semester university exam at the end of each semester
- Internal marks: 30, End-semester: 70
- Passing requirement: 40% overall in each subject
- Hall ticket: issued about one week before the exam, requires no pending dues
- Re-evaluation / supplementary exams are usually held within 4–6 weeks of results`,
  },
  {
    topic: "Attendance",
    content: `SAMPLE attendance rules (not official):
- Minimum 75% attendance required in each subject to sit for the end-semester exam
- Attendance below 75% may require a condonation request with valid documents
- Medical leave needs a certificate submitted to the class coordinator within 7 days
- Attendance is usually published monthly on the notice board or student portal`,
  },
  {
    topic: "Courses and electives",
    content: `SAMPLE course information (not official):
- Undergraduate programmes: B.Tech / B.Sc / B.Com / BBA / BCA (3–4 years)
- Postgraduate programmes: M.Tech / M.Sc / MBA / MCA
- Each semester has core subjects plus 1–2 electives and one lab or project
- Elective selection happens in the first two weeks of the semester through the student portal
- Credit requirement is typically 20–24 credits per semester`,
  },
  {
    topic: "Placement support",
    content: `SAMPLE placement information (not official):
- A dedicated Training & Placement Cell supports students from the pre-final year
- Support includes resume workshops, aptitude and coding practice, mock interviews and soft-skills training
- Eligibility commonly requires 60%+ aggregate with no active backlogs
- Campus drives usually run from August to March for final-year students
- Internship assistance is offered during semester breaks`,
  },
];

export const COLLEGE_FAQ_TEXT = COLLEGE_FAQ.map(
  (entry) => `### ${entry.topic}\n${entry.content}`,
).join("\n\n");

export const NO_INFO_FALLBACK =
  "I don't have this information in my knowledge base. Please check with the college office or official college website.";
