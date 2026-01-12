(function() {
    var settings = {
        active: true,
        delay: 1000,
        accept: true,
        confirm: true,
        ide: true,
        move: false,
        clicks: 0,
        mini: false
    };

    var box = document.getElementById('mert-box');
    if (box) box.remove();

    window.mert_running = false;
    setTimeout(function() { window.mert_running = true; worker(); }, 100);

    function tag(name, css, parent) {
        var el = document.createElement(name);
        for (var k in css) el.style[k] = css[k];
        if (parent) parent.appendChild(el);
        return el;
    }

    var panel = tag('div', {
        position: 'fixed', top: '100px', right: '20px',
        background: '#222', color: '#fff',
        borderRadius: '5px', border: '1px solid #999',
        fontFamily: 'sans-serif', fontSize: '12px', zIndex: '9999999',
        minWidth: '200px', padding: '5px'
    });
    panel.id = 'mert-box';

    var header = tag('div', {
        padding: '5px', background: '#444', cursor: 'move',
        display: 'flex', justifyContent: 'space-between', marginBottom: '5px'
    }, panel);

    var label = tag('span', { fontWeight: 'bold' }, header);
    label.innerText = 'MERT AUTO v1.1';

    var ctrls = tag('div', { display: 'flex', gap: '5px' }, header);
    var btnMin = tag('button', { cursor: 'pointer', background: '#666', color: '#fff', border: 'none' }, ctrls);
    btnMin.innerText = '-';
    var btnKill = tag('button', { cursor: 'pointer', background: '#c00', color: '#fff', border: 'none' }, ctrls);
    btnKill.innerText = 'X';

    btnKill.onclick = function() { panel.remove(); window.mert_running = false; };

    var content = tag('div', { display: 'flex', flexDirection: 'column', gap: '5px' }, panel);

    var stats = tag('div', {}, content);
    stats.innerText = 'Total: ';
    var count = tag('span', { color: '#0f0', fontWeight: 'bold' }, stats);
    count.innerText = '0';

    var spd = tag('div', {}, content);
    spd.innerText = 'Speed (ms): ';
    var spdInp = tag('input', { width: '50px', background: '#333', color: '#fff', border: '1px solid #555' }, spd);
    spdInp.type = 'number';
    spdInp.value = 1000;
    spdInp.onchange = function(e) {
        var v = parseInt(e.target.value);
        if(v < 100) v = 100;
        settings.delay = v;
    };

    function add_opt(text, key) {
        var line = tag('label', { display: 'block', cursor: 'pointer' }, content);
        var chk = tag('input', { marginRight: '5px' }, line);
        chk.type = 'checkbox';
        chk.checked = settings[key];
        chk.onchange = function(e) { settings[key] = e.target.checked; };
        var sp = tag('span', {}, line);
        sp.innerText = text;
    }

    add_opt('System On', 'active');
    add_opt('Accept all', 'accept');
    add_opt('Confirm Step', 'confirm');
    add_opt('Color Buttons', 'ide');
    add_opt('Scroll to Button', 'move');

    document.body.appendChild(panel);

    btnMin.onclick = function() {
        settings.mini = !settings.mini;
        content.style.display = settings.mini ? 'none' : 'flex';
        btnMin.innerText = settings.mini ? '+' : '-';
    };

    var isDrag = false;
    var dx, dy;
    header.onmousedown = function(e) {
        if(e.target.tagName === 'BUTTON') return;
        isDrag = true;
        dx = e.clientX - panel.offsetLeft;
        dy = e.clientY - panel.offsetTop;
    };
    document.onmousemove = function(e) {
        if(isDrag) {
            panel.style.left = (e.clientX - dx) + 'px';
            panel.style.top = (e.clientY - dy) + 'px';
            panel.style.right = 'auto';
        }
    };
    document.onmouseup = function() { isDrag = false; };

    function check_el(el) {
       
        if(!el || !el.offsetParent) return false;

        
        if (el.closest('#mert-box')) return false;

        var txt = (el.innerText || '').trim();
        var cls = (el.className || '').toString();

        if(settings.accept && txt === "Accept all") return true;
        if(settings.confirm && txt === "Confirm") return true;
        if(settings.ide && txt.toLowerCase().includes('accept') && (cls.includes('bg-ide') || cls.includes('hover:bg-ide'))) return true;
        
        return false;
    }

    function finder(root) {
        var all = root.querySelectorAll('button, div, span, a');
        all.forEach(function(item) {
            if(check_el(item)) {
                if(settings.move) item.scrollIntoView({block:'center', behavior:'smooth'});
                item.click();
                settings.clicks++;
                count.innerText = settings.clicks;
            }
        });
    }

    function worker() {
        if(!window.mert_running) return;
        if(settings.active) {
            finder(document);
            var frames = document.querySelectorAll('iframe');
            frames.forEach(function(fr) {
                try { finder(fr.contentDocument || fr.contentWindow.document); } catch(err){}
            });
        }
        setTimeout(worker, settings.delay);
    }

    worker();
})();
