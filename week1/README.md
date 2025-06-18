# 📋 React Registration Form with Validation

This project is a simple React-based registration form that performs **real-time validation** without using any third-party form libraries. It showcases form validation, controlled inputs, dynamic dropdowns, password show/hide functionality, and navigation on successful form submission.

---

## 🚀 Features

* ✅ Required field validation
* ✅ Real-time error display
* ✅ Submit button disabled until form is valid
* ✅ Show/Hide password toggle
* ✅ Country and city dropdown (dependent)
* ✅ Form data displayed on a new route after submission
* ✅ No third-party validation libraries used

---

## 🛠️ Technologies Used

* **React** (with hooks)
* **React Router DOM** (for routing)
* **Pure JavaScript validation**
* **Tailwind CSS** 

---

## 🧾 Form Fields

1. First Name (required)
2. Last Name (required)
3. Username (required)
4. E-mail (required, must be valid format)
5. Password (required, with show/hide toggle)
6. Phone Number

   * Country Code (e.g. `+91`)
   * Number (required)
7. Country (dropdown, required)
8. City (dropdown based on country, required)
9. PAN Number (required, format: `ABCDE1234F`)
10. Aadhar Number (required, 12 digits)

---

## 📦 Installation

```bash
git clone https://github.com/Shinkhal/Celebal_Tech
cd Celebal_Tech
cd week1
npm install
npm start
```

---

## 🧪 Usage

1. Fill out the form on the home page (`/`).
2. The "Submit" button will be disabled until all fields are valid.
3. Upon successful submission, you will be redirected to the `/success` page showing all submitted values.

---

## 📁 Folder Structure

```
src/
├── components/
│   ├── FormPage.jsx
│   └── SuccessPage.jsx
├── App.jsx
└── index.js
```

---

## 🔐 Validation Rules

| Field         | Rule                            |
| ------------- | ------------------------------- |
| Email         | Must be a valid email format    |
| Phone Number  | Must be a valid phone number format |
| Country Code  | Must be a valid country code    |
|Password       | Must be a strong password       |
| PAN Number    | 10 characters (e.g. ABCDE1234F) |
| Aadhar Number | 12 digits only                  |
| All Fields    | Required                        |

---