set GIT="%LOCALAPPDATA%\Programs\Git\cmd\git.exe"
%GIT% rm --cached .env 2>nul
%GIT% rm --cached prisma/dev.db 2>nul
%GIT% add .gitignore
%GIT% add prisma/schema.prisma
%GIT% add package.json
%GIT% add vercel.json
%GIT% add .env.example
%GIT% add lib/db.ts
%GIT% commit -m "fix: all Vercel deployment issues - PostgreSQL, Prisma generate, vercel.json"
%GIT% push origin main
