@echo off
echo ===================================================
echo             DIAGNOSA OTOMATIS
echo ===================================================
echo Sedang menjalankan diagnosa... Mohon tunggu...

echo [DATE: %date% %time%] > server_log.txt

echo.
echo [1/3] Mencari Node.js...
echo [CHECKING NODE] >> server_log.txt
node -v >> server_log.txt 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js TIDAK DITEMUKAN. >> server_log.txt
    echo.
    echo [FATAL ERROR] Node.js belum terinstall atau belum aktif.
    echo Silakan install dulu dari nodejs.org lalu RESTART komputer.
    echo.
    pause
    exit
)

echo [2/3] Menginstall Library...
echo [INSTALLING_DEPS] >> server_log.txt
call npm install >> server_log.txt 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] NPM Install Failed. >> server_log.txt
    echo.
    echo [ERROR] Gagal menginstall library. Lihat detail di bawah:
    echo ---------------------------------------------------
    type server_log.txt
    echo ---------------------------------------------------
    pause
    exit
)

echo [3/3] Menjalankan Server...
echo [STARTING_SERVER] >> server_log.txt
echo Server siap dijalankan.
echo Jika berhasil, browser akan bisa dibuka.
echo Jika gagal, error akan muncul di bawah ini.
echo.
node server.js >> server_log.txt 2>&1

echo.
echo [SERVER CRASHED] >> server_log.txt
echo ===================================================
echo           TERJADI ERROR!
echo ===================================================
echo Pesan error detail:
echo ---------------------------------------------------
type server_log.txt
echo ---------------------------------------------------
echo.
echo Tolong copy pesan error di atas atau FOTO layar ini.
echo Atau upload file 'server_log.txt' yang baru saja dibuat.
pause
