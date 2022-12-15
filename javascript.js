class HexGrid {
    constructor(hexNums, lineshift, indexInfo, ASCIIHex) {
        this.hexNums = hexNums;
        this.lineshift = lineshift;
        this.indexInfo = indexInfo;
        this.ASCIIHex = ASCIIHex;
    }

    showInfo(index) {
        for (let i = 0; i < this.indexInfo.length; i++) {
            if (index >= this.indexInfo[i][0] && index <= this.indexInfo[i][1]) {
                // update the content of a pre-existing element on the page with the info from indexInfo
                document.getElementById('info-frame').innerHTML = this.indexInfo[i][2];
                /*/ Set the background color of the clicked hex code
                document.getElementById(index).style.backgroundColor = this.indexInfo[i][3];*/
                //var setClass = getElementById('info-frame')[0];
                //setClass.setAttribute('class', 'col-3');
                break;
            }
        }
    }



    render() {
        this.hexNums = this.hexNums.split(" ");

        /* Beginning ASCII */
        var ASCIITable = ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~';

        function hex2a(hexx) {
            var hex = hexx.toString();//force conversion
            var str = '';
            for (var i = 0; i < hex.length; i += 2 )
                if (ASCIITable.includes(String.fromCharCode(parseInt(hex.substr(i, 2), 16)))){
                str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
                } else{
                    str += "."
                }
            return str;
        }
        this.ASCIIHex = this.ASCIIHex.split(" ");

        document.write('<table class="col-2">');
        for (let i = 0; i < this.ASCIIHex.length; i += this.lineshift) {
            document.write('<tr class="table-light">');
            for (let j = i; j < i + this.lineshift; j++) {
                if (this.ASCIIHex[j] == null) {
                    this.ASCIIHex[j] = "";
                }
                let bgColor = "#fff"; // default color
                // Check if the index has a color in the indexInfo
                for (let k = 0; k < this.indexInfo.length; k++) {
                    if (j >= this.indexInfo[k][0] && j <= this.indexInfo[k][1]) {
                        bgColor = this.indexInfo[k][3];
                        break;
                    }
                }
                document.write(
                    '<td onclick="showInfo(' + j + ')" id="' + j + '" style="background-color: ' + bgColor + '">' + this.ASCIIHex[j] + "</td>"
                );
            }
            document.write("</tr>");
        }
        document.write("</table>");
         /* END*/

        document.write('<table class="col-1">');
        for (let i = 0; i < this.hexNums.length; i += this.lineshift) {
            document.write('<tr class="table-light">');
            for (let j = i; j < i + this.lineshift; j++) {
                if (this.hexNums[j] == null) {
                    this.hexNums[j] = "";
                }
                let bgColor = "#fff"; // default color
                // Check if the index has a color in the indexInfo
                for (let k = 0; k < this.indexInfo.length; k++) {
                    if (j >= this.indexInfo[k][0] && j <= this.indexInfo[k][1]) {
                        bgColor = this.indexInfo[k][3];
                        break;
                    }
                }
                document.write(
                    '<td onclick="showInfo(' + j + ')" id="' + j + '" style="background-color: ' + bgColor + '">' + hex2a(this.hexNums[j]) + "</td>"
                );
            }
            document.write("</tr>");
        }
        document.write("</table>");
        

        // Add an empty element where the info will be displayed
        document.write('<div id="info-frame" class="col"></div>');
    }

   
}

/* Get index of the last clicked button
document.getElementById('my-button').addEventListener('click', function () {
    var selection = document.getSelection();
    var selectedCells = Array.from(document.getElementsByTagName('td')).filter(function (cell) {
        return cell.contains(selection.anchorNode);
    });
    var selectedCellsNum = Array.from(document.getElementsByTagName('td'));
    for (var i = 0; i < selectedCells.length; i++) {
        console.log(selectedCells[i].id);
    }
}); */

/*function getSelectionHtml() {
    var html = "";
    if (typeof window.getSelection != "undefined") {
        var sel = window.getSelection();
        if (sel.rangeCount) {
            var container = document.createElement("div");
            for (var i = 0, len = sel.rangeCount; i < len; ++i) {
                container.appendChild(sel.getRangeAt(i).cloneContents());
                console.log(i)
            }
            html = container.innerHTML;
        }
    } else if (typeof document.selection != "undefined") {
        if (document.selection.type == "Text") {
            html = document.selection.createRange().htmlText;
            console.log(html.id + "jsodiaj")
        }
    }
    return html;
}

document.addEventListener('keyup', function(e){ 
  var selectedHTML, key = e.keyCode || e.which; 
  if( key == 16 ){ // if "shift" key was released
    selectedHTML = getSelectionHtml();
    if( selectedHTML )
      console.log(selectedHTML);
  }
});*/

function getSelectionHtml() {
    var html = "";
    if (typeof window.getSelection != "undefined") {
        var sel = window.getSelection();
        if (sel.rangeCount) {
            var container = document.createElement("div");
            for (var i = 0, len = sel.rangeCount; i < len; ++i) {
                container.appendChild(sel.getRangeAt(i).cloneContents());
            }
            html = container.innerHTML;
        }
    } else if (typeof document.selection != "undefined") {
        if (document.selection.type == "Text") {
            html = document.selection.createRange().htmlText;
        }
    }
    return html;
}

function highLow(arr) {
    return [Math.max(...arr), Math.min(...arr)];
}

document.addEventListener("keyup", function (e) {
    var selectedHTML,
        key = e.keyCode || e.which;
    if (key == 16) {
        // if "shift" key was released
        selectedHTML = getSelectionHtml();
        if (selectedHTML) {
            // get the selected elements
            var selectedElements = window
                .getSelection()
                .getRangeAt(0)
                .cloneContents()
                .querySelectorAll("td");
            var values = [];
            // print the tag ID of each selected element
            for (var i = 0; i < selectedElements.length; i++) {
                values.push(parseInt(selectedElements[i].id))
            }

            var highIndex = highLow(values)[0];
            var lowIndex = highLow(values)[1];

            if (highIndex < lowIndex) {
                temp = highIndex;
                highIndex = lowIndex;
                lowIndex = temp;
            }
            console.log("High Index: " + highIndex + "\nLow Index: " + lowIndex);
            alert("High Index: " + highIndex + "\nLow Index: " + lowIndex);


        }
    }
})


















/*
const hexNums = [
    "00", "00", "00", "1c", "66", "74", "79", "70",
    "6D", "6D", "70", "34", "00", "00", "00", "01",
    "6D", "6D", "70", "34", "33", "67", "70", "35",
    "33", "67", "70", "34", "00", "00", "00", "08",
    "6D", "64", "61", "74", "00", "67", "70", "35",
    "6D", "6D", "70", "34", "33", "67", "70", "35",
    "6D", "6D", "70", "34", "33", "67", "70", "35",
    "6D", "6D", "70", "34", "33", "67", "70", "35",
    "6D", "6D", "70", "34", "33", "67", "70", "35",
    "6D", "6D", "70", "34", "33", "67", "70", "35",
    "6D", "6D", "70", "34", "33", "67", "70", "35",
    "6D", "6D", "70", "34", "33", "67", "70", "35"];

const lineshift = 16;

const indexInfo = [[0, 3, "asdaoixjaoi", "rgb(255,0,1,0.5)"],
[4, 5, " dk9sk09cy82", "rgb(9,243,9,.5)"],
[6, 11, "asdajsoijx883838", "rgb(0,3,1,.5)"],
[12, 15, "dasm8cc8n", "rgb(0,d,1,.5)"],
[16, 21, "haushuahhuauhahuh", "rgb(238, 130, 238, 0.5)"],
[22, 25, "dms090a9sidm"],
[26, 28, "d88ndnd88nd8n8nd8"],
[29, 30, "thirty maffakas"]
];


const hexGrid = new HexGrid(hexNums, lineshift, indexInfo);
hexGrid.render();
function showInfo(index) {
    hexGrid.showInfo(index);
}
*/