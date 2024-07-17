let currentRankIndex = 0;
let sortedData = [];

async function playDrumRoll() {
    await Tone.start();

    const drumSound = new Tone.Player({
        url: 'drum.mp3',
        autostart: false,
        onload: () => {
            drumSound.start();
        }

    }).toDestination();
}

const fetchPrivateData = async () => {
    const response = await fetch('private_leaderboard.csv');
    const text = await response.text();
    return d3.csvParse(text);
}

const createRowElement = (item) => {
    const row = document.createElement('tr');
    row.style.fontSize = item.rank === '1' ? '1.5em' : item.rank === '2' ? '1.2em' : item.rank === '3' ? '1.1em' : '1em';
    row.style.backgroundColor = item.rank === '1' ? 'rgba(255, 215, 0, 0.3)' : item.rank === '2' ? 'rgba(192, 192, 192, 0.3)' : item.rank === '3' ? 'rgba(218, 165, 32, 0.3)' : 'rgba(255, 255, 255, 0.1)';

    const rankCell = document.createElement('td');
    rankCell.textContent = item.rank;
    rankCell.style.color = '#c678dd';
    row.appendChild(rankCell);

    const teamCell = document.createElement('td');
    teamCell.textContent = item.teamname;
    teamCell.style.color = '#61dafb';
    row.appendChild(teamCell);

    const iconCell = document.createElement('td');
    iconCell.innerHTML = `
        <img src="${item.icon}" height="50" width="50">
        <img src="${item.user1icon}" width="30">
        <img src="${item.user2icon}" width="30">
        <img src="${item.user3icon}" width="30">
    `;
    row.appendChild(iconCell);

    const scoreCell = document.createElement('td');
    scoreCell.textContent = parseFloat(item.score).toFixed(4);
    scoreCell.style.color = '#98c379';
    row.appendChild(scoreCell);

    const submitCountCell = document.createElement('td');
    submitCountCell.textContent = item.submitcount;
    submitCountCell.style.color = '#e06c75';
    row.appendChild(submitCountCell);

    const shakeCell = document.createElement('td');
    shakeCell.textContent = item.shake;
    shakeCell.style.color = item.shake.includes('↑') ? 'green' : item.shake.includes('↓') ? 'red' : '#abb2bf';
    row.appendChild(shakeCell);

    return row;
}

const appendRowElement = (item) => {
    const row = createRowElement(item);
    const tbody = document.getElementById('leaderboard');
    tbody.appendChild(row);
    // rank でソート
    const rows = Array.from(tbody.children);
    rows.sort((a, b) => parseInt(a.children[0].textContent) - parseInt(b.children[0].textContent));
    rows.forEach(row => tbody.appendChild(row));
}


const setupLeaderboard = (data) => {
    const tbody = document.getElementById('leaderboard');
    tbody.innerHTML = '';
    data.forEach(item => {
        const row = createRowElement(item);
        tbody.appendChild(row);
    });
}



const showAnnouncement = (row) => {
    const announcement = document.getElementById('announcement');
    announcement.innerHTML = '';
    announcement.appendChild(row);


    gsap.to(announcement, {
        display: 'block', opacity: 1, duration: 1, onComplete: () => {
            gsap.to(announcement, {
                opacity: 0, duration: 1, delay: 1, onComplete: () => {
                    announcement.style.display = 'none';
                }
            });
        }
    });
}



const showNextResult = () => {

    if (currentRankIndex >= 0) {

        playDrumRoll();
        ;

        const item = sortedData[currentRankIndex];
        const row = createRowElement(item);
        row.style.backgroundColor = 'rgba(18, 18, 18, 1.0)';

        currentRankIndex--;
        tbody = document.getElementById('leaderboard');

        setTimeout(() => {
            showAnnouncement(row);
            appendRowElement(item);
        }, 2000);



    } else {
        setupLeaderboard(sortedData);
        window.removeEventListener('keyup', handleKeyUp);
    }
}


const showAllResults = async () => {
    setupLeaderboard(await fetchPrivateData());
}

const handleKeyUp = (event) => {
    if (event.key === 'ArrowUp') {
        showNextResult();
    }
}

const startAnnouncementMode = async () => {
    sortedData = await fetchPrivateData();
    sortedData.sort((a, b) => a.rank - b.rank);
    document.getElementById('leaderboard').innerHTML = '';
    setupLeaderboard([]);
    currentRankIndex = sortedData.length - 1; // 最下位から開始
    window.addEventListener('keyup', handleKeyUp);

    alert('↑ キーで順位を順に発表します。　⚠️ 音が出ます');

}

document.getElementById('start-announcement').addEventListener('click', startAnnouncementMode);
document.getElementById('show-all').addEventListener('click', showAllResults);
setupLeaderboard([]);
