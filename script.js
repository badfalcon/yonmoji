document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('canvas');
    const canvas2d = canvas.getContext('2d');
    const inputs = document.querySelectorAll('#form input');

    function onChange() {
        draw(
            document.getElementById('input_text').value,
            'bold 64px ' + document.getElementById('input_font').value,
            document.getElementById('input_color').value,
            document.getElementById('input_background').checked,
            document.getElementById('input_background_color').value,
            document.getElementById('input_border').checked,
            document.getElementById('input_border_color').value,
            document.getElementById('input_border_size').value
        );
        save();
    }

    function draw(str, font, color, bg, bgColor, border, borderColor, borderSize) {
        canvas2d.font = font;
        if (bg) {
            canvas2d.fillStyle = bgColor;
            canvas2d.fillRect(0, 0, 128, 128);
        } else {
            canvas2d.clearRect(0, 0, 128, 128);
        }
        if (border) {
            canvas2d.strokeStyle = borderColor;
            canvas2d.lineWidth = borderSize;
            for (let i = 0; i < 4; i++) {
                canvas2d.strokeText(str.charAt(i), (i % 2) * 60 + 2, Math.floor(i / 2) * 64 + 58);
            }
        }
        canvas2d.fillStyle = color;
        for (let i = 0; i < 4; i++) {
            canvas2d.fillText(str.charAt(i), (i % 2) * 60 + 2, Math.floor(i / 2) * 64 + 58);
        }
    }

    function load() {
        const keys = ['text', 'font', 'color', 'background', 'background_color', 'border', 'border_color', 'border_size'];
        keys.forEach(key => {
            const val = urlParams(key);
            if (val) {
                document.getElementById('input_' + key).value = val;
            }
        });
    }

    function save() {
        const keys = ['text', 'font', 'color', 'background', 'background_color', 'border', 'border_color', 'border_size'];
        let search = '?';
        keys.forEach(key => {
            const val = document.getElementById('input_' + key).value;
            search += '&' + key + '=' + encodeURIComponent(val);
        });
        history.replaceState('', null, search.replace('?&', '?'));
    }

    function urlParams(key) {
        const match = location.search.match(new RegExp(key + '=(.*?)(&|$)'));
        return match ? decodeURIComponent(match[1]) : undefined;
    }

    inputs.forEach(input => {
        input.addEventListener('input', onChange);
    });

    load();
    onChange();
});
