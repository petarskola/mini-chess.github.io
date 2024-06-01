function resize()
{
    document.getElementById("board").style.height=document.getElementById("board").style.width;
}

setInterval(resize,0);

var Grid = new Array(5).fill(null).map(() => new Array(5).fill(null));
for(var i=0;i<5;i++)
{
    for(var j=0;j<5;j++)
    {
        Grid[i][j]=document.getElementById("c"+i+j);
        if(i%2==0&&j%2==0||i%2!=0&&j%2!=0)
            Grid[i][j].style.backgroundColor="#00203FFF";
    }
}

const blackPawn='url("pb.png")', whitePawn='url("pw.png")', legalStr='url("legal.png")';

function setBackground(i,j,background)
{
    Grid[i][j].style.backgroundImage='url('+background+'.png)';
}
function clearBackground(i,j)
{
    Grid[i][j].style.backgroundImage="";
}
function setLegalOverFigure(i,j)
{
    Grid[i][j].style.backgroundImage="url(legal.png),"+Grid[i][j].style.backgroundImage;
}
function clearLegal()
{
    for(var x=0;x<5;x++)
        for(var y=0;y<5;y++)
                if(isLegal(x,y))
                {
                    if(isBlack(x,y))
                        setBackground(x,y,"pb");
                    else if(isWhite(x,y))
                        setBackground(x,y,"pw");
                    else
                        clearBackground(x,y);
                }   
}
function legalMoveBlack(i,j)
{
    clearLegal();
    if(Grid[i-1][j].style.backgroundImage=="")
        setBackground(i-1,j,"legal");
    if(j!=4)
    if(isWhite(i-1,j-(-1)))
        setLegalOverFigure(i-1,j-(-1));
    if(j!=0)
    if(isWhite(i-1,j-1))
        setLegalOverFigure(i-1,j-1);
}
function isBlack(i,j)
{
    return (Grid[i][j].style.backgroundImage.includes(blackPawn));
}
function legalMoveWhite(i,j)
{
    clearLegal();
    if(Grid[i-(-1)][j].style.backgroundImage=="")
        setBackground(i-(-1),j,"legal");
    if(j!=4)
    if(isBlack(i-(-1),j-(-1)))
        setLegalOverFigure(i-(-1),j-(-1));
    if(j!=0)
    if(isBlack(i-(-1),j-1))
        setLegalOverFigure(i-(-1),j-1);
}
function isWhite(i,j)
{
    return (Grid[i][j].style.backgroundImage.includes(whitePawn));
}

function isLegal(i,j)
{
    return (Grid[i][j].style.backgroundImage.includes('url("legal.png")'));
}
for(var j=0;j<5;j++)
{
    setBackground(0,j,"pw");
    setBackground(4,j,"pb");
}
var move=1;
var iB,jB,iW,jW;
function check(cords)
{
    var i = cords[0];
    var j = cords[1];
    if(isBlack(i,j))
    {
        iB = i;
        jB = j;
    }
    if(isWhite(i,j))
    {
        iW = i;
        jW = j;
    }
    if(isWhite(i,j)&&move%2==0)
        legalMoveWhite(i,j);
    if(isBlack(i,j)&&move%2!=0)
        legalMoveBlack(i,j);
    if(isLegal(i,j))
    {
        if(move%2!=0)
        {
            clearBackground(iB,jB);
            setBackground(i,j,"pb");
            move++;
            clearLegal();
        }
        else
        {
            clearBackground(iW,jW);
            setBackground(i,j,"pw");
            move++;
            clearLegal();
        }
    }
}

function hover(cords)
{
    var i = cords[0];
    var j = cords[1];
    if(isBlack(i,j)&&move%2!=0)
    {
        Grid[i][j].style.backgroundSize="120%";
    }
    if(isWhite(i,j)&&move%2==0)
    {
        Grid[i][j].style.backgroundSize="120%";
    }
}
function notHover(cords)
{
    var i = cords[0];
    var j = cords[1];
    Grid[i][j].style.backgroundSize="100%";
}