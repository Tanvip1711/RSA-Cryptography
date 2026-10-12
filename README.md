# 🔐 RSA Cryptography Laboratory

An interactive web-based laboratory that demonstrates the working of the **RSA (Rivest–Shamir–Adleman) public-key cryptography algorithm** through a C++ backend and a responsive web frontend.

The application allows users to encrypt plaintext into ciphertext and decrypt it back to the original message while exploring RSA key generation, mathematical operations, and cryptographic parameters through an interactive interface.

## 🌐 Live Demo

**Live Application:** https://6ab67557b57c8d64b9f4b276--glowing-druid-bf4ab0.netlify.app/

**GitHub Repository:** https://github.com/Tanvip1711/RSA-Cryptography

## 📌 Project Overview

RSA Cryptography Laboratory is an educational application designed to make public-key cryptography easier to understand through practical implementation.

Instead of learning RSA only through mathematical equations, users can enter messages, generate ciphertext, decrypt encrypted messages, and view the mathematical parameters involved in the encryption process.

The project combines a C++ implementation of RSA with a REST API built using Crow and a web-based interface developed using HTML, CSS, and JavaScript.

## ✨ Features

- **Text Encryption:** Convert plaintext messages into encrypted integer sequences.
- **Text Decryption:** Recover the original message from a valid ciphertext sequence.
- **RSA Key Generation:** Calculate RSA parameters using two prime numbers.
- **Public and Private Keys:** Display the generated RSA key pairs.
- **Mathematical Visualization:** Explore the calculations used during RSA key generation.
- **Interactive Encryption Flow:** Visualize the stages involved in encryption and decryption.
- **Operation Monitor:** View the input, cryptographic key, output, and operation status.
- **REST API Integration:** Connect the frontend to a C++ backend through HTTP requests.
- **Live Deployment:** Access the application online without running the backend locally.
- **Responsive Interface:** Use the application on desktop and mobile browsers.

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| C++ | RSA algorithm implementation |
| Crow | C++ web framework and REST API |
| HTML5 | Frontend structure |
| CSS3 | Styling and responsive interface |
| JavaScript | User interactions and API communication |
| JSON | Request and response data exchange |
| Git and GitHub | Version control and source code management |
| Render | Backend deployment |
| Netlify | Frontend deployment |

## 🧮 How RSA Works

RSA is an asymmetric cryptographic algorithm that uses a public key for encryption and a private key for decryption.

### 1. Key Generation

Two distinct prime numbers are selected:

- \(p = 61\)
- \(q = 53\)

Calculate the modulus:

\[
n = p \times q = 61 \times 53 = 3233
\]

Calculate Euler's totient:

\[
\phi(n)=(p-1)(q-1)=3120
\]

Choose a public exponent \(e\) such that:

\[
\gcd(e,\phi(n))=1
\]

For this implementation:

\[
e=7
\]

Calculate the private exponent \(d\), satisfying:

\[
(ed)\bmod \phi(n)=1
\]

The resulting private exponent is:

\[
d=1783
\]

**Public Key:** \((7,3233)\)

**Private Key:** \((1783,3233)\)

### 2. Encryption

Each character is represented by its numeric character value \(m\). Encryption is performed using the public key:

\[
c=m^e\bmod n
\]

Where:
- \(m\) = numeric representation of the plaintext character
- \(e\) = public exponent
- \(n\) = modulus
- \(c\) = encrypted value

### 3. Decryption

The ciphertext is decrypted using the private key:

\[
m=c^d\bmod n
\]

The resulting numeric values are converted back into characters to reconstruct the original message.

## 🖥️ Application Workflow

1. The user enters a plaintext message.
2. The frontend sends the message to the C++ backend.
3. The backend processes the message using the RSA encryption algorithm.
4. The encrypted integer sequence is returned to the frontend.
5. The user can use the ciphertext to perform decryption.
6. The backend decrypts the ciphertext using the private key.
7. The recovered plaintext is displayed on the interface.

## 🏗️ Project Structure

```text
RSA-Cryptography/
│
├── backend/
│   ├── main.cpp
│   ├── rsa.cpp
│   ├── rsa.h
│   ├── Dockerfile
│   └── include/
│       └── crow/
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
└── README.md
```

## 🚀 Running the Project Locally

### Prerequisites

- C++ compiler supporting C++17
- Crow headers and their required dependencies
- Git
- A modern web browser

### Step 1: Clone the repository

```bash
git clone https://github.com/Tanvip1711/RSA-Cryptography.git
cd RSA-Cryptography
```

### Step 2: Compile the backend on Windows

Open the terminal in the backend directory:

```powershell
cd backend
g++ main.cpp rsa.cpp -Iinclude -std=c++17 -o rsa_server.exe -lws2_32 -lmswsock
```

### Step 3: Start the backend

```powershell
.\rsa_server.exe
```

The local backend will run at:

```text
http://localhost:18080
```

### Step 4: Open the frontend

Open `frontend/index.html` in a browser.

For local testing, ensure that the API URL in `frontend/script.js` points to the local backend:

```javascript
const API_URL = "http://localhost:18080";
```

For the deployed application, use the Render backend URL instead.

## 🔌 Backend API Endpoints

The Crow backend exposes the following endpoints:

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Check backend availability |
| GET | `/keys` | Retrieve RSA parameters and keys |
| POST | `/encrypt` | Encrypt a numeric message |
| POST | `/decrypt` | Decrypt a numeric ciphertext |
| POST | `/encrypt-text` | Encrypt a text message |
| POST | `/decrypt-text` | Decrypt a ciphertext sequence |

### Example: Encrypt Text

**Request**

```http
POST /encrypt-text
Content-Type: application/json
```

```json
{
  "message": "HELLO"
}
```

**Example response**

```json
{
  "success": true,
  "message": "HELLO",
  "encrypted": [1087, 155, 83, 83, 913]
}
```

### Example: Decrypt Text

**Request**

```http
POST /decrypt-text
Content-Type: application/json
```

```json
{
  "cipher": [1087, 155, 83, 83, 913]
}
```

**Example response**

```json
{
  "success": true,
  "decrypted": "HELLO"
}
```

## 🌍 Deployment Architecture

The application is deployed using separate frontend and backend services.

```text
User Browser
     |
     v
Netlify Frontend
HTML + CSS + JavaScript
     |
     | HTTPS / JSON API Requests
     v
Render Backend
C++ + Crow REST API
     |
     v
RSA Cryptographic Engine
Key Generation / Encryption / Decryption
```

- **Frontend hosting:** Netlify
- **Backend hosting:** Render
- **Communication:** HTTP REST API with JSON
- **Cross-origin access:** CORS configured for frontend-backend communication

## 🎯 Learning Outcomes

This project demonstrates practical understanding of:

- Asymmetric cryptography and public-key infrastructure concepts.
- Prime numbers, greatest common divisor, and Euler's totient function.
- Modular exponentiation and modular multiplicative inverses.
- Object-oriented programming in C++.
- REST API development using Crow.
- Frontend-backend integration using JavaScript `fetch()`.
- JSON-based communication between services.
- GitHub version control and cloud deployment.

## ⚠️ Security Disclaimer

This project is intended **strictly for educational and demonstration purposes**.

It uses small prime numbers (\(p=61\), \(q=53\)) and textbook RSA applied independently to individual character values. These choices make the algorithm easier to understand but are not suitable for protecting real-world information.

The implementation does not provide production-grade RSA security, randomized encryption padding, or a complete secure communication protocol.

For real-world applications, use a trusted cryptographic library and established standards, such as RSA-OAEP for encryption, with appropriately sized keys.

## 🔮 Future Enhancements

- Implement secure RSA-OAEP encryption using a standard cryptographic library.
- Add support for configurable key sizes and improved key generation.
- Introduce a detailed step-by-step modular exponentiation visualization.
- Add automated backend and API tests.
- Improve error handling and input validation.
- Add downloadable encryption results and operation history.
- Expand the interface with additional cryptographic algorithm demonstrations.


---

*RSA Cryptography Laboratory — Learn public-key cryptography through interactive implementation.*
