// 建立抽象模型
let mainArr = new Array([],[],[],[]);

let startBtn = document.querySelector('.info div:last-child');
let items = document.querySelectorAll('.item');
let score = document.querySelector('.info div:first-child span:last-child');
let best = document.querySelector('.info div:nth-child(2) span:last-child');

// 建立dom模型
let itemArr = new Array([],[],[],[]);
// 初始化
init();
function init(){
    // 获取本地浏览器缓存数据
    let bestScore = window.localStorage.getItem('2048bestScore');
    if(bestScore == null || isNaN(bestScore))
        window.localStorage.setItem('2048bestScore','0');
    best.innerText = bestScore;
    startBtn.addEventListener('click',startGame,false);
    // 初始化抽象模型 dom模型映射到dom
    for(let i = 0 ,k = 0; i < itemArr.length ; i++)
        for(let j = 0 ; j < 4 ; j++,k++){
            mainArr[i][j] = 0;
            itemArr[i][j] = items[k];
        }
}
// 游戏开始
function startGame(){
    startBtn.removeEventListener('click',startGame,false);
    // 随机生成两个作为游戏的开始
    randomShow();
    randomShow();
    refresh();
    updateScore();
    document.addEventListener('keydown',listenKey,false);
}
// 游戏结束
function gameOver(){
    document.removeEventListener('keydown',listenKey,false);
    alert('Game Over!');
    init();
    refresh();
}
// 刷新分数
function updateScore(){
    let max =  mainArr[0][0];
    for(let i in mainArr)
        for(let j in mainArr[i])
            if(max < mainArr[i][j])
                max = mainArr[i][j];
    score.innerText = max;
    let bestScore = window.localStorage.getItem('2048bestScore');
    bestScore = parseInt(bestScore);
    if(bestScore < max){
        window.localStorage.setItem('2048bestScore',max.toString());
        best.innerText = max;
    }
}
// 监听按键
function listenKey(event){
    switch(event.keyCode){
        case 37:case 38:case 39:case 40:
            // 监听 左上右下
            // 整合数字
            clearMainArr(event.keyCode);
            // 计算
            countMainArr(event.keyCode);
            // 再次整合
            clearMainArr(event.keyCode);
            // 随机生成新的块
            randomShow();
            // 刷新dom树
            refresh();
            // 刷新分数
            updateScore();
            break;
    }
}
// 控制数组移动
function clearMainArr(keyCode){
    switch(keyCode){
        case 37:
            // 控制行
            for(let i = 0 ; i < 4 ;i++)
                // 控制列
                for(let j = 0 ; j < 3 ; j++)
                    // 控制比对
                    for(let k = 0 ; k < 3-j ; k++)
                        if(mainArr[i][k] == 0)
                            [mainArr[i][k],mainArr[i][k+1]] = [mainArr[i][k+1],mainArr[i][k]];
            break;
        case 38:
            // 控制列
            for(let i = 0 ; i < 4 ; i++)
                // 控制行
                for(let j = 0 ; j < 3 ; j++)
                    // 控制比对
                    for(let k = 0 ; k < 3-j ; k++)
                        if(mainArr[k][i] == 0)
                            [mainArr[k][i],mainArr[k+1][i]] = [mainArr[k+1][i],mainArr[k][i]];
            break;
        case 39:
            // 控制行
            for(let i = 3 ; i >= 0 ;i--)
                // 控制列
                for(let j = 3 ; j >= 1 ; j--)
                    // 控制比对
                    for(let k = 3 ; k >= 4-j ; k--)
                        if(mainArr[i][k] == 0)
                            [mainArr[i][k],mainArr[i][k-1]] = [mainArr[i][k-1],mainArr[i][k]];
            break;
        case 40:
            // 控制列
            for(let i = 3 ; i >= 0 ; i--)
                // 控制行
                for(let j = 3 ; j >= 1 ; j--)
                    // 控制比对
                    for(let k = 3 ; k >= 4-j ; k--)
                        if(mainArr[k][i] == 0)
                            [mainArr[k][i],mainArr[k-1][i]] = [mainArr[k-1][i],mainArr[k][i]];
            break;
    }
}
// 控制数组计算
function countMainArr(keyCode){
    switch(keyCode){
        case 37:
            // 控制行
            for(let i = 0 ; i < 4 ;i++)
                // 控制列
                for(let j = 0 ; j < 3 ; j++)
                    // 控制比对
                    if(mainArr[i][j] == mainArr[i][j+1] && mainArr[i][j] != 0){
                        mainArr[i][j] = mainArr[i][j]+mainArr[i][j+1];
                        mainArr[i][j+1] = 0;
                    }
            break;
        case 38:
            // 控制列
            for(let i = 0 ; i < 4 ; i++)
                // 控制行
                for(let j = 0 ; j < 3 ; j++)
                    // 控制比对
                    if(mainArr[j][i] == mainArr[j+1][i] && mainArr[j][i] != 0){
                        mainArr[j][i] = mainArr[j][i] + mainArr[j+1][i];
                        mainArr[j+1][i] = 0;
                    }
            break;
        case 39:
            // 控制行
            for(let i = 3 ; i >= 0 ;i--)
                // 控制列
                for(let j = 3 ; j >= 1 ; j--)
                    // 控制比对
                    if(mainArr[i][j] == mainArr[i][j-1] && mainArr[i][j] != 0){
                        mainArr[i][j] = mainArr[i][j]+mainArr[i][j-1];
                        mainArr[i][j-1] = 0;
                    }
            break;
        case 40:
            // 控制列
            for(let i = 3 ; i >= 0 ; i--)
                // 控制行
                for(let j = 3 ; j >= 1 ; j--)
                    // 控制比对
                    if(mainArr[j][i] == mainArr[j-1][i] && mainArr[j][i] != 0){
                        mainArr[j][i] = mainArr[j][i] + mainArr[j-1][i];
                        mainArr[j-1][i] = 0;
                    }
            break;
    }
}
// 检查游戏可继续性
function checkContinue(){
    // 判断空白坐标 跳出
    for(let i in mainArr)
        for(let j in mainArr[i])
            if(mainArr[i][j] == 0)
                return;
    // 填满状态判断
    for(let i = 0 ; i < 4 ;i++)
        for(let j = 0 ; j < 4  ; j++){
            if(j+1<4)
                if(mainArr[i][j] == mainArr[i][j+1])
                    return;
            if(i+1<4)
                if(mainArr[i][j] == mainArr[i+1][j])
                    return;
        }
    gameOver();
}
// 空白处随机出现一个item
function randomShow(){
    // 抽取空白坐标
    let blankIndex = new Array();
    for(let i in mainArr)
        for(let j in mainArr[i])
            if(mainArr[i][j] == 0)
                blankIndex.push([i,j]);
        if(blankIndex.length == 0) return;
        let randomIndex = randomNum(0,blankIndex.length-1);
        // 指定随机的 4 或 2
        mainArr[blankIndex[randomIndex][0]][blankIndex[randomIndex][1]] = Math.round(Math.random()) ? 4 : 2 ;

}
// 生成相对区间随机数
function randomNum(min,max){
    if(min == max)
        return min;
    return Math.round(Math.random()*(max-min)+min);
}
// 刷新映射视图
function refresh(){
    for(let i in itemArr)
        for(let j in itemArr[i]){
            if(mainArr[i][j]){
                itemArr[i][j].className = 'item '+'bg'+mainArr[i][j];
                itemArr[i][j].innerText = mainArr[i][j];
            }else{
                itemArr[i][j].className = 'item';
                itemArr[i][j].innerText = '';
            }
        }
    setTimeout(
        // 检查游戏可继续性 延时计算避免误伤
        checkContinue,1000);
}