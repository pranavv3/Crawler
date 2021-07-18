// profile elements
const apiURL = "https://codeforces.com/api/";
var CFHandleVal = "";

window.addEventListener("load", () => {
    CFHandleVal = localStorage.getItem("cfval");
    fetch(`${apiURL}user.info?handles=${CFHandleVal}`)
        .then((res) => {
            if (res.ok) {
                console.log("SUCCESS");
                return res.json();
            } else {
                console.log("UNSUCCESSFULL");
            }
        })
        .then((data) => {
            // console.log(data.result[0]);
            const allDetails = data.result[0];
            showDetails(allDetails);
            showstats();
        })
        .catch(() => {
            console.log("ERROR");
        });
});

const titlephoto = document.querySelector(".titlephoto");
const avatar = document.querySelector(".avatar");
const handle = document.querySelector(".profile-handle");
const email = document.querySelector(".email");
const fullname = document.querySelector(".fullname");
const rating = document.querySelector(".rating");
const maxrating = document.querySelector(".maxrating");
const countrycity = document.querySelector(".countrycity");
const organisatation = document.querySelector(".organisatation");
const contribution = document.querySelector(".contribution");
const lastseen = document.querySelector(".lastseen");
const friendof = document.querySelector(".friendof");
const userdesc = document.querySelector(".userdesc");

function showDetails(info) {
    strrating(info.rating);

    renderImage(info.titlePhoto, titlephoto);
    // renderImage(info.avatar, avatar);
    if (info.handle != undefined) {
        ratingColor(info.rating, handle);
        handle.innerHTML = `${info.handle}`;
    }
    if (info.email != undefined) {
        email.innerHTML = `${info.email}`;
    }
    if (info.firstName != undefined) {
        ratingColor(info.firstName, fullname);
        fullname.innerHTML = `${info.firstName} `;
        if (info.lastName != undefined) {
            ratingColor(info.lastName, fullname);
            fullname.innerHTML += `${info.lastName}`;
        }
    }
    if (info.rating != undefined) {
        ratingColor(info.rating, rating);
        userdesc.innerHTML += ratingColor(info.rating, userdesc)[1];
        rating.innerHTML += `${info.rating}`;
    }
    if (info.maxRating != undefined) {
        ratingColor(info.maxRating, maxrating);
        maxrating.innerHTML = `${info.maxRating}`;
    }
    // add city
    if (info.country != undefined) {
        countrycity.innerHTML = `${info.country}`;
    }
    if (info.organizataion != undefined) {
        organisatation.innerHTML = `${info.organizatation}`;
    }
    if (info.contribution != undefined) {
        contribution.innerHTML = `${info.contribution}`;
    }
    if (info.lastOnlineTimeSeconds != undefined) {
        lastseen.innerHTML = `${normalTime(info.lastOnlineTimeSeconds)}`;
    }
    if (info.friendOfCount != undefined) {
        friendof.innerHTML = `${info.friendOfCount}`;
    }
}

function ratingColor(userRating, ele) {
    var usercolor = "";
    var catg = "";
    if (userRating <= 1199) {
        usercolor = "#808080";
        catg = `Newbie`;
    } else if (userRating <= 1399 && userRating >= 1200) {
        usercolor = "#008000";
        catg = `Pupil`;
    } else if (userRating <= 1599 && userRating >= 1400) {
        usercolor = "#03A89E";
        catg = `Specialist`;
    } else if (userRating <= 1899 && userRating >= 1600) {
        usercolor = "#0000FF";
        catg = `Expert`;
    } else if (userRating <= 2099 && userRating >= 1900) {
        usercolor = "#AA00AA";
        catg = `Candidate Master`;
    } else if (userRating <= 2299 && userRating >= 2100) {
        usercolor = "#FF8C00";
        catg = `Master`;
    } else if (userRating <= 2399 && userRating >= 2300) {
        usercolor = "#FF8C00";
        catg = `International Master`;
    } else if (userRating <= 2599 && userRating >= 2400) {
        usercolor = "#FF0000";
        catg = `Grandmaster`;
    } else if (userRating <= 2999 && userRating >= 2600) {
        usercolor = "#FF0000";
        catg = `International Grandmaster`;
    } else if (userRating >= 3000) {
        usercolor = "#FF0000";
        catg = "Legendary Grandmaster";
    }
    ele.style.color = usercolor;
    return [usercolor, catg];
}

function normalTime(val) {
    let unix_timestamp = val;
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    var date = new Date(unix_timestamp * 1000);
    // Hours part from the timestamp
    var hours = date.getHours();
    // Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();
    // Will display time in 10Hr 30Min format
    var formattedTime = hours + "Hr " + minutes.substr(-2) + "Min ";
    return formattedTime;
}

function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var year = a.getFullYear();
    var month = a.getMonth();
    var date = a.getDate();
    var final = year + "-" + month + "-" + date;
    return final;
}
// console.log(timeConverter(1625976000));

function renderImage(path, ele) {
    var img = new Image();
    img.src = path;
    ele.appendChild(img);
}

function strrating(rating) {
    localStorage.setItem("rat", rating);
}

google.charts.load("current", { packages: ["corechart"] });
google.charts.load("current", { packages: ["calendar"] });
google.charts.load("current", { packages: ["bar"] });

// verdicts = result.verdict "OK", "TLE"... --single string
// lang = result.programmingLanguage --single string
// tags = result.problem.tags -- array of strings
// level = result.problem.index
// probRating = result.problem.rating
// heatmap = result.creationTimeSeconds --unix time
let verdictMap = new Map();
let verdict = [];
verdict.push(["Verdict", "Its Count"]);

let langMap = new Map();
let lang = [];
lang.push(["Language", "Percentage"]);

let tagsMap = new Map();
let tags = [];
tags.push(["Tag", "Its Count"]);

let levelMap = new Map();
let levels = [];
levels.push(["Level", "Its Count"]);

let probRatingMap = new Map();
let probRating = [];
probRating.push(["Rating", "Its Count"]);

let heatmapMap = new Map();
let heatmap = [];
let minYear = 3000;
let maxYear = 1800;

function showstats() {
    fetch(`${apiURL}user.status?handle=${CFHandleVal}`)
        .then((res) => {
            if (res.ok) {
                // console.log("SUCCESS for Unsolved Fetch");
                return res.json();
            } else {
                console.log("UNSUCCESSFULL for Submissions Fetch");
            }
        })
        .then((data) => {
            // console.log(data.result);
            RES = data.result;
            for (var i = 0; i < RES.length; i++) {
                if (verdictMap.has(RES[i].verdict))
                    verdictMap.set(
                        RES[i].verdict,
                        verdictMap.get(RES[i].verdict) + 1
                    );
                else verdictMap.set(RES[i].verdict, 1);
                if (langMap.has(RES[i].programmingLanguage)) {
                    langMap.set(
                        RES[i].programmingLanguage,
                        langMap.get(RES[i].programmingLanguage) + 1
                    );
                } else {
                    langMap.set(RES[i].programmingLanguage, 1);
                }
                if (RES[i].verdict == "OK") {
                    for (var j = 0; j < RES[i].problem.tags.length; j++) {
                        if (tagsMap.has(RES[i].problem.tags[j])) {
                            tagsMap.set(
                                RES[i].problem.tags[j],
                                tagsMap.get(RES[i].problem.tags[j]) + 1
                            );
                        } else {
                            tagsMap.set(RES[i].problem.tags[j], 1);
                        }
                    }
                    let temp = RES[i].problem.index;
                    if (temp.length == 2) {
                        temp = temp.slice(0, 1);
                    }
                    if (levelMap.has(temp)) {
                        levelMap.set(temp, levelMap.get(temp) + 1);
                    } else {
                        levelMap.set(temp, 1);
                    }
                    if (probRatingMap.has(RES[i].problem.rating)) {
                        probRatingMap.set(
                            RES[i].problem.rating,
                            probRatingMap.get(RES[i].problem.rating) + 1
                        );
                    } else {
                        probRatingMap.set(RES[i].problem.rating, 1);
                    }
                }
                let temp = timeConverter(RES[i].creationTimeSeconds);
                if (heatmapMap.has(temp)) {
                    heatmapMap.set(temp, heatmapMap.get(temp) + 1);
                    minYear = Math.min(minYear, parseInt(temp.split("-")[0]));
                    maxYear = Math.max(maxYear, parseInt(temp.split("-")[0]));
                } else {
                    heatmapMap.set(temp, 1);
                    minYear = Math.min(minYear, parseInt(temp.split("-")[0]));
                    maxYear = Math.max(maxYear, parseInt(temp.split("-")[0]));
                }
            }
            // verdicts
            for (let [key, value] of verdictMap) {
                // console.log(key + " = " + value);
                verdict.push([key, value]);
            }
            verdict = verdict.sort(([a, b], [c, d]) => d - b || c - a);
            // lang
            for (let [key, value] of langMap) {
                // console.log(key + " = " + value);
                lang.push([key, value]);
            }
            lang = lang.sort(([a, b], [c, d]) => d - b || c - a);
            // tags
            for (let [key, value] of tagsMap) {
                // console.log(key + " = " + value);
                tags.push([key, value]);
            }
            tags = tags.sort(([a, b], [c, d]) => d - b || c - a);
            // levels
            for (let [key, value] of levelMap) {
                // console.log(key + " = " + value);
                levels.push([key, value]);
            }
            levels = levels.sort(([a, b], [c, d]) => c>a || b-d);
            // rated problems
            for (let [key, value] of probRatingMap) {
                // console.log(key + " = " + value);
                probRating.push([key, value]);
            }
            probRating = probRating.sort(([a, b], [c, d]) => c - a || b - d);
            // heatmap
            for (let [key, value] of heatmapMap) {
                // console.log(key + " = " + value);
                let temp = key.split("-");
                heatmap.push([
                    new Date(
                        parseInt(temp[0]),
                        parseInt(temp[1]),
                        parseInt(temp[2])
                    ),
                    value,
                ]);
            }
            // console.log(heatmap);

            google.charts.setOnLoadCallback(drawChartVerdict);
            google.charts.setOnLoadCallback(drawChartLang);
            google.charts.setOnLoadCallback(drawChartTags);
            google.charts.setOnLoadCallback(drawStuffLevel);
            google.charts.setOnLoadCallback(drawStuffProbRating);
            let heiOfHeatmap = (maxYear - minYear + 1) * 9 + 5;
            document.querySelector(
                ".heatmap"
            ).style.height = `${heiOfHeatmap}em`;
            google.charts.setOnLoadCallback(drawChart);
        })
        .catch(() => {
            console.log("ERROR for Submissions Fetch");
        });
}

function drawChartVerdict() {
    var data = google.visualization.arrayToDataTable(verdict);
    var options = {
        title: "Verdicts of " + CFHandleVal,
        is3D: true,
        chartArea: { backgroundColor: "#141414" },
        backgroundColor: "#141414",
        legend: {
            textStyle: {
                color: "white",
            },
        },
        titleTextStyle: {
            color: "white",
        },
    };
    var chart = new google.visualization.PieChart(
        document.getElementById("piechart_3d_verdicts")
    );
    chart.draw(data, options);
}

function drawChartLang() {
    var data = google.visualization.arrayToDataTable(lang);
    var options = {
        title: "Programming Languages used by " + CFHandleVal,
        is3D: true,
        chartArea: { backgroundColor: "#141414" },
        backgroundColor: "#141414",
        legend: {
            textStyle: {
                color: "white",
            },
        },
        titleTextStyle: {
            color: "white",
        },
    };
    var chart = new google.visualization.PieChart(
        document.getElementById("piechart_3d_lang")
    );
    chart.draw(data, options);
}

function drawChartTags() {
    var data = google.visualization.arrayToDataTable(tags);
    var options = {
        title: "Tags of " + CFHandleVal,
        pieHole: 0.4,
        chartArea: { backgroundColor: "#141414" },
        backgroundColor: "#141414",
        legend: {
            textStyle: {
                color: "white",
            },
        },
        titleTextStyle: {
            color: "white",
        },
    };
    var chart = new google.visualization.PieChart(
        document.getElementById("donutchartTags")
    );
    chart.draw(data, options);
}

function drawStuffLevel() {
    var data = new google.visualization.arrayToDataTable(levels);

    var options = {
        width: 800,
        chart: {
            title: "Levels of Problems",
        },
        axes: {
            x: {
                0: { side: "top", label: "Accepted Solutions" }, // Top x-axis.
            },
        },
        bar: { groupWidth: "90%" },
        chartArea: { backgroundColor: "#141414" },
        backgroundColor: "#141414",
        legend: {
            textStyle: {
                color: "white",
            },
            position: "none",
        },
        titleTextStyle: {
            color: "white",
        },
    };
    var chart = new google.charts.Bar(
        document.getElementById("top_x_divLevel")
    );
    // Convert the Classic options to Material options.
    chart.draw(data, google.charts.Bar.convertOptions(options));
}

function drawStuffProbRating() {
    var data = new google.visualization.arrayToDataTable(probRating);
    var options = {
        width: 800,
        chart: {
            title: "Rated Problems Solved by " + CFHandleVal,
        },
        axes: {
            x: {
                0: { side: "top", label: "Accepted Solutions" }, // Top x-axis.
            },
        },
        hAxis: {
            format: "",
        },
        bar: { groupWidth: "90%" },
        chartArea: { backgroundColor: "#141414" },
        backgroundColor: "#141414",
        legend: {
            textStyle: {
                color: "white",
            },
            position: "none",
        },
        titleTextStyle: {
            color: "white",
        },
    };
    var chart = new google.charts.Bar(
        document.getElementById("top_x_divProbRating")
    );
    // Convert the Classic options to Material options.
    chart.draw(data, google.charts.Bar.convertOptions(options));
}

function drawChart() {
    var dataTable = new google.visualization.DataTable();
    dataTable.addColumn({ type: "date", id: "Date" });
    dataTable.addColumn({ type: "number", id: "Submissions" });
    // console.log(arrayDate);
    dataTable.addRows(heatmap);
    var chart = new google.visualization.Calendar(
        document.getElementById("calendar_basic")
    );
    var options = {
        title: "Submission Heatmap of " + CFHandleVal,
        calendar: {
            unusedMonthOutlineColor: {
                stroke: "red",
                strokeOpacity: 0.8,
                strokeWidth: 2,
            },
        },
        colorAxis: {
            colors: ["#66DE93", "#064420"],
        },
    };

    chart.draw(dataTable, options);
}
