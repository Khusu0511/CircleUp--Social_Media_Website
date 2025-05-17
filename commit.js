// commit.js - Use this for all future commits.

import moment from 'moment';
import simpleGit from 'simple-git';

// --- CONFIGURATION ---
// The message for this specific commit.
// We get it from the command line argument (e.g., node commit.js "Added login feature")
const commitMessage = process.argv[2] || "Making progress on project";
// ---------------------

const git = simpleGit();

async function run() {
  try {
    // 1. Get the date of the very last commit
    const lastCommitLog = await git.log(['-1']);
    if (!lastCommitLog.latest) {
        console.error("❌ Could not find the last commit. Please run the initial setup script first.");
        return;
    }
    const lastCommitDate = lastCommitLog.latest.date;
    console.log(`Last commit was on: ${lastCommitDate}`);

    // 2. Calculate the new date by adding 1 day
    const newCommitDate = moment(lastCommitDate).add(26, 'days');
    const newGitDate = newCommitDate.toISOString();
    console.log(`New commit will be dated: ${newCommitDate.format("YYYY-MM-DD HH:mm:ss")}`);

    // 3. Stage all changed files
    await git.add('./*');
    console.log("✅ All changed files staged.");

    // 4. Set environment variables for the new date
    process.env.GIT_AUTHOR_DATE = newGitDate;
    process.env.GIT_COMMITTER_DATE = newGitDate;

    // 5. Commit with the new date and message
    await git.commit(commitMessage, {
      "--date": newGitDate,
    });
    console.log(`✅ Commit created with message: "${commitMessage}"`);

    // 6. Push to GitHub
    await git.push("origin", "main");
    console.log("✅ Pushed commit to GitHub successfully!");

  } catch (err) {
    console.error("❌ An error occurred:", err);
  }
}

run();
