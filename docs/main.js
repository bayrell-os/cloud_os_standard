
document.addEventListener('DOMContentLoaded', function(){
	
	let items = document.querySelectorAll('textarea.code');
	for (let i=0; i<items.length; i++)
	{
		let e = items[i];
		e.style.height = (e.scrollHeight)+"px";
	}
	
});


function test()
{
	console.log("Test");
}
