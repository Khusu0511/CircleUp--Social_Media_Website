// commit-past.js - A script to commit all project files with a past date.
// This script is correct and ready to use.

import moment from 'moment';
import simpleGit from 'simple-git';

console.log("🚀 Script starting...");

// --- CONFIGURATION ---
// Set how many days in the past you want the commit to be.
const DAYS_AGO = 133; 
// ---------------------

const commitDate = moment().subtract(DAYS_AGO, "days").format("YYYY-MM-DD HH:mm:ss");
const gitDate = moment(commitDate).toISOString();

// Initialize simple-git
const git = simpleGit();

async function run() {
  try {
    console.log("Staging files...");
    // This command adds ALL files and folders in the project
    await git.add('./*');
    console.log("✅ All project files staged.");

    // Set environment variables for the git process
    process.env.GIT_AUTHOR_DATE = gitDate;
    process.env.GIT_COMMITTER_DATE = gitDate;
    console.log(`Setting commit date to: ${gitDate}`);

    console.log("Committing files...");
    await git.commit(`Initial project setup: Backend and Frontend structure`, {
      "--date": gitDate,
    });
    console.log(`✅ Commit created with past date: ${commitDate}`);

    console.log("Pushing to GitHub...");
    // A regular push might fail if history has been rewritten.
    await git.push("origin", "main"); 
    console.log("✅ Pushed commit to GitHub successfully!");

  } catch (err) {
    // If the push fails, it's likely because the remote history conflicts with your new local history.
    if (err.message.includes('rejected')) {
        console.warn("⚠️ Push was rejected. This is expected when rewriting history.");
        console.warn("To fix this, run the following command manually:");
        console.warn("git push --force origin main");
    } else {
        console.error("❌ An error occurred during the git process:");
        console.error(err);
    }
  } finally {
    console.log("🏁 Script finished.");
  }
}

// Execute the function
run();
