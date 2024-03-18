var SelectedMenu;
var AllCounters = [];
var SelectedMenu = document.getElementById("main");
var SelectedCounter = -1;
var totalCounters = 0;
var ins = [];
function Counter(name, score) {
    this.name = name;
    this.score = score;
}

function SetSettings(id) {
    document.getElementById("settings-name").value = AllCounters[id].name;
    document.getElementById("settings-score").value = AllCounters[id].score;
}

function ChangeMenu(MenuID) {
    if (SelectedMenu.id != "main") {
        SelectedMenu.style.display = "none";
    }
    menu = document.getElementById(MenuID);
    menu.style.display = "inline";
    SelectedMenu = menu;
}

function IsDuplicate(name) {
    for (let i = 0; i < ins.length; i++) {
        if (AllCounters[ins[i]].name == name) {
            return true;
        }
    }
    return false;
}

function CreateWanni() {
    var CounterName = document.getElementById("input-name");
    if (IsDuplicate(CounterName.value)) {
        alert("You cannot create a counter with the same name.");
        return;
    }
    var CounterScore = document.getElementById("input-score");
    var counters = document.getElementById("counters");
    var Wanni = document.createElement('div');
    Wanni.innerHTML = `<div class="counter">
    <h2 style="font-size: 30px;" id=N${totalCounters}>${CounterName.value}</h2>
    <h3 class="points" id=S${totalCounters}>${CounterScore.value}</h3>
    <button class="counter-button add" id=a${totalCounters}>+</button>
    <button class="counter-button minus" id=b${totalCounters}>-</button>
    <button class="counter-button settings" id=c${totalCounters}><img id=i${totalCounters} src="settings.png" alt="settings" width="30px" height="30px"></button>
</div>`;
    AllCounters.push(new Counter(CounterName.value, CounterScore.value));
    ins.push(totalCounters);
    counters.appendChild(Wanni);
    document.getElementById(`a${totalCounters}`).addEventListener("click", handleClick);
    document.getElementById(`b${totalCounters}`).addEventListener("click", handleClick);
    document.getElementById(`c${totalCounters}`).addEventListener("click", handleClick);
    document.getElementById(`i${totalCounters}`).addEventListener("click", handleClick);
    ChangeMenu("main");
    totalCounters += 1;
    CounterName.value = "";
    CounterScore.value = "";
}

function RemoveWanni() {
    parentDiv = document.getElementById(`a${SelectedCounter}`).parentNode.parentNode;

    parentDiv.remove();
    ins.splice(SelectedCounter, 1);
    ChangeMenu("main");
}


function handleClick(event) {
    // Retrieve the id of the clicked button
    var buttonId = event.target.id;
    if (["a", "b"].includes(buttonId[0])) {
        ChangeScore(buttonId);
    }
    else if ("c" == buttonId[0] || "i" == buttonId[0]) {
        ChangeMenu("settings-menu");
        SelectedCounter = buttonId.substring(1);
        SetSettings(SelectedCounter);
    }

}

function ChangeScore(counterID) {
    id = counterID.substring(1);
    score = document.getElementById(`S${id}`);
    if (counterID[0] == "a") {
        console.log(parseInt(score.textContent));
        score.textContent = parseInt(score.textContent) + 1;
    }
    else if (counterID[0] == "b") {
        score.textContent = parseInt(score.textContent) - 1;
    }
    else {
        console.log("Invalid id");
    }
}

function Rename(type) {
    if (type == "name") {
        if (IsDuplicate(document.getElementById("settings-name").value)) {
            alert("You cannot have a counter with the same name.");
            return;
        }
        document.getElementById(`N${SelectedCounter}`).innerText = document.getElementById("settings-name").value;
        AllCounters[SelectedCounter].name = document.getElementById("settings-name").value;
    }
    else if (type == "score") {
        document.getElementById(`S${SelectedCounter}`).innerText = document.getElementById("settings-score").value;
        AllCounters[SelectedCounter].score = document.getElementById("settings-score").value;
    }
    else {
        console.log("incorrect rename type");
    }
}


