function hexToString(hex)
{
    var s = "";
    var length = hex.length;
    var i;

    for (i = 0; i < length; i += 2)
    {
        var b = parseInt("0x" + hex.substr(i, 2));
        s = s + String.fromCharCode(b);
    }
    return s;
}


function debug(message)
{
    if ( (console == null) || (console.closed) )
    {
        console = window.open("", "console", "width=600, height=300, resizeable");
        console.document.open("text/plain");
    }
    console.document.writeln(message);
}

//
//
//

function hexValue(d)
{
    return (d & 0xf) + (d > 57 ? 9 : 0);
}

function hexToBytes(hex)
{
    if (hex.length % 2 != 0)
    {
        throw new Error("Invalid hex string - odd number of digits " + hex);
    }
    var byteCount = hex.length / 2;
    var b = new Array(byteCount);
    for (var n = 0; n < byteCount; n++)
    {
        var i = n * 2;
        b[n] = hexValue(hex.charCodeAt(i)) << 4 | hexValue(hex.charCodeAt(i + 1));
    }
    return b;
}
   
function hexDigit(d)
{
    return String.fromCharCode(d + (d > 9 ? 97 - 10 : 48));
}

function bytesToHex(b)
{
    var s = new Array(b.length * 2);
    for (var n = 0; n < b.length; n++)
    {
        s[n * 2] = hexDigit((b[n] >>> 4) & 0xf);
        s[n * 2 + 1] = hexDigit(b[n] & 0xf);
    }
    return s.join("");
}

//
//
//

function stringToLatin1(s)
{
    var bytes = new Array(s.length);
    for (var i = 0; i < s.length; i++)
    {
        bytes[i] = s.charCodeAt(i) & 0xff;
    }
    return bytes;
}

function latin1ToString(b)
{
    var characters = new Array(b.length);
    for (var i = 0; i < characters.length; i++)
    {
        characters[i] = String.fromCharCode(b[i]);
    }
    return characters.join("");
}

function stringToUnicode(s)
{
    var bytes = new Array(s.length * 2);
    for (var i = 0; i < s.length; i++)
    {
        var unicode = s.charCodeAt(i);
        bytes[i * 2] = unicode & 0xff;
        bytes[i * 2 + 1] = (unicode >>> 8) & 0xff;
    }
    return bytes;
}

function unicodeToString(b)
{
    var characters = new Array(b.length / 2);
    for (var i = 0; i < characters.length; i++)
    {
        var unicode = b[i * 2] | b[i * 2 + 1] << 8;
        characters[i] = String.fromCharCode(unicode);
    }
    return characters.join("");
}

function escapeSpecialCharacters(s)
{
    s = s.replace("&", "&amp;");
    s = s.replace("<", "&lt;");
    s = s.replace(">", "&gt;");
    s = s.replace("\"", "&quot;");
    return s;
}

//
//
//

function arrayCopy(source, sourcePos, dest, destPos, count)
{
    for (var n = 0; n < count; n++)
    {
        dest[destPos + n] = source[sourcePos + n];
    }
}

//
//
//

function generateCommandNavigation(queryString)
{
    var fields = queryString.split("~");
    var upNavigation = "navigationbarup";
    if (fields.length > 0)
    {
        queryString = queryString.replace(fields[0],"");
        var index = parseInt(fields[0]);
        if (index > 0 && index < (fields.length - 3) / 2)
        {
            document.writeln("<span class=\"navigationbarprevious\">");
            var previousIndex = (index - 1);
            var pageText = fields[previousIndex * 2 + 3];
            var pageFile = fields[previousIndex * 2 + 4];
            document.writeln("<a href=\"/html/"
                              + pageFile
                              + ".html?"
                              + previousIndex.toString()
                              + queryString
                              + "\">"
                              + pageText
                              + "</a>"); 
            document.writeln("</span>");
        }
        else
        {
            upNavigation = "navigationbarupnoprevious";
        }

        if (index >= 0 && index < (fields.length - 3) / 2 - 1)
        {
            document.writeln("<span class=\"navigationbarnext\">");
            var nextIndex = (index + 1);
            var pageText = fields[nextIndex * 2 + 3];
            var pageFile = fields[nextIndex * 2 + 4];
            document.writeln("<a href=\"/html/"
                              + pageFile
                              + ".html?"
                              + nextIndex.toString()
                              + queryString
                              + "\">"
                              + pageText
                              + "</a>"); 
            document.writeln("</span>");
        }
        else
        {
            upNavigation = "navigationbarupnonext";
        }

        if (fields.length > 2)
        {
            var pageText = fields[1];
            var pageFile = fields[2];
            document.writeln("<span class=\"" + upNavigation + "\">"
                              + "<a href=\"/html/"
                              + pageFile
                              + ".html\">"
                              + pageText.replace(/%20/g, " ")
                              + "</a>"
                              + "</span>"); 
        }
    }
}

function showCenter()
{
    if (top != self)
    {
        var inner = self.document.getElementById("center").innerHTML;
        top.document.getElementById("center").innerHTML = inner;
    }
}

function setFocus()
{
    var form = this.document.forms[0];
    for (var i = 0; i < form.elements.length; i++)
    {
        if (form.elements[i].tabIndex == 1)
        {
            setTimeout("this.document.forms[0].elements[" + i.toString() + "].focus()", 1);
            return;
        }
    }
}

function SetCenterHeight()
{
    page.style.marginBottom = "-" + footer.offsetHeight + "px";
    var bannerHeight = banner.offsetHeight;
    var footerHeight = footer.offsetHeight;
    var centerHeight = centercontent.offsetHeight;
    var windowheight = top.innerHeight;
    if (centerHeight  < windowheight - bannerHeight - footerHeight)
    {
        center.style.height = (windowheight - bannerHeight - footerHeight) + "px";
    }
}


function resetPassword()
{
    var host = "";
    if (location.hostname.toLowerCase() == "www.semata.com")
    {
        host = "https://" + location.host;
    }
    this.frames["hiddenencryptioniframe"].location.href = host + "/cgi-local/Actions/Action.pl?Action+Id=Reset+Password+Request";
}

function toPageSSL(path)
{
    var host = "";
    if (location.hostname.toLowerCase() == "www.semata.com")
    {
        host = "https://" + location.host;
    }
    location.href = host + path;
}

function toPage(path)
{
    location.href = "http://" + location.host + path;
}

function getCookie(name)
{
    var cookies = document.cookie.split(";");
    for (const cookie of cookies)
    {
        var cookieFields = cookie.split("=");
        cookieName = cookieFields[0].trim();
        if (cookieName == name)
        {
            return cookieFields[1].trim();
        }
    }
    return "";
}

function setCookie(name, value, path, age)
{
    var cookie = name + "=" + value;
    if (path !== undefined)
    {
        cookie += ";path=" + path;
    }
    if (age !== undefined)
    {
        cookie += ";max-age=" + age;
    }
    document.cookie = cookie;
}

function hideModalFooter()
{
    document.getElementById("modalfooter").style.display = "none";
}

