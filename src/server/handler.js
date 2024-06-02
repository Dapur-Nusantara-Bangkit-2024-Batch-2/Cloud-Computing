const admin = require("firebase-admin");
const serviceAccount = require("./firebaseServiceAccount.json");

// Inisialisasi Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const registerHandler = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });

    res.status(201).send({ message: "User registered successfully", uid: userRecord.uid });
  } catch (error) {
    res.status(400).send({ message: "Error registering user", error: error.message });
  }
};

const loginHandler = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await admin.auth().getUserByEmail(email);
    // In a real-world application, you would use a custom authentication mechanism here
    // Since Firebase Admin SDK does not support password validation, you might use Firebase Client SDK for this.
    // Here we just simulate the login process.

    res.status(200).send({ message: "User logged in successfully", uid: user.uid });
  } catch (error) {
    res.status(400).send({ message: "Error logging in user", error: error.message });
  }
};

module.exports = { registerHandler, loginHandler };
