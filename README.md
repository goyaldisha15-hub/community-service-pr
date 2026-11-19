# NGO Connect

**Event / Campaign Registration & Attendance Management System for NGOs**

NGO Connect is a mobile-friendly web application that replaces paper forms and spreadsheets with online registration and QR-based attendance for NGO events and campaigns. It was built with and validated by our community partner, **Netra Jyoti Ek Prayas, Palwal (Haryana)**.

> Team Eclipse | Section G | Team ID: 26O2415
> K.R. Mangalam University, Second Year (B.Tech)

---

## Problem

NGOs and community groups mostly track registration and attendance on paper or in spreadsheets. This leads to duplicate entries, mismatched records, no reliable proof of who actually attended, and volunteers spending time on data entry instead of community work.

## Solution

Two role-based workspaces, one shared record:

- **NGO Administrator** creates events, sets them Live and generates an attendance QR code for each event.
- **Volunteer** browses events, registers online and scans the event QR at the venue to mark attendance.
- A **live dashboard** shows total events, registrations and attendance.

It works in any smartphone browser, with no installation, and is designed for low-end phones and minimal training.

---

## Features

| Feature | Description |
| --- | --- |
| Role-based workspaces | Separate Admin and Volunteer dashboards after login |
| Event management | Create and edit events (title, description, date, time, venue, capacity); status is Draft, Live or Closed |
| Attendance QR | A unique QR per event; regenerating it invalidates the old code |
| Online registration | One-click registration; "Already registered" blocks duplicates |
| QR check-in | Scan verifies the event QR and the volunteer's registration, blocks repeat scans, and records the time |
| Dashboard and reports | Live counts of events, registrations and attendance, plus volunteer records and reports |

### Admin screens
Dashboard, Events, Volunteer Records, Reports

### Volunteer screens
Dashboard, Events, My Events, Scan QR, Profile

---

## Tech Stack

| Layer | Technology |
| --- | --- |
| Frontend | React.js, HTML, CSS |
| Backend | Node.js, Express.js (REST API, authentication, attendance logic) |
| Database | SQL (MySQL / PostgreSQL): users, events, registrations, attendance |
| QR | QR generation and camera-based scanning |
| Version control | Git and GitHub |

---

## System Flow

**Administrator:** Login -> Create event -> Set event Live -> Generate attendance QR -> Monitor dashboard and reports

**Volunteer:** Login -> Browse events -> Register -> Scan event QR at venue -> Attendance recorded

---

## Validation Rules Tested

| Scenario | Expected behaviour |
| --- | --- |
| Duplicate registration | Second attempt blocked, "Already registered" shown |
| QR regenerated | Previous QR no longer accepted |
| Invalid or old QR scanned | "Invalid QR code" message |
| Scan without registration | "Not registered" message |
| Repeat scan | "Already checked in" message |
| Low-end smartphone | Pages load and QR scan works |

---

## Getting Started

### Prerequisites
- Node.js (v18 or later) and npm
- MySQL or PostgreSQL

### 1. Clone the repository
```bash
git clone https://github.com/goyaldisha15-hub/community-service-pr.git
cd community-service-pr
```

### 2. Set up the database
Create an empty database and run the schema file.
<!-- TODO: add schema file name, e.g. database/schema.sql -->

### 3. Run the backend
```bash
cd <backend-folder>      # TODO: e.g. server
npm install
cp .env.example .env     # TODO: confirm env file name
npm start
```

Example `.env` (TODO: match your actual variable names):
```
PORT=5000
DB_HOST=localhost
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=ngo_connect
JWT_SECRET=your_secret
```

### 4. Run the frontend
```bash
cd <frontend-folder>     # TODO: e.g. client
npm install
npm start
```

Open the URL shown in the terminal (usually `http://localhost:3000`).

---

## Project Structure

```
community-service-pr/
├── <frontend-folder>/   # React app (admin dashboard + volunteer app)
├── <backend-folder>/    # Node + Express REST API
└── README.md
```
<!-- TODO: replace with the real folder names -->

---

## Development Approach

Agile, in six sprints with feedback from NGO staff at every stage:

1. Requirement gathering with the NGO
2. UI/UX design (wireframes)
3. Backend, database and authentication
4. QR generation and scanning
5. Testing with a mock event and the NGO's staff and users
6. Deployment and feedback-based improvements

---

## Community Partner

**Netra Jyoti Ek Prayas** - *Together for a Better Tomorrow*
1st Floor, M/s Vansons, Opp. Pillar No. 68, Bypass, Palwal, Haryana

The working build was demonstrated and tried out with the NGO's staff and users, and the project was rated **Excellent** (conduct, punctuality and technical approach) in the partner's Certificate of Community Engagement & Project Validation.

---

## UN SDGs Advanced

- **SDG 11** - Sustainable Cities & Communities: inclusive participation through easy digital access
- **SDG 16** - Peace, Justice & Strong Institutions: accurate, timestamped attendance for transparency
- **SDG 17** - Partnerships for the Goals: shared, reliable data for NGO, volunteers and participants

---

## Future Scope

- SMS and WhatsApp reminders for registered participants
- Digital participation certificates after check-in
- Participation analytics across events and campaigns
- Multiple simultaneous events and multiple NGOs

---

## Team Eclipse

| Roll No. | Name |
| --- | --- |
| 2501730418 | Adarsh |
| 2501730470 | Shraddha |
| 2501730484 | Jahan |
| 2501730433 | Disha Goyal |
| 2501730487 | Akash |

**Faculty Mentor:** Himanshi Yadav
