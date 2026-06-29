import { auth, db } from "./firebase.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

document.getElementById("loginBtn").onclick = async () => {

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    console.log("1 - trying login");

    const userCred = await signInWithEmailAndPassword(auth, email, password);

    console.log("2 - login success", userCred.user.uid);

    const user = userCred.user;

    const ref = doc(db, "users", user.uid);
    const snap = await getDoc(ref);

    console.log("3 - firestore checked");

    if (!snap.exists()) {
      console.log("NO USER IN FIRESTORE");
      alert("User not found in database");
      return;
    }

    console.log("ROLE:", snap.data().role);

    alert("LOGIN SUCCESS");

    window.location.href = "dashboard.html";

  } catch (error) {
    console.log("LOGIN ERROR:", error.message);
    alert(error.message);
  }
};
