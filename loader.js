xmlhttp = new XMLHttpRequest();
xmlhttp.open("GET", "times.xml", false)
xmlhttp.send();
list = xmlhttp.responseXML;
var d = new Date();
var day = d.getDay();
var hour = d.getHours();
if (d.getMinutes() >= 15 && d.getMinutes() < 30) 
{
	hour = hour + 0.25;
} else if (d.getMinutes() >= 30 && d.getMinutes() < 45) 
{
	hour = hour + 0.5;
}
else if (d.getMinutes() >= 45)
{
	hour = hour + 0.75;
}



for (j=0; j<list.getElementsByTagName('category').length; j++) {
	document.write("<h1>");
	document.write(list.getElementsByTagName('title')[j].childNodes[0].nodeValue);
	document.write("</h1>");
	for (i=0; i<list.getElementsByTagName('category')[j].getElementsByTagName('name').length; i++) {
		var openTime = parseInt(list.getElementsByTagName('category')[j].getElementsByTagName('item')[i].getElementsByTagName('times')[day].getElementsByTagName('open')[0].childNodes[0].nodeValue);
		var closeTime = parseInt(list.getElementsByTagName('category')[j].getElementsByTagName('item')[i].getElementsByTagName('times')[day].getElementsByTagName('close')[0].childNodes[0].nodeValue);
		
		if (closeTime < openTime) //Needed to correct for eg Library times, where open time = 10 am (10) and close time = 1 am (1)
		{ 
			if (hour < closeTime) 
			{ 
				hour = hour + 24;
			}
			closeTime = closeTime + 24; 
		}
			
		if (openTime == -1 && closeTime == -1) 
		{
			document.write("<div id='");
			document.write(j);
			document.write(i);
			document.write("'><div class='project open'><b>"); //green, for things ALWAYS open (Halligan)
		}
		else if (hour >= openTime - 0.5 && hour < openTime) //opening if within half an hour before openTime
		{
			document.write("<div id='");
			document.write(j);
			document.write(i);
			document.write("'><div class='project opening'><b>"); //yellow
		}
		else if (hour >= openTime && hour < closeTime - 0.5)
		{
			document.write("<div id='");
			document.write(j);
			document.write(i);
			document.write("'><div class='project open'><b>"); //green
		}
		else if (hour >= closeTime - 0.5 && hour < closeTime)
		{
			document.write("<div id='");
			document.write(j);
			document.write(i);
			document.write("'><div class='project closing'><b>"); //orange
		}
		else {
			document.write("<div id='");
			document.write(j);
			document.write(i);
			document.write("'><div class='project closed'><b>"); //red
			
		}
		document.write(list.getElementsByTagName('category')[j].getElementsByTagName('name')[i].childNodes[0].nodeValue);
		document.write("</b><div class='details'>");
		document.write(list.getElementsByTagName('category')[j].getElementsByTagName('info')[i].childNodes[0].nodeValue);
		document.write("</div></div></div>");
		
		if (hour >= 24) 
		{
			hour = hour - 24;
		}
	}
}

//Searching stuff
function searchPlaces() {
	for (j=0; j<list.getElementsByTagName('category').length; j++) {
		for (i=0; i<list.getElementsByTagName('category')[j].getElementsByTagName('name').length; i++) {
			if (document.getElementById('search').value != "")
				document.getElementById((j.toString()+i.toString()).toString()).hidden=true;
			else
				document.getElementById((j.toString()+i.toString()).toString()).hidden=false;
				
			if (list.getElementsByTagName('category')[j].getElementsByTagName('name')[i].childNodes[0].nodeValue.toLowerCase().indexOf(document.getElementById('search').value.toLowerCase()) >= 0 && document.getElementById('search').value != "") {
					document.getElementById(j.toString()+i.toString()).hidden=false;
			}
		}
	}
}

setInterval(searchPlaces, 200);

$('#search').select();