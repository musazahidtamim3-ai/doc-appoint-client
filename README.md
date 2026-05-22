# 🩺 DocAppoint

A secure, scalable, and production-ready Express.js backend for managing doctor appointments, featuring robust identity verification and structured MongoDB database storage.

🌐 **Live Production URL:** [https://doc-appoint.vercel.app](https://doc-appoint-indol.vercel.app/)

---

## 🚀 Key Features

* **Secure Authentication Layer:** Integrated with `jose-cjs` using remote JSON Web Key Sets (JWKS) to validate user identity tokens seamlessly without compromising cryptographic secrets.
* **Smart Search Filter Engine:** Implements advanced MongoDB case-insensitive `$regex` matching, enabling multi-criteria searches by doctor name or specialty via a single API endpoint.
* **Isolated User Booking Management:** Restricts appointment retrieval dynamically based on validated token identity payloads, ensuring clients can only fetch and control their personal schedules.
* **On-Demand Database Seeding:** Built-in intelligent bootstrap mechanism that checks data density at launch and automatically seeds pre-configured medical specialist directory data if collections are empty.
* **Optimized Serverless Infrastructure:** Pre-configured with architectural routing rules tailored specifically for efficient, low-latency execution as decoupled microservices on Vercel Node runtimes.

---

## 🛠️ Tech Stack & Dependencies

* **Runtime & Framework:** Node.js, Express.js
* **Database:** MongoDB
* **Security & Tokens:** `jose-cjs` (JSON Web Token verification via JWKS)
* **Cross-Origin Resource Sharing:** CORS Middleware


   cd doc-appoint-backend
