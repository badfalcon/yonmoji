$(function () {
    const canvas2d = document.getElementById('canvas').getContext('2d');

    const onChange = () => {
        draw(
            $('#input_text').val(),
            'bold 64px ' + $('#input_font').val(),
            $('#input_color').val(),
            $('#input_background').prop("checked"),
            $('#input_background_color').val(),
            $('#input_border').prop('checked'),
            $('#input_border_color').val(),
            $('#input_border_size').val()
        );
        save();
    };

    const draw = (str, font, color, bg, bgColor, border, borderColor, borderSize) => {
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
            [0, 1, 2, 3].forEach(i => {
                canvas2d.strokeText(str.charAt(i), (i % 2) * 60 + 2, (Math.floor(i / 2)) * 64 + 58, 64);
            });
        }
        canvas2d.fillStyle = color;
        [0, 1, 2, 3].forEach(i => {
            canvas2d.fillText(str.charAt(i), (i % 2) * 60 + 2, (Math.floor(i / 2)) * 64 + 58, 64);
        });
    };

    const load = () => {
        const keys = ['text', 'font', 'color', 'background', 'background_color', 'border', 'border_color', 'border_size'];
        keys.forEach(key => {
            const val = urlParams(key);
            if (val) {
                $('#input_' + key).val(val);
            }
        });
    };

    const save = () => {
        const keys = ['text', 'font', 'color', 'background', 'background_color', 'border', 'border_color', 'border_size'];
        let search = '?';
        keys.forEach(key => {
            const val = $('#input_' + key).val();
            search = search + '&' + key + '=' + encodeURIComponent(val);
        });
        history.replaceState('', null, search.replace('?&', '?'));
    };

    const urlParams = key => {
        const match = location.search.match(new RegExp(key + '=(.*?)(&|$)'));
        return match ? decodeURIComponent(match[1]) : undefined;
    };

    $('input').on('keyup change', onChange);
    load();
    onChange();
});
