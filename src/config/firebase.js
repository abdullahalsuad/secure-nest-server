import fs from "fs"; // To read files
import path from "path"; // To build file paths
import { fileURLToPath } from "url"; // To get current file's path
import admin from "firebase-admin";

// Step 2: Get current file and folder path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const serviceAccountPath = path.resolve(__dirname, "serviceAccountKey.json");

const fileData = fs.readFileSync(serviceAccountPath, "utf8");
const serviceAccount = JSON.parse(fileData);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;
