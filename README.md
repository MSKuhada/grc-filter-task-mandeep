# GRC Risk Assessment & Heatmap Dashboard

This project is a full-stack **Governance, Risk, and Compliance (GRC)** application that implements a standard **Likelihood × Impact risk assessment matrix**, commonly used in ISO 27001 and NIST-aligned GRC tools.

The purpose of this task is to demonstrate the ability to independently design and build a complete working application covering backend APIs, data persistence, frontend interactivity, and visualization.

---

## 1. Setup / Run Instructions (Step-by-Step)

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm
- Git

---

### Clone the Repository

```bash
git clone https://github.com/MSKuhada/grc-filter-task-mandeep.git
cd grc-filter-task-mandeep


###Backend Setup & Run
cd backend
pip install -r requirements.txt
uvicorn app:app --reload

###Backend runs at: 
http://localhost:8000

###Frontend Setup & Run
cd frontend
npm install
npm start

###Frontend runs at:
http://localhost:3000

###What the Application Does

###The application allows users to:

Add risks by entering:

Asset name

Threat description

Likelihood (1–5)

Impact (1–5)

Automatically calculate:

Risk score = Likelihood × Impact

Risk level (Low / Medium / High / Critical)

Store risks persistently in a SQLite database

View all risks in a dashboard table

Visualize risks on a 5×5 heatmap

Export the risk register as CSV

###3. Backend API Endpoints
POST /assess-risk

Creates a new risk assessment.

Request Body

{
  "asset": "Customer Database",
  "threat": "Unauthorized Access",
  "likelihood": 3,
  "impact": 4
}


###Validation

Likelihood and Impact must be integers between 1 and 5

Invalid input returns HTTP 400 with a clear error message

Business Logic

score = likelihood × impact

Risk level mapping:

1–5 → Low

6–12 → Medium

13–18 → High

19–25 → Critical

GET /risks

Returns all stored risks

Supports optional filtering:

/risks?level=High

###4. Frontend Features
Risk Input Form

Text inputs for asset and threat

Sliders for likelihood and impact (1–5)

Real-time preview:

Preview Score: X | Level: Y


Submits data to backend using Fetch API

Dashboard

Table displaying all risks

Columns: ID, Asset, Threat, Likelihood, Impact, Score, Level

Sorting by score

Filter by risk level (All / Low / Medium / High / Critical)

Heatmap Visualization

5×5 grid (Likelihood vs Impact)

Each cell shows count of risks

Color-coded by severity:

Green → Low

Yellow → Medium

Orange → High

Red → Critical

Hover displays asset names in the cell

Summary Statistics

Total number of risks

Number of High and Critical risks

Average risk score

###5. Screenshots

(Add screenshots before submission)

Risk input form with real-time score preview

Dashboard with populated risk table

Heatmap showing risk distribution

###6. Challenges Faced & Notes

Handled asynchronous API calls using useEffect in React

Ensured frontend preview logic matched backend scoring logic

Configured CORS between frontend and backend

Implemented heatmap manually to keep dependencies minimal

Ensured the application runs locally without external services

###7. Edge Cases Tested

Empty database (no risks added)

Invalid likelihood or impact values

Duplicate risks allowed

Multiple risks in the same heatmap cell

Larger datasets (50+ risks)

###8. Assumptions

No authentication required (explicitly out of scope)

Single-user local usage

SQLite used for simplicity

No edit or delete functionality for risks

Focused on core GRC risk assessment features only

###9. Bonus Features

CSV export of the risk register

Mitigation guidance based on risk level

Auto-generated API documentation via FastAPI

##10. Conclusion

This project demonstrates a complete implementation of a GRC risk assessment workflow using a likelihood × impact matrix. It showcases backend API design, business logic, persistence, frontend interactivity, and visualization aligned with real-world GRC and compliance practices.


---

### ✅ What to do now
1. Create a file named **README.md**
2. Paste everything above
3. Save
4. Run:
```bash
git add README.md
git commit -m "Add detailed README"
git push