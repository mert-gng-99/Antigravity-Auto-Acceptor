(function() {
    var config = {
        run: true,
        time: 1000,
        text: true,
        color: true,
        scroll: false,
        count: 0,
        mini: false
    };

    var old = document.getElementById('mert-panel');
    if (old) old.remove();

    window.active = false;
    setTimeout(function() { window.active = true; loop(); }, 100);

    function make(tag, style, dad) {
        var el = document.createElement(tag);
        for (var i in style) el.style[i] = style[i];
        if (dad) dad.appendChild(el);
        return el;
    }

    var main = make('div', {
        position: 'fixed', top: '100px', right: '20px',
        background: '#222', color: 'white',
        borderRadius: '8px', border: '1px solid #777',
        fontFamily: 'Arial, sans-serif', fontSize: '12px', zIndex: '9999999',
        minWidth: '200px'
    });
    main.id = 'mert-panel';

    var head = make('div', {
        padding: '10px', background: '#333', cursor: 'move',
        display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #555'
    }, main);

    var title = make('span', { fontWeight: 'bold' }, head);
    title.innerText = 'MERT AUTO';

    var btns = make('div', { display: 'flex', gap: '5px' }, head);
    var minBtn = make('button', { cursor: 'pointer', background: '#555', color: 'white', border: 'none', width: '20px' }, btns);
    minBtn.innerText = '-';
    var closeBtn = make('button', { cursor: 'pointer', background: '#a00', color: 'white', border: 'none', width: '20px' }, btns);
    closeBtn.innerText = 'X';

    closeBtn.onclick = function() { main.remove(); window.active = false; };

    var body = make('div', { padding: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }, main);

    var info = make('div', {}, body);
    info.innerText = 'Clicks: ';
    var num = make('span', { fontWeight: 'bold', color: 'lime' }, info);
    num.innerText = '0';

    var speedDiv = make('div', {}, body);
    speedDiv.innerText = 'Speed (ms): ';
    var input = make('input', { width: '50px', marginLeft: '5px', background: '#444', color: 'white', border: 'none' }, speedDiv);
    input.type = 'number';
    input.value = 1000;
    input.onchange = function(e) { 
        var v = parseInt(e.target.value);
        if(v < 100) v = 100;
        config.time = v; 
    };

    function check(txt, key) {
        var row = make('label', { display: 'block', cursor: 'pointer' }, body);
        var box = make('input', { marginRight: '5px' }, row);
        box.type = 'checkbox';
        box.checked = config[key];
        box.onchange = function(e) { config[key] = e.target.checked; };
        var span = make('span', {}, row);
        span.innerText = txt;
    }

    check('System Active', 'run');
    check('Find Text "Accept all"', 'text');
    check('Find Color Buttons', 'color');
    check('Auto Scroll', 'scroll');

    document.body.appendChild(main);

    minBtn.onclick = function() {
        config.mini = !config.mini;
        body.style.display = config.mini ? 'none' : 'flex';
        minBtn.innerText = config.mini ? '+' : '-';
    };

    var drag = false;
    var offX, offY;
    head.onmousedown = function(e) {
        if(e.target.tagName === 'BUTTON') return;
        drag = true;
        offX = e.clientX - main.offsetLeft;
        offY = e.clientY - main.offsetTop;
    };
    document.onmousemove = function(e) {
        if(drag) {
            main.style.left = (e.clientX - offX) + 'px';
            main.style.top = (e.clientY - offY) + 'px';
            main.style.right = 'auto';
            main.style.bottom = 'auto';
        }
    };
    document.onmouseup = function() { drag = false; };

    function valid(el) {
        if(!el || !el.offsetParent) return false;
        var t = (el.textContent || '').trim();
        var c = (el.className || '').toString();

        if(config.text && t === "Accept all") return true;
        if(config.color && t.toLowerCase().includes('accept') && (c.includes('bg-ide') || c.includes('hover:bg-ide'))) return true;
        return false;
    }

    function scan(node) {
        var list = node.querySelectorAll('button, div, span, a');
        list.forEach(function(el) {
            if(valid(el)) {
                if(config.scroll) el.scrollIntoView({block:'center', behavior:'smooth'});
                el.click();
                config.count++;
                num.innerText = config.count;
            }
        });
    }

    function loop() {
        if(!window.active) return;
        if(config.run) {
            scan(document);
            document.querySelectorAll('iframe').forEach(function(f) {
                try { scan(f.contentDocument || f.contentWindow.document); } catch(e){}
            });
        }
        setTimeout(loop, config.time);
    }

    loop();
})();
