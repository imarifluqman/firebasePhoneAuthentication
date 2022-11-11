import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.0/firebase-app.js";
import {
  getAuth,
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from "https://www.gstatic.com/firebasejs/9.12.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDfm66buAbDSxN3TW3vQESleoZ9ektFexo",
  authDomain: "todo-15e87.firebaseapp.com",
  projectId: "todo-15e87",
  storageBucket: "todo-15e87.appspot.com",
  messagingSenderId: "346701013746",
  appId: "1:346701013746:web:ba675f16de9dd86427666b",
  measurementId: "G-R6TQM6CDK1"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const auth = getAuth(app)


let otpCode = document.getElementById("otpCode");
let otpReq = document.getElementById("otpReq");
let verify = document.getElementById("verify");


generateRecaptcha();

function generateRecaptcha() {
  window.recaptchaVerifier = new RecaptchaVerifier(
    "recaptcha-container",
    {
      size: "invisible",
      callback: (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        // recaptchaVerifier.render();
      },
    },
    auth
  );
}
otpReq.addEventListener("click", sendPhoneVerification);

function sendPhoneVerification() {

  let num = document.getElementById("number").value;
  const appVerifier = window.recaptchaVerifier;
  signInWithPhoneNumber(auth, num, appVerifier)
    .then((confirmationResult) => {
      window.confirmationResult = confirmationResult;
      
      console.log(window.confirmationResult);
    })
    .catch((error) => {
      console.log(error);
    });
}
