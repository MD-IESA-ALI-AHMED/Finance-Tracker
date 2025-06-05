let totalincome = 0;
let totalbalance = 0;
let totalexpense = 0;
let totaltrans=0;

async function add() {
    totaltrans++;
    let detail = prompt("Income/expense ?")?.toLowerCase() || "";
    let cat = prompt(`Enter the source of your ${edetail}`) || "";
    let rs = parseFloat(prompt("Enter the amount you earned/spent")) || 0;

    let div = document.createElement("div");
    div.classList.add("shell");
    
    div.dataset.amount = rs;
    div.dataset.type = detail.includes("expense") ? "expense" : "income";

    div.innerHTML = `
        <div>
            <h3>${detail}</h3>
            <h6>${cat}</h6>
        </div>
        <div class="det">
            <div>${rs}</div>
            <img src="edit.svg" alt="Edit">
            <img src="del.svg" alt="Delete">
        </div>
    `;

    div.querySelector('.det > img:last-child').addEventListener("click", () => {
        totaltrans--;
        updateTotals(-parseFloat(div.dataset.amount), div.dataset.type);
        div.remove();
    });

    div.querySelector('.det > img:nth-child(2)').addEventListener("click", () => edit(div));

    document.querySelector(".container").append(div);
    updateTotals(rs, div.dataset.type);
}

function updateTotals(amount, type) {
    if (type === "expense") {
        totalexpense += amount;
    } else {
        totalincome += amount;
    }
    totalbalance = totalincome - totalexpense;
    
    document.querySelector(".Balance > div:last-child").textContent = totalbalance;
    document.querySelector(".Income > div:last-child").textContent = totalincome;
    document.querySelector(".Expense > div:last-child").textContent = totalexpense;
    document.querySelector(".Track > div:last-child").textContent = totaltrans;
}

function edit(div) {
    const oldAmount = parseFloat(div.dataset.amount);
    const oldType = div.dataset.type;
    
    updateTotals(-oldAmount, oldType);

    let edetail = prompt("Income/expense ?")?.toLowerCase() || "";
    let ecat = prompt(`What is the source of your ${edetail}`) || "";
    let ers = parseFloat(prompt("Enter the amount you earned/spent")) || 0;

    div.dataset.amount = ers;
    div.dataset.type = edetail.includes("expense") ? "expense" : "income";
    
    div.innerHTML = `
        <div>
            <h3>${edetail}</h3>
            <h6>${ecat}</h6>
        </div>
        <div class="det">
            <div>${ers}</div>
            <img src="edit.svg" alt="Edit">
            <img src="del.svg" alt="Delete">
        </div>
    `;

    div.querySelector('.det > img:last-child').addEventListener("click", () => { 
        totaltrans--;
        updateTotals(-ers, div.dataset.type);
        div.remove();
    });
    div.querySelector('.det > img:nth-child(2)').addEventListener("click", () => edit(div));

    updateTotals(ers, div.dataset.type);
}

function main() {
    document.getElementById("addt").addEventListener("click", add);
}
main();
