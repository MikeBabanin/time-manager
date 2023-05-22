chrome.alarms.create("timeManagerPlus",{
    periodInMinutes: 1 / 60
})

chrome.alarms.onAlarm.addListener((alarm) =>{
    if(alarm.name === "timeManagerPlus"){
        chrome.storage.local.get(["timer", "isRunning"], (res) =>{
            if(res.isRunning){
                let timer = res.timer + 1
                let isRunning = true
                if(timer === 60 * 25){
                    this.registration.showNotification("Time Manager Plus",{
                        body: "25 minutes has passed!",
                        icon: "icon.png"
                    })
                    timer = 0
                    isRunning = false
                }
                chrome.storage.local.set({
                    timer,
                    isRunning
                })
            }
        })
    }
})

chrome.storage.local.get(["timer", "isRunning"], (res) =>{
    chrome.storage.local.set({
        timer: "timer" in res ? res.timer : 0,
        isRunning: "isRunning" in res ? res.isRunning : false
    })
})
