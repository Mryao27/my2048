var board=new Array()
var score=0
var hasConflicted=new Array()

var startx=0
var starty=0
var endx=0
var endy=0
$(document).ready(function () {
    prepareForMobile()
    newgame()
})
function prepareForMobile() {
    if(documentWidth>500){
        gridContainerWidth=500
        cellSideLength=100
        cellSpace=20
    }

    $('#grid-container').css("width",gridContainerWidth-2*cellSpace)
    $('#grid-container').css("height",gridContainerWidth-2*cellSpace)
    $('#grid-container').css("padding",cellSpace)
    $('#grid-container').css("border-radius",0.02*gridContainerWidth)

    $(".grid-cell").css("width",cellSideLength)
    $(".grid-cell").css("height",cellSideLength)
    $(".grid-cell").css("border-radius",0.02*cellSideLength)
}
function newgame() {
    //初始化棋盘格
    init()
    //在随机两个格子生成数字
    generateOneNumber()
    setTimeout("generateOneNumber()",50)

}
function init() {
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            var gridCell=$("#grid-cell-"+i+"-"+j)

            gridCell.css("top",getPosTop(i,j))
            gridCell.css("left",getPosLeft(i,j))
        }
    }

    for(var i=0;i<4;i++){
        board[i]=new Array()
        hasConflicted[i]=new Array()
        for(var j=0;j<4;j++){
            board[i][j]=0
            hasConflicted[i][j]=false
        }
    }
    updateBoardView()
    score=0
}
function updateBoardView() {
    $(".number-cell").remove()
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            $("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>')
            var theNumberCell=$('#number-cell-'+i+'-'+j)

            if(board[i][j]==0){
                theNumberCell.css('width','0px')
                theNumberCell.css('height','0px')
                theNumberCell.css('top',getPosTop(i,j)+cellSideLength/2)
                theNumberCell.css('left',getPosLeft(i,j)+cellSideLength/2)
            }else{
                theNumberCell.css('width',cellSideLength)
                theNumberCell.css('height',cellSideLength)
                theNumberCell.css('top',getPosTop(i,j))
                theNumberCell.css('left',getPosLeft(i,j))
                theNumberCell.css('background-color',getNumberBackgroundColor(board[i][j]))
                theNumberCell.css('color',getNumberColor(board[i][j]))
                theNumberCell.text(board[i][j])
            }
            hasConflicted[i][j]=false
        }
    }
    $(".number-cell").css("line-height",cellSideLength+'px')
    $(".number-cell").css("font-size",0.6*cellSideLength+'px')
}
function generateOneNumber() {
    if(nospace(board))
        return false

        //随机一个位置
        var randx=parseInt(Math.floor(Math.random()*4))
        var randy=parseInt(Math.floor(Math.random()*4))
    var times=0
        while(times<50){
            if(board[randx][randy]==0)
                break;

                randx=parseInt(Math.floor(Math.random()*4))
                randy=parseInt(Math.floor(Math.random()*4))
            times++

        }
    if(times==50){
        for(var i=0;i<4;i++){
            for(var j=0;j<4;j++){
                if(board[i][j]==0){
                    randx=i
                    randy=j
                }
            }
        }
    }
        //随机一个数字(2或者4)
        var randNumber=Math.random()< 0.5 ? 2 : 4
        //在随机位置上显示随机数字
        board[randx][randy]=randNumber
        showNumberWithAnimation(randx,randy,randNumber)
        return true



}
$(document).keydown(function (event) {
    event.preventDefault()
    switch(event.keyCode){
        case 37: //left
            if(moveLeft()){
                setTimeout("generateOneNumber()",210)
                setTimeout("isgameover()",300)
            }
            break

        case 38: //up
            if(moveUp()){
                setTimeout("generateOneNumber()",210)
                setTimeout("isgameover()",300)
            }
                break
        case 39: //right
            if(moveRight()){
                setTimeout("generateOneNumber()",210)
                setTimeout("isgameover()",300)
            }
                break
        case 40: //down
            if(moveDown()){
                setTimeout("generateOneNumber()",210)
                setTimeout("isgameover()",300)
            }
                break
        default: //default
            break
    }
})

function GetSlideAngle(x, y) {
    return Math.atan2(y, x) * 180 / Math.PI;
}
//根据起点和终点返回方向 1：向上，2：向下，3：向左，4：向右,0：未滑动
function GetSlideDirection(startx, starty, endx, endy) {
    var deltay = starty - endy;
    var deltax = endx - startx;
    var result = 0;

    //如果滑动距离太短
    if(Math.abs(deltax)<0.3*documentWidth && Math.abs(deltay)<0.3*documentWidth){
        return result
    }

    var angle = GetSlideAngle(deltax, deltay);
    if(angle >= -45 && angle < 45) {
        result = 4;
    }else if (angle >= 45 && angle < 135) {
        result = 1;
    }else if (angle >= -135 && angle < -45) {
        result = 2;
    }
    else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
        result = 3;
    }

    return result;
}

document.addEventListener("touchstart",function (event) {
    startx=event.touches[0].pageX
    starty=event.touches[0].pageY
})
document.addEventListener("touchmove",function (event) {
    event.preventDefault()
})
document.addEventListener("touchend",function (event) {
    endx=event.changedTouches[0].pageX
    endy=event.changedTouches[0].pageY

    var direction = GetSlideDirection(startx, starty, endx, endy);
    switch(direction) {
        case 0:
            break;
        case 1://up
            if(moveUp()){
                            setTimeout("generateOneNumber()",210)
                            setTimeout("isgameover()",300)
                        }
            break;
        case 2://down
            if(moveDown()){
                setTimeout("generateOneNumber()",210)
                setTimeout("isgameover()",300)
            }
            break;
        case 3://left
            if(moveLeft()){
                setTimeout("generateOneNumber()",210)
                setTimeout("isgameover()",300)
            }
            break;
        case 4://right
            if(moveRight()){
                setTimeout("generateOneNumber()",210)
                setTimeout("isgameover()",300)
            }
            break;
        default:
    }

})

function isgameover() {
    if(nospace(board)&&nomove(board)){
        gameover()
    }
}
function gameover() {
    alert("gameover")
}
function moveLeft() {
    if(!canMoveLeft(board))
        return false;

    //moveLeft
    for(var i=0;i<4;i++){
        for(var j=1;j<4;j++){
            if(board[i][j]!=0){

                for(var k=0;k<j;k++){
                    if(board[i][k]==0 && noBlackHorizontal(i,k,j,board)){
                        //move
                        showMoveAnimation(i,j,i,k)
                        board[i][k]=board[i][j]
                        board[i][j]=0
                        continue
                    }
                    else if(board[i][k]==board[i][j] && noBlackHorizontal(i,k,j,board)&& !hasConflicted[i][k]){
                        //move
                        showMoveAnimation(i,j,i,k)
                        //add
                        board[i][k]+=board[i][j]
                        board[i][j]=0
                        //add score
                        score+=board[i][k]
                        updateScore(score)
                        hasConflicted[i][k]=true
                        continue
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()",200)
    return true
}
function moveRight() {
    if(!canMoveRight(board))
        return false;

    //moveRight
    for(var i=0;i<4;i++){
        for(var j=2;j>=0;j--){
            if(board[i][j]!=0){

                for(var k=3;k>j;k--){
                    if(board[i][k]==0 && noBlackHorizontal(i,j,k,board)){
                        //move
                        showMoveAnimation(i,j,i,k)
                        board[i][k]=board[i][j]
                        board[i][j]=0
                        continue
                    }
                    else if(board[i][k]==board[i][j] && noBlackHorizontal(i,j,k,board)&& !hasConflicted[i][k]){
                        //move
                        showMoveAnimation(i,j,i,k)
                        //add
                        board[i][k]*=2
                        board[i][j]=0
                        //add score
                        score+=board[i][k]
                        updateScore(score)
                        hasConflicted[i][k]=true
                        continue
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()",200)
    return true
}
function moveUp() {
    if(!canMoveUp(board))
        return false;

    //moveRight
    for(var j=0;j<4;j++){
        for(var i=1;i<4;i++){
            if(board[i][j]!=0){

                for(var k=0;k<i;k++){
                    if(board[k][j]==0 && noBlackVertical(j,k,i,board)){
                        //move
                        showMoveAnimation(i,j,k,j)
                        board[k][j]=board[i][j]
                        board[i][j]=0
                        continue
                    }
                    else if(board[k][j]==board[i][j] && noBlackVertical(j,k,i,board)&& !hasConflicted[k][j]){
                        //move
                        showMoveAnimation(i,j,i,k)
                        //add
                        board[k][j]*=2
                        board[i][j]=0
                        //add score
                        score+=board[k][j]
                        updateScore(score)
                       hasConflicted[k][j]=true
                        continue
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()",200)
    return true
}
function moveDown() {
    if(!canMoveDown(board))
        return false;

    //moveDown
    for(var j=0;j<4;j++){
        for(var i=2;i>=0;i--){
            if(board[i][j]!=0){

                for(var k=3;k>i;k--){
                    if(board[k][j]==0 && noBlackVertical(j,i,k,board)){
                        //move
                        showMoveAnimation(i,j,k,j)
                        board[k][j]=board[i][j]
                        board[i][j]=0
                        continue
                    }
                    else if(board[k][j]==board[i][j] && noBlackVertical(j,i,k,board)&& !hasConflicted[k][j]){
                        //move
                        showMoveAnimation(i,j,k,j)
                        //add
                        board[k][j]*=2
                        board[i][j]=0
                        //add score
                        score+=board[k][j]
                        updateScore(score)
                        hasConflicted[k][j]=true
                        continue
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()",200)
    return true
}
