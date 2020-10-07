function attendFun()
{
    var rows = document.querySelectorAll("#getStudentDetails > div > table > tbody > tr");
rows.forEach(row => {
    const per = row.querySelector("td:nth-child(12)");if(per){
    if (per.textContent < 75)
    {
        row.setAttribute("style","background: #efd2a5;");
    }if(per.textContent>=75 && per.textContent<=85) row.setAttribute("style","background: #e8ff82");}
})
}
chrome.runtime.onMessage.addListener(request => {
    // console.log(request.message);
    if (request.message === "Attendpage") {
       try {          
           attendFun();          
       } catch (error) {
           console.log(error);
       }
   }
   console.log("done");
}); 
