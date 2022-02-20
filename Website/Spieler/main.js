var request = new XMLHttpRequest();
var request2 = new XMLHttpRequest();

var gamedata = null;

function getGameData() {

    const app = document.getElementById('GameBox')
    const container = document.createElement('div')
    container.setAttribute('class', 'container')
    app.appendChild(container)

    const NoGames = document.createElement('h1');
    NoGames.style.width = "100%";
    NoGames.style.textAlign = "center";
    NoGames.innerHTML = "Keine Spiele grade";
    app.appendChild(NoGames);

    request.open('GET', "https://esports-api.lolesports.com/persisted/gw/getLive?hl=de-DE", true);
    request.setRequestHeader("x-api-key", "0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z")
    request.onreadystatechange = function () {

        if (request.status === 200 && request.readyState === 4) {
            var response = JSON.parse(request.responseText);

            data = response.data.schedule.events;

            for(i = 0; i < data.length; i++) {  //for each event
                if(data[i].league.name == "Prime League") {
                
                    var event = data[i];

                    z = 0;

                    if(event.match.games.length > z && 5 < z) { //if there are more than one game in the event

                        z = z++;

                    }; 

                    const date = Date.now();    
                    const dayandhours = new Date(date).toLocaleString('de-DE', {
                        weekday: 'long',
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true
                    });

                    queryParams = {'startingTime':dayandhours};  

                    fetch('https://feed.lolesports.com/livestats/v1/window/' + event.match.games[z].id, queryParams,{
                        method: 'GET',
                        headers: {
                            'x-api-key': '0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z'
                        }
                    })
                    .then(response => response.json())
                    .then(data2 => {

                    details = data2;

                    // Debug Shit

                   // console.log(details);
                   // console.log(event); 

                    NoGames.style.display = "none";
     
                    const GameTitle = document.createElement('h1');
                    GameTitle.innerHTML = event.match.teams[0].name + " vs " + event.match.teams[1].name;
                    GameTitle.style.width = "100%";
                    GameTitle.style.textAlign = "center";

                    const Scoreboard = document.createElement('p');
                    Scoreboard.innerHTML = event.match.teams[0].result.gameWins + " : " + event.match.teams[1].result.gameWins;
                    Scoreboard.style.width = "100%";
                    Scoreboard.style.textAlign = "center";
                    Scoreboard.style.marginBottom = "3rem";


                    const team1box = document.createElement('div');
                    team1box.setAttribute('class', 'teambox');
                    team1box.style.width = "50%";
                    team1box.style.float = "left";
                    team1box.style.textAlign = "center";
                    team1box.style.borderRight = "1px solid black"; 

                    const team2box = document.createElement('div');
                    team2box.setAttribute('class', 'teambox');
                    team2box.style.width = "50%";
                    team2box.style.float = "right";
                    team2box.style.textAlign = "center";

                    const logoTeam1 = document.createElement('img');
                    logoTeam1.setAttribute('class', 'logo');
                    logoTeam1.src = event.match.teams[0].image;
                    logoTeam1.style.width = "7rem";
                    logoTeam1.style.height = "7rem";

                    const logoTeam2 = document.createElement('img');
                    logoTeam2.setAttribute('class', 'logo');
                    logoTeam2.src = event.match.teams[1].image;
                    logoTeam2.style.width = "7rem";
                    logoTeam2.style.height = "7rem";

                    const teamname = document.createElement('p');
                    teamname.innerHTML = event.match.teams[0].name;
                    teamname.style.width = "100%";
                    teamname.style.textAlign = "center";

                    const teamname2 = document.createElement('p');
                    teamname2.innerHTML = event.match.teams[1].name;
                    teamname2.style.width = "100%";
                    teamname2.style.textAlign = "center";

                    // If you can do that. Fuck DDragonAPI.

                   /* const champframes1 = document.createElement('div');
                    champframes1.setAttribute('class', 'champframes');
                    
                    for(i = 0; i < details.gameMetadata.participantMetadata.length; i++) {
                         var request3 = new XMLHttpRequest();

                        // KMS this is shit send help
                        request3.open('https://ddragon.leagueoflegends.com/cdn/' + details.gameMetadata.version + '/data/de_DE/champion.json', function (error, response, body) {
                            request.setRequestHeader("x-api-key", "0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z")
                            request.onreadystatechange = function () {
                        let list = JSON.parse(body);
                        let championList = list.data;

                        for (var i in championList) {

                        if (championList[i].name == details.frames[9].blueTeam.participants.championId) {
                        console.log(championList[i].id)
                                    } 
                        champimg.src = details.gameMetadata.blueTeam.participantMetadata[i].champion.image;
                    }}
                    }); 

                    const champname = document.createElement('p');
                    champname.innerHTML = details.gameMetadata.participantMetadata[i].championId;
                    champname.style.width = "100%";
                    champname.style.textAlign = "center";

                    champframes1.style.width = "50%";
                    champframes1.style.float = "left";
                    champframes1.style.textAlign = "center";
                    champframes1.style.borderRight = "1px solid black";

                    const champframes2 = document.createElement('div');
                    champframes2.setAttribute('class', 'champframes');
                    champframes2.style.width = "50%";
                    champframes2.style.float = "right";
                    champframes2.style.textAlign = "center"; */

                    Scoreboard.setAttribute('class', 'scoreboard');
                    team1box.setAttribute('class', 'teambox');
                    team2box.setAttribute('class', 'teambox');
                    GameTitle.setAttribute('class', 'title');
                    container.appendChild(GameTitle);
                    container.appendChild(Scoreboard);
                    container.appendChild(team1box);
                    container.appendChild(team2box);
                    team1box.appendChild(logoTeam1);
                    team2box.appendChild(logoTeam2);
                    team1box.appendChild(teamname);
                    team2box.appendChild(teamname2);
                   // container.appendChild(champframes1);
                   // container.appendChild(champframes2);
                  //  champframes1.appendChild(champname);
                  //  champframes2.appendChild(champname);        

                });
                }
            }
        }
    }
    request.send();
} 

getGameData();
