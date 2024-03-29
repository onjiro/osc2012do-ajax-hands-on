A_DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;

$(function() {
    var currentDate = new Date();
    
    $('.reservations')
        .find('.reserve:not(.disabled)').live('click', function(event) {
            $this = $(this);
            // 予約ボタンの設置
            // prompt で入力ダイアログを開く
            // キャンセルの場合 null、未入力の場合空白
            // TODO 空白のトリミング
            var reserver = prompt('予約者を入力してください。');
            if (!reserver || reserver === '') {
                return;
            }
            var data = {
                date: formatDate(currentDate),
                roomId: $this.parent().parent().attr('id'),
                division: $this.parent().data('division'),
                reserver: reserver
            }
            reserve(data.date, data.roomId, data.division, data.reserver);
        }).end()
        .find('.cancel:not(.disabled)').live('click', function(event) {
            $this = $(this);
            // 予約キャンセルボタンの設置
            cancel({
                date:     formatDate(currentDate),
                roomId:   $this.parent().parent().attr('id'),
                division: $this.parent().data('division')
            });
        });
    
    // 更新ボタンの設置
    $('.button.reload').bind('click', function(event) {
        refresh(currentDate);
    });
    
    // 前後の日付への移動ボタンを設置
    $('.button.date-shift').bind('click', function(shifting) {
        var shiftDate = parseInt($(this).data('shifting'));
        currentDate.setTime(currentDate.getTime() + shiftDate * A_DAY_IN_MILLISECONDS);
        refresh(currentDate);
    });
    
    // 全部屋の予約情報を取得
    refresh(currentDate);
});

function refresh(date) {
    // 本日の日付を取得して設定
    $("h2.date").text(formatDate(date));
    
    // error 系をハンドリングするには $.ajax を使用する必要がある
    var url = '/reservations';
    var data = {
        date: formatDate(date)
    };
    $.getJSON(url, data, function(reservations) {
        // 取得できた場合予約状況欄を初期化
        $('.reservations')
            .find('.status').removeClass('label-success').text('空き').end()
            .find('.reserve').show().end()
            .find('.cancel').css('visibility', 'hidden');
        // 予約状況欄に予約者名を記載
        for (var i = 0; i < reservations.length; i++) {
            var roomId = reservations[i].roomId;
            var division = reservations[i].division;
            var reserver = reservations[i].reserver;
            $('#' + roomId + ' [data-division=' + division + ']')
                .find('.status').text(reserver).addClass('label-success').end()
                .find('.reserve').hide().end()
                .find('.cancel').css('visibility', 'visible');
        }
    });
}

function formatDate(date) {
    // Date#getMonth は 0 始まりのため 1 を加算する必要がある
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
}

function reserve(date, roomId, division, reserver) {
    var data = {
        date: date,
        roomId: roomId,
        division: division,
        reserver: reserver
    }
    $.post('/reservations', data, function() {
        $('#' + data.roomId + ' [data-division=' + data.division + ']')
            .find('.status').text(data.reserver).addClass('label-success').end()
            .find('.reserve').hide().end()
            .find('.cancel').css('visibility', 'visible');
    });
}

function cancel(data) {
    $.ajax('/reservations', {
        type: 'DELETE',
        data: data,
        success: function() {
            $('#' + data.roomId + ' [data-division=' + data.division + ']')
                .find('.status').text('空き').removeClass('label-success').end()
                .find('.reserve').show().end()
                .find('.cancel').css('visibility', 'hidden');
        }
    });
}
