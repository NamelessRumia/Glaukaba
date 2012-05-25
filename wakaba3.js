function get_cookie(name)
{
	with(document.cookie)
	{
		var regexp=new RegExp("(^|;\\s+)"+name+"=(.*?)(;|$)");
		var hit=regexp.exec(document.cookie);
		if(hit&&hit.length>2) return unescape(hit[2]);
		else return '';
	}
};

function set_cookie(name,value,days)
{
	if(days)
	{
		var date=new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires="; expires="+date.toGMTString();
	}
	else expires="";
	document.cookie=name+"="+value+expires+"; path=/";
}

function get_password(name)
{
	var pass=get_cookie(name);
	if(pass) return pass;

	var chars="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	var pass='';

	for(var i=0;i<8;i++)
	{
		var rnd=Math.floor(Math.random()*chars.length);
		pass+=chars.substring(rnd,rnd+1);
	}

	return(pass);
}



function insert(text)
{
	var textarea=document.getElementById("field4");
	if(textarea)
	{
		if(textarea.createTextRange && textarea.caretPos) // IE
		{
			var caretPos=textarea.caretPos;
			caretPos.text=caretPos.text.charAt(caretPos.text.length-1)==" "?text+" ":text;
		}
		else if(textarea.setSelectionRange) // Firefox
		{
			var start=textarea.selectionStart;
			var end=textarea.selectionEnd;
			textarea.value=textarea.value.substr(0,start)+text+textarea.value.substr(end);
			textarea.setSelectionRange(start+text.length,start+text.length);
		}
		else
		{
			textarea.value+=text+" ";
		}
		textarea.focus();
	}
}

function highlight(post)
{
	var cells=document.getElementsByTagName("div");
	for(var i=0;i<cells.length;i++) if(cells[i].className=="reply highlight") cells[i].className="reply";

	var reply = document.getElementById("reply"+post);
	if(reply)
	{
		reply.className="reply highlight";
/*		var match=/^([^#]*)/.exec(document.location.toString());
		document.location=match[1]+"#"+post;*/
		return false;
	}

	return true;
}



function set_stylesheet(styletitle,norefresh)
{
	set_cookie("wakabastyle",styletitle,365);

	var links=document.getElementsByTagName("link");
	var found=false;
	for(var i=0;i<links.length;i++)
	{
		var rel=links[i].getAttribute("rel");
		var title=links[i].getAttribute("title");
		if(rel.indexOf("style")!=-1&&title)
		{
			links[i].disabled=true; // IE needs this to work. IE needs to die.
			if(styletitle==title) { links[i].disabled=false; found=true; }
		}
	}
	if(!found) set_preferred_stylesheet();
}

function set_preferred_stylesheet()
{
	var links=document.getElementsByTagName("link");
	for(var i=0;i<links.length;i++)
	{
		var rel=links[i].getAttribute("rel");
		var title=links[i].getAttribute("title");
		if(rel.indexOf("style")!=-1&&title) links[i].disabled=(rel.indexOf("alt")!=-1);
	}
}

function get_active_stylesheet()
{
	var links=document.getElementsByTagName("link");
	for(var i=0;i<links.length;i++)
	{
		var rel=links[i].getAttribute("rel");
		var title=links[i].getAttribute("title");
		if(rel.indexOf("style")!=-1&&title&&!links[i].disabled) return title;
	}
	return null;
}

function get_preferred_stylesheet()
{
	var links=document.getElementsByTagName("link");
	for(var i=0;i<links.length;i++)
	{
		var rel=links[i].getAttribute("rel");
		var title=links[i].getAttribute("title");
		if(rel.indexOf("style")!=-1&&rel.indexOf("alt")==-1&&title) return title;
	}
	return null;
}

function set_inputs(id) { with(document.getElementById(id)) {if(!field1.value) field1.value=get_cookie("name"); if(!field2.value) field2.value=get_cookie("email"); if(!password.value) password.value=get_password("password"); } }
function set_delpass(id) { with(document.getElementById(id)) password.value=get_cookie("password"); }

function setQrInputs(){
	document.getElementById("qrField1").value=get_cookie("name");
	document.getElementById("qrField2").value=get_cookie("email");
	document.getElementById("qrPassword").value=get_password("password");
}

function setPostInputs(){
	document.getElementById("field1").value=get_cookie("name");
	document.getElementById("field2").value=get_cookie("email");
	document.getElementById("password").value=get_password("password");
}

function setDelPass(){
	document.getElementById("delPass").value=get_password("password");
}

function do_ban(el)
{
	var reason=prompt("Give a reason for this ban:");
	if(reason) document.location=el.href+"&comment="+encodeURIComponent(reason);
	return false;
}


window.onunload=function(e)
{
	if(style_cookie)
	{
		var title=get_active_stylesheet();
		set_cookie(style_cookie,title,365);
	}
}

window.onload=function(e)
{
	var match;

	if(match=/#i([0-9]+)/.exec(document.location.toString()))
	if(!document.getElementById("field4").value)
	insert(">>"+match[1]);

	if(match=/#([0-9]+)/.exec(document.location.toString()))
	highlight(match[1]);
}

if(style_cookie)
{
	var cookie=get_cookie(style_cookie);
	var title=cookie?cookie:get_preferred_stylesheet();
	set_stylesheet(title);
}

if(window.attachEvent) {
    window.attachEvent('onload', doIt());
} else {
    if(window.onload) {
        var curronload = window.onload;
        var newonload = function() {
            curronload();
            doIt();
        };
        window.onload = newonload;
    } else {
        window.onload = doIt();
    }
}

function doIt(){
	var imageArray = new Array();

	imageArray[0] = "http://i.imgur.com/t1dxL.jpg"; 
	imageArray[1] = "http://i.imgur.com/ItcAw.gif";
	imageArray[2] = "http://i.imgur.com/ixLBA.gif";
	imageArray[3] = "http://i.imgur.com/B8qd2.jpg";
	imageArray[4] = "http://i.imgur.com/7BKwF.jpg";
	imageArray[5] = "http://i.imgur.com/1XsxE.jpg";
	imageArray[6] = "http://i.imgur.com/99eYy.jpg";
	imageArray[7] = "http://i.imgur.com/DCPTv.jpg";
	imageArray[8] = "http://i.imgur.com/jXxHC.jpg";
	imageArray[9] = "http://i.imgur.com/pDCSm.jpg";
	
	var rand = Math.floor(Math.random()*10);
	var imgPath = "<img src='"+imageArray[rand]+"' alt='logo' class='banner' />";

	if (Date.getMonth == 11){
		document.getElementById("image").innerHTML = "<img src='"+"http://www.glauchan.org/img/christmas.jpg"+"' alt='logo' class='banner' />";
	}
	else{
		document.getElementById("image").innerHTML = imgPath;
	}

	// inline thumbnail prep
	document.getElementById("boardList").selectedIndex = 4;
	thumbnails = document.getElementsByClassName('thumb');
	thumbLinks = document.getElementsByClassName('thumbLink');
	fullSize = document.getElementsByClassName('forJsImgSize');
	var imgSrc = new Array();
	
	for (var i = 0; i < thumbnails.length; i++ ){
		(function(e) {
			imgSrc[i] = thumbLinks[i].href;
			thumbLinks[i].href = "javascript:void(0)";
			thumbLinks[i].removeAttribute("target");
			thumbLinks[i].addEventListener("click",function(){
				expandThumb(thumbLinks[e],thumbnails[e],imgSrc[e],fullSize[e], e)});
			//alert(imgSrc[i] +"\n\n"+ thumbLinks[i] +"\n\n"+ thumbnails[i] +"\n\n"+ i);
		})(i);
	}
	
	// quick reply prep
	var refLinks = document.getElementsByClassName('refLinkInner');
	var board = document.getElementById('forJs').innerHTML;
	console.log(board);
	
	for (var i = 0; i < refLinks.length; i++ ){
		(function(e) {
			refLinks[e].href = "javascript:void(0)";
			refLinks[e].addEventListener("click",function(){
				quickReply(refLinks[e],board)});
		})(i);
	}
	
	// mouse over quote preview and inline quote prep
	var varReferences = document.getElementsByClassName("postlink");
	for (var i = 0; i < varReferences.length; i++ ){
		(function(e) {
			varReferences[e].addEventListener("mouseover",function(){
				quotePreview(varReferences[e],0)});
			varReferences[e].addEventListener("mouseout",function(){
				quotePreview(varReferences[e],1)});
			//varReferences[e].addEventListener("click",function(){
				//inlineQuote(varReferences[e],varReferences[e].href,0)});
			//varReferences[e].href = "javascript:void(0)";
		})(i);
		//varReferences[i].href = "javascript:void(0)";
	}
}

function logoSwitch(){
	
}

function quickReply(refLink, board){
	var ref = refLink.text.replace("No.",">>");
	var _div = document.createElement('div');
	_div.id = "quickReply";
	var parent;
	
	if(refLink.parentNode.parentNode.parentNode.parentNode.childNodes[1].id==""){
		parent = refLink.parentNode.parentNode.parentNode.childNodes[1].id;
		console.log(parent);
	}
	else
	{
		parent = refLink.parentNode.parentNode.parentNode.parentNode.childNodes[1].id;
		console.log(parent);
	}
	
	parent = parent.replace("parent","");

	if(document.getElementById("quickReply") == null){
		document.body.appendChild(_div);
		_div.innerHTML += '<span>Quick Reply</span><a href="javascript:void(0)" style="float: right" onclick="closeQuickReply();">[ x ]</a><form id="qrActualForm" action="/'+board+'/wakaba.pl" method="post" enctype="multipart/form-data"> <input type="hidden" name="task" value="post"> <input type="hidden" name="parent" value='+ parent +'> <div class="trap">Leave these fields empty (spam trap): <input type="text" name="name" autocomplete="off"><input type="text" name="link" autocomplete="off"></div> <div id="qrPostForm"> <div class="postTableContainer"> <div class="postBlock">Name</div> <div class="postSpacer"></div> <div class="postField"><input type="text" class="postInput" name="field1" id="qrField1"></div> </div> <div class="postTableContainer"> <div class="postBlock">Link</div> <div class="postSpacer"></div> <div class="postField"><input type="text" class="postInput" name="field2" id="qrField2"></div> </div> <div class="postTableContainer"> <div class="postBlock">Subject</div> <div class="postSpacer"></div> <div class="postField"> <input type="text" name="field3" class="postInput" id="qrField3"> <input type="submit" id="qrField3s" value="Submit" onclick="setSubmitText();"> </div> </div> <div class="postTableContainer"> <div class="postBlock">Comment</div> <div class="postSpacer"></div> <div class="postField"><textarea name="field4" class="postInput" id="qrField4"></textarea></div> </div> <div class="postTableContainer"> <div class="postBlock">File</div> <div class="postSpacer"></div> <div class="postField"> <input type="file" name="file" id="file"> <label><input type="checkbox" name="nofile" value="on">No File</label> </div> </div> <div class="postTableContainer"> <div class="postBlock">Password</div> <div class="postSpacer"></div> <div class="postField"><input type="password" class="postInput" id="qrPassword" name="password"> (for post and file deletion)</div> </div> <div class="postTableContainer"> </div> </div> </form>';
		
		document.getElementById("quickReply").childNodes[2].childNodes[7].childNodes[7].childNodes[5].childNodes[0].value += ref+"\n";
		setQrInputs("qrPostForm");
		ajaxSubmit();
	}
	else{
		//document.getElementById("quickReply").innerHTML += ref;
		//document.getElementById("quickReply").innerHTML += document.getElementById("quickReply").childNodes[2].childNodes[7].childNodes[7].childNodes[5].childNodes[0].id;
		document.getElementById("quickReply").childNodes[2].childNodes[7].childNodes[7].childNodes[5].childNodes[0].value += ref+"\n";
	}
}

function setSubmitText(){
	document.getElementById("qrField3s").value = "Submitting...";
}

function ajaxSubmit(){
	$(document).ready(function() {
		// bind 'myForm' and provide a simple callback function
		$('#qrActualForm').ajaxForm(function() {
			try{
				closeQuickReply();
			}
			catch(e){
				closeQuickReply();
			}
		});
	});
}

function closeQuickReply(){
	document.getElementById("quickReply").innerHTML = "";
	document.body.removeChild(document.getElementById("quickReply"));
}

function expandThumb(tl, tn, src, fs, index){
	if (tn.className.indexOf("expandedThumb") == -1){
		tn.src = src;
		tn.removeAttribute("style");
		tn.className = tn.className + " expandedThumb";
		
		var imgWidth = fs.childNodes[1].innerHTML;
		var imgHeight = fs.childNodes[3].innerHTML;
		
		console.log(imgWidth+" x "+imgHeight);
		
		var pageWidth = window.innerWidth;
		var pageHeight = window.innerHeight;
		
		if(imgWidth > pageWidth){
			tn.style.width = pageWidth-100 + "px";
			tn.style.height = "auto";
		}
	}
	else{
		//tn.src = tn.src.replace(".","s.");
		//tn.src = tn.src.replace("src","thumb");
		tn.className = tn.className.replace(" expandedThumb","");
		var width = tn.clientWidth;
		var height = tn.clientHeight;
		
		var selector;
		var className = " " + selector + " ";
		
		if ((" " + tn.className + " ").replace(/[\n\t]/g, " ").indexOf(" opThumb ") > -1 ){
			if ((width >= 250)&&(height >= 250)){
				if (width > height){
					tn.style.width = "250px";
					tn.style.height = "auto";
				}
				else{
					tn.style.height = "250px";
					tn.style.width = "auto";
				}
			}
			else{
				tn.style.width = fs.childNodes[1].innerHTML + "px";
				tn.style.height = fs.childNodes[3].innerHTML + "px";
				console.log("Image smaller than 250px.");
			}
		}
		else{
			if ((width >= 126)&&(height >= 126)){
				if (width > height){
					tn.style.width = "126px";
					tn.style.height = "auto";
				}
				else{
					tn.style.height = "126px";
					tn.style.width = "auto";
				}
			}
			else{
				tn.style.width = fs.childNodes[1].innerHTML + "px";
				tn.style.height = fs.childNodes[3].innerHTML + "px";
				console.log("Image smaller than 126px.");
			}
		}
	}
}

function quotePreview(reference, mode){
	var referencedPostNumber = "reply" + reference.innerHTML.substring(8);
	console.log(document.getElementById(referencedPostNumber));
	
	if (document.getElementById(referencedPostNumber) != null){
		if (mode == 0){
			console.log(referencedPostNumber);
			var referencedPost = document.getElementById(referencedPostNumber).innerHTML;
			var div = document.createElement('div');
			div.id = "quotePreview";
			div.className = "reply";
			div.style.position = "absolute";
			div.style.border = "1px solid grey";
			div.innerHTML = referencedPost;

			$(document).mousemove(function(e){
				div.style.top = e.pageY+"px";
				div.style.left = e.pageX+"px";
			});
			
			document.body.appendChild(div);
		}
		
		if (mode == 1){
			document.getElementById("quotePreview").innerHTML = "";
			document.body.removeChild(document.getElementById("quotePreview"));
		}
	}
	else{
		// load thread page in background and grab post
	}
}

function inlineQuote(reference, url, mode){
	var referencedPostNumber = "reply" + reference.innerHTML.substring(8);
	
	if (document.getElementById(referencedPostNumber) != null){
		//console.log(reference.parentElement.parentElement);
		var referencedPost = document.getElementById(referencedPostNumber).childNodes[9].innerHTML;
		var inline = document.createElement('div');
		inline.id = "inlineQuote";
		inline.className = "reply";
		inline.style.border = "1px solid grey";
		inline.innerHTML = referencedPost;
		reference.parentElement.parentElement.appendChild(inline);
	}
	else{
		var board = document.getElementById('forJs').innerHTML;
	}
}

function threadUpdater(){
	
}

function hidePost(){
	
}

// no longer in use
function thumbSize(){
	var widthgreater = 0;
	for (var i = 0; i < document.getElementsByClassName('replythumb').length; i++ ){
		if (document.getElementsByClassName('replythumb')[i].width > document.getElementsByClassName('replythumb')[i].height){
			//document.getElementsByClassName('replythumb')[i].style.width = "126px";
			//document.getElementsByClassName('replythumb')[i].style.height = "auto";
			widthgreater = 1;
		}
		else if (widthgreater == 0){
			//document.getElementsByClassName('replythumb')[i].style.height = "126px";
			//document.getElementsByClassName('replythumb')[i].style.width = "auto";
		}
		widthgreater = 0;
	}
}

function birthday(birthday, play){
	for (var i = 0; i < document.getElementsByClassName('hat').length; i++ ){
		document.getElementsByClassName('hat')[i].innerHTML = "<img src='http://www.glauchan.org/img/partyhat.gif' style='position:absolute; margin-top:-100px;'/>"
	}
	
	if (birthday == 1){
		if (play == 1){
			play = 0;
			
			document.body.innerHTML+="<audio controls='controls' autoplay='autoplay' loop='loop'><source src='http://onlinebargainshrimptoyourdoor.com/asdf.ogg' type='audio/ogg'></audio>";
		}

		window.setTimeout("birthday(1,0)", 30); // 5000 milliseconds delay
		var index = Math.round(Math.random() * 5);
		var ColorValue = "FFFFFF"; // default color - white (index = 0)
		var ColorValue2 = "000000";
		if (index == 1) {
			ColorValue = "RED"; //peach
			ColorValue2 = "BLUE";
		}
		if (index == 2) {
			ColorValue = "PURPLE"; //violet
			ColorValue2 = "GREEN";
		}
		if (index == 3) {
			ColorValue = "BLUE"; //lt blue
			ColorValue2 = "RED";
		}
		if (index == 4) {
			ColorValue = "GREEN"; //cyan
			ColorValue2 = "PURPLE";
		}
		if (index == 5) {
			ColorValue = "BLACK"; //tan
			ColorValue2 = "WHITE";
		}
		//document.getElementByClassName('reply').style.background = ColorValue;
		//document.getElementById('container').style.background = ColorValue;
		//document.getElementById('main').style.background = ColorValue;
		//document.getElementById('content').style.background = ColorValue;
		//document.getElementById('container').style.color = ColorValue2;
		document.body.style.background=ColorValue2;
		
		for (var i=0; i < document.getElementsByClassName('reply').length; i++ ){
			document.getElementsByClassName('reply')[i].style.background=ColorValue;
		}
	}
}

function partyHard(){
	birthday = 1;
}

function reportPostPopup(post, board){
	reportWindow = window.open('', post, 'width=190,height=170,scrollbars=no');
	
	//oh god why
	reportWindow.document.write("<!DOCTYPE html><head><title>Report Post</title><link rel='stylesheet' href='http://www.glauchan.org/css/boards/Yotsuba B.css' type='text/css' media='screen' /><script src='//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js' type='text/javascript'></script><script src='http://malsup.github.com/jquery.form.js'></script></head><body style='margin:0'><h3 style='color: #AF0A0F'>Report Post</h3><form method='get' action='http://www.glauchan.org/"+board+"/report.pl' enctype='multipart/form-data'><div id='reportFormDiv'><div id='reportPostDiv' class='reportFieldDiv'><div class='reportFieldDivText'>Post Number</div><div class='reportFieldDivInput' id='postNumberField'><INPUT NAME='Post' TYPE='text' id='postNumberInput' value='"+post+"' SIZE=7></div></div><div id='reportReasonDiv' class='reportFieldDiv'><div class='reportFieldDivText'>Reason</div><div class='reportFieldDivInput'><INPUT NAME='Reason' TYPE='text' SIZE=7>&nbsp;<input value='Report' type='submit' class='field3s' /></div></div></div></form><script>$(document).ready(function(){$('#reportPopupForm').ajaxForm(function(){try{}catch(e){}});});</script></body>");
}