# Mert Auto - Antigravity Auto Acceptor

This is a simple JavaScript tool for **Antigravity**.

Sometimes, Antigravity does not automatically accept code changes or suggestions in some clients. This tool clicks the **"Accept all"** button or **IDE buttons** for you automatically. It saves you time until the official bug is fixed.

## Features

* **Auto Click:** Automatically finds and clicks "Accept all" buttons.
* **Works in Iframes:** Scans inside frames to find hidden buttons.
* **Control Panel:** You can move the menu, change speed, or pause it.
* **Safe Mode:** Does not use `innerHTML` (Bypasses "TrustedHTML" errors).
* **Custom Speed:** You can set how fast it clicks (e.g., 1000ms = 1 second).

## How to Use

You do not need to install anything on your computer. You just need the **Console**.

### Step 1: Open Developer Tools

1. Open your Antigravity client or browser.
2. Go to the menu bar at the top.
3. Click **Help** > **Toggle Developer Tools**.
* *Shortcut:* You can also press `Ctrl + Shift + I` (Windows) or `Cmd + Option + I` (Mac).


### Step 2: Open the Console

1. In the window that opens, look for the **"Console"** tab at the top.
2. Click on it.

### Step 3: Paste the Code

1. Copy the code from the `script.js` file in this repository.
2. Paste it into the Console.
3. Press **Enter**.

### Step 4: Use the Menu

* You will see a small box named **MERT AUTO**.
* You can drag it anywhere on the screen.
* **System Active:** Turn the script on or off.
* **Speed:** Change the checking speed (default is 1000ms).
* **Find Text:** Looks for "Accept all" text.
* **Find Color:** Looks for colored IDE buttons.

## FAQ

**Q: Is it safe?**
A: Yes, it is just a simple JavaScript loop running in your browser. It stops when you refresh the page.

**Q: How do I stop it?**
A: Click the red **X** button on the panel, or refresh your page (Ctrl + R).

---

*Disclaimer: This script is for educational purposes.*
