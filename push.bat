set GIT="%LOCALAPPDATA%\Programs\Git\cmd\git.exe"
%GIT% config --global user.email "bot@cooksmart.local"
%GIT% config --global user.name "Cooksmart Bot"
%GIT% init
%GIT% remote remove origin
%GIT% remote add origin https://github.com/raikash85-boop/cooksmartt.git
%GIT% add .
%GIT% commit -m "Init CookSmart SaaS System"
%GIT% branch -M main
%GIT% push -u origin main
