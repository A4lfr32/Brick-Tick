addNewTimer = document.getElementById("AddNewTimer_btn");
addNewTimer.addEventListener("click", () => {
    // nextChildNumber=Object.keys(data).length-1;
    nextChildNumber=Object.keys(data).length-1;
    data[nextChildNumber]={
        "title": "Study"+nextChildNumber,
        "inicio": new Date(),
        "actualTime": new Date(),
        "final": new Date(),
        "lastTime": new Date(),
        "AcumMilliSeconds": 0,
        "porcentaje": 0.0,
        "estado": "start",
        "paused": true,
        "TemporizadorT_CronometroF": true,
        "children": [],
        "parent": "BrickTick"
    }

    mainBrick.children.push(nextChildNumber.toString());
    updateBricks();
});

