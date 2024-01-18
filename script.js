// Function to fetch data from the API
async function fetchData() {
    try {       
        const response = await fetch('https://api.sampleapis.com/codingresources/codingResources');
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Function to render data in the table
async function renderData() {    
    const data = await fetchData();

    if (!data) {
        return;
    }
    var temp = "";
    data.forEach((item) => {

        var anchor = document.createElement("a");
        anchor.setAttribute("target", "_blank");
        anchor.innerHTML = item.description;
        anchor.href = item.url;

        temp += "<tr>";   
        temp += "<td>" + anchor.outerHTML + "</td>";
        temp += "<td>" + item.types + "</td>";
        temp += "<td>" + item.topics + "</td></tr>";
    });
    document.getElementById('data').innerHTML = temp;    
}

// Call the renderData function to display data
renderData();

function persist(thisArg) {    
    localStorage.setItem(thisArg.id, thisArg.value);

    updateScript();
}

function updateScript(){
    var name = document.getElementById('firstName').value;
    var lastName = document.getElementById('lastName').value;
    var city = document.getElementById('city').value;
    var company = document.getElementById('company').value;
    var fullName = name + ' ' + lastName;

    var divText =     'Agent: Hello, CustomerName! This is [Your Name] from CompanyName. How are you today?<br/>Agent: We are launching a brand-new campaign called [Campaign Name], and we believe it is tailor-made for customers like you! based on customer history or preferences, and located in the city of CityName.'//document.getElementById('script').textContent;

    var mapObj = {
        CustomerName:fullName,
        CompanyName:company,
        CityName:city     
     };

    var re = new RegExp(Object.keys(mapObj).join("|"),"gi");    
    divText = divText.replace(re, function(matched){
      return mapObj[matched];
    });
   
    document.getElementById('script').innerHTML = divText;
}