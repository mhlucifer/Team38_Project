function loadMap(type) {
    // 获取用户输入
    let input;
    if (type === 'year') {
        input = document.getElementById('yearInput').value;
    } else if (type === 'suburb') {
        input = document.getElementById('suburbInput').value;
    } else {
        console.error('Unknown type for map generation');
        return;
    }

    // 构造请求地址
    let apiUrl = `/generate_map?type=${type}&value=${input}`;
    
    // 发起请求，让后端开始生成地图
    fetch(apiUrl, { method: 'POST' })
    .then(response => {
        if(response.ok) {
            // 使用时间戳来避免缓存问题
            let timestamp = new Date().getTime();
            let iframeId = type === 'year' ? 'yearMapFrame' : 'suburbMapFrame';
            let mapHtml = type === 'year' ? 'year_map.html' : 'suburb_map.html';
            let iframeSrc = `/static/maps/${mapHtml}?timestamp=${timestamp}`;
            document.getElementById(iframeId).src = iframeSrc;
        } else {
            console.error('Error when generating the map.');
        }
    })
    .catch(error => console.error('Error:', error));
}