@echo off
echo ===================================================
echo             SETUP GITHUB OTOMATIS
echo ===================================================

echo [1/4] Konfigurasi Identitas
echo Masukkan Nama Kamu (untuk Git):
set /p gitname=Nama: 
echo Masukkan Email Kamu (untuk Git):
set /p gitemail=Email: 

git config user.name "%gitname%"
git config user.email "%gitemail%"

echo.
echo [2/4] Menyimpan File (Commit)...
git add .
git commit -m "Initial commit"

echo.
echo [3/4] Menghubungkan ke GitHub
echo Silakan buat repository baru di GitHub.com
echo Lalu copy URL-nya (contoh: https://github.com/username/repo.git)
echo.
echo Masukkan URL Repository GitHub:
set /p repourl=URL: 

git remote remove origin
git remote add origin %repourl%
git branch -M main

echo.
echo [4/4] Mengupload ke GitHub...
echo Jendela login mungkin akan muncul di browser/pop-up.
echo Silakan login jika diminta.
echo.
git push -u origin main

if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Gagal upload. Pastikan URL benar dan kamu punya akses.
    pause
    exit
)

echo.
echo [SUKSES] Kode berhasil diupload ke GitHub!
pause
