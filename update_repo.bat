@echo off
echo ===================================================
echo             UPDATE GITHUB
echo ===================================================

echo [1/3] Menambahkan file baru...
git add .

echo.
echo [2/3] Menyimpan perubahan...
git commit -m "Update tampilan: Menambahkan screenshot preview ke README"

echo.
echo [3/3] Mengupload ke GitHub...
git push origin main

if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Gagal upload.
    pause
    exit
)

echo.
echo [SUKSES] Tampilan GitHub sudah diperbarui!
pause
