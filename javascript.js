class HexGrid {
    constructor(hexNums, lineshift, indexInfo, ASCIIHex) {
        this.hexNums = hexNums;
        this.lineshift = lineshift;
        this.indexInfo = indexInfo;
        this.ASCIIHex = ASCIIHex;
    }

    updateLineshift(newWidth){
        this.lineshift = newWidth;
    }

    showInfo(index) {
        for (let i = 0; i < this.indexInfo.length; i++) {
            if (index >= this.indexInfo[i][0] && index <= this.indexInfo[i][1]) {
                // update the content of a pre-existing element on the page with the info from indexInfo
                document.getElementById('info-frame').innerHTML = this.indexInfo[i][2];
                break;
            }
        }
    }



    render() {
        this.hexNums = this.hexNums.split(" ");

        /* Beginning ASCII table */
        var ASCIITable = ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~';

        function hex2a(hexx) {
            // https://stackoverflow.com/questions/3745666/how-to-convert-from-hex-to-ascii-in-javascript
            var hex = hexx.toString();//force conversion
            var str = '';
            for (var i = 0; i < hex.length; i += 2)
                if (ASCIITable.includes(String.fromCharCode(parseInt(hex.substr(i, 2), 16)))) {
                    str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
                } else {
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
        /* END ASCII table*/

        document.write('<table class="col-1">');
        for (let i = 0; i < this.hexNums.length; i += this.lineshift) {
            document.write('<tr class="table-light">');
            for (let j = i; j < i + this.lineshift; j++) {
                if (this.hexNums[j] == null) {
                    this.hexNums[j] = "";
                }
                let bgColor = "#fff";
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
        //key = e.keyCode || e.which; //deprecated
        key = e.key;
    //if (key == 16) { // part of the depreacated code ^^
    if (key == "Shift") {
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
            alert("High Index: " + highIndex + "\nLow Index: " + lowIndex);


        }
    }
})

