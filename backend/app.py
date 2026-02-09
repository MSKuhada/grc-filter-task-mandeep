from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import sqlite3
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# ---------- CORS (for React frontend) ----------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

DB_NAME = "risks.db"

# ---------- Database Helper ----------
def get_db():
    return sqlite3.connect(DB_NAME)

# ---------- Create Table on Startup ----------
@app.on_event("startup")
def init_db():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS risks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            asset TEXT,
            threat TEXT,
            likelihood INTEGER,
            impact INTEGER,
            score INTEGER,
            level TEXT
        )
    """)
    conn.commit()
    conn.close()

# ---------- Request Model ----------
class RiskInput(BaseModel):
    asset: str
    threat: str
    likelihood: int
    impact: int

# ---------- Business Logic ----------
def calculate_level(score: int) -> str:
    if 1 <= score <= 5:
        return "Low"
    elif 6 <= score <= 12:
        return "Medium"
    elif 13 <= score <= 18:
        return "High"
    else:
        return "Critical"

def compliance_hint(level: str) -> str:
    return {
        "Low": "Accept / Monitor",
        "Medium": "Plan mitigation within 6 months",
        "High": "Prioritize action per NIST PR.AC",
        "Critical": "Immediate mitigation + executive reporting"
    }[level]

# ---------- POST: Assess Risk ----------
@app.post("/assess-risk")
def assess_risk(risk: RiskInput):

    # Validation
    if not (1 <= risk.likelihood <= 5 and 1 <= risk.impact <= 5):
        raise HTTPException(
            status_code=400,
            detail="Invalid range: Likelihood and Impact must be 1–5."
        )

    score = risk.likelihood * risk.impact
    level = calculate_level(score)

    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO risks (asset, threat, likelihood, impact, score, level)
        VALUES (?, ?, ?, ?, ?, ?)
    """, (risk.asset, risk.threat, risk.likelihood, risk.impact, score, level))
    conn.commit()

    risk_id = cursor.lastrowid
    conn.close()

    return {
        "id": risk_id,
        "asset": risk.asset,
        "threat": risk.threat,
        "likelihood": risk.likelihood,
        "impact": risk.impact,
        "score": score,
        "level": level,
        "hint": compliance_hint(level)
    }

# ---------- GET: Fetch Risks ----------
@app.get("/risks")
def get_risks(level: str | None = None):

    conn = get_db()
    cursor = conn.cursor()

    if level:
        cursor.execute(
            "SELECT * FROM risks WHERE level = ?",
            (level,)
        )
    else:
        cursor.execute(
            "SELECT * FROM risks"
        )

    rows = cursor.fetchall()
    conn.close()

    risks = []
    for r in rows:
        risks.append({
            "id": r[0],
            "asset": r[1],
            "threat": r[2],
            "likelihood": r[3],
            "impact": r[4],
            "score": r[5],
            "level": r[6],
            "hint": compliance_hint(r[6])
        })

    return risks
