async function fetchPublicData() {
    const publicData = await d3.json('public_scorelog.json');
    return transformData(publicData);
}

async function fetchPrivateData() {
    const privateData = await d3.json('private_scorelog.json');
    return transformData(privateData);
}

async function fetchAllDates() {
    const allDates = await d3.json('all_dates.json');
    return allDates.map(date => new Date(date));
}

function transformData(data) {
    return data.map(d => {
        const entries = Object.entries(d).filter(([key, value]) => key !== 'post_date');
        return entries.map(([teamid, score]) => ({
            timestamp: new Date(d.post_date),
            teamid: +teamid,
            score: +score
        }));
    }).flat();
}

function setupChart(data) {
    const svg = d3.select("#chart");
    const containerWidth = document.getElementById("chart-container").clientWidth;
    const containerHeight = document.getElementById("chart-container").clientHeight;
    const ticker = 200;
    const timeInterval = 10;
    const timeStep = 1000 * 60 * 10;

    const dateList = Array.from(new Set(data.map(d => d.timestamp))).sort((a, b) => a - b);
    const fontSize = 16;
    const rectProperties = { height: 20, padding: 10 };

    svg.selectAll("*").remove(); // Clear previous chart

    const container = svg.append("g")
        .classed("container", true)
        .attr("transform", `translate(10, 25)`);

    const widthScale = d3.scaleLinear()
        .range([0, containerWidth - 50]);

    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    const axisTop = svg.append('g')
        .classed('axis', true)
        .attr("transform", "translate(10, 20)")
        .call(d3.axisTop(widthScale).tickSize(-containerHeight + 30).tickFormat(d3.format(".2s")));

    const teamMaxScores = {};

    let currentTime = dateList[0];
    const endTime = dateList[dateList.length - 1];

    // 現在時刻表示用のテキスト要素を追加
    const currentTimeText = svg.append("text")
        .attr("x", containerWidth - 200)
        .attr("y", containerHeight - 10)
        .attr("font-size", "14px")
        .attr("fill", "white");

    const update = (timestamp) => {
        data.filter(d => d.timestamp <= timestamp).forEach(d => {
            if (!teamMaxScores[d.teamid]) {
                teamMaxScores[d.teamid] = 0;
            }
            teamMaxScores[d.teamid] = Math.max(teamMaxScores[d.teamid], d.score);
        });

        const presentData = Object.keys(teamMaxScores).map(teamid => ({
            teamid: parseInt(teamid),
            score: teamMaxScores[teamid]
        }));

        widthScale.domain([0, 1.5 * d3.max(presentData, d => d.score)]);

        axisTop.transition()
            .duration(ticker / 1.2)
            .ease(d3.easeLinear)
            .call(d3.axisTop(widthScale).tickSize(-containerHeight + 30).tickFormat(d3.format(".2s")));

        const sortedRange = [...presentData].sort((a, b) => b.score - a.score);

        container.selectAll("text")
            .data(presentData, d => d.teamid)
            .join(
                enter => enter.append("text")
                    .attr("x", d => Math.min(widthScale(d.score) + fontSize, containerWidth - 50))
                    .attr("y", (d, i) => sortedRange.findIndex(e => e.teamid === d.teamid) * (rectProperties.height + rectProperties.padding) + fontSize)
                    .style("fill", d => colorScale(d.teamid))
                    .text(d => d.teamid + " " + d.score.toFixed(6)),
                update => update.transition().duration(ticker / 1.2).ease(d3.easeLinear)
                    .attr("x", d => Math.min(widthScale(d.score) + fontSize, containerWidth - 50))
                    .attr("y", (d, i) => sortedRange.findIndex(e => e.teamid === d.teamid) * (rectProperties.height + rectProperties.padding) + fontSize)
                    .style("fill", d => colorScale(d.teamid))
                    .text(d => d.teamid + " " + d.score.toFixed(6)),
                exit => exit.remove()
            );

        container.selectAll("rect")
            .data(presentData, d => d.teamid)
            .join(
                enter => enter.append("rect")
                    .attr("x", 10)
                    .attr("y", (d, i) => sortedRange.findIndex(e => e.teamid === d.teamid) * (rectProperties.height + rectProperties.padding))
                    .attr("width", d => d.score <= 0 ? 0 : Math.min(widthScale(d.score), containerWidth - 50))
                    .attr("height", 20)
                    .style("fill", d => colorScale(d.teamid)),
                update => update.transition().duration(ticker / 1.2).ease(d3.easeLinear)
                    .attr("y", (d, i) => sortedRange.findIndex(e => e.teamid === d.teamid) * (rectProperties.height + rectProperties.padding))
                    .attr("width", d => d.score <= 0 ? 0 : Math.min(widthScale(d.score), containerWidth - 50))
                    .style("fill", d => colorScale(d.teamid)),
                exit => exit.remove()
            );

        // 現在時刻表示を更新
        currentTimeText.text(d3.timeFormat("%Y-%m-%d %H:%M:%S")(timestamp));
    };

    const animate = async (dates) => {
        while (currentTime <= endTime) {
            update(currentTime);
            updatePlot(currentTime, dates); // 追加
            currentTime = new Date(currentTime.getTime() + timeStep); // 時刻を進める間隔
            await new Promise(done => setTimeout(() => done(), timeInterval));
        }
    };

    fetchAllDates().then(dates => {
        setupPlot(dates);
        animate(dates);
    });
}

let plotSvg, xScale, yScale, line;

function setupPlot() {
    plotSvg = d3.select("#plot");
    const plotWidth = document.getElementById("plot-container").clientWidth;
    const plotHeight = document.getElementById("plot-container").clientHeight;

    plotSvg.selectAll("*").remove();

    plotSvg.append("text")
        .attr("x", (plotWidth / 2))
        .attr("y", 20)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("fill", "white")
        .text("Submit 数");

    plotSvg.append('g')
        .attr('transform', `translate(40, ${plotHeight - 50})`)
        .classed('x-axis', true);

    plotSvg.append('g')
        .attr('transform', 'translate(40, 0)')
        .classed('y-axis', true);

    line = plotSvg.append('path')
        .datum([])
        .attr('fill', 'none')
        .attr('stroke', 'steelblue')
        .attr('stroke-width', 2)
        .attr('transform', 'translate(40, 0)');
}


function updatePlot(currentTime, dates) {
    const filteredDates = dates.filter(date => date <= currentTime);
    let cumulativeCounts = filteredDates.map((date, index) => ({
        timestamp: date,
        count: index + 1
    }));

    // 最後の投稿時間がcurrentTimeより前の場合、currentTimeを追加してyの値を維持
    if (filteredDates.length > 0 && filteredDates[filteredDates.length - 1] < currentTime) {
        cumulativeCounts.push({
            timestamp: currentTime,
            count: cumulativeCounts[cumulativeCounts.length - 1].count
        });
    }

    // 動的にスケールを設定
    xScale = d3.scaleTime()
        .domain([d3.min(filteredDates), new Date(d3.max(filteredDates).getTime() + 3 * 60 * 60 * 1000)])
        .range([0, document.getElementById("plot-container").clientWidth - 50]);

    yScale = d3.scaleLinear()
        .domain([0, d3.max(cumulativeCounts, d => d.count) + 20])
        .range([document.getElementById("plot-container").clientHeight - 50, 0]);

    // 軸を更新
    plotSvg.select('.x-axis')
        .call(d3.axisBottom(xScale).tickSize(-document.getElementById("plot-container").clientHeight + 50));

    plotSvg.select('.y-axis')
        .call(d3.axisLeft(yScale).tickSize(-document.getElementById("plot-container").clientWidth + 50));

    const lineGenerator = d3.line()
        .x(d => xScale(d.timestamp))
        .y(d => yScale(d.count));

    line.datum(cumulativeCounts)
        .attr('d', lineGenerator);
}

document.getElementById("public").addEventListener("click", async () => {
    const data = await fetchPublicData();
    setupChart(data);
});

document.getElementById("private").addEventListener("click", async () => {
    const data = await fetchPrivateData();
    setupChart(data);
});

// デフォルトでpublicデータをロード
fetchPublicData().then(data => setupChart(data));
