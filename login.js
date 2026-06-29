import { auth, db } from "./firebase.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

document.getElementById("loginBtn").onclick = async () => {

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {

    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // 👇 مهم جداً: نجيب role من Firestore
    const userSnap = await getDoc(doc(db, "users", user.uid));

    if (!userSnap.exists()) {
      alert("User not found in database");
      return;
    }

    const role = userSnap.data().role;

    // نخزن role في localStorage
    localStorage.setItem("role", role);

    // تحويل
    window.location.href = "dashboard.html";

  } catch (e) {
    alert("Login failed");
    console.log(e);
  }
};
