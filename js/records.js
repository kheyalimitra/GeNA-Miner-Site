function tableDataToArray(tableData) {
    tableData = tableData.replace(/…/g, "...");
    tableData = tableData.replace(/"/g, '\"\"');
    rows = tableData.split('\n');
    for (i = 0; i < rows.length; ++i) {
        rows[i] = rows[i].split('\t');
    }
    return rows;
}
function arrayToTableData(rows, fieldBoundary, fieldSeperator) {
    stringData = "";
    for (i = 0; i < rows.length; ++i) {
        for (j = 0; j < rows[i].length-1; ++j) {
            stringData = stringData + fieldBoundary + rows[i][j] + fieldBoundary + fieldSeperator;
        }
        if (rows[i].length >= 1) {
            stringData = stringData + fieldBoundary + rows[i][j] + fieldBoundary + '\n';
        }
    }
    return stringData;
}

function toNodeXLData(oriData, fieldBoundary, fieldSeperator) {
    rows = tableDataToArray(oriData);
    rows.shift();
    var newTableArray = [["Vertex 1", "Vertex 2", "Text", "Relationship"]];
    for (i = 0; i < rows.length; ++i) {
        var arow = rows[i];
        var vertex1 = arow[0];
        var vertex2 = arow[0];
        var text = arow[1];
        var relationship = arow[2];
        var mentionList = arow[3];

        if (relationship == "") {
            relationship = "Tweet";
        } else if (relationship == "reply") {
            relationship = "Reply To";
        } else if (relationship == "mention") {
            relationship = "Mentions";
        } else {
            continue;
        }

        if (mentionList == "") {
            newTableArray.push([vertex1, vertex2, text, relationship]);
        } else {
            mlist = mentionList.split(', ');
            for (j = 0; j < mlist.length; ++j) {
                vertex2 = mlist[j].replace("@", "");
                newTableArray.push([vertex1, vertex2, text, relationship]);
            }
        }

    }

    return arrayToTableData(newTableArray, fieldBoundary, fieldSeperator);
}

function toNvivoData(oriData, fieldBoundary, fieldSeperator) {
    rows = tableDataToArray(oriData);
    rows.shift();

    var newTableArray = [];
    var structuredData = {};
    var typeMap = {"": "Tweet", "retweet": "Retweet", "mention": "Mentions", "reply": "Reply To"};

    for (i = 0; i < rows.length; ++i) {
        var arow = rows[i];

        structuredData[arow[13]] = {
            "Tweet ID": arow[13],
            "Username": arow[2],
            "Tweet": arow[3],
            "Time": arow[1],
            "Tweet Type": typeMap[arow[4]],
            "Retweeted by": "",
            "Number of Retweets": 0,
            "Hashtags": arow[7],
            "Mentions": arow[8],
            "Name (real)": "",
            "Location": arow[5],
            "Web": arow[9],
            "Bio": "",
            "Number of Tweets": 0,
            "Number of Followers": 0,
            "Number Following": 0,
            "Location Coordinates": arow[11]
        }
    }

    for (i = 0; i < rows.length; ++i) {
        var arow = rows[i];
        var oriTweetID = arow[15];
        if (oriTweetID != "" && structuredData[oriTweetID] != null) {
            if (structuredData[oriTweetID]["Retweeted by"] == "") {
                structuredData[oriTweetID]["Retweeted by"] = arow[2];
            } else {
                structuredData[oriTweetID]["Retweeted by"] += ", " + arow[2];
            }
            structuredData[oriTweetID]["Number of Retweets"]++;
        }
    }

    for (id in structuredData) {
        if (newTableArray.length == 0) {
            newTableArray.push(Object.keys(structuredData[id]));
        }
        var values = Object.keys(structuredData[id]).map(function(key){
            return structuredData[id][key];
        });
        newTableArray.push(values);
    }

    return arrayToTableData(newTableArray, fieldBoundary, fieldSeperator);
}
