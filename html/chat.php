<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="h-screen bg-[#171717]">

    <div class="w-full h-full py-10 flex items-center justify-center ">
        <div class="w-full h-full mx-4 md:mx-0 p-5 md:w-4/5 xl:w-2/3 h-full border-4 border-white rounded-md flex flex-col gap-y-3">
            <div class="flex flex-col w-full h-full gap-y-5 overflow-y-auto px-2" id="chat">

                <div class="md:w-1/2 flex flex-col gap-y-3 bg-white p-3 rounded-md" id="msg">
                    <div class="flex items-center gap-x-3">
                        <img class="bg-white w-8 h-8" src="../img/user.png" alt="" srcset="">
                        <p id="username" class="text-md font-bold">Test 1</p>
                    </div>
                    
                    <p id="msgBody" class="ml-5">is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                    
                </div>

            </div>

            <div class="flex gap-x-5 w-auto items-center w-full h-12 items-center">
                <textarea class="resize-none p-2 w-full h-full rounded-md border-2 border-blue-500 focus:outline-none focus:border-4" name="message" id="textMsg"></textarea>
                <button class="text-md font-semibold rounded-full p-3 bg-blue-500 text-white" type="button" id="btnSend">Invia</button>
                <div class="border border-grey-500 h-6"></div>
                <img class="bg-white w-10 h-10 rounded-full" src="../img/user.png" alt="" srcset="">
            </div>

            <script src="../js/chatApp.js"></script>
        </div>
    </div>
    
</body>
</html>