<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HaCkChAt</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="h-screen bg-[#171717] text-white">
    <div class="w-full h-full flex items-center justify-center">
        <div class="flex flex-col border-2 border-white border-dashed p-7 gap-y-4 rounded-md">
            <h1 class="text-4xl font-bold">Login</h1>
            <p class="text-xl font-semibold">Inserisci le credenziali</p>
            <div class="border border-white rounded-full"></div>
            <form action="" class="flex flex-col gap-y-2">
                <div class="flex flex-col gap-y-2">
                    <p class="ml-2 font-semibold">Username</p>
                    <input class="border px-3 py-2 rounded-md text-black" type="text" name="username" >
                </div>

                <div class="flex flex-col gap-y-2">
                    <p class="ml-2 font-semibold">Password</p>
                    <input class="border px-3 py-2 rounded-md text-black" type="password" name="password" >
                </div>

                <div class="pt-2">
                    <input class="w-full text-md font-semibold rounded-md p-2 bg-blue-500 text-white" type="submit" value="Accedi">
                </div>
            </form>

            <div class="flex gap-x-3 border p-2 rounded-md items-center">
                <p class="text-md font-semibold">Non Hai un Account?</p>
                <button class="text-md font-semibold rounded-md p-2 bg-blue-500 text-white" type="button">Registrati</button>
            </div>
        </div>
    </div>
    
</body>
</html>