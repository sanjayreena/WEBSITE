import React, { useState } from "react";
import "./App.css";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxD_yO6MxwNg2uAms705_Fz1wfvlSwaehZJaOITZ2lVYWvjkNDmxOQrEk9clnG2skGmEg/exec";

const initialForm = {
  name: "",
  age: "",
  height: "",
  weight: "",
  instagram: "",
  occupation: "",
  goal: "",
  activity: "",
  highActivity: "",
  injury: "",
  medical: "",
  location: "",
  whatsapp: "",
  diet: "",
  budget: "",
  experience: "",
  commitment: "",
  trainingPlace: "",
  callTiming: "",
  reason: "",
  startDate: "",
  consent: false,
};

const Field = ({ label, name, children }) => (
  <div className="field">
    <label htmlFor={name}>
      {label} <span>*</span>
    </label>
    {children}
  </div>
);

const Input = ({ name, placeholder, type = "text", form, update }) => (
  <input
    id={name}
    type={type}
    name={name}
    value={form[name]}
    onChange={update}
    placeholder={placeholder}
    required
  />
);

const Select = ({ name, options, form, update }) => (
  <select id={name} name={name} value={form[name]} onChange={update} required>
    <option value="">Select an option</option>
    {options.map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ))}
  </select>
);

const Radio = ({ name, options, form, update }) => (
  <div className="choice-row">
    {options.map((option) => (
      <label className="choice" key={option}>
        <input
          type="radio"
          name={name}
          value={option}
          checked={form[name] === option}
          onChange={update}
          required
        />
        <span>{option}</span>
      </label>
    ))}
  </div>
);

function App() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);

  const update = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  
const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.consent) {
      alert("Please accept the privacy policy.");
      return;
    }
    if (loading) return;
    setLoading(true);

    const payload = {
      name: form.name, age: form.age, height: form.height, weight: form.weight,
      instagram: form.instagram, occupation: form.occupation, goal: form.goal,
      activity: form.activity, highActivity: form.highActivity,
      injury: form.injury, medical: form.medical, location: form.location,
      whatsapp: form.whatsapp, diet: form.diet, budget: form.budget,
      experience: form.experience, commitment: form.commitment,
      trainingPlace: form.trainingPlace, callTiming: form.callTiming,
      reason: form.reason, startDate: form.startDate
    };

    try {
      // Google Apps Script browser requests: text/plain avoids CORS preflight.
      // no-cors responses are opaque, so the browser cannot verify sheet writes.
      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload)
      });

      alert("Application sent.");
      setForm(initialForm);
    } catch (error) {
      console.error("Registration submission error:", error);
      alert("Could not send your application. Check your internet connection and try again.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <main className="registration-page">
      <div className="registration-layout">
        <section className="form-panel">
          <div className="brand">
            <span className="brand-dot" />
            SANJAY <span className="brand-accent">FITNESS</span>
          </div>

          <div className="form-heading">
            <span className="eyebrow">PERSONAL COACHING APPLICATION</span>
            <h1>
              Start your
              <br />
              <span>transformation.</span>
            </h1>
            <p>
              Your goals deserve a personalized approach. Complete this
              application to begin your coaching journey.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <section className="form-section">
              <div className="section-heading">
                <span className="section-number">01</span>
                <h2>Personal Information</h2>
              </div>

              <div className="form-grid">
                <div className="field full">
                  <Field label="Full Name" name="name">
                    <Input
                      name="name"
                      placeholder="Your full name"
                      form={form}
                      update={update}
                    />
                  </Field>
                </div>

                <Field label="Age" name="age">
                  <Input
                    name="age"
                    type="number"
                    placeholder="Age"
                    form={form}
                    update={update}
                  />
                </Field>

                <Field label="Height (cm)" name="height">
                  <Input
                    name="height"
                    type="number"
                    placeholder="Height"
                    form={form}
                    update={update}
                  />
                </Field>

                <Field label="Weight (kg)" name="weight">
                  <Input
                    name="weight"
                    type="number"
                    placeholder="Weight"
                    form={form}
                    update={update}
                  />
                </Field>

                <Field label="Instagram Username" name="instagram">
                  <Input
                    name="instagram"
                    placeholder="@username"
                    form={form}
                    update={update}
                  />
                </Field>

                <div className="field full">
                  <Field label="Occupation" name="occupation">
                    <Select
                      name="occupation"
                      options={["Student", "Working", "Business", "Other"]}
                      form={form}
                      update={update}
                    />
                  </Field>
                </div>

                <Field label="Current Living In" name="location">
                  <Input
                    name="location"
                    placeholder="City / Country"
                    form={form}
                    update={update}
                  />
                </Field>

                <Field label="WhatsApp Number" name="whatsapp">
                  <Input
                    name="whatsapp"
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                    form={form}
                    update={update}
                  />
                </Field>
              </div>
            </section>

            <section className="form-section">
              <div className="section-heading">
                <span className="section-number">02</span>
                <h2>Fitness Profile</h2>
              </div>

              <div className="form-grid">
                <div className="field full">
                  <Field label="Goal" name="goal">
                    <Select
                      name="goal"
                      options={[
                        "Muscle Gain",
                        "Fat Loss",
                        "Body Recomposition",
                        "Strength",
                        "General Fitness",
                        "Other",
                      ]}
                      form={form}
                      update={update}
                    />
                  </Field>
                </div>

                <div className="field full">
                  <Field label="Activity Level" name="activity">
                    <Select
                      name="activity"
                      options={[
                        "Sedentary",
                        "Lightly Active",
                        "Moderately Active",
                        "Very Active",
                        "Extremely Active",
                      ]}
                      form={form}
                      update={update}
                    />
                  </Field>
                </div>

                <div className="field full">
                  <Field
                    label="Does your work involve high activity?"
                    name="highActivity"
                  >
                    <Radio
                      name="highActivity"
                      options={["Yes", "No"]}
                      form={form}
                      update={update}
                    />
                  </Field>
                </div>

                <div className="field full">
                  <label htmlFor="injury">Previous Injury</label>
                  <textarea
                    id="injury"
                    name="injury"
                    value={form.injury}
                    onChange={update}
                    placeholder="Mention previous injuries..."
                  />
                </div>

                <div className="field full">
                  <label htmlFor="medical">Medical Conditions</label>
                  <textarea
                    id="medical"
                    name="medical"
                    value={form.medical}
                    onChange={update}
                    placeholder="Mention relevant medical conditions..."
                  />
                </div>

                <div className="field full">
                  <Field label="Fitness Experience" name="experience">
                    <textarea
                      id="experience"
                      name="experience"
                      value={form.experience}
                      onChange={update}
                      placeholder="Gym, sports, training experience..."
                      required
                    />
                  </Field>
                </div>

                <div className="field full">
                  <Field label="Preferred Training Place" name="trainingPlace">
                    <Radio
                      name="trainingPlace"
                      options={["Home Workout", "Gym"]}
                      form={form}
                      update={update}
                    />
                  </Field>
                </div>
              </div>
            </section>

            <section className="form-section">
              <div className="section-heading">
                <span className="section-number">03</span>
                <h2>Diet & Lifestyle</h2>
              </div>

              <div className="form-grid">
                <div className="field full">
                  <Field label="Diet Preference" name="diet">
                    <Radio
                      name="diet"
                      options={["Non-Veg", "Veg"]}
                      form={form}
                      update={update}
                    />
                  </Field>
                </div>

                <div className="field full">
                  <Field label="Monthly Budget for Diet" name="budget">
                    <Select
                      name="budget"
                      options={[
                        "Below ₹3,000",
                        "₹3,000 – ₹5,000",
                        "₹5,000 – ₹8,000",
                        "₹8,000 – ₹12,000",
                        "Above ₹12,000",
                      ]}
                      form={form}
                      update={update}
                    />
                  </Field>
                </div>
              </div>
            </section>

            <section className="form-section">
              <div className="section-heading">
                <span className="section-number">04</span>
                <h2>Coaching Commitment</h2>
              </div>

              <div className="form-grid">
                <div className="field full">
                  <Field label="Dedication Level (1–10)" name="commitment">
                    <Select
                      name="commitment"
                      options={Array.from({ length: 10 }, (_, i) =>
                        String(i + 1),
                      )}
                      form={form}
                      update={update}
                    />
                  </Field>
                </div>

                <div className="field full">
                  <Field label="Preferred Call Timing" name="callTiming">
                    <Select
                      name="callTiming"
                      options={[
                        "Morning (6 AM – 9 AM)",
                        "Late Morning (9 AM – 12 PM)",
                        "Afternoon (12 PM – 4 PM)",
                        "Evening (4 PM – 8 PM)",
                        "Night (8 PM – 10 PM)",
                      ]}
                      form={form}
                      update={update}
                    />
                  </Field>
                </div>

                <div className="field full">
                  <Field label="Why do you wish to work with us?" name="reason">
                    <textarea
                      id="reason"
                      name="reason"
                      value={form.reason}
                      onChange={update}
                      placeholder="Tell us your motivation..."
                      required
                    />
                  </Field>
                </div>

                <div className="field full">
                  <Field
                    label="How early are you willing to start?"
                    name="startDate"
                  >
                    <Select
                      name="startDate"
                      options={[
                        "Immediately",
                        "Within 7 days",
                        "Within 15 days",
                        "Within 30 days",
                        "Just exploring",
                      ]}
                      form={form}
                      update={update}
                    />
                  </Field>
                </div>
              </div>
            </section>

            <div className="consent-box">
              <label className="consent-label">
                <input
                  type="checkbox"
                  name="consent"
                  checked={form.consent}
                  onChange={update}
                  required
                />
                <span>
                  I agree to the privacy policy and consent to my information
                  being collected for fitness coaching.
                </span>
              </label>
            </div>

            <button className="submit-btn" type="submit" disabled={loading}>
              {loading ? "SUBMITTING..." : "SUBMIT APPLICATION"}
              <span>{loading ? "..." : "↗"}</span>
            </button>

            <p className="form-footer">YOUR TRANSFORMATION STARTS HERE.</p>
          </form>
        </section>

        <aside className="visual-panel">
          <div className="visual-overlay" />
          <div className="visual-content">
            <span className="visual-tag">YOUR NEXT CHAPTER</span>
            <h2>
              BUILD THE
              <br />
              <span>BEST VERSION</span>
              <br />
              OF YOURSELF.
            </h2>
            <p>
              Discipline. Consistency. Progress. Your journey begins with one
              decision.
            </p>
            <div className="visual-bottom">
              <span className="visual-line" />
              <span>PERSONALIZED FITNESS COACHING</span>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}

export default App;
