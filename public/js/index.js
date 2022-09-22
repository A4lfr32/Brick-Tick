paused = false;
generalTimeCounter = new Date(0);

if (localStorage.getItem('mydata')!=null){
    // localStorage.setItem('mydata', JSON.stringify(data));
    data = JSON.parse(localStorage.getItem('mydata'));
    console.log("Here is" + data);
}

function startTimer(element) {
    element.inicio = new Date();
    element.lastTime = new Date();
    if (element.TemporizadorT_CronometroF) {
        element.AcumMilliSeconds = 0;
    }

    element.paused = false;
    element.estado = "start";
}

function pauseTimer(element) {
    if (element.paused) {
        // si estaba pausado y empieza a correr
        element.lastTime = new Date();
        element.estado = "start";
    } else {
        // si estaba corriendo y pausa
        element.AcumMilliSeconds += Math.floor(
            element.actualTime.getTime() - element.lastTime.getTime()
        );
        element.estado = "edit";
    }

    element.paused = !element.paused;
}
function focusEvent(element, event, this_) {
    if (event == "in") {
        element.estado = "edit";
    } else {
        element.AcumMilliSeconds = timer2millis(this_);
        element.lastTime = new Date();
        element.estado = "start";
    }
}

function stopTimer(element) {
    element.final = new Date();
    element.paused = true;
    element.AcumMilliSeconds = 0;
    element.estado = "stop";
}

setInterval(function () {
    let flagAtLeastOne = false;
    mainBrick.children.forEach((elementKey) => {
        debugger
        index = elementKey;
        element = data[elementKey];
        // Object.values(data).forEach((element, index) => {
        // If element is not paused
        if (!element.paused) {
            flagAtLeastOne = true;
            // If element is temporizador
            element.actualTime = new Date();
            element.final = element.actualTime;
            let aux;
            if (element.TemporizadorT_CronometroF) {
                aux = element.actualTime - element.lastTime + element.AcumMilliSeconds;
            } else {
                aux =
                    -(element.actualTime - element.lastTime) + element.AcumMilliSeconds;

                // element.porcentaje += 0.01 * (1 - element.porcentaje);
            }
            if (element.estado != "edit") {
                if (aux <= 0) {
                    document.getElementById(`Timer${index}`).innerHTML = "00:00";
                    element.estado = "stop";
                    element.paused = true;
                    var audio = new Audio('sounds/002663916_prev.mp3');
                    audio.play();
                    // alert("Time is up!");
                } else {
                    document.getElementById(`Timer${index}`).innerHTML = timeFormat(aux);
                }
            }
            // document.getElementById(`timeProgress${index}`).style.width = `${100 * element.porcentaje}%`;
        } else {
            element.lastTime = new Date(element.lastTime);
            element.lastTime = element.lastTime.getTime() + 1000;
            if (element.estado == "stop") {
                document.getElementById(`Timer${index}`).innerHTML = "00:00";
            }
        }
    });
    if (flagAtLeastOne) {
        generalTimeCounter = new Date(generalTimeCounter.getTime() + 1000);
    }
    // console.log(`${(generalTimeCounter) / (1000)}%`);
    console.log(generalTimeCounter);
    generalTimer.style.width = `${((generalTimeCounter / 1000) * 100) / (60 * 4)
        }%`; // 60s*60min*4h
}, 1000);

function timeFormat(milli) {
    var h = ("00" + Math.floor((milli / 1000 / 60 / 60) % 24)).slice(-2);
    var m = ("00" + Math.floor((milli / 1000 / 60) % 60)).slice(-2);
    var s = ("00" + Math.floor((milli / 1000) % 60)).slice(-2);
    var time = h == 0 ? m + ":" + s : h + ":" + "" + m + ":" + s;
    return time;
}

// setInterval(function () {
//     if (!paused){
//     var d = new Date();
//     var h = ('00'+d.getHours()).slice(-2);
//     var m = ('00'+d.getMinutes()).slice(-2);
//     var s = ('00'+d.getSeconds()).slice(-2);
//     var time = h + ":" + m + ":" + s;
//     document.getElementById("time").innerHTML = time;}
// }, 1000);
mainBrick = data["BrickTick"];
// ⏳ Para el temporizador
// ⏱️⏳ Para el conometro
updateBricks();
function updateBricks() {
    document.getElementById("mainTitle").innerText = mainBrick.title;
    main.innerHTML = "";
    backButton.onclick = function () {
        mainBrick = data[mainBrick.parent];
        updateBricks();
    };

    mainBrick.children.forEach((elementKey) => {
        index = elementKey;
        element = data[elementKey];
        // )
        // Object.values(data["BrickTick"]).forEach((element, index) => {
        template = `
        <div class="col-3">
            <div class="card">
                <div class="card-body text-center">
                    <h5 class="card-title pb-2 border-bottom" contenteditable="true" spellcheck="false" onfocusout="data[Object.keys(data)[${index}]].title=this.innerText;">${element.title
            }</h5>
                    <a class="text-reset" href="#" onclick="mainBrick=data[${index}];updateBricks();" style="transform: rotateZ(90deg);position: absolute;top: 0%;right: 0%;">⇱</a>
                    <div class="h4 row" style="position: absolute;right: 0%;transform: translateY(12%);">
                        <span class="col-12" style="${!element.TemporizadorT_CronometroF
                ? "filter: opacity(0.2);"
                : ""
            }" onclick="data[Object.keys(data)[${index}]].TemporizadorT_CronometroF=!data[Object.keys(data)[${index}]].TemporizadorT_CronometroF;updateBricks();">⏱️</span>
                        <span class="col-12" style="${element.TemporizadorT_CronometroF
                ? "filter: opacity(0.2);"
                : ""
            }" onclick="data[Object.keys(data)[${index}]].TemporizadorT_CronometroF=!data[Object.keys(data)[${index}]].TemporizadorT_CronometroF;updateBricks();">⏳</span>
                    </div>
                    <p id="Timer${index}" contenteditable="true" onfocusin="focusEvent(data[Object.keys(data)[${index}]],'in')" onfocusout="focusEvent(data[Object.keys(data)[${index}]],'out',this)" class="card-text m-4 h1">${timeFormat(
                element.AcumMilliSeconds
            )}</p>
                    <div class="btn-group w-100" role="group" aria-label="Basic mixed styles example">
                        <button type="button" class="btn btn-success py-0" onclick="startTimer(data[Object.keys(data)[${index}]]);">Start</button>
                        <button type="button" class="btn btn-warning py-0" onclick="pauseTimer(data[Object.keys(data)[${index}]]);">Pause</button>
                        <button type="button" class="btn btn-danger py-0" onclick="stopTimer(data[Object.keys(data)[${index}]]);">Stop</button>
                    </div>
                </div>
                <div class="progress">
                    <div id="timeProgress${index}" class="progress-bar" role="progressbar" style="width: 0%" aria-valuenow="25" aria-valuemin="0"
                        aria-valuemax="100"></div>
                </div>

                <div>
                    <div class="collapse" id="collapseExample${index}">
                        <ul class="list-group list-group-flush text-center">
                            ${element.children
                ? Object.values(element.children)
                    .map(
                        (child) =>
                            `<a href="#" class="list-group-item">${data[child].title}</a>`
                    )
                    .join("")
                : ``
            }
                            <li class="list-group-item p-0"></li>
                        </ul>
                    </div>
                    <a class="h1 text-reset text-decoration-none text-center" data-bs-toggle="collapse"
                        href="#collapseExample${index}" role="button" aria-expanded="false" aria-controls="collapseExample${index}">
                        ${element.children
                ? `<h3
                            onmousedown="document.getElementById('collapseExample${index}').classList.contains('show')?this.style.transform='scaleY(1)':this.style.transform='scaleY(-1)';">
                            <span class="pe-1">📝</span>
                        </h3>`
                : ``
            }
                        
                    </a>
                </div>
            </div>
        </div>
            `;
        console.log(element);
        main.innerHTML += template;
        
        
    });
    // main.innerHTML += `
    // <!-- Add BrickTick template -->
    // <div class="col-3">
    //     <div id="AddNewTimer_btn" class="card">
    //         <div class="card-body text-center">
    //             <p class="card-text m-4 h1">+</p>
    //         </div>
    //     </div>
    // </div>
    // `;
}

function timer2millis(node, element) {
    a = node.innerText.split(":");
    a.reverse();
    console.log(a);
    return a[0] * 1000 + a[1] * 1000 * 60 + (a[2] ? a[2] * 1000 * 60 * 60 : 0);
}
