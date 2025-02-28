/*
 * @Description: 
 * @version: 
 * @Author: sueRim
 * @Date: 2025-02-20 16:23:46
 * @LastEditors: sueRim
 * @LastEditTime: 2025-02-28 11:12:00
 */
// 获取当前时间的函数
function getCurrentTime() {
    return new Date();
}

// 获取当前时间戳的函数
function getCurrentTimestamp() {
    return Date.now();
}

// 将时间戳转换为日期的函数
function timestampToDate(timestamp) {
    return new Date(timestamp);
}

// 格式化时间的函数
function formatDate(date) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    return date.toLocaleString(undefined, options);
}

// 获取星期几
function getDayOfWeek(date) {
    const days = ['日', '一', '二', '三', '四', '五', '六'];
    return days[date.getDay()];
}

// 判断是否为闰年
function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

// 获取 ISO 字符串
function getISOString(date) {
    return date.toISOString();
}

// 计算两个时间之间的差异（以毫秒为单位）
function calculateTimeDifference(startTime, endTime) {
    return endTime - startTime;
}

// 时间加法
function addTime(date, milliseconds) {
    return new Date(date.getTime() + milliseconds);
}

// 时间减法
function subtractTime(date, milliseconds) {
    return new Date(date.getTime() - milliseconds);
}

// 示例使用
const start = getCurrentTime();
const timestamp = getCurrentTimestamp();
const dateFromTimestamp = timestampToDate(timestamp);
const end = getCurrentTime();

console.log(`当前时间戳: ${timestamp}`);
console.log(`从时间戳转换的日期: ${formatDate(dateFromTimestamp)}`);
console.log(`时间差: ${calculateTimeDifference(start, end)} 毫秒`);
console.log(`当前时间: ${formatDate(start)}`);
console.log(`加5秒后的时间: ${formatDate(addTime(start, 5000))}`);
console.log(`减5秒后的时间: ${formatDate(subtractTime(start, 5000))}`);
console.log(`今天是星期: ${getDayOfWeek(start)}`);
console.log(`2024年是否为闰年: ${isLeapYear(2024)}`);
console.log(`当前时间的 ISO 字符串: ${getISOString(start)}`);

// 在现有代码后添加
function updateTime() {
    const timeElement = document.getElementById('current-time');
    if (timeElement) {
        const now = getCurrentTime();
        timeElement.textContent = `${formatDate(now)} 星期${getDayOfWeek(now)}`;
    }
}

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 添加时间显示元素
    const header = document.querySelector('header');
    const timeDiv = document.createElement('div');
    timeDiv.id = 'current-time';
    header.appendChild(timeDiv);
    
    // 更新时间
    updateTime();
    setInterval(updateTime, 1000);
});
