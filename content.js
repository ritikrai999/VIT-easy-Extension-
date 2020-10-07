/**
 * @function modifydigitalAssignmentPage
 * Called when the Digital Assignment Page is loaded
*/
function func1(x)
{
    if(x)
    {
        return `<span class="glyphicon glyphicon-ok"></span>`;
    }
    return "-"
}


function func2(x)
{
    if(x.getFullYear()==275760)return "-";
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return `${days[x.getDay()]}<br>${x.getDate()}-${months[x.getMonth()]}-${x.getFullYear()}`;

}


const modifyDigitalAssignmentPage = () => {
    var sub={};
    document.querySelectorAll(".tableContent").forEach(x=>{
        y=x.innerHTML.split("\n");sub[y[3].split("</td>")[0].split(">")[1]]=[y[4].split("</td>")[0].split(">")[1],y[5].split("</td>")[0].split(">")[1],y[6].split("</td>")[0].split(">")[1]]
    });
    function myFunction2(classId) {
        var authorizedID = document.getElementById("authorizedID").value;
        var now = new Date();
        params = "authorizedID=" + authorizedID + "&x="
                + now.toUTCString() + "&classId=" + classId;
    
        return $.ajax({
            url : "examinations/processDigitalAssignment",
            type : "POST",
            data : params,
    
            success : function(response) {
                var x=response;x=x.split("fixedContent tableContent");for(var i=2;i<x.length;i++){y=x[i].split("</td>");var qw=y[4].split("</span>")[0].split(">")[2];date1.push([d1(qw),classId,y[1].split(">")[1],y[2].split("</td>")[0].split(">")[1],y[3].split("</td>")[0].split(">")[1],y[6].split("</span>")[0].split("<span>")[1],y[5].split(`<td style="width: 4%;">`)[1]])};
            }
    
        });
    }
    
    var MAX_TIMESTAMP = 8640000000000000;
    
    function d1(x)
    {
        if(x=="-")
            return (new Date(MAX_TIMESTAMP));
        x=x.split("-");
        return (new Date(x.join(" ")));
    }
    
    
            date1=[];
            promise=[];
            document.querySelectorAll(".tableContent").forEach(
                x=>{ 
        
                    promise.push(myFunction2(x.innerHTML.split("\n")[3].split("</td>")[0].split(">")[1]));
                })
            
            Promise.all(promise).then((values) => {
                // console.log(date1);console.log(values,"ans");console.log("Sorted");
                date1.sort(function(a,b)
                {
                    return a[0]-b[0];
                });
                // console.log(date1);
                if(date1.length>=1)
                {
                    var html=``;
                    html+=`<div id="fixedTableContainer1" class="fixedTableContainer" align="center">
                            <br><br><h3>All DAs in Date-wise sorted order</h3>
                
                            <table class="customTable" style="width: 90%">
                                <tr class="tableHeader">
                                    <td style="width: 5%;">Sr.No</td>
                                    
                                    <td style="width: 10%;">Course Code</td>
                                    <td style="width: 30%;">Course Title</td>
                                    <td style="width: 5%;">Course Type</td>
                                    <td style="width: 15%;">Assignment</td>
                                    <td style="width: 5%;">Marks</td>
                                    <td style="width: 10%;">Last Date Of Upload</td>
                                    <td style="width: 5%;">QP</td>
                                    <td style="width: 10%;">Status</td>
                                    <td style="width: 5%;">Dashboard</td>
                
                                </tr>
                                <tbody>`
                    
                    for(var i=0;i<date1.length;i++)
                    {
                        html+=`
                                <tr class="table Content" align="center">
                                <td style="width: 5%;">${i+1}</td>
                                <td style="width: 10%;">${sub[date1[i][1]][0]}</td>
                                <td style="width: 30%;">${sub[date1[i][1]][1]}</td>
                                <td style="width: 5%;">${sub[date1[i][1]][2]}</td>
                                <td style="width: 15%;">${date1[i][2]}</td>
                                <td style="width: 5%;">${date1[i][3]}</td>
                                <td style="width: 10%;">${func2(date1[i][0])}</td>
                                <td style="width: 5%;">${date1[i][6]}</td>
                                <td style="width: 10%;">${func1(date1[i][5])}</td>
                                <td style="width: 5%;"><button class="icon-button" type="button" onclick="javascript:myFunction('${date1[i][1]}');">
                                <span class="glyphicon  glyphicon-folder-open glyphiconDefault"></span>
                                </button></td>
                                </tr>
                            `
                    }

                
                html+=`</tbody></table>
                </div>`;
                jQuery("#digitalAssignment > div > div").append(html);
                }
                
var rows = document.querySelectorAll("#fixedTableContainer1 > table > tbody > tr");
rows.forEach(row => { 
    var per = row.querySelector("td:nth-child(7)");
    var d1=new Date();
    var d2=new Date(per.innerHTML.split("<br>")[1]);
    var Difference_In_Time = d2.getTime() - d1.getTime(); 
    var Difference_In_Days = Difference_In_Time / (1000 * 3600*24 );
    var dif=Difference_In_Days+1;
    if(dif-1<=0)per.style.color = "#ff0000";
    if(dif>=0 && dif<=1)row.setAttribute("style","background: #efd2a5;");
    else if(dif>=1 && dif<=7)row.setAttribute("style","background: #e8ff82");
    if(dif>0)per.style.color = "#449141";
                });
                return;
        });
};



chrome.runtime.onMessage.addListener(request => {
     if (request.message === "DAPage") {
        try {          
            modifyDigitalAssignmentPage();          
        } catch (error) {
            console.log(error);
        }
    }
    console.log("done");
});  
