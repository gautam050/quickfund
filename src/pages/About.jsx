import React from "react";
import Header from "../components/Header";
import "./About.css";

export default function About() {
  return (
    <div className="about-page dark-theme">
      <Header />  {/* ✅ Keep your existing header */}

      <main className="about-container">
        <h1 className="about-title">About QuickFund</h1>
        <p className="about-subtitle">
          Empowering financial freedom through smart, transparent, and hassle-free lending.
        </p>

        <div className="about-content">
          <section>
            <h2>Who We Are</h2>
            <p>
              QuickFund is a next-generation digital lending platform that brings you instant,
              paperless, and secure loan solutions. Whether it’s funding your goals, managing
              emergencies, or expanding your business — we make borrowing simple and stress-free.
            </p>
          </section>

          <section>
            <h2>Our Mission</h2>
            <p>
              To make access to credit seamless, transparent, and inclusive for everyone. We
              leverage technology and data analytics to provide fair and fast loan approvals that
              empower users to take control of their financial future.
            </p>
          </section>

          <section>
            <h2>Why Choose QuickFund?</h2>
            <ul>
              <li>⚡ Instant loan approval and disbursal</li>
              <li>💸 Transparent interest rates, no hidden charges</li>
              <li>📊 Smart EMI calculator and repayment tracker</li>
              <li>🔒 100% secure and paperless process</li>
              <li>🤝 Reliable customer support team</li>
            </ul>
          </section>

          <section>
            <h2>Our Vision</h2>
            <p>
              To create a financially empowered community where access to credit helps individuals
              and businesses achieve their dreams — responsibly and confidently.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
