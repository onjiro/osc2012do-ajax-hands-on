$(function() {
    // 全部屋の予約情報を取得
    // error 系をハンドリングするには $.ajax を使用する必要がある
    var url = '/reservations/2012-04-01';
    var data = null;
    $.getJSON(url, data, function(reservations) {
        // 取得できた場合予約状況欄を初期化
        $('.room .statuses dd').text('空き');
        // 予約状況欄に予約者名を記載
        alert(reservations.length);
        for (var i = 0; i < reservations.length; i++) {
            var roomId = reservations[i].roomId;
            var division = reservations[i].division;
            var reserver = reservations[i].reserver;
            $('#' + roomId + '.' + division + 'dd').text(reserver);
        }
    });
});
