@echo off
cls
set CWD=%~dp0%

echo.
echo Running Bower...
echo ----------------
call bower install

echo.
echo --------------------
echo Package was installed.
pause
