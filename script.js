let tasks=[];
let proposals=[];

function showQuestions(){
    document.getElementById("questions").classList.remove("hidden");
}

function createCard(){
    let title=document.getElementById("title").value;
    let description=document.getElementById("description").value;
    let users=document.getElementById("users").value;
    let data=document.getElementById("data").value;
    let result=document.getElementById("result").value;

    let rating=50;
    if(title) rating+=10;
    if(description) rating+=10;
    if(users) rating+=10;
    if(data) rating+=10;
    if(result) rating+=10;

    let level="Жоба";
    if(rating>=90) level="Басым";
    else if(rating>=70) level="Дайын";
    else if(rating>=40) level="Жұмыс";

    let card=`
    <div class="card">
        <p><b>Атауы:</b> ${title}</p>
        <p><b>Контекст:</b> ${description}</p>
        <p><b>Пайдаланушылар:</b> ${users}</p>
        <p><b>Деректер:</b> ${data}</p>
        <p><b>Күтілетін нәтиже:</b> ${result}</p>
        <p class="rating">Рейтинг: ${rating}/100</p>
        <p><b>Деңгей:</b> ${level}</p>
    </div>`;

    document.getElementById("cardContent").innerHTML=card;
    document.getElementById("card").classList.remove("hidden");

    tasks=[{title,description,users,data,result,rating,level}];
}

function publishTask(){
    let list="";

    tasks.sort((a,b)=>b.rating-a.rating);

    tasks.forEach(task=>{
        list+=`
        <div class="task">
            <h3>${task.title}</h3>
            <p>${task.description}</p>
            <p>⭐ ${task.rating}/100</p>
            <p>${task.level}</p>
        </div>`;
    });

    document.getElementById("taskList").innerHTML=list;
    document.getElementById("catalog").classList.remove("hidden");
    document.getElementById("proposal").classList.remove("hidden");
}

function sendProposal(){
    let team=document.getElementById("teamName").value;
    let idea=document.getElementById("idea").value;

    proposals.push({team,idea,status:"Қарастырылуда"});

    showProposals();

    document.getElementById("businessChoice").classList.remove("hidden");
}

function showProposals(){
    let html="";

    proposals.forEach((p,index)=>{
        html+=`
        <div class="task">
            <h3>${p.team}</h3>
            <p>${p.idea}</p>
            <p><b>${p.status}</b></p>

            <button class="accept" onclick="accept(${index})">Қабылдау</button>
            <button class="reject" onclick="reject(${index})">Қабылдамау</button>
        </div>`;
    });

    document.getElementById("proposalList").innerHTML=html;
}

function accept(i){
    proposals[i].status="Қабылданды";
    showProposals();
}

function reject(i){
    proposals[i].status="Қабылданбады";
    showProposals();
}