#!/usr/bin/env node

import chalk from "chalk";
import ora from "ora";
import readline from "readline";

const LEAKCHECK_API = "https://leakcheck.io/api/public?check=";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function clearScreen() {
  process.stdout.write("\x1B[2J\x1B[0f");
}

async function typeWriter(text, delay = 15) {
  for (const char of text) {
    process.stdout.write(char);
    await sleep(delay);
  }
  console.log();
}

async function animateBanner() {
  const art = [
    "",
    "   ____  _             _ _   _       _                _                ",
    "  / ___|| |_ ___  __ _| | |_| |__   | |    ___   ___ | | ___   _ _ __  ",
    "  \\___ \\| __/ _ \\/ _` | | __| '_ \\  | |   / _ \\ / _ \\| |/ / | | | '_ \\ ",
    "   ___) | ||  __/ (_| | | |_| | | | | |__| (_) | (_) |   <| |_| | |_) |",
    "  |____/ \\__\\___|\\__,_|_|\\__|_| |_| |_____\\___/ \\___/|_|\\_\\\\__,_| .__/ ",
    "                                                                 |_|    ",
  ];

  const lines = [
    "  +---------------------------------------------------------------+",
    ...art.map(l => l),
    "  +---------------------------------------------------------------+",
    "  |   Email Data Breach Checker              Developer: @zoxionx  |",
    "  +---------------------------------------------------------------+",
  ];

  console.log();
  for (const line of lines) {
    console.log(chalk.cyan.bold(line));
    await sleep(50);
  }
  console.log();
}

async function matrixRain(duration = 1500) {
  const chars = "01アイウエオカキクケコサシスセソ@#$%&";
  const width = 52;
  const startTime = Date.now();

  while (Date.now() - startTime < duration) {
    let line = "  ";
    for (let i = 0; i < width; i++) {
      const r = Math.random();
      if (r < 0.3) {
        line += chalk.green(chars[Math.floor(Math.random() * chars.length)]);
      } else if (r < 0.4) {
        line += chalk.greenBright(chars[Math.floor(Math.random() * chars.length)]);
      } else {
        line += " ";
      }
    }
    console.log(line);
    await sleep(40);
  }
}

function printDivider(style = "default") {
  if (style === "double") {
    console.log(chalk.cyan("  ═══════════════════════════════════════════════════"));
  } else if (style === "dots") {
    console.log(chalk.gray("  · · · · · · · · · · · · · · · · · · · · · · · · ·"));
  } else if (style === "arrow") {
    console.log(chalk.yellow("  ▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸"));
  } else {
    console.log(chalk.gray("  ─────────────────────────────────────────────────"));
  }
}

function printMenu() {
  console.log();
  printDivider("double");
  console.log();
  console.log(chalk.white.bold("   ◆ MAIN MENU ◆"));
  console.log();
  console.log(chalk.green("  ┌─[") + chalk.greenBright.bold("1") + chalk.green("]─── ") + chalk.white("🔍 Check Email for Breaches"));
  console.log(chalk.green("  ├─[") + chalk.greenBright.bold("2") + chalk.green("]─── ") + chalk.white("📖 How It Works"));
  console.log(chalk.green("  ├─[") + chalk.greenBright.bold("3") + chalk.green("]─── ") + chalk.white("🛡️  Safety Tips"));
  console.log(chalk.green("  ├─[") + chalk.greenBright.bold("4") + chalk.green("]─── ") + chalk.white("ℹ️  About"));
  console.log(chalk.red("  └─[") + chalk.redBright.bold("0") + chalk.red("]─── ") + chalk.gray("Exit"));
  console.log();
  printDivider("double");
  console.log();
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

async function checkEmail(email) {
  const response = await fetch(`${LEAKCHECK_API}${encodeURIComponent(email)}`);
  const data = await response.json();
  return data;
}

async function scanAnimation(email) {
  const phases = [
    { text: "Initializing scan engine...", icon: "⚙️", color: chalk.gray },
    { text: "Connecting to breach databases...", icon: "🌐", color: chalk.blue },
    { text: "Querying leaked credentials...", icon: "🔑", color: chalk.yellow },
    { text: "Scanning dark web sources...", icon: "🕵️", color: chalk.magenta },
    { text: "Analyzing paste dumps...", icon: "📋", color: chalk.cyan },
    { text: "Cross-referencing results...", icon: "🔗", color: chalk.green },
  ];

  console.log();
  printDivider("arrow");
  console.log();
  console.log(chalk.cyan.bold("  TARGET: ") + chalk.white(email));
  console.log();

  for (const phase of phases) {
    const spinner = ora({
      text: phase.color(` ${phase.icon}  ${phase.text}`),
      prefixText: " ",
      spinner: "dots12",
    }).start();
    await sleep(400 + Math.random() * 300);
    spinner.succeed(phase.color(` ${phase.icon}  ${phase.text}`));
  }

  console.log();

  const progressWidth = 40;
  process.stdout.write(chalk.gray("  Progress: ["));
  for (let i = 0; i < progressWidth; i++) {
    await sleep(20);
    const ratio = i / progressWidth;
    if (ratio < 0.33) {
      process.stdout.write(chalk.red("█"));
    } else if (ratio < 0.66) {
      process.stdout.write(chalk.yellow("█"));
    } else {
      process.stdout.write(chalk.green("█"));
    }
  }
  process.stdout.write(chalk.gray("] "));
  console.log(chalk.greenBright.bold("100%"));
  console.log();
}

function renderResultBox(lines, borderColor) {
  const maxLen = Math.max(...lines.map((l) => l.replace(/\x1B\[\d+m/g, "").length));
  const innerWidth = Math.max(maxLen + 2, 50);
  const top = borderColor(`  ╔${"═".repeat(innerWidth)}╗`);
  const bot = borderColor(`  ╚${"═".repeat(innerWidth)}╝`);

  console.log(top);
  for (const line of lines) {
    const stripped = line.replace(/\x1B\[\d+m/g, "");
    const pad = innerWidth - stripped.length;
    console.log(borderColor("  ║") + line + " ".repeat(Math.max(pad, 0)) + borderColor("║"));
  }
  console.log(bot);
}

async function handleCheckEmail() {
  console.log();
  printDivider("double");
  console.log();
  console.log(chalk.cyan.bold("  ┌──────────────────────────────────────┐"));
  console.log(chalk.cyan.bold("  │     🔍 EMAIL BREACH LOOKUP          │"));
  console.log(chalk.cyan.bold("  └──────────────────────────────────────┘"));
  console.log();

  const email = await ask(chalk.yellow("  ▸ Enter email address: "));

  if (!isValidEmail(email.trim())) {
    console.log();
    console.log(chalk.red.bold("  ╳ ") + chalk.red("Invalid email format. Please try again."));
    return;
  }

  await scanAnimation(email.trim());

  try {
    const result = await checkEmail(email.trim());

    printDivider("double");
    console.log();

    if (!result.success || result.found === 0) {
      renderResultBox(
        [
          "",
          chalk.green.bold("   ✅ SCAN COMPLETE — NO BREACHES FOUND"),
          "",
          chalk.white("   📧 Email: ") + chalk.cyan(email.trim()),
          "",
          chalk.green("   ✓ Not found in any known data breaches"),
          chalk.green("   ✓ No leaked credentials detected"),
          chalk.green("   ✓ No dark web exposure identified"),
          "",
          chalk.gray("   Status: ") + chalk.greenBright.bold("SAFE"),
          "",
        ],
        chalk.green
      );
      console.log();
      console.log(chalk.green("  🎉 Great news! Keep following good security practices."));
    } else {
      console.log(chalk.red.bold("  ⚠️  ") + chalk.bgRed.white.bold(" ALERT ") + chalk.red.bold(" BREACHES DETECTED ⚠️"));
      console.log();

      const threatLevel =
        result.found >= 5
          ? chalk.bgRed.white.bold(" CRITICAL ")
          : result.found >= 3
          ? chalk.bgYellow.black.bold(" HIGH ")
          : chalk.bgMagenta.white.bold(" MODERATE ");

      renderResultBox(
        [
          "",
          chalk.red.bold("   🚨 BREACH REPORT"),
          "",
          chalk.white("   📧 Target:       ") + chalk.cyan(email.trim()),
          chalk.white("   💀 Breaches:     ") + chalk.red.bold(String(result.found)),
          chalk.white("   ⚡ Threat Level: ") + threatLevel,
          "",
        ],
        chalk.red
      );

      if (result.sources && result.sources.length > 0) {
        console.log();
        console.log(chalk.yellow.bold("  ┌─── 🗂️  BREACHED SERVICES ───────────────────────┐"));
        for (let i = 0; i < result.sources.length; i++) {
          const source = result.sources[i];
          const date = source.date || "Unknown";
          const isLast = i === result.sources.length - 1;
          const prefix = isLast ? "  └──" : "  ├──";
          console.log(
            chalk.yellow(prefix) +
            chalk.white.bold(` ${source.name} `) +
            chalk.gray("─── ") +
            chalk.red(date)
          );
        }
      }

      if (result.fields && result.fields.length > 0) {
        console.log();
        console.log(chalk.magenta.bold("  📋 EXPOSED DATA:"));
        printDivider("dots");
        const fieldIcons = {
          email: "📧", password: "🔑", username: "👤", name: "📛",
          phone: "📱", ip: "🌐", address: "🏠", dob: "📅",
          hash: "🔐", ssn: "🆔",
        };
        for (const field of result.fields) {
          const icon = fieldIcons[field.toLowerCase()] || "📌";
          console.log(chalk.white(`    ${icon} ${chalk.bold(field)}`));
        }
      }

      console.log();
      printDivider("arrow");
      console.log();
      console.log(chalk.red.bold("  🔒 IMMEDIATE ACTIONS REQUIRED:"));
      console.log();
      console.log(chalk.white("    [") + chalk.red("!") + chalk.white("] Change your password ") + chalk.red.bold("NOW"));
      console.log(chalk.white("    [") + chalk.red("!") + chalk.white("] Enable two-factor authentication"));
      console.log(chalk.white("    [") + chalk.red("!") + chalk.white("] Review account for unauthorized access"));
      console.log(chalk.white("    [") + chalk.red("!") + chalk.white("] Monitor for identity theft"));
    }
  } catch (error) {
    console.log();
    console.log(chalk.red.bold("  ╳ Connection error. Please try again later."));
  }
}

async function showHowItWorks() {
  console.log();
  printDivider("double");
  console.log();
  console.log(chalk.cyan.bold("  ┌──────────────────────────────────────┐"));
  console.log(chalk.cyan.bold("  │     📖 HOW IT WORKS                 │"));
  console.log(chalk.cyan.bold("  └──────────────────────────────────────┘"));
  console.log();

  const steps = [
    { num: "01", icon: "📧", text: "You enter an email address", color: chalk.cyan },
    { num: "02", icon: "🔎", text: "Tool queries breach databases", color: chalk.blue },
    { num: "03", icon: "🕵️", text: "Dark web sources are scanned", color: chalk.magenta },
    { num: "04", icon: "📊", text: "Results are compiled & analyzed", color: chalk.yellow },
    { num: "05", icon: "🛡️", text: "Security recommendations provided", color: chalk.green },
  ];

  for (const step of steps) {
    await typeWriter(
      step.color(`  [${step.num}] ${step.icon}  ${step.text}`),
      20
    );
    await sleep(100);
  }

  console.log();
  printDivider("dots");
  console.log();
  console.log(chalk.gray("  Data includes: ") + chalk.white("Breach names, dates, exposed fields,"));
  console.log(chalk.white("  credential leaks, and threat severity levels."));
}

async function showSafetyTips() {
  console.log();
  printDivider("double");
  console.log();
  console.log(chalk.cyan.bold("  ┌──────────────────────────────────────┐"));
  console.log(chalk.cyan.bold("  │     🛡️  SECURITY HANDBOOK            │"));
  console.log(chalk.cyan.bold("  └──────────────────────────────────────┘"));
  console.log();

  console.log(chalk.yellow.bold("  ╭─── 🔑 PASSWORD SECURITY ─────────────────────╮"));
  const pwTips = [
    "Use unique passwords for every account",
    "Enable two-factor authentication (2FA)",
    "Use a password manager (Bitwarden, 1Password)",
    "Minimum 16 characters with mixed types",
  ];
  for (const tip of pwTips) {
    await typeWriter(chalk.gray(`  │  ✦ ${tip}`), 12);
  }
  console.log(chalk.yellow("  ╰────────────────────────────────────────────────╯"));
  console.log();

  console.log(chalk.blue.bold("  ╭─── 📧 EMAIL PROTECTION ──────────────────────╮"));
  const emailTips = [
    "Never click links from unknown senders",
    "Verify sender addresses carefully",
    "Use email aliases for online signups",
    "Enable login alerts on your accounts",
  ];
  for (const tip of emailTips) {
    await typeWriter(chalk.gray(`  │  ✦ ${tip}`), 12);
  }
  console.log(chalk.blue("  ╰────────────────────────────────────────────────╯"));
  console.log();

  console.log(chalk.red.bold("  ╭─── 🚨 IF YOUR DATA WAS LEAKED ──────────────╮"));
  const leakTips = [
    "Change compromised passwords IMMEDIATELY",
    "Enable 2FA on all affected accounts",
    "Monitor bank & credit for fraud",
    "Consider a credit freeze",
    "Report identity theft if applicable",
  ];
  for (const tip of leakTips) {
    await typeWriter(chalk.gray(`  │  ✦ ${tip}`), 12);
  }
  console.log(chalk.red("  ╰────────────────────────────────────────────────╯"));
  console.log();

  console.log(chalk.green.bold("  💡 Pro Tip: ") + chalk.white("Check your emails for breaches regularly!"));
}

function showAbout() {
  console.log();
  printDivider("double");
  console.log();
  console.log(chalk.cyan.bold("  ┌──────────────────────────────────────┐"));
  console.log(chalk.cyan.bold("  │     ℹ️  ABOUT STEALTH LOOKUP         │"));
  console.log(chalk.cyan.bold("  └──────────────────────────────────────┘"));
  console.log();

  renderResultBox(
    [
      "",
      chalk.white.bold("   Stealth Lookup — Email Data Breach Checker"),
      chalk.gray("   Version 1.0.0"),
      "",
      chalk.white("   🔍 Features:"),
      chalk.gray("      • Real-time breach database lookups"),
      chalk.gray("      • Dark web source scanning"),
      chalk.gray("      • Credential leak detection"),
      chalk.gray("      • Threat severity analysis"),
      chalk.gray("      • Security recommendations"),
      "",
      chalk.white("   🔐 Privacy:  ") + chalk.gray("Zero data retention"),
      chalk.white("   ⚡ Engine:   ") + chalk.gray("Stealth Lookup v1.0"),
      chalk.white("   🌐 Sources:  ") + chalk.gray("Global breach databases"),
      "",
      chalk.white("   👨‍💻 Developer: ") + chalk.cyan.bold("t.me/zoxionx"),
      "",
    ],
    chalk.cyan
  );
}

async function exitAnimation() {
  console.log();
  printDivider("double");
  console.log();
  await typeWriter(chalk.cyan("  🔒 Clearing session data..."), 25);
  await sleep(300);
  await typeWriter(chalk.cyan("  🛡️  Closing secure connections..."), 25);
  await sleep(300);
  await typeWriter(chalk.green("  ✅ Session terminated safely."), 25);
  console.log();
  console.log(chalk.cyan.bold("  👋 Stealth Lookup — Stay safe out there. — zoxionx"));
  console.log();
}

async function main() {
  clearScreen();
  await matrixRain(800);
  clearScreen();
  await animateBanner();

  await typeWriter(chalk.gray("  Initializing Stealth Lookup engine..."), 20);
  await sleep(400);
  await typeWriter(chalk.green("  ✅ Ready."), 20);

  while (true) {
    printMenu();
    const choice = await ask(chalk.yellow("  ▸ Select option: "));

    switch (choice.trim()) {
      case "1":
        await handleCheckEmail();
        break;
      case "2":
        await showHowItWorks();
        break;
      case "3":
        await showSafetyTips();
        break;
      case "4":
        showAbout();
        break;
      case "0":
        await exitAnimation();
        rl.close();
        process.exit(0);
      default:
        console.log(chalk.red("  ╳ Invalid option. Please try again."));
    }
  }
}

main();
