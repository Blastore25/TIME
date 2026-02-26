# Running TIME locally

The site is static (HTML, CSS, JS). There is **no compilation**. To view it in your browser you need a **local web server** running on your computer.

## Step 1: Open a terminal on your PC

- Press **Windows key**, type **PowerShell** or **cmd**, press Enter.  
- Or: right‑click the Start button → **Terminal** or **Windows PowerShell**.

## Step 2: Go to the TIME folder

```powershell
cd "c:\Users\blast\OneDrive\Documents\VideoGames\TIME"
```

## Step 3: Start the server

**Important:** Bind to 127.0.0.1 to avoid empty response errors:

```powershell
python -m http.server 8080 --bind 127.0.0.1
```

If you see **"python is not recognized"**, try:

```powershell
py -m http.server 8080 --bind 127.0.0.1
```

You should see: **Serving HTTP on 127.0.0.1 port 8080**

## Step 4: Open the site

In your browser go to: **http://127.0.0.1:8080**

Use **http** (not https). Leave the terminal window open while you browse.

## Step 5: Stop the server

In the terminal press **Ctrl+C**, or close the terminal window.

---

## If it still doesn’t work

1. **Check Python**  
   In the same terminal run: `python --version` or `py --version`.  
   If that fails, install Python from https://www.python.org/downloads/ and try again.

2. **Try another port**  
   If 8080 is in use, run:  
   `python -m http.server 8888 --bind 127.0.0.1`  
   Then open: **http://127.0.0.1:8888**

3. **Try 127.0.0.1**  
   Always use **http://127.0.0.1:8080** (not localhost).  
   If you get **ERR_EMPTY_RESPONSE**, run the server with **--bind 127.0.0.1** (see Step 3 above).

4. **OneDrive / antivirus**  
   If the folder is under OneDrive, sync can sometimes lock files. Try pausing OneDrive sync or copy the TIME folder to a local path (e.g. `C:\TIME`) and run the server from there.
